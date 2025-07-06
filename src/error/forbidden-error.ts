import { StatusCodes } from 'http-status-toolkit';
import { CustomAPIError } from './custom-api-error';

export class ForbiddenError extends CustomAPIError {
  constructor(message: string, errorDetails: string | object | null = null) {
    super(message, StatusCodes.FORBIDDEN, errorDetails);
    this.name = this.constructor.name;
  }
}
