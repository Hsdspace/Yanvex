import mongoose from 'mongoose';

/**
 * User Model - For authentication
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Don't select by default
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: {
      public_id: String,
      url: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const bcrypt = await import('bcryptjs');
  const salt = await bcrypt.default.genSalt(10);
  this.password = await bcrypt.default.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.matchPassword = async function (password) {
  const bcrypt = await import('bcryptjs');
  return await bcrypt.default.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
