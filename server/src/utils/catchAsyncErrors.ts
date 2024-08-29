import { NextFunction, Request, Response } from 'express';

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const catchAsyncErrors = (controller: Controller): Controller => {
  return async (req: Request, res: Response, next: NextFunction) => {
    controller(req, res, next).catch(next);
  };
};
