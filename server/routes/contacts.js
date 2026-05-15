import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  markAsRead
} from '../controllers/contactController.js';

const router = express.Router();

/**
 * PUBLIC ROUTE
 * Allows anyone visiting your website to submit the contact form.
 * No login or token required.
 */
router.post('/', createContact);

/**
 * PROTECTED ROUTES
 * Everything below this line requires a valid Admin login token.
 * This prevents strangers from reading your private messages.
 */
router.use(protect);
router.use(authorize('admin')); // Ensures only admins can access the routes below

// @route   GET /api/contact
// @desc    Get all contact submissions
router.get('/', getContacts);

// @route   GET /api/contact/:id
// @desc    Get a specific message detail
router.get('/:id', getContact);

// @route   PUT /api/contact/:id
// @desc    Update contact details (e.g., adding internal notes)
router.put('/:id', updateContact);

// @route   DELETE /api/contact/:id
// @desc    Remove a message
router.delete('/:id', deleteContact);

// @route   PATCH /api/contact/:id
// @desc    Toggle the 'read' status of a message
router.patch('/:id/read', markAsRead);

export default router;