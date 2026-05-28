import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { ApiResponseHandler } from '../utils/response.util';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponseHandler.unauthorized(res, 'Missing or invalid Bearer token');
    }

    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string; role: string };
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return ApiResponseHandler.tokenExpired(res, 'Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return ApiResponseHandler.invalidToken(res, `Invalid token: ${error.message}`);
    }
    return ApiResponseHandler.unauthorized(res, 'Authentication failed');
  }
};