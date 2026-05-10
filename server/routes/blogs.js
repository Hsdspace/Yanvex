import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Private
router.get('/', getBlogs);

// @route   GET /api/blogs/:id
// @desc    Get single blog
// @access  Private
router.get('/:id', getBlog);

// @route   POST /api/blogs
// @desc    Create new blog
// @access  Private/Admin
router.post('/', authorize('admin'), createBlog);

// @route   PUT /api/blogs/:id
// @desc    Update blog
// @access  Private/Admin
router.put('/:id', authorize('admin'), updateBlog);

// @route   DELETE /api/blogs/:id
// @desc    Delete blog
// @access  Private/Admin
router.delete('/:id', authorize('admin'), deleteBlog);

export default router;