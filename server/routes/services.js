import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';

const router = express.Router();

/**
 * @route   GET /api/services
 * @desc    Get all services
 * @access  Public (Accessible by the main website)
 */
router.get('/', getServices);

/**
 * @route   GET /api/services/:id
 * @desc    Get single service
 * @access  Public
 */
router.get('/:id', getService);

/**
 * PROTECTIVE GATEWAY
 * Everything defined below this line requires a valid login token.
 */
router.use(protect);

/**
 * @route   POST /api/services
 * @desc    Create new service
 * @access  Private/Admin (Used by Admin Dashboard)
 */
router.post('/', authorize('admin'), createService);

/**
 * @route   PUT /api/services/:id
 * @desc    Update service
 * @access  Private/Admin
 */
router.put('/:id', authorize('admin'), updateService);

/**
 * @route   DELETE /api/services/:id
 * @desc    Delete service
 * @access  Private/Admin
 */
router.delete('/:id', authorize('admin'), deleteService);

export default router;