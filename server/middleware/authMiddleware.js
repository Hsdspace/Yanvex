import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import APIError from '../utils/APIError.js';

/**
 * Protect routes - Verify JWT token
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new APIError('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new APIError('User not found', 404));
    }

    if (!req.user.isActive) {
      return next(new APIError('User account is deactivated', 401));
    }

    next();
  } catch (error) {
    return next(new APIError('Not authorized to access this route', 401));
  }
});

/**
 * Grant access to specific roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new APIError(
          `User role '${req.user.role}' is not authorized to access this resource`,
          403
        )
      );
    }
    next();
  };
};

export default protect;
