import { StatusCodes } from 'http-status-toolkit';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  ConflictError,
  TooManyRequestsError,
  CustomAPIError,
  ValidationError,
  ForbiddenError
} from '../src/error'; 

describe('Error Classes', () => {
  it('BadRequestError should have correct properties', () => {
    const err = new BadRequestError('Bad request', { field: 'email' });
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('BadRequestError');
    expect(err.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(err.message).toBe('Bad request');
    expect(err.errorDetails).toEqual({ field: 'email' });
  });

  it('NotFoundError should have correct properties', () => {
    const err = new NotFoundError('Not found');
    expect(err.name).toBe('NotFoundError');
    expect(err.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(err.message).toBe('Not found');
  });

  it('UnauthenticatedError should have correct properties', () => {
    const err = new UnauthenticatedError('Unauthorized', 'Missing token');
    expect(err.name).toBe('UnauthenticatedError');
    expect(err.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(err.message).toBe('Unauthorized');
    expect(err.errorDetails).toBe('Missing token');
  });

  it('ConflictError should have correct properties', () => {
    const err = new ConflictError('Conflict error');
    expect(err.name).toBe('ConflictError');
    expect(err.statusCode).toBe(StatusCodes.CONFLICT);
    expect(err.message).toBe('Conflict error');
  });

  it('TooManyRequestsError should have correct properties', () => {
    const err = new TooManyRequestsError('Too many requests');
    expect(err.name).toBe('TooManyRequestsError');
    expect(err.statusCode).toBe(StatusCodes.TOO_MANY_REQUESTS);
    expect(err.message).toBe('Too many requests');
  });

  it('CustomAPIError should have correct properties', () => {
    const err = new CustomAPIError('Custom error', StatusCodes.INTERNAL_SERVER_ERROR, 'Custom details');
    expect(err.name).toBe('CustomAPIError');
    expect(err.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(err.message).toBe('Custom error');
    expect(err.errorDetails).toBe('Custom details');
  });

  it('ValidationError should have correct properties', () => {
    const err = new ValidationError('Validation error');
    expect(err.name).toBe('ValidationError');
    expect(err.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(err.message).toBe('Validation error');
  });

  it('ForbiddenError should have correct properties', () => {
    const err = new ForbiddenError('Forbidden error');
    expect(err.name).toBe('ForbiddenError');
    expect(err.statusCode).toBe(StatusCodes.FORBIDDEN);
    expect(err.message).toBe('Forbidden error');
  });
});
