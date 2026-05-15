import { config } from '../config/config.js';

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  if (err.name === 'JsonWebTokenError') {
    err.message = 'Invalid token';
    err.statusCode = 400;
  }

  if (err.name === 'TokenExpiredError') {
    err.message = 'Token has expired';
    err.statusCode = 401;
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err.message = `${field} already exists`;
    err.statusCode = 400;
  }

  if (err.name === 'ValidationError') {
    err.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');
    err.statusCode = 400;
  }

  if (err.name === 'CastError') {
    err.message = `Resource not found with id ${err.value}`;
    err.statusCode = 404;
  }

  if (err.type === 'entity.too.large') {
    err.message = 'Request payload is too large';
    err.statusCode = 413;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    requestId: req?.id,
    ...(config.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
