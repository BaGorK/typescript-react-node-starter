import type { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from '../constants/http';

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: err,
  });
};
