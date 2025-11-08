import {
  uploadBufferToCloudinary,
  uploadToCloudinary,
  deleteFromCloudinary,
} from '../config/cloudinary.js';

// @desc    Upload một ảnh
// @route   POST /api/upload
// @access  Private
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn file ảnh để upload',
      });
    }

    // Xác định folder dựa trên query params
    const folder = req.query.folder || 'tanphatfood';
    const fullFolder = folder.startsWith('tanphatfood')
      ? folder
      : `tanphatfood/${folder}`;

    // Upload buffer lên Cloudinary
    const result = await uploadBufferToCloudinary(
      req.file.buffer,
      fullFolder
    );

    res.status(200).json({
      success: true,
      message: 'Upload ảnh thành công',
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        folder: result.folder,
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

// @desc    Upload nhiều ảnh
// @route   POST /api/upload/multiple
// @access  Private
export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn ít nhất một file ảnh để upload',
      });
    }

    // Xác định folder dựa trên query params
    const folder = req.query.folder || 'tanphatfood';
    const fullFolder = folder.startsWith('tanphatfood')
      ? folder
      : `tanphatfood/${folder}`;

    // Upload tất cả ảnh lên Cloudinary
    const uploadPromises = req.files.map((file) =>
      uploadBufferToCloudinary(file.buffer, fullFolder)
    );

    const results = await Promise.all(uploadPromises);

    const uploadedFiles = results.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      folder: result.folder,
    }));

    res.status(200).json({
      success: true,
      message: `Upload thành công ${uploadedFiles.length} ảnh`,
      count: uploadedFiles.length,
      data: uploadedFiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi upload ảnh',
      error: error.message,
    });
  }
};

// @desc    Xóa ảnh từ Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp public_id của ảnh',
      });
    }

    const result = await deleteFromCloudinary(publicId);

    if (result.result === 'not found') {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy ảnh để xóa',
      });
    }

    res.status(200).json({
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

// @desc    Upload ảnh từ base64
// @route   POST /api/upload/base64
// @access  Private
export const uploadBase64Image = async (req, res) => {
  try {
    const { image, folder } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp ảnh dạng base64',
      });
    }

    const uploadFolder = folder || 'tanphatfood';
    const result = await uploadToCloudinary(image, uploadFolder);

    res.status(200).json({
      success: true,
      message: 'Upload ảnh thành công',
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
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

