import Banner from '../models/Banner.js';

// @desc    Lấy tất cả banner
// @route   GET /api/banners
// @access  Public
export const getAllBanners = async (req, res) => {
  try {
    const {
      page: pageParam,
      isActive,
      page: pageType,
    } = req.query;

    const query = {};

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (pageType) {
      query.page = pageType;
    }

    const banners = await Banner.find(query)
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');

    // Transform banners to include id field
    const transformedBanners = banners.map((banner) => {
      const bannerObj = banner.toObject();
      return {
        ...bannerObj,
        id: bannerObj._id.toString(),
      };
    });

    res.status(200).json({
      success: true,
      count: transformedBanners.length,
      data: transformedBanners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách banner',
      error: error.message,
    });
  }
};

// @desc    Lấy banner theo ID
// @route   GET /api/banners/:id
// @access  Public
export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id).select('-__v');

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy banner',
      });
    }

    // Transform banner to include id field
    const bannerObj = banner.toObject();
    const transformedBanner = {
      ...bannerObj,
      id: bannerObj._id.toString(),
    };

    res.status(200).json({
      success: true,
      data: transformedBanner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin banner',
      error: error.message,
    });
  }
};

// @desc    Lấy banner theo page
// @route   GET /api/banners/page/:page
// @access  Public
export const getBannerByPage = async (req, res) => {
  try {
    const { page } = req.params;

    const banner = await Banner.findOne({
      page,
      isActive: true,
    })
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy banner cho trang này',
      });
    }

    // Transform banner to include id field
    const bannerObj = banner.toObject();
    const transformedBanner = {
      ...bannerObj,
      id: bannerObj._id.toString(),
    };

    res.status(200).json({
      success: true,
      data: transformedBanner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy banner theo trang',
      error: error.message,
    });
  }
};

// @desc    Tạo banner mới
// @route   POST /api/banners
// @access  Private
export const createBanner = async (req, res) => {
  try {
    const {
      name,
      slug,
      image,
      page,
      title,
      subtitle,
      order,
      isActive,
    } = req.body;

    // Validate required fields
    if (!name || !image || !page) {
      return res.status(400).json({
        success: false,
        message: 'Tên, ảnh và trang hiển thị là bắt buộc',
      });
    }

    // Validate page value
    const validPages = ['home', 'about', 'products', 'products-fresh', 'products-dried', 'products-powder', 'handbook', 'contact', 'news'];
    if (!validPages.includes(page)) {
      return res.status(400).json({
        success: false,
        message: 'Trang hiển thị không hợp lệ',
      });
    }

    const bannerData = {
      name: name.trim(),
      image: image.trim(),
      page,
    };

    if (slug && slug.trim()) {
      bannerData.slug = slug.trim().toLowerCase();
    }

    if (title && title.trim()) {
      bannerData.title = title.trim();
    }

    if (subtitle && subtitle.trim()) {
      bannerData.subtitle = subtitle.trim();
    }

    if (order !== undefined) {
      bannerData.order = parseInt(order) || 0;
    }

    if (isActive !== undefined) {
      bannerData.isActive = isActive;
    }

    const banner = await Banner.create(bannerData);

    // Transform banner to include id field
    const bannerObj = banner.toObject();
    const transformedBanner = {
      ...bannerObj,
      id: bannerObj._id.toString(),
    };

    res.status(201).json({
      success: true,
      message: 'Tạo banner thành công',
      data: transformedBanner,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Slug đã tồn tại',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo banner',
      error: error.message,
    });
  }
};

// @desc    Cập nhật banner
// @route   PUT /api/banners/:id
// @access  Private
export const updateBanner = async (req, res) => {
  try {
    let banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy banner',
      });
    }

    const {
      name,
      slug,
      image,
      page,
      title,
      subtitle,
      order,
      isActive,
    } = req.body;

    // Update fields
    if (name !== undefined && name !== null) {
      banner.name = name.trim();
    }

    if (slug !== undefined) {
      banner.slug = slug && slug.trim() ? slug.trim().toLowerCase() : undefined;
    }

    if (image !== undefined && image !== null) {
      banner.image = image.trim();
    }

    if (page !== undefined && page !== null) {
      // Validate page value
      const validPages = ['home', 'about', 'products', 'products-fresh', 'products-dried', 'products-powder', 'handbook', 'contact', 'news'];
      if (!validPages.includes(page)) {
        return res.status(400).json({
          success: false,
          message: 'Trang hiển thị không hợp lệ',
        });
      }
      banner.page = page;
    }

    if (title !== undefined) {
      banner.title = title && title.trim() ? title.trim() : '';
    }

    if (subtitle !== undefined) {
      banner.subtitle = subtitle && subtitle.trim() ? subtitle.trim() : '';
    }

    if (order !== undefined) {
      banner.order = parseInt(order) || 0;
    }

    if (isActive !== undefined) {
      banner.isActive = isActive;
    }

    await banner.save();

    // Transform banner to include id field
    const bannerObj = banner.toObject();
    const transformedBanner = {
      ...bannerObj,
      id: bannerObj._id.toString(),
    };

    res.status(200).json({
      success: true,
      message: 'Cập nhật banner thành công',
      data: transformedBanner,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Slug đã tồn tại',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật banner',
      error: error.message,
    });
  }
};

// @desc    Xóa banner
// @route   DELETE /api/banners/:id
// @access  Private
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy banner',
      });
    }

    await Banner.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Xóa banner thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa banner',
      error: error.message,
    });
  }
};

