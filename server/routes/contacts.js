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

// @route   POST /api/contact
// @desc    Create new contact (public)
router.post('/', createContact);

// All routes below require authentication
router.use(protect);

// @route   GET /api/contact
// @desc    Get all contacts
// @access  Private
router.get('/', getContacts);

// @route   GET /api/contact/:id
// @desc    Get single contact
// @access  Private
router.get('/:id', getContact);

// @route   PUT /api/contact/:id
// @desc    Update contact
// @access  Private/Admin
router.put('/:id', authorize('admin'), updateContact);

// @route   DELETE /api/contact/:id
// @desc    Delete contact
// @access  Private/Admin
router.delete('/:id', authorize('admin'), deleteContact);

// @route   PATCH /api/contact/:id
// @desc    Mark contact as read
// @access  Private/Admin
router.patch('/:id', authorize('admin'), markAsRead);

export default router;
