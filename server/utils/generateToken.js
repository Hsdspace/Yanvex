import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const generateToken = (id) =>
  jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });

export const generateRefreshToken = (id) =>
  jwt.sign({ id, type: 'refresh' }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRE,
  });

export const hashToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex');

export const sendTokenResponse = async (user, statusCode, res) => {
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  const accessCookieOptions = {
    expires: new Date(Date.now() + config.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: config.COOKIE_SECURE,
    sameSite: config.COOKIE_SAME_SITE,
  };

  const refreshCookieOptions = {
    ...accessCookieOptions,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };

  user.refreshTokenHash = hashToken(refreshToken);
  user.refreshTokenExpiresAt = refreshCookieOptions.expires;
  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  res
    .status(statusCode)
    .cookie('token', token, accessCookieOptions)
    .cookie('refreshToken', refreshToken, refreshCookieOptions)
    .json({
      success: true,
      token,
      refreshToken,
      user,
    });
};

export default generateToken;
