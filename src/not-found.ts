import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-toolkit';



export const notFoundHandler = (req: Request, res: Response, ) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({
      success: false,
      error: "Not Found",
      message: `Route not found: ${req.originalUrl}`,
    });
}
