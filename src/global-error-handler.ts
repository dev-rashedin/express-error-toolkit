import { Request, Response, NextFunction } from 'express';
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
} from './utils/console-colors';

// Internal config object (optional override)
let errorOptions = {
  showStack:
    process.env.SHOW_STACK !== 'false' && process.env.NODE_ENV !== 'production',
  logError:
    process.env.LOG_ERROR !== 'false' && process.env.NODE_ENV !== 'production',
};

export function setErrorOptions(options: Partial<typeof errorOptions>) {
  errorOptions = {
    ...errorOptions,
    ...options,
  };
}

export interface ErrorResponse {
  success: false;
  status: number;
  message: string;
  errorDetails?: string | object | null;
  stack?: string | string[];
}

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
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

  // Log the error if configured to do so
  if (errorOptions.logError) {
    // log the error status
    console.error(
      `${boldRed('🔴 Error Status:')} ${red(String(errorResponse.status))}`
    );

    console.error(); // empty line for better readability

    // log the error message
    console.error(
      `${boldRed('🔴 Error Message:')} ${red((errorResponse.message))}`
    );
  
    console.error();  // empty line for better readability

 //  Log error details if available
    if (errorResponse.errorDetails) {
      console.error(boldYellow('🟡 Error Details:'));
      console.error(
        yellow(
          typeof errorResponse.errorDetails === 'object'
            ? JSON.stringify(errorResponse.errorDetails, null, 2)
            : errorResponse.errorDetails
        )
      );
    }

    console.error();  // empty line for better readability

    // Log stack trace if available
    if (errorResponse.stack) {
      console.error(boldGreen('🟢 Stack Trace:'));
      (errorResponse.stack as string[]).forEach((line) =>
        console.error(green(line))
      );
    }
  }

  res.status(statusCode).json(errorResponse);
};
