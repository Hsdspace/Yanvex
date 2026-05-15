import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { config } from './config/config.js';
import app from './app.js';
import { logger } from './utils/logger.js';

dotenv.config();

connectDB();

app.listen(config.PORT, () => {
  logger.info('Server started', {
    port: config.PORT,
    environment: config.NODE_ENV,
    frontendOrigins: config.ALLOWED_ORIGINS,
    apiBaseUrl: `http://localhost:${config.PORT}/api`,
  });
});

export default app;
