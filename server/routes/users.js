import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateProfile,
  changePassword
} from '../controllers/userController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', authorize('admin'), getUsers);

// @route   GET /api/users/:id
// @desc    Get single user
// @access  Private/Admin
router.get('/:id', authorize('admin'), getUser);

// @route   POST /api/users
// @desc    Create new user
// @access  Private/Admin
router.post('/', authorize('admin'), createUser);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private/Admin
router.put('/:id', authorize('admin'), updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/:id', authorize('admin'), deleteUser);

// @route   PUT /api/users/profile
// @desc    Update current user profile
// @access  Private
router.put('/profile', updateProfile);

// @route   PUT /api/users/change-password
// @desc    Change current user password
// @access  Private
router.put('/change-password', changePassword);

export default router;