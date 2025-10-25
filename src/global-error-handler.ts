import { ErrorRequestHandler } from 'express';
import { StatusCodes, getStatusMessage } from 'http-status-toolkit';
import { isCustomAPIError } from './checking-custom-api-error';
import { CustomAPIError } from './error';
import {
  boldRed,
  red,
  boldYellow,
  yellow,
  boldGreen,
  green,
  dimGray,
  bold,
} from './utils/console-colors';
import { ErrorOptions, ErrorResponse } from './types';



// Internal config object (optional override)
let errorOptions: ErrorOptions = {
  showStack:
    process.env.SHOW_STACK !== 'false' && process.env.NODE_ENV !== 'production',
  logError:
    process.env.LOG_ERROR !== 'false' && process.env.NODE_ENV !== 'production',
  autoSuccessLog:
    process.env.AUTO_SUCCESS_LOG !== 'false' && process.env.NODE_ENV !== 'production',
  introLine: `💥 Even the best code breaks sometimes! Let's debug...`,
};

export function setErrorOptions(options: Partial<ErrorOptions>) {
  errorOptions = {
    ...errorOptions,
    ...options,
  };
}

// TODO



export const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Ignoring harmless favicon.ico errors
  if (_req.originalUrl === '/favicon.ico') {
   res.status(204).end();
   return;
  }

  let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = getStatusMessage(StatusCodes.INTERNAL_SERVER_ERROR);
  let errorDetails: string | object | null | undefined;
  let stack: string | undefined;

  if (err instanceof Error) {
    if (isCustomAPIError(err)) {
      const customErr = err as CustomAPIError;
      statusCode = customErr.statusCode || statusCode;
      message = customErr.message.trim() || message;
      errorDetails = customErr.errorDetails;
    } else {
      message = err.message || message;
    }
    stack = err.stack;
  }

  const errorResponse: ErrorResponse = {
    success: false,
    status: statusCode,
    message,
  };

  if (errorDetails) {
    errorResponse.errorDetails = errorDetails;
  }

  if (stack && errorOptions.showStack) {
    errorResponse.stack = stack.split('\n').map((line) => line.trim());
  }

  // Logging the error if configured to do so
  if (errorOptions.logError) {
    // log the intro line if it's true
    if (errorOptions.introLine) {
      console.error(`\n${bold(`${errorOptions.introLine}`)}\n`);
    } else {
      console.error();
    }

    // logging the error status
    console.error(
      `${boldRed('🔴 Error Status:')} ${red(String(errorResponse.status))}\n`
    );

    // logging the error message
    console.error(
      `${boldRed('🔴 Error Message:')} ${red(errorResponse.message)}\n`
    );

    //  Logging error details if available
    if (errorResponse.errorDetails) {
      console.error(boldYellow('🟡 Error Details:'));
      console.error(
        yellow(
          typeof errorResponse.errorDetails === 'object'
            ? JSON.stringify(errorResponse.errorDetails, null, 2)
            : errorResponse.errorDetails
        )
      );
      console.error();
    }

    // Logging stack trace if available
    if (errorResponse.stack) {
      const stackLines = errorResponse.stack as string[];
      const previewLines = stackLines.slice(0, 3);
      const remainingCount = stackLines.length - previewLines.length;

      console.error(boldGreen('🟢 Stack Trace (Preview):'));
      previewLines.forEach((line) => console.error(green(line)));

      if (remainingCount > 0) {
        console.error(
          dimGray(
            `...and ${remainingCount} more lines. 💡 See full stack in error response`
          )
        );
      }
    }
  }
  res.status(statusCode).json(errorResponse);
};
