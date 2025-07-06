import { getStatusMessage, StatusCodes } from 'http-status-toolkit';

export class CustomAPIError extends Error {
  public statusCode: number;
  public errorDetails?: string | object | null;


  constructor(
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    errorDetails: string | object | null = null
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errorDetails = errorDetails;
    this.name = this.constructor.name;

    // to maintain prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    // for clean stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
