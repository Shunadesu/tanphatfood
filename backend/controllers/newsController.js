import News from '../models/News.js';
import NewsCategory from '../models/NewsCategory.js';

// @desc    Lấy tất cả tin tức
// @route   GET /api/news
// @access  Public
export const getAllNews = async (req, res) => {
  try {
    const {
      category,
      isPublished,
      isFeatured,
      search,
      tag,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (isPublished !== undefined) {
      query.isPublished = isPublished === 'true';
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const news = await News.find(query)
      .populate('category', 'name slug')
      .sort({ publishedAt: -1, order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-__v -content');

    const total = await News.countDocuments(query);

    res.status(200).json({
      success: true,
      count: news.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách tin tức',
      error: error.message,
    });
  }
};

// @desc    Lấy một tin tức theo ID
// @route   GET /api/news/:id
// @access  Public
export const getNewsById = async (req, res) => {
  try {
    const { incrementView } = req.query;
    const news = await News.findById(req.params.id)
      .populate('category', 'name slug description')
      .select('-__v');

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy tin tức',
      });
    }

    // Tăng view nếu được yêu cầu
    if (incrementView === 'true') {
      await news.incrementViews();
    }

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin tin tức',
      error: error.message,
    });
  }
};

// @desc    Lấy tin tức theo slug
// @route   GET /api/news/slug/:slug
// @access  Public
export const getNewsBySlug = async (req, res) => {
  try {
    const { incrementView } = req.query;
    const news = await News.findOne({ slug: req.params.slug })
      .populate('category', 'name slug description')
      .select('-__v');

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy tin tức',
      });
    }

    // Tăng view nếu được yêu cầu
    if (incrementView === 'true') {
      await news.incrementViews();
    }

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin tin tức',
      error: error.message,
    });
  }
};

// @desc    Tạo tin tức mới
// @route   POST /api/news
// @access  Private
export const createNews = async (req, res) => {
  try {
    const {
      title,
      category,
      shortDescription,
      content,
      featuredImage,
      images,
      author,
      tags,
      publishedAt,
      isPublished,
      isFeatured,
      order,
    } = req.body;

    // Kiểm tra danh mục có tồn tại không
    const categoryExists = await NewsCategory.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy danh mục tin tức',
      });
    }

    const news = await News.create({
      title,
      category,
      shortDescription,
      content,
      featuredImage,
      images: images || [],
      author: author || 'Tấn Phát Food',
      tags: tags || [],
      publishedAt: publishedAt || new Date(),
      isPublished: isPublished !== undefined ? isPublished : false,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
      order: order || 0,
    });

    const populatedNews = await News.findById(news._id)
      .populate('category', 'name slug')
      .select('-__v');

    res.status(201).json({
      success: true,
      message: 'Tạo tin tức thành công',
      data: populatedNews,
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
      message: 'Lỗi khi tạo tin tức',
      error: error.message,
    });
  }
};

// @desc    Cập nhật tin tức
// @route   PUT /api/news/:id
// @access  Private
export const updateNews = async (req, res) => {
  try {
    let news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy tin tức',
      });
    }

    // Kiểm tra danh mục nếu có thay đổi
    if (req.body.category) {
      const categoryExists = await NewsCategory.findById(req.body.category);
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy danh mục tin tức',
        });
      }
    }

    // Cập nhật từng trường
    const fields = [
      'title',
      'category',
      'shortDescription',
      'content',
      'featuredImage',
      'images',
      'author',
      'tags',
      'publishedAt',
      'isPublished',
      'isFeatured',
      'order',
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        news[field] = req.body[field];
      }
    });

    await news.save();

    const updatedNews = await News.findById(news._id)
      .populate('category', 'name slug')
      .select('-__v');

    res.status(200).json({
      success: true,
      message: 'Cập nhật tin tức thành công',
      data: updatedNews,
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
      message: 'Lỗi khi cập nhật tin tức',
      error: error.message,
    });
  }
};

// @desc    Xóa tin tức
// @route   DELETE /api/news/:id
// @access  Private
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy tin tức',
      });
    }

    await News.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Xóa tin tức thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa tin tức',
      error: error.message,
    });
  }
};

// @desc    Lấy tin tức theo danh mục
// @route   GET /api/news/category/:categoryId
// @access  Public
export const getNewsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { isPublished, page = 1, limit = 10 } = req.query;

    const query = { category: categoryId };

    if (isPublished !== undefined) {
      query.isPublished = isPublished === 'true';
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const news = await News.find(query)
      .populate('category', 'name slug')
      .sort({ publishedAt: -1, order: 1 })
      .skip(skip)
      .limit(limitNum)
      .select('-__v -content');

    const total = await News.countDocuments(query);

    res.status(200).json({
      success: true,
      count: news.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy tin tức theo danh mục',
      error: error.message,
    });
  }
};

// @desc    Lấy tin tức nổi bật
// @route   GET /api/news/featured
// @access  Public
export const getFeaturedNews = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const limitNum = parseInt(limit);

    const news = await News.find({
      isFeatured: true,
      isPublished: true,
    })
      .populate('category', 'name slug')
      .sort({ publishedAt: -1, order: 1 })
      .limit(limitNum)
      .select('-__v -content');

    res.status(200).json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy tin tức nổi bật',
      error: error.message,
    });
  }
};

// @desc    Lấy tin tức liên quan
// @route   GET /api/news/:id/related
// @access  Public
export const getRelatedNews = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const limitNum = parseInt(limit);

    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy tin tức',
      });
    }

    const relatedNews = await News.find({
      _id: { $ne: news._id },
      category: news.category,
      isPublished: true,
    })
      .populate('category', 'name slug')
      .sort({ publishedAt: -1 })
      .limit(limitNum)
      .select('-__v -content');

    res.status(200).json({
      success: true,
      count: relatedNews.length,
      data: relatedNews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy tin tức liên quan',
      error: error.message,
    });
  }
};

