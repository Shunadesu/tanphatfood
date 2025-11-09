import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// Multer config
const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ chấp nhận file ảnh'), false);
    }
  },
});

// Upload buffer lên Cloudinary - đơn giản nhất
export const uploadBufferToCloudinary = async (buffer, folder, mimeType) => {
  // Đảm bảo config được set mỗi lần upload
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const base64 = buffer.toString('base64');
  const dataUri = `data:${mimeType};base64,${base64}`;
  
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: folder,
  });
  
  return result;
};

// Upload nhiều ảnh
export const uploadMultipleToCloudinary = async (buffers, folder, mimeTypes) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const uploads = buffers.map((buffer, index) => {
    const base64 = buffer.toString('base64');
    const dataUri = `data:${mimeTypes[index]};base64,${base64}`;
    return cloudinary.uploader.upload(dataUri, { folder });
  });
  
  return Promise.all(uploads);
};

// Xóa ảnh
export const deleteFromCloudinary = async (publicId) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return cloudinary.uploader.destroy(publicId);
};

export { cloudinary };
