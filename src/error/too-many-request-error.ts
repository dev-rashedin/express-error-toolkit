import { StatusCodes } from 'http-status-toolkit';
import { CustomAPIError } from './custom-api-error';

export class TooManyRequestsError extends CustomAPIError {
  constructor(message: string, errorDetails: string | object | null = null) {
    super(message, StatusCodes.TOO_MANY_REQUESTS, errorDetails);
    this.name = this.constructor.name;
  }
}
