import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Readable } from 'stream';

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Sử dụng memory storage để lưu file tạm trong bộ nhớ
const storage = multer.memoryStorage();

// Tạo multer upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    // Kiểm tra định dạng file
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/webp'
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Chỉ chấp nhận file ảnh định dạng: jpeg, jpg, png, gif, webp'
        ),
        false
      );
    }
  },
});

// Helper function để upload buffer lên Cloudinary
export const uploadBufferToCloudinary = async (buffer, folder = 'tanphatfood', publicId = null) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [
          {
            width: 1200,
            height: 1200,
            crop: 'limit',
            quality: 'auto',
          },
        ],
        public_id: publicId,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

// Helper function để upload ảnh trực tiếp lên Cloudinary (không dùng multer)
export const uploadToCloudinary = async (file, folder = 'tanphatfood') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [
        {
          width: 1200,
          height: 1200,
          crop: 'limit',
          quality: 'auto',
        },
      ],
    });
    return result;
  } catch (error) {
    throw new Error(`Lỗi upload ảnh: ${error.message}`);
  }
};

// Helper function để xóa ảnh từ Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Lỗi xóa ảnh: ${error.message}`);
  }
};

// Helper function để lấy URL từ public_id
export const getCloudinaryUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, options);
};

export { cloudinary, upload };

