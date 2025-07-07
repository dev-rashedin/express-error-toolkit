import { notFoundHandler } from '../src/not-found-handler';
import { NotFoundError } from '../src/error';

describe('notFoundHandler', () => {
  it('calls next with NotFoundError including method and url', () => {
    const req: any = {
      method: 'GET',
      originalUrl: '/test-url',
    };

    const next = jest.fn();

    notFoundHandler(req, {} as any, next);

    expect(next).toHaveBeenCalledTimes(1);

    const err = next.mock.calls[0][0];

    expect(err).toBeInstanceOf(NotFoundError);
    expect(err.message).toBe('Cannot GET /test-url');
  });

  it('handles missing method or url gracefully', () => {
    const req: any = {};

    const next = jest.fn();

    notFoundHandler(req, {} as any, next);

    expect(next).toHaveBeenCalledTimes(1);

    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(NotFoundError);
    expect(err.message).toContain('Cannot');
  });
});
