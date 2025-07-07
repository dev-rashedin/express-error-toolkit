import { httpError } from '../src/http-error';
import {  CustomAPIError } from '../src/error';

describe('httpError factory', () => {
  it('creates BadRequestError for 400', () => {
    const err = httpError('Bad Request!', 400);
    expect(err).toBeInstanceOf(CustomAPIError);
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('Bad Request!');
  });

  it('creates NotFoundError for 404', () => {
    const err = httpError( 'Not Found', 404);
    expect(err).toBeInstanceOf(CustomAPIError);
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('Not Found');
  });

  it('creates UnauthenticatedError for 401', () => {
    const err = httpError('No token', 401);
    expect(err).toBeInstanceOf(CustomAPIError);
    expect(err.statusCode).toBe(401);
    expect(err.message).toBe('No token');
  });

  it('creates generic CustomAPIError for unknown status code', () => {
    const err = httpError('Custom error', 499);
    expect(err.name).toBe('CustomAPIError');
    expect(err.statusCode).toBe(499);
    expect(err.message).toBe('Custom error');
  });

  it('defaults message when none provided', () => {
    const err = httpError('Bad Request', 400);
    expect(err.message).toBe('Bad Request');
  });
});
