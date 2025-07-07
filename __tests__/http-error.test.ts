import { httpError } from '../src/http-error';
import { BadRequestError, CustomAPIError, NotFoundError, UnauthenticatedError } from '../src/error';

describe('httpError factory', () => {
  it('creates BadRequestError for 400', () => {
    const err = httpError(400, 'Bad Request!');
    expect(err).toBeInstanceOf(CustomAPIError);
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('Bad Request!');
  });

  it('creates NotFoundError for 404', () => {
    const err = httpError(404, 'Not Found');
    expect(err).toBeInstanceOf(CustomAPIError);
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('Not Found');
  });

  it('creates UnauthenticatedError for 401', () => {
    const err = httpError(401, 'No token');
    expect(err).toBeInstanceOf(CustomAPIError);
    expect(err.statusCode).toBe(401);
    expect(err.message).toBe('No token');
  });

  it('creates generic CustomAPIError for unknown status code', () => {
    const err = httpError(499, 'Custom error');
    expect(err.name).toBe('CustomAPIError');
    expect(err.statusCode).toBe(499);
    expect(err.message).toBe('Custom error');
  });

  it('defaults message when none provided', () => {
    const err = httpError(400, 'Bad Request');
    expect(err.message).toBe('Bad Request');
  });
});
