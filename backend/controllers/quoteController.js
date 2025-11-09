import Quote from '../models/Quote.js';
import Product from '../models/Product.js';

// @desc    Lấy tất cả yêu cầu báo giá
// @route   GET /api/quotes
// @access  Private
export const getAllQuotes = async (req, res) => {
  try {
    const {
      status,
      isRead,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { productName: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const quotes = await Quote.find(query)
      .populate('product', 'name slug image type')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    const total = await Quote.countDocuments(query);

    res.status(200).json({
      success: true,
      count: quotes.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: quotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách yêu cầu báo giá',
      error: error.message,
    });
  }
};

// @desc    Lấy một yêu cầu báo giá theo ID
// @route   GET /api/quotes/:id
// @access  Private
export const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('product', 'name slug image type')
      .select('-__v');

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy yêu cầu báo giá',
      });
    }

    res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin yêu cầu báo giá',
      error: error.message,
    });
  }
};

// @desc    Tạo yêu cầu báo giá mới
// @route   POST /api/quotes
// @access  Public
export const createQuote = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      product,
      productName,
      message,
      quantity,
      country,
    } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Tên và email là bắt buộc',
      });
    }

    // Validate product if provided
    if (product) {
      const productExists = await Product.findById(product);
      if (!productExists) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy sản phẩm',
        });
      }
    }

    // Build quote data
    const quoteData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
    };

    if (phone && phone.trim()) {
      quoteData.phone = phone.trim();
    }

    if (company && company.trim()) {
      quoteData.company = company.trim();
    }

    if (product) {
      quoteData.product = product;
    }

    if (productName && productName.trim()) {
      quoteData.productName = productName.trim();
    }

    if (message && message.trim()) {
      quoteData.message = message.trim();
    }

    if (quantity && quantity.trim()) {
      quoteData.quantity = quantity.trim();
    }

    if (country && country.trim()) {
      quoteData.country = country.trim();
    }

    const quote = await Quote.create(quoteData);

    const populatedQuote = await Quote.findById(quote._id)
      .populate('product', 'name slug image type')
      .select('-__v');

    res.status(201).json({
      success: true,
      message: 'Gửi yêu cầu báo giá thành công',
      data: populatedQuote,
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
      message: 'Lỗi khi tạo yêu cầu báo giá',
      error: error.message,
    });
  }
};

// @desc    Cập nhật yêu cầu báo giá
// @route   PUT /api/quotes/:id
// @access  Private
export const updateQuote = async (req, res) => {
  try {
    let quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy yêu cầu báo giá',
      });
    }

    const {
      name,
      email,
      phone,
      company,
      product,
      productName,
      message,
      quantity,
      country,
      status,
      notes,
      isRead,
    } = req.body;

    // Update fields
    if (name !== undefined && name !== null) {
      quote.name = name.trim();
    }

    if (email !== undefined && email !== null) {
      quote.email = email.trim().toLowerCase();
    }

    if (phone !== undefined) {
      quote.phone = phone && phone.trim() ? phone.trim() : '';
    }

    if (company !== undefined) {
      quote.company = company && company.trim() ? company.trim() : '';
    }

    if (product !== undefined) {
      if (product === null || product === '') {
        quote.product = undefined;
      } else {
        // Validate product if provided
        const productExists = await Product.findById(product);
        if (!productExists) {
          return res.status(404).json({
            success: false,
            message: 'Không tìm thấy sản phẩm',
          });
        }
        quote.product = product;
      }
    }

    if (productName !== undefined) {
      quote.productName = productName && productName.trim() ? productName.trim() : '';
    }

    if (message !== undefined) {
      quote.message = message && message.trim() ? message.trim() : '';
    }

    if (quantity !== undefined) {
      quote.quantity = quantity && quantity.trim() ? quantity.trim() : '';
    }

    if (country !== undefined) {
      quote.country = country && country.trim() ? country.trim() : '';
    }

    if (status !== undefined) {
      quote.status = status;
    }

    if (notes !== undefined) {
      quote.notes = notes && notes.trim() ? notes.trim() : '';
    }

    if (isRead !== undefined) {
      quote.isRead = isRead;
    }

    await quote.save();

    const updatedQuote = await Quote.findById(quote._id)
      .populate('product', 'name slug image type')
      .select('-__v');

    res.status(200).json({
      success: true,
      message: 'Cập nhật yêu cầu báo giá thành công',
      data: updatedQuote,
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
      message: 'Lỗi khi cập nhật yêu cầu báo giá',
      error: error.message,
    });
  }
};

// @desc    Xóa yêu cầu báo giá
// @route   DELETE /api/quotes/:id
// @access  Private
export const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy yêu cầu báo giá',
      });
    }

    await Quote.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Xóa yêu cầu báo giá thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa yêu cầu báo giá',
      error: error.message,
    });
  }
};

// @desc    Đánh dấu đã đọc
// @route   PATCH /api/quotes/:id/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy yêu cầu báo giá',
      });
    }

    quote.isRead = true;
    await quote.save();

    res.status(200).json({
      success: true,
      message: 'Đã đánh dấu đã đọc',
      data: quote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi đánh dấu đã đọc',
      error: error.message,
    });
  }
};


