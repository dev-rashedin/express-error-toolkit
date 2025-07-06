import { StatusCodes } from 'http-status-toolkit';
import { CustomAPIError } from './custom-api-error';

export class UnauthenticatedError extends CustomAPIError {
  constructor(message: string, errorDetails: string | object | null = null) {
    super(message, StatusCodes.UNAUTHORIZED, errorDetails);
    this.name = this.constructor.name;
  }
}
