import {
  uploadBufferToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
  cloudinary,
} from '../config/cloudinary.js';

// Upload một ảnh
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn file ảnh',
      });
    }

    const folder = req.query.folder || 'products';
    const cloudinaryFolder = `tanphatfood/${folder}`;

    const result = await uploadBufferToCloudinary(
      req.file.buffer,
      cloudinaryFolder,
      req.file.mimetype
    );

    res.json({
      success: true,
      message: 'Upload thành công',
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi upload ảnh',
      error: error.message,
    });
  }
};

// Upload nhiều ảnh
export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn ít nhất một file',
      });
    }

    const folder = req.query.folder || 'products';
    const cloudinaryFolder = `tanphatfood/${folder}`;

    const buffers = req.files.map(f => f.buffer);
    const mimeTypes = req.files.map(f => f.mimetype);

    const results = await uploadMultipleToCloudinary(buffers, cloudinaryFolder, mimeTypes);

    res.json({
      success: true,
      message: `Upload thành công ${results.length} ảnh`,
      data: results.map(r => ({
        url: r.secure_url,
        public_id: r.public_id,
        secure_url: r.secure_url,
      })),
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi upload ảnh',
      error: error.message,
    });
  }
};

// Xóa ảnh
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;
    const result = await deleteFromCloudinary(publicId);
    res.json({
      success: true,
      message: 'Xóa ảnh thành công',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa ảnh',
      error: error.message,
    });
  }
};

// Upload base64 (nếu cần)
export const uploadBase64Image = async (req, res) => {
  try {
    const { image, folder } = req.body;
    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp ảnh base64',
      });
    }

    const uploadFolder = folder ? `tanphatfood/${folder}` : 'tanphatfood';
    const result = await cloudinary.uploader.upload(image, { folder: uploadFolder });

    res.json({
      success: true,
      message: 'Upload thành công',
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi upload ảnh',
      error: error.message,
    });
  }
};
