import express from 'express';
import { body } from 'express-validator';
import { getMe, login, logout, refreshSession, register } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import {
  handleValidationErrors,
  validateLogin,
  validateRegister,
} from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post(
  '/refresh',
  [body('refreshToken').optional().isString(), handleValidationErrors],
  refreshSession
);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

export default router;
