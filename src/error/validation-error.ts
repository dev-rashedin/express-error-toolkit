import { StatusCodes } from 'http-status-toolkit';
import { CustomAPIError } from './custom-api-error';

export class ValidationError extends CustomAPIError {
  constructor(message: string, errorDetails: string | object | null = null) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY, errorDetails);
    this.name = this.constructor.name;
  }
}
