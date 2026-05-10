import multer from 'multer';
import path from 'path';

/**
 * Configure Multer for file uploads
 */
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

/**
 * Upload single file
 */
export const uploadSingle = upload.single('file');

/**
 * Upload multiple files
 */
export const uploadMultiple = upload.array('files', 5);

export default upload;
