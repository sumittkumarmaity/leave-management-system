import { Response } from 'express';
import { ApiResponse, ResponseCode } from '../types/response';

const statusCodeMap: Record<ResponseCode, number> = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  INVALID_TOKEN: 401,
  TOKEN_EXPIRED: 401,
  SERVER_ERROR: 500,
};

const messageMap: Record<ResponseCode, string> = {
  SUCCESS: 'Request completed successfully',
  CREATED: 'Resource created successfully',
  BAD_REQUEST: 'Invalid request',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Resource not found',
  CONFLICT: 'Resource conflict',
  VALIDATION_ERROR: 'Validation failed',
  INVALID_TOKEN: 'Invalid token',
  TOKEN_EXPIRED: 'Token has expired',
  SERVER_ERROR: 'Internal server error',
};

export class ApiResponseHandler {
  static success<T>(
    res: Response,
    data?: T,
    message?: string,
    statusCode: number = 200
  ): Response {
    const code: ResponseCode = statusCode === 201 ? 'CREATED' : 'SUCCESS';
    const response: ApiResponse<T> = {
      success: true,
      message: message || messageMap[code],
      code,
      data,
    };
    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    code: ResponseCode,
    message?: string,
    errors?: Record<string, any>
  ): Response {
    const statusCode = statusCodeMap[code];
    const response: ApiResponse = {
      success: false,
      message: message || messageMap[code],
      code,
      errors,
    };
    return res.status(statusCode).json(response);
  }

  static badRequest(
    res: Response,
    message?: string,
    errors?: Record<string, any>
  ): Response {
    return this.error(res, 'BAD_REQUEST', message, errors);
  }

  static unauthorized(res: Response, message?: string): Response {
    return this.error(res, 'UNAUTHORIZED', message);
  }

  static forbidden(res: Response, message?: string): Response {
    return this.error(res, 'FORBIDDEN', message);
  }

  static notFound(res: Response, message?: string): Response {
    return this.error(res, 'NOT_FOUND', message);
  }

  static conflict(res: Response, message?: string): Response {
    return this.error(res, 'CONFLICT', message);
  }

  static validationError(
    res: Response,
    message?: string,
    errors?: Record<string, any>
  ): Response {
    return this.error(res, 'VALIDATION_ERROR', message, errors);
  }

  static serverError(res: Response, message?: string): Response {
    return this.error(res, 'SERVER_ERROR', message);
  }

  static invalidToken(res: Response, message?: string): Response {
    return this.error(res, 'INVALID_TOKEN', message);
  }

  static tokenExpired(res: Response, message?: string): Response {
    return this.error(res, 'TOKEN_EXPIRED', message);
  }
}
