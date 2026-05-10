import Service from '../models/Service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import APIError from '../utils/APIError.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import cloudinary from '../config/cloudinary.js';

/**
 * @desc    Get all services
 * @route   GET /api/services
 * @access  Public
 */
export const getServices = asyncHandler(async (req, res, next) => {
  const resPerPage = 10;
  const servicesCount = await Service.countDocuments();

  const apiFeatures = new APIFeatures(Service.find(), req.query)
    .search()
    .filter()
    .sort()
    .pagination(resPerPage);

  const services = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: services.length,
    total: servicesCount,
    data: services,
  });
});

/**
 * @desc    Get single service
 * @route   GET /api/services/:id
 * @access  Public
 */
export const getService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new APIError('Service not found', 404));
  }

  res.status(200).json({
    success: true,
    data: service,
  });
});

/**
 * @desc    Create new service (Admin)
 * @route   POST /api/services
 * @access  Private/Admin
 */
export const createService = asyncHandler(async (req, res, next) => {
  const { title, description, icon, features } = req.body;

  const service = await Service.create({
    title,
    description,
    icon,
    features,
  });

  res.status(201).json({
    success: true,
    data: service,
  });
});

/**
 * @desc    Update service (Admin)
 * @route   PUT /api/services/:id
 * @access  Private/Admin
 */
export const updateService = asyncHandler(async (req, res, next) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return next(new APIError('Service not found', 404));
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: service,
  });
});

/**
 * @desc    Delete service (Admin)
 * @route   DELETE /api/services/:id
 * @access  Private/Admin
 */
export const deleteService = asyncHandler(async (req, res, next) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    return next(new APIError('Service not found', 404));
  }

  // Delete image if exists
  if (service.image && service.image.public_id) {
    await cloudinary.uploader.destroy(service.image.public_id);
  }

  res.status(200).json({
    success: true,
    message: 'Service deleted successfully',
  });
});

/**
 * @desc    Upload service image
 * @route   POST /api/services/:id/upload
 * @access  Private/Admin
 */
export const uploadServiceImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new APIError('Please provide an image', 400));
  }

  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new APIError('Service not found', 404));
  }

  try {
    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    );

    // Delete old image
    if (service.image && service.image.public_id) {
      await cloudinary.uploader.destroy(service.image.public_id);
    }

    service.image = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    await service.save();

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    return next(new APIError(error.message, 500));
  }
});

export default {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  uploadServiceImage,
};
