import { body, validationResult } from 'express-validator';

/**
 * Validation Result Handler
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Auth Validation Rules
 */
export const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

export const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

/**
 * Service Validation Rules
 */
export const validateService = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('icon').notEmpty().withMessage('Icon is required'),
  handleValidationErrors,
];

/**
 * Project Validation Rules
 */
export const validateProject = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('category')
    .isIn(['Machine Learning', 'NLP', 'Vision AI', 'Cloud', 'Automation', 'Analytics'])
    .withMessage('Invalid category'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  handleValidationErrors,
];

/**
 * Blog Validation Rules
 */
export const validateBlog = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('excerpt').optional().trim(),
  handleValidationErrors,
];

/**
 * Contact Validation Rules
 */
export const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('phone')
    .optional()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .withMessage('Please provide a valid phone number'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters'),
  handleValidationErrors,
];

/**
 * Testimonial Validation Rules
 */
export const validateTestimonial = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('designation').trim().notEmpty().withMessage('Designation is required'),
  body('review')
    .trim()
    .isLength({ min: 20 })
    .withMessage('Review must be at least 20 characters'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  handleValidationErrors,
];

export default {
  validateRegister,
  validateLogin,
  validateService,
  validateProject,
  validateBlog,
  validateContact,
  validateTestimonial,
  handleValidationErrors,
};
