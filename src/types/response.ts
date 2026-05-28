export type ResponseCode = 
  | 'SUCCESS'
  | 'CREATED'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'SERVER_ERROR'
  | 'VALIDATION_ERROR'
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  code: ResponseCode;
  data?: T;
  errors?: Record<string, any>;
}
