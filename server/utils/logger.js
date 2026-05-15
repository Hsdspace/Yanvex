import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.join(__dirname, '..', 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logLevel = process.env.LOG_LEVEL || 'info';

const consoleFormat = winston.format.printf(({ level, message, timestamp, ...meta }) => {
  const serializedMeta = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} [${level}] ${message}${serializedMeta}`;
});

export const logger = winston.createLogger({
  level: logLevel,
  defaultMeta: { service: 'yanvex-api' },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), consoleFormat),
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 1024 * 1024 * 5,
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 1024 * 1024 * 5,
      maxFiles: 5,
    }),
  ],
});

export const morganStream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

export default logger;
