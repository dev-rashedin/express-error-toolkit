import { getStatusMessage, StatusCodes } from 'http-status-toolkit';
import { CustomAPIError } from './custom-api-error';

export class NotFoundError extends CustomAPIError {
  constructor(message: string, errorDetails: string | object | null = null) {
    super(message || getStatusMessage(StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND, errorDetails);
    this.name = this.constructor.name;
  }
}
