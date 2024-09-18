import type { NextFunction, Request, Response } from 'express';
import { catchAsyncErrors } from '../utils/catchAsyncErrors';
import { OK } from '../constants/http';

const getAllUsers = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    res.status(OK).json({
      status: 'success',
      message: 'get all users',
    });
  }
);

const getUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(OK).json({
      status: 'success',
      message: 'get user',
    });
  }
);

const createUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(OK).json({
      status: 'success',
      message: 'create user',
      user: req.body
    });
  }
);

export const userController = {
  getUser,
  getAllUsers,
  createUser,
};
