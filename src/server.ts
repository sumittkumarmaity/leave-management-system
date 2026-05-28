import 'dotenv/config';
import { app } from './app';
import { logger } from './config/logger';
import { connectDatabase } from './config/mongo';
import { config } from './config';

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Start the Express server 
    app.listen(config.port, () => {
      logger.info('----------------------------------');
      logger.info(`Server is running on PORT:${config.port}`);
      logger.info('----------------------------------');
    });
  } catch (error) {
    logger.info('----------------------------------');
    logger.error('Failed to start server', { error });
    logger.info('----------------------------------');
    process.exit(1);
  }
};

startServer();
