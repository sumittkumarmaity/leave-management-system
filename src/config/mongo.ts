import mongoose from 'mongoose';
import { logger } from './logger';
import { config } from './index';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri, {
      dbName: config.databaseName,
      // user: config.databaseUser,
      // pass: config.databasePassword
    });
    logger.info('----------------------------------');
    logger.info('Connected to MongoDB');
    logger.info('----------------------------------');
  } catch (error) {
    logger.info('----------------------------------');
    logger.error('MongoDB connection failed', { error });
    logger.info('----------------------------------');
    throw error;
  }
};
