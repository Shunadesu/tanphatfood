import NewsCategory from '../models/NewsCategory.js';

// @desc    Lấy tất cả danh mục tin tức
// @route   GET /api/news-categories
// @access  Public
export const getAllNewsCategories = async (req, res) => {
  try {
    const { isActive } = req.query;
    const query = {};
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const categories = await NewsCategory.find(query)
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách danh mục tin tức',
      error: error.message,
    });
  }
};

// @desc    Lấy một danh mục tin tức theo ID
// @route   GET /api/news-categories/:id
// @access  Public
export const getNewsCategoryById = async (req, res) => {
  try {
    const category = await NewsCategory.findById(req.params.id).select('-__v');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục tin tức',
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin danh mục tin tức',
      error: error.message,
    });
  }
};

// @desc    Tạo danh mục tin tức mới
// @route   POST /api/news-categories
// @access  Private
export const createNewsCategory = async (req, res) => {
  try {
    const { name, description, image, order, isActive } = req.body;

    // Kiểm tra danh mục đã tồn tại chưa
    const existingCategory = await NewsCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Danh mục tin tức đã tồn tại',
      });
    }

    const category = await NewsCategory.create({
      name,
      description,
      image,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      message: 'Tạo danh mục tin tức thành công',
      data: category,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo danh mục tin tức',
      error: error.message,
    });
  }
};

// @desc    Cập nhật danh mục tin tức
// @route   PUT /api/news-categories/:id
// @access  Private
export const updateNewsCategory = async (req, res) => {
  try {
    const { name, description, image, order, isActive } = req.body;

    // Kiểm tra danh mục có tồn tại không
    let category = await NewsCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục tin tức',
      });
    }

    // Kiểm tra nếu đổi tên thì có trùng không
    if (name && name !== category.name) {
      const existingCategory = await NewsCategory.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Tên danh mục tin tức đã tồn tại',
        });
      }
    }

    // Cập nhật thông tin
    if (name) category.name = name;
    if (description !== undefined) category.description = description;
    if (image !== undefined) category.image = image;
    if (order !== undefined) category.order = order;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();

    res.status(200).json({
      success: true,
      message: 'Cập nhật danh mục tin tức thành công',
      data: category,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật danh mục tin tức',
      error: error.message,
    });
  }
};

// @desc    Xóa danh mục tin tức
// @route   DELETE /api/news-categories/:id
// @access  Private
export const deleteNewsCategory = async (req, res) => {
  try {
    const category = await NewsCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục tin tức',
      });
    }

    // Kiểm tra xem có tin tức nào thuộc danh mục này không
    const News = (await import('../models/News.js')).default;
    const newsCount = await News.countDocuments({ category: category._id });

    if (newsCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Không thể xóa danh mục. Còn ${newsCount} tin tức trong danh mục này.`,
      });
    }

    await NewsCategory.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Xóa danh mục tin tức thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa danh mục tin tức',
      error: error.message,
    });
  }
};

