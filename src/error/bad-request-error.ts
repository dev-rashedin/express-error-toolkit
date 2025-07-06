import { StatusCodes } from 'http-status-toolkit';
import { CustomAPIError } from './custom-api-error';

export class BadRequestError extends CustomAPIError {
  constructor(message: string, errorDetails: string | object | null = null) {
    super(message, StatusCodes.BAD_REQUEST, errorDetails);
    this.name = this.constructor.name;
  }
}
