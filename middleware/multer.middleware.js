// middleware/multer.middleware.js
import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fieldSize: 25 * 1024 * 1024, // 25MB text field limit
    fileSize: 25 * 1024 * 1024,  // 25MB file limit
  },
});