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
      slug,
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

    // Kiểm tra danh mục có tồn tại không (chỉ khi có category được gửi lên)
    if (category) {
      const categoryExists = await NewsCategory.findById(category);
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy danh mục tin tức',
        });
      }
    }

    // Build news data object - only include fields that are provided
    const newsData = {
      title: title || '',
    };

    // Only include optional fields if they are provided
    if (slug && slug.trim()) {
      newsData.slug = slug.trim();
    }

    if (category) {
      newsData.category = category;
    }

    if (shortDescription !== undefined) {
      newsData.shortDescription = shortDescription && shortDescription.trim() ? shortDescription.trim() : '';
    }

    if (content !== undefined) {
      newsData.content = content && content.trim() ? content.trim() : '';
    }

    if (featuredImage && featuredImage.trim()) {
      newsData.featuredImage = featuredImage.trim();
    }

    if (images && Array.isArray(images) && images.length > 0) {
      newsData.images = images.filter(img => img && img.trim());
    }

    if (author && author.trim()) {
      newsData.author = author.trim();
    } else {
      newsData.author = 'Tấn Phát Food';
    }

    if (tags && Array.isArray(tags) && tags.length > 0) {
      newsData.tags = tags.filter(tag => tag && tag.trim());
    }

    if (publishedAt) {
      newsData.publishedAt = publishedAt;
    } else {
      newsData.publishedAt = new Date();
    }

    // Status fields - always include with defaults
    newsData.isPublished = isPublished !== undefined ? isPublished : false;
    newsData.isFeatured = isFeatured !== undefined ? isFeatured : false;
    newsData.order = order !== undefined && order !== null ? order : 0;

    const news = await News.create(newsData);

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

    const {
      title,
      slug,
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

    // Kiểm tra danh mục nếu có thay đổi và có giá trị
    if (category && category !== null && category !== '') {
      const categoryExists = await NewsCategory.findById(category);
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy danh mục tin tức',
        });
      }
    }

    // Update required fields
    if (title !== undefined && title !== null) {
      news.title = title.trim();
    }

    // Update slug - if provided and not empty, update it
    if (slug !== undefined) {
      if (slug && slug.trim()) {
        news.slug = slug.trim();
      }
      // If slug is empty string, don't update (keep existing or let pre-save hook regenerate)
    }

    // Update category - can be set to null to remove
    if (category !== undefined) {
      if (category === null || category === '') {
        news.category = undefined;
      } else {
        news.category = category;
      }
    }

    // Update optional fields - only if provided
    if (shortDescription !== undefined) {
      news.shortDescription = shortDescription && shortDescription.trim() ? shortDescription.trim() : '';
    }

    if (content !== undefined) {
      news.content = content && content.trim() ? content.trim() : '';
    }

    if (featuredImage !== undefined) {
      news.featuredImage = featuredImage && featuredImage.trim() ? featuredImage.trim() : '';
    }

    // Update arrays - only if provided
    if (images !== undefined) {
      if (Array.isArray(images)) {
        news.images = images.filter(img => img && img.trim());
      } else {
        news.images = [];
      }
    }

    if (tags !== undefined) {
      if (Array.isArray(tags)) {
        news.tags = tags.filter(tag => tag && tag.trim());
      } else {
        news.tags = [];
      }
    }

    if (author !== undefined) {
      news.author = author && author.trim() ? author.trim() : 'Tấn Phát Food';
    }

    if (publishedAt !== undefined) {
      news.publishedAt = publishedAt || new Date();
    }

    // Update status fields - only if provided
    if (isPublished !== undefined) {
      news.isPublished = isPublished;
    }

    if (isFeatured !== undefined) {
      news.isFeatured = isFeatured;
    }

    if (order !== undefined && order !== null) {
      news.order = order;
    }

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

