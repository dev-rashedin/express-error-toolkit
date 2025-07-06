import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from './error/not-found-error';



export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const method = req.method || 'UNKNOWN_METHOD';
  const url = req.originalUrl || 'UNKNOWN_URL';

  next(new NotFoundError(`Cannot ${method} ${url}`));
};

