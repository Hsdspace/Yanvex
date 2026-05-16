import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/yanvex',

  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET ||
    process.env.JWT_SECRET ||
    'your-refresh-secret-change-in-production',
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '30d',
  COOKIE_EXPIRE: parseInt(process.env.COOKIE_EXPIRE, 10) || 7,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  ALLOWED_ORIGINS: Array.from(
    new Set(
      (
        process.env.FRONTEND_URLS ||
        process.env.FRONTEND_URL ||
        (process.env.NODE_ENV === 'production'
          ? 'https://yanvex-grzc.vercel.app,https://yanvex.com,https://www.yanvex.com'
          : 'http://localhost:5173,http://localhost:3000')
      )
        .split(',')
        .map((origin) => origin.trim().replace(/\/$/, ''))
        .filter(Boolean)
        .concat([
          'https://yanvex-grzc.vercel.app', 
          'https://yanvex.com', 
          'https://www.yanvex.com'
        ])
    )
  ),

  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW, 10) || 15,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  AUTH_RATE_LIMIT_WINDOW: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW, 10) || 15,
  AUTH_RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS, 10) || 10,

  COOKIE_SECURE: process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production',
  COOKIE_SAME_SITE: process.env.COOKIE_SAME_SITE || 'lax',
  REQUEST_SIZE_LIMIT: process.env.REQUEST_SIZE_LIMIT || '1mb',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

['MONGO_URI', 'JWT_SECRET'].forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} is not set in .env file`);
  }
});

if (!process.env.JWT_REFRESH_SECRET && !process.env.JWT_SECRET) {
  console.warn('Warning: JWT_REFRESH_SECRET is not set in .env file');
}