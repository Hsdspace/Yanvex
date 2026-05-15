import mongoose from 'mongoose';
import { config } from './config.js';
import { logger } from '../utils/logger.js';

const connectDB = async () => {
  try {
    const mongoUri = config.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/yanvex';
    const conn = await mongoose.connect(mongoUri);

    logger.info('MongoDB connected', { host: conn.connection.host });
  } catch (error) {
    logger.error('MongoDB connection error', { message: error.message });
    process.exit(1);
  }
};

export default connectDB;
