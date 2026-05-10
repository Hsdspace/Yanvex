import Testimonial from '../models/Testimonial.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import APIError from '../utils/APIError.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import cloudinary from '../config/cloudinary.js';

/**
 * @desc    Get active testimonials
 * @route   GET /api/testimonials
 * @access  Public
 */
export const getTestimonials = asyncHandler(async (req, res, next) => {
  const resPerPage = 20;
  const testimonialsCount = await Testimonial.countDocuments({ isActive: true });

  const apiFeatures = new APIFeatures(Testimonial.find({ isActive: true }), req.query)
    .search(['name', 'company', 'designation', 'review'])
    .filter()
    .sort()
    .pagination(resPerPage);

  const testimonials = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: testimonials.length,
    total: testimonialsCount,
    data: testimonials,
  });
});

/**
 * @desc    Get single testimonial
 * @route   GET /api/testimonials/:id
 * @access  Private
 */
export const getTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(new APIError('Testimonial not found', 404));
  }

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});

/**
 * @desc    Create testimonial
 * @route   POST /api/testimonials
 * @access  Private/Admin
 */
export const createTestimonial = asyncHandler(async (req, res, next) => {
  const { name, company, designation, review, rating, featured } = req.body;

  const testimonial = await Testimonial.create({
    name,
    company,
    designation,
    review,
    rating,
    featured,
  });

  res.status(201).json({
    success: true,
    data: testimonial,
  });
});

/**
 * @desc    Update testimonial
 * @route   PUT /api/testimonials/:id
 * @access  Private/Admin
 */
export const updateTestimonial = asyncHandler(async (req, res, next) => {
  let testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(new APIError('Testimonial not found', 404));
  }

  testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});

/**
 * @desc    Delete testimonial
 * @route   DELETE /api/testimonials/:id
 * @access  Private/Admin
 */
export const deleteTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

  if (!testimonial) {
    return next(new APIError('Testimonial not found', 404));
  }

  if (testimonial.image && testimonial.image.public_id) {
    await cloudinary.uploader.destroy(testimonial.image.public_id);
  }

  res.status(200).json({
    success: true,
    message: 'Testimonial deleted successfully',
  });
});

/**
 * @desc    Upload testimonial image
 * @route   POST /api/testimonials/:id/image
 * @access  Private/Admin
 */
export const uploadTestimonialImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new APIError('Please provide an image', 400));
  }

  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(new APIError('Testimonial not found', 404));
  }

  try {
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    );

    if (testimonial.image && testimonial.image.public_id) {
      await cloudinary.uploader.destroy(testimonial.image.public_id);
    }

    testimonial.image = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    await testimonial.save();

    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    return next(new APIError(error.message, 500));
  }
});

export default {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  uploadTestimonialImage,
};
