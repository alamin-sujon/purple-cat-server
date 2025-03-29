// import { StatusCodes } from "http-status-codes";
// import AppError from "../errors/appError";
// import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../modules/error/AppError';

export const parseBody = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.data) {
      throw new AppError(404, 'Please provide data in the body under data key');
    }
    req.body = JSON.parse(req.body.data);

    next();
  },
);
