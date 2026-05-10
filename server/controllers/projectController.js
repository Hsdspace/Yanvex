import Project from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import APIError from '../utils/APIError.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import cloudinary from '../config/cloudinary.js';

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Public
 */
export const getProjects = asyncHandler(async (req, res, next) => {
  const resPerPage = 10;
  const projectsCount = await Project.countDocuments();

  const apiFeatures = new APIFeatures(Project.find(), req.query)
    .search()
    .filter()
    .sort()
    .pagination(resPerPage);

  const projects = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: projects.length,
    total: projectsCount,
    data: projects,
  });
});

/**
 * @desc    Get single project
 * @route   GET /api/projects/:id
 * @access  Public
 */
export const getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new APIError('Project not found', 404));
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

/**
 * @desc    Create new project (Admin)
 * @route   POST /api/projects
 * @access  Private/Admin
 */
export const createProject = asyncHandler(async (req, res, next) => {
  const { title, category, description, technologies, liveLink, githubLink, featured } = req.body;

  const project = await Project.create({
    title,
    category,
    description,
    technologies: technologies ? technologies.split(',').map(t => t.trim()) : [],
    liveLink,
    githubLink,
    featured,
  });

  res.status(201).json({
    success: true,
    data: project,
  });
});

/**
 * @desc    Update project (Admin)
 * @route   PUT /api/projects/:id
 * @access  Private/Admin
 */
export const updateProject = asyncHandler(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return next(new APIError('Project not found', 404));
  }

  if (req.body.technologies && typeof req.body.technologies === 'string') {
    req.body.technologies = req.body.technologies.split(',').map(t => t.trim());
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: project,
  });
});

/**
 * @desc    Delete project (Admin)
 * @route   DELETE /api/projects/:id
 * @access  Private/Admin
 */
export const deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return next(new APIError('Project not found', 404));
  }

  // Delete thumbnail if exists
  if (project.thumbnail && project.thumbnail.public_id) {
    await cloudinary.uploader.destroy(project.thumbnail.public_id);
  }

  // Delete gallery images
  if (project.gallery && project.gallery.length > 0) {
    for (const image of project.gallery) {
      if (image.public_id) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }
  }

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
  });
});

/**
 * @desc    Upload project thumbnail
 * @route   POST /api/projects/:id/thumbnail
 * @access  Private/Admin
 */
export const uploadThumbnail = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new APIError('Please provide an image', 400));
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new APIError('Project not found', 404));
  }

  try {
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    );

    if (project.thumbnail && project.thumbnail.public_id) {
      await cloudinary.uploader.destroy(project.thumbnail.public_id);
    }

    project.thumbnail = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    await project.save();

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return next(new APIError(error.message, 500));
  }
});

export default {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadThumbnail,
};
