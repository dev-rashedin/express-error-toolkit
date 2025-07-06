import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getStatusMessage } from 'http-status-toolkit';

interface CustomError extends Error {
  statusCode?: number;
  errorDetails?: string | object | null;
  stack?: string;
}

interface ErrorResponse {
  success: false;
  message: string;
  errorDetails?: string | object | null;
  stack?: string;
}

export const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  const message =
    err.message?.trim() || getStatusMessage(StatusCodes.INTERNAL_SERVER_ERROR);

  const errorResponse: ErrorResponse = {
    success: false,
    message,
  };

  if (err.errorDetails) {
    errorResponse.errorDetails = err.errorDetails;
  }

  if (process.env.NODE_ENV === 'development' && err.stack) {
    errorResponse.stack = err.stack;
  }

  // Logging
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  } else {
    console.error(`[${new Date().toISOString()}] ${err.name}: ${message}`);
  }

  res.status(statusCode).json(errorResponse);
};
