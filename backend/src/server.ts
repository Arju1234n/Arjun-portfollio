import { connectDB } from './config/db';
import { env } from './config/env';
import app from './app';
import logger from './utils/logger';

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    const server = app.listen(parseInt(env.PORT, 10), () => {
      logger.info(`🚀 Server running on http://localhost:${env.PORT} [${env.NODE_ENV}]`);
      logger.info(`📚 API Docs: http://localhost:${env.PORT}/api/docs`);
    });

    // Graceful shutdown
    const shutdown = (signal: string) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
