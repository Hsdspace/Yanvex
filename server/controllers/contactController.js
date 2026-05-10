import Contact from '../models/Contact.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import APIError from '../utils/APIError.js';
import { APIFeatures } from '../utils/apiFeatures.js';

/**
 * @desc    Submit contact form
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone, subject, message, industry } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
    industry,
  });

  res.status(201).json({
    success: true,
    data: contact,
  });
});

/**
 * @desc    Get single contact submission
 * @route   GET /api/contact/:id
 * @access  Private/Admin
 */
export const getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new APIError('Contact submission not found', 404));
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

/**
 * @desc    Get all contact submissions
 * @route   GET /api/contact
 * @access  Private/Admin
 */
export const getContacts = asyncHandler(async (req, res, next) => {
  const resPerPage = 20;
  const contactsCount = await Contact.countDocuments();

  const apiFeatures = new APIFeatures(Contact.find().sort('-createdAt'), req.query)
    .search(['name', 'email', 'subject', 'message', 'industry'])
    .filter()
    .pagination(resPerPage);

  const contacts = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: contacts.length,
    total: contactsCount,
    data: contacts,
  });
});

/**
 * @desc    Create new contact submission
 * @route   POST /api/contact
 * @access  Public
 */
export const createContact = submitContact;

/**
 * @desc    Update contact status
 * @route   PATCH /api/contact/:id
 * @access  Private/Admin
 */
export const updateContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new APIError('Contact submission not found', 404));
  }

  contact.isRead = req.body.isRead ?? contact.isRead;
  contact.isReplied = req.body.isReplied ?? contact.isReplied;

  await contact.save();

  res.status(200).json({
    success: true,
    data: contact,
  });
});

/**
 * @desc    Mark contact as read
 * @route   PATCH /api/contact/:id
 * @access  Private/Admin
 */
export const markAsRead = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new APIError('Contact submission not found', 404));
  }

  contact.isRead = true;
  await contact.save();

  res.status(200).json({
    success: true,
    data: contact,
  });
});

/**
 * @desc    Delete contact submission
 * @route   DELETE /api/contact/:id
 * @access  Private/Admin
 */
export const deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    return next(new APIError('Contact submission not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Contact submission deleted successfully',
  });
});

export default {
  submitContact,
  createContact,
  getContact,
  getContacts,
  updateContact,
  deleteContact,
  markAsRead,
};
