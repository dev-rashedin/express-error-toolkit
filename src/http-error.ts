import { CustomAPIError } from './error';

export function httpError(
  message: string,
  statusCode: number,
  errorDetails: string | object | null = null
): CustomAPIError {
  return new CustomAPIError(message, statusCode, errorDetails);
}
