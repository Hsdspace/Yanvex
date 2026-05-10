import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Private
router.get('/', getTestimonials);

// @route   GET /api/testimonials/:id
// @desc    Get single testimonial
// @access  Private
router.get('/:id', getTestimonial);

// @route   POST /api/testimonials
// @desc    Create new testimonial
// @access  Private/Admin
router.post('/', authorize('admin'), createTestimonial);

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial
// @access  Private/Admin
router.put('/:id', authorize('admin'), updateTestimonial);

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial
// @access  Private/Admin
router.delete('/:id', authorize('admin'), deleteTestimonial);

export default router;