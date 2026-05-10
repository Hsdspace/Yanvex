import mongoose from 'mongoose';

/**
 * Project Model
 */
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Machine Learning', 'NLP', 'Vision AI', 'Cloud', 'Automation', 'Analytics'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    technologies: [
      {
        type: String,
      },
    ],
    thumbnail: {
      public_id: String,
      url: String,
    },
    gallery: [
      {
        public_id: String,
        url: String,
      },
    ],
    liveLink: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please provide a valid URL',
      ],
    },
    githubLink: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please provide a valid URL',
      ],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Generate slug before saving
projectSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

export default mongoose.model('Project', projectSchema);
