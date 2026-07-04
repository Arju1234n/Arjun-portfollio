import mongoose from 'mongoose';
import logger from '../utils/logger';
import { env } from './env';

/** Mongoose connection options */
const MONGOOSE_OPTIONS: mongoose.ConnectOptions = {
  autoIndex: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

let isConnected = false;

/**
 * Connects to MongoDB using the MONGODB_URI from env.
 * Logs connection status via Winston. Exits process on failure in production.
 */
export async function connectDB(): Promise<void> {
  if (isConnected) {
    logger.info('MongoDB already connected — reusing existing connection');
    return;
  }

  try {
    logger.info('Connecting to MongoDB…');
    const conn = await mongoose.connect(env.MONGODB_URI, MONGOOSE_OPTIONS);
    isConnected = true;
    logger.info(`✅  MongoDB connected: ${conn.connection.host} / db: ${conn.connection.name}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error(`❌  MongoDB connection failed: ${message}`);
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    }
    throw err;
  }
}

/** Mongoose connection event listeners */
mongoose.connection.on('disconnected', () => {
  isConnected = false;
  logger.warn('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  logger.info('MongoDB reconnected');
});

mongoose.connection.on('error', (err: Error) => {
  logger.error(`MongoDB connection error: ${err.message}`);
});

/**
 * Gracefully closes the MongoDB connection.
 * Called during process termination.
 */
export async function disconnectDB(): Promise<void> {
  if (!isConnected) return;
  await mongoose.connection.close();
  isConnected = false;
  logger.info('MongoDB connection closed');
}
