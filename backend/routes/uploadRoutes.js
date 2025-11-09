import express from 'express';
import { upload } from '../config/cloudinary.js';
import {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  uploadBase64Image,
} from '../controllers/uploadController.js';

const router = express.Router();

// Upload một ảnh
// Multer middleware sẽ parse multipart/form-data và đặt file vào req.file
router.post('/', upload.single('image'), uploadImage);

// Upload nhiều ảnh
router.post('/multiple', upload.array('images', 10), uploadMultipleImages);

// Upload ảnh từ base64
router.post('/base64', uploadBase64Image);

// Xóa ảnh
router.delete('/:publicId', deleteImage);

export default router;

