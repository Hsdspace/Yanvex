import Contact from '../models/Contact.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import APIError from '../utils/APIError.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import nodemailer from 'nodemailer'; // 1. Import Nodemailer
import { config } from '../config/config.js'; // Ensure you have SMTP config here

/**
 * @desc    Submit contact form & Send Email
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone, subject, message, industry } = req.body;

  // 2. Save to Database
  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
    industry,
  });

  // 3. Setup Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_PORT === 465, // true for 465, false for others
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS, // Use App Password for Gmail
    },
  });

  // 4. Define Email Options
  const mailOptions = {
    from: `"${name}" <${config.SMTP_USER}>`,
    to: config.VITE_CONTACT_EMAIL || config.SMTP_USER, // Send to your company mail
    subject: `New Yanvex Inquiry: ${subject || 'General Contact'}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #00d4ff;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Industry:</strong> ${industry || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
          ${message}
        </div>
        <br />
        <hr />
        <p style="font-size: 12px; color: #888;">This inquiry has been saved to your Admin Control Hub.</p>
      </div>
    `,
  };

  // 5. Send the Email (using try-catch to ensure DB success even if mail fails)
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
    // We don't return 'next(error)' here because the data is already saved to DB successfully.
  }

  res.status(201).json({
    success: true,
    data: contact,
  });
});

/**
 * @desc    Get single contact submission
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
 * @desc    Create new contact submission (Alias)
 */
export const createContact = submitContact;

/**
 * @desc    Update contact status
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