/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
type TResponse<T> = {
  success: boolean;
  meta?: any;
  statusCode?: number;
  message: string;
  data: T;
};
export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode || 200).json({
    success: data?.success,
    message: data?.message,
    data: data?.data,
    meta: data?.meta,
  });
};
