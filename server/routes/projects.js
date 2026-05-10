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

// All routes require authentication
router.use(protect);

// @route   GET /api/projects
// @desc    Get all projects
// @access  Private
router.get('/', getProjects);

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Private
router.get('/:id', getProject);

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