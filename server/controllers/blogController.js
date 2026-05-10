import Blog from '../models/Blog.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import APIError from '../utils/APIError.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import cloudinary from '../config/cloudinary.js';

/**
 * @desc    Get published blogs
 * @route   GET /api/blogs
 * @access  Public
 */
export const getBlogs = asyncHandler(async (req, res, next) => {
  const resPerPage = 10;
  const blogsCount = await Blog.countDocuments({ published: true, isActive: true });

  const apiFeatures = new APIFeatures(Blog.find({ published: true, isActive: true }), req.query)
    .search(['title', 'excerpt', 'content'])
    .filter()
    .sort()
    .pagination(resPerPage);

  const blogs = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: blogs.length,
    total: blogsCount,
    data: blogs,
  });
});

/**
 * @desc    Get single blog by id
 * @route   GET /api/blogs/:id
 * @access  Public
 */
export const getBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'name email');

  if (!blog || !blog.published || !blog.isActive) {
    return next(new APIError('Blog post not found', 404));
  }

  blog.views += 1;
  await blog.save();

  res.status(200).json({
    success: true,
    data: blog,
  });
});

/**
 * @desc    Create new blog post (Admin)
 * @route   POST /api/blogs
 * @access  Private/Admin
 */
export const createBlog = asyncHandler(async (req, res, next) => {
  const { title, content, excerpt, tags, category, published } = req.body;

  const blog = await Blog.create({
    title,
    content,
    excerpt,
    tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
    category,
    published,
    author: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: blog,
  });
});

/**
 * @desc    Update blog post (Admin)
 * @route   PUT /api/blogs/:id
 * @access  Private/Admin
 */
export const updateBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new APIError('Blog post not found', 404));
  }

  if (req.body.tags && typeof req.body.tags === 'string') {
    req.body.tags = req.body.tags.split(',').map((tag) => tag.trim());
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: updatedBlog,
  });
});

/**
 * @desc    Delete blog post (Admin)
 * @route   DELETE /api/blogs/:id
 * @access  Private/Admin
 */
export const deleteBlog = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    return next(new APIError('Blog post not found', 404));
  }

  if (blog.coverImage && blog.coverImage.public_id) {
    await cloudinary.uploader.destroy(blog.coverImage.public_id);
  }

  res.status(200).json({
    success: true,
    message: 'Blog post deleted successfully',
  });
});

/**
 * @desc    Upload blog cover image (Admin)
 * @route   POST /api/blogs/:id/cover
 * @access  Private/Admin
 */
export const uploadBlogCover = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new APIError('Please provide an image', 400));
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new APIError('Blog post not found', 404));
  }

  try {
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    );

    if (blog.coverImage && blog.coverImage.public_id) {
      await cloudinary.uploader.destroy(blog.coverImage.public_id);
    }

    blog.coverImage = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    await blog.save();

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return next(new APIError(error.message, 500));
  }
});

export default {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogCover,
};
