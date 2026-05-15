import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from '../config/config.js';
import APIError from '../utils/APIError.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new APIError('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user || !req.user.isActive) {
      return next(new APIError('User account is inactive or no longer exists', 401));
    }

    return next();
  } catch (error) {
    return next(new APIError('Not authorized to access this route', 401));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new APIError(`User role ${req.user.role} is not authorized to access this route`, 403)
      );
    }
    return next();
  };
};
