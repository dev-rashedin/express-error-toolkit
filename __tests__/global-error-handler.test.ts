import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-toolkit';
import { globalErrorHandler } from '../src/global-error-handler';
import { BadRequestError } from '../src/error';

describe('globalErrorHandler', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeAll(() => {
    process.env.NODE_ENV = 'development';
  });

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();

    // prevent console.error from polluting test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('responds with statusCode and message from error', () => {
    const error = new BadRequestError('Invalid input', { field: 'email' });

    globalErrorHandler(
      error,
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'Invalid input',
        errorDetails: { field: 'email' },
        stack: expect.anything()
      })
    );
  });
});
