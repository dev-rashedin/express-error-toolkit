import { StatusCodes } from 'http-status-toolkit';
import { CustomAPIError } from './custom-api-error';

export class ConflictError extends CustomAPIError {
  constructor(message: string, errorDetails: string | object | null = null) {
    super(message, StatusCodes.CONFLICT, errorDetails);
    this.name = this.constructor.name;
  }
}
