import { CustomAPIError } from './error';

export function httpError(
  statusCode: number,
  message: string,
  errorDetails: string | object | null = null
): CustomAPIError {
  return new CustomAPIError(message, statusCode, errorDetails);
}
