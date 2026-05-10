import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yanvex';

const adminProfile = {
  name: 'Yanvex Admin',
  email: 'admin@yanvex.ai',
  password: 'Admin@123',
  role: 'admin',
  isActive: true,
};

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    let user = await User.findOne({ email: adminProfile.email }).select('+password');

    if (!user) {
      user = new User(adminProfile);
      await user.save();
      console.log('Admin user created successfully.');
    } else {
      user.name = adminProfile.name;
      user.password = adminProfile.password;
      user.role = 'admin';
      user.isActive = true;
      await user.save();
      console.log('Existing admin user updated successfully.');
    }

    console.log(`Email: ${adminProfile.email}`);
    console.log(`Password: ${adminProfile.password}`);
  } catch (error) {
    console.error('Failed to create admin user:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
