import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger';
import { ApiResponseHandler } from '../utils/response.util';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
  logger.error(err.message, { stack: err.stack });

  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;

  return ApiResponseHandler.serverError(res, message);
};
