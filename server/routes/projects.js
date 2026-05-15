import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

/**
 * PUBLIC ROUTES
 * These routes allow the main website to fetch and display your portfolio.
 * No login token is required for these GET requests.
 */
router.get('/', getProjects);
router.get('/:id', getProject);

/**
 * PROTECTED ROUTES
 * Everything below this line requires the user to be logged in as an Admin.
 * This protects your data from being changed by unauthorized users.
 */
router.use(protect);

// @route   POST /api/projects
// @desc    Create new project
// @access  Private/Admin
router.post('/', authorize('admin'), createProject);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private/Admin
router.put('/:id', authorize('admin'), updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private/Admin
router.delete('/:id', authorize('admin'), deleteProject);

export default router;