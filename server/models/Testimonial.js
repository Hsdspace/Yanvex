import mongoose from 'mongoose';

/**
 * Testimonial Model
 */
const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, 'Please provide a designation'],
      trim: true,
    },
    image: {
      public_id: String,
      url: String,
    },
    review: {
      type: String,
      required: [true, 'Please provide a review'],
      minlength: [20, 'Review must be at least 20 characters'],
      maxlength: [1000, 'Review cannot exceed 1000 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: 1,
      max: 5,
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

export default mongoose.model('Testimonial', testimonialSchema);
