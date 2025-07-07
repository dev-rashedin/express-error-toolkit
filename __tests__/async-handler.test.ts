import { asyncHandler } from '../src/async-handler';

describe('asyncHandler', () => {
  it('calls next with error when async fn rejects', (done) => {
    const error = new Error('Test error');

    const fn = async () => {
      throw error;
    };

    const wrapped = asyncHandler(fn);

    // mock req, res, next
    const req = {} as any;
    const res = {} as any;
    const next = (err: any) => {
      expect(err).toBe(error);
      done();
    };

    wrapped(req, res, next);
  });

  it('resolves normally when async fn resolves', (done) => {
    const fn = async (req: any, res: any) => {
      res.called = true;
    };

    const wrapped = asyncHandler(fn);

    const req = {} as any;
    const res = { called: false } as any;
    const next = jest.fn();

    wrapped(req, res, next);

    setTimeout(() => {
      expect(res.called).toBe(true);
      expect(next).not.toHaveBeenCalled();
      done();
    }, 0);
  });
});
