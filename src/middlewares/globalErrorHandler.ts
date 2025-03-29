/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { config } from '../config';
import { TErrorSources } from '../types/error.type';
import AppError from '../modules/error/AppError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): any => {
  let message = 'Validation Erroreee';
  let status = 500;
  let details: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof AppError) {
    status = err?.statusCode;
    message = err?.message;
    details = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    details = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  return res.status(status).json({
    success: false,
    message,
    statusCode: err?.statusCode || status,
    error: { details },
    stack: (config.NODE_ENV as string) === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
