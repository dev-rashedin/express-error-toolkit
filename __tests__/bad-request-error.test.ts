import { isCustomAPIError } from '../src/checking-custom-api-error';
import { BadRequestError } from '../src/error';

describe('isCustomAPIError()', () => {
  it('should return true for custom errors', () => {
    const err = new BadRequestError('Test');
    expect(isCustomAPIError(err)).toBe(true);
  });

  it('should return false for regular errors', () => {
    const err = new Error('Normal');
    expect(isCustomAPIError(err)).toBe(false);
  });

  it('should return false for unknown values', () => {
    expect(isCustomAPIError(null)).toBe(false);
    expect(isCustomAPIError({})).toBe(false);
  });
});
