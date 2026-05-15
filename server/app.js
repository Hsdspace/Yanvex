import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import crypto from 'crypto';
import mongoose from 'mongoose';

import { config } from './config/config.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { logger, morganStream } from './utils/logger.js';

import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blogs.js';
import projectRoutes from './routes/projects.js';
import serviceRoutes from './routes/services.js';
import testimonialRoutes from './routes/testimonials.js';
import contactRoutes from './routes/contacts.js';
import userRoutes from './routes/users.js';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

const authLimiter = rateLimit({
  windowMs: config.AUTH_RATE_LIMIT_WINDOW * 60 * 1000,
  max: config.AUTH_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
  },
});

const apiLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW * 60 * 1000,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.',
  },
});

app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] || crypto.randomUUID();
  res.setHeader('X-Request-Id', req.id);
  next();
});

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        // Combined connectSrc to allow both localhost and production origins
        connectSrc: ["'self'", "http://localhost:5000", ...config.ALLOWED_ORIGINS],
        imgSrc: ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
        mediaSrc: ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: config.NODE_ENV === 'production' ? [] : null,
      },
    },
    hsts: config.NODE_ENV === 'production'
      ? { maxAge: 31536000, includeSubDomains: true, preload: true }
      : false,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);

// REFINED CORS LOGIC
app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      // Check if origin is in the allowed list or if we are in development
      if (config.ALLOWED_ORIGINS.includes(origin) || config.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked for unauthorized origin: ${origin}`);
        callback(new Error(`Origin ${origin} is not allowed by CORS policy`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Request-Id'],
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: config.REQUEST_SIZE_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: config.REQUEST_SIZE_LIMIT }));
app.use(mongoSanitize());
app.use(hpp());

app.use(
  morgan(config.NODE_ENV === 'production' ? 'combined' : 'dev', {
    stream: morganStream,
  })
);

// Health Checks
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    environment: config.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/health/live', (req, res) => {
  res.status(200).json({ success: true, status: 'live' });
});

app.get('/health/ready', (req, res) => {
  const readyState = mongoose.connection.readyState;
  const isReady = readyState === 1;

  res.status(isReady ? 200 : 503).json({
    success: isReady,
    status: isReady ? 'ready' : 'degraded',
    database: isReady ? 'connected' : 'disconnected',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Error Handling
app.use((err, req, res, next) => {
  logger.error('Unhandled application error', {
    requestId: req.id,
    method: req.method,
    path: req.originalUrl,
    message: err.message,
    stack: err.stack,
  });
  next(err);
});

app.use(errorHandler);

export default app;