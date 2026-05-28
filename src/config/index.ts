import { config as dotenvConfig } from 'dotenv';
import path from 'path';

dotenvConfig({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  databaseName: process.env.DATABASE_NAME || 'leave-management-system',
  databaseUser: process.env.DATABASE_USER || '',
  databasePassword: process.env.DATABASE_PASSWORD || '',
  jwtSecret: process.env.JWT_SECRET || 'replace-me-with-a-strong-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'replace-me-with-a-strong-refresh-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    maxRequests: Number(process.env.RATE_LIMIT_MAX || 100)
  }
  
};
