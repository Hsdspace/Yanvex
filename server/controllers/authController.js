import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';
import { config } from '../config/config.js';
import User from '../models/User.js';
import APIError from '../utils/APIError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { hashToken, sendTokenResponse } from '../utils/generateToken.js';
import { logger } from '../utils/logger.js';

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return next(new APIError('User already exists with this email', 400));
  }

  user = await User.create({
    name,
    email,
    password,
  });

  await sendTokenResponse(user, 201, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new APIError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new APIError('Invalid credentials', 401));
  }

  if (!user.isActive) {
    return next(new APIError('Your account has been deactivated. Please contact support.', 403));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    logger.warn('Failed login attempt', {
      email,
      ip: req.ip,
      requestId: req.id,
    });
    return next(new APIError('Invalid credentials', 401));
  }

  logger.info('User logged in', {
    email,
    userId: user._id.toString(),
    requestId: req.id,
  });

  await sendTokenResponse(user, 200, res);
});

export const refreshSession = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!refreshToken) {
    return next(new APIError('Refresh token is required', 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
  } catch (error) {
    return next(new APIError('Invalid refresh token', 401));
  }

  const user = await User.findById(decoded.id).select('+refreshTokenHash');
  if (!user || !user.refreshTokenHash) {
    return next(new APIError('Session not found. Please log in again.', 401));
  }

  if (user.refreshTokenHash !== hashToken(refreshToken)) {
    return next(new APIError('Refresh token mismatch. Please log in again.', 401));
  }

  if (user.refreshTokenExpiresAt && user.refreshTokenExpiresAt < new Date()) {
    return next(new APIError('Session has expired. Please log in again.', 401));
  }

  await sendTokenResponse(user, 200, res);
});

export const logout = asyncHandler(async (req, res) => {
  if (req.user) {
    req.user.refreshTokenHash = undefined;
    req.user.refreshTokenExpiresAt = undefined;
    await req.user.save({ validateBeforeSave: false });
  }

  res
    .status(200)
    .clearCookie('token')
    .clearCookie('refreshToken')
    .json({
      success: true,
      message: 'User logged out successfully',
    });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;

  const user = await User.findByIdAndUpdate(req.user.id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.matchPassword(currentPassword))) {
    return next(new APIError('Current password is incorrect', 401));
  }

  user.password = newPassword;
  await user.save();

  await sendTokenResponse(user, 200, res);
});

export const uploadAvatar = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new APIError('Please provide an image', 400));
  }

  try {
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    );

    const user = await User.findById(req.user.id);

    if (user.avatar && user.avatar.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(new APIError(error.message, 500));
  }
});

export default {
  register,
  login,
  refreshSession,
  logout,
  getMe,
  updateProfile,
  updatePassword,
  uploadAvatar,
};
