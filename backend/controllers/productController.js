import Product from '../models/Product.js';
import Category from '../models/Category.js';

// Helper function to transform product data for frontend
const transformProduct = (product) => {
  const productObj = product.toObject ? product.toObject() : product;
  
  // Handle category - can be populated object or string/ObjectId
  let categoryName = '';
  if (productObj.category) {
    if (typeof productObj.category === 'object' && productObj.category.name) {
      categoryName = productObj.category.name;
    } else if (typeof productObj.category === 'string') {
      categoryName = productObj.category;
    }
  }
  
  // Handle image - use image field or first image from images array
  let mainImage = productObj.image || '';
  if (!mainImage && productObj.images && productObj.images.length > 0) {
    mainImage = productObj.images[0];
  }
  
  // Handle images array - ensure main image is included if it exists
  let imagesArray = productObj.images || [];
  if (productObj.image && !imagesArray.includes(productObj.image)) {
    // Add main image to the beginning of images array if not already included
    imagesArray = [productObj.image, ...imagesArray];
  }
  // If no images array but has main image, create array with main image
  if (imagesArray.length === 0 && mainImage) {
    imagesArray = [mainImage];
  }
  
  // Handle specifications Map to Object
  let specificationsObj = {};
  if (productObj.specifications) {
    if (productObj.specifications instanceof Map) {
      specificationsObj = Object.fromEntries(productObj.specifications);
    } else if (typeof productObj.specifications === 'object') {
      specificationsObj = productObj.specifications;
    }
  }
  
  return {
    id: productObj._id?.toString() || productObj.id?.toString() || productObj._id || productObj.id,
    title: productObj.name || '', // Frontend uses 'title' instead of 'name'
    description: productObj.description || '',
    shortDescription: productObj.shortDescription || '',
    image: mainImage,
    slug: productObj.slug || '',
    type: productObj.type || 'fresh',
    category: categoryName,
    images: imagesArray, // Include main image in images array
    features: productObj.features || [],
    exportInfo: productObj.exportInfo || {
      variety: '',
      weight: '',
      packaging: '',
      condition: '',
    },
    companyIntro: productObj.companyIntro || '',
    qualityDescription: productObj.qualityDescription || '',
    qualityImage: productObj.qualityImage || '',
    certifications: productObj.certifications || {
      haccp: false,
      globalgap: false,
      vietgap: false,
      co: '',
    },
    markets: productObj.markets || [],
    supplyCapacity: productObj.supplyCapacity || '',
    detailedInfo: productObj.detailedInfo || {
      brand: '',
      origin: '',
      fruitType: '',
      storageInstructions: '',
    },
    fullDescription: productObj.fullDescription || '',
    price: productObj.price || 0,
    unit: productObj.unit || 'kg',
    specifications: specificationsObj,
    isActive: productObj.isActive !== undefined ? productObj.isActive : true,
    isFeatured: productObj.isFeatured !== undefined ? productObj.isFeatured : false,
    order: productObj.order || 0,
    note: productObj.note || '',
    createdAt: productObj.createdAt,
    updatedAt: productObj.updatedAt,
  };
};

// @desc    Lấy tất cả sản phẩm
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      type,
      isActive,
      isFeatured,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (type) {
      query.type = type; // 'fresh', 'dried', or 'powder'
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(query)
      .populate('category', 'name slug description')
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    const total = await Product.countDocuments(query);

    // Transform products for frontend
    const transformedProducts = products.map(transformProduct);

    res.status(200).json({
      success: true,
      count: transformedProducts.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: transformedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách sản phẩm',
      error: error.message,
    });
  }
};

// @desc    Lấy một sản phẩm theo ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug description')
      .select('-__v');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm',
      });
    }

    res.status(200).json({
      success: true,
      data: transformProduct(product),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin sản phẩm',
      error: error.message,
    });
  }
};

// @desc    Lấy sản phẩm theo slug
// @route   GET /api/products/slug/:slug
// @access  Public
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category', 'name slug description')
      .select('-__v');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm',
      });
    }

    res.status(200).json({
      success: true,
      data: transformProduct(product),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin sản phẩm',
      error: error.message,
    });
  }
};

// @desc    Tạo sản phẩm mới
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      title, // Frontend may send 'title' instead of 'name'
      slug,
      category,
      type,
      description,
      shortDescription,
      image,
      images,
      features,
      exportInfo,
      companyIntro,
      qualityDescription,
      qualityImage,
      certifications,
      markets,
      supplyCapacity,
      detailedInfo,
      fullDescription,
      price,
      unit,
      specifications,
      isActive,
      isFeatured,
      order,
      note,
    } = req.body;

    // Use title if provided, otherwise use name
    const productName = name || title;

    // Kiểm tra danh mục có tồn tại không (chỉ khi có category được gửi lên)
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy danh mục',
        });
      }
    }

    // Build product data object - only include fields that are provided
    const productData = {
      name: productName,
      type: type || 'fresh', // type is required, default to 'fresh'
    };

    // Only include optional fields if they are provided (not undefined/null/empty)
    if (slug && slug.trim()) {
      productData.slug = slug.trim();
    }

    if (category) {
      productData.category = category;
    }

    if (description && description.trim()) {
      productData.description = description.trim();
    }

    if (shortDescription && shortDescription.trim()) {
      productData.shortDescription = shortDescription.trim();
    }

    if (image && image.trim()) {
      productData.image = image.trim();
    }

    if (images && Array.isArray(images) && images.length > 0) {
      productData.images = images.filter(img => img && img.trim());
    }

    if (features && Array.isArray(features) && features.length > 0) {
      productData.features = features.filter(f => f && f.trim());
    }

    // Export Info - only include if provided and has at least one value
    if (exportInfo && typeof exportInfo === 'object') {
      const hasExportInfo = Object.values(exportInfo).some(v => v && typeof v === 'string' && v.trim());
      if (hasExportInfo) {
        productData.exportInfo = {};
        if (exportInfo.variety && typeof exportInfo.variety === 'string' && exportInfo.variety.trim()) {
          productData.exportInfo.variety = exportInfo.variety.trim();
        }
        if (exportInfo.weight && typeof exportInfo.weight === 'string' && exportInfo.weight.trim()) {
          productData.exportInfo.weight = exportInfo.weight.trim();
        }
        if (exportInfo.packaging && typeof exportInfo.packaging === 'string' && exportInfo.packaging.trim()) {
          productData.exportInfo.packaging = exportInfo.packaging.trim();
        }
        if (exportInfo.condition && typeof exportInfo.condition === 'string' && exportInfo.condition.trim()) {
          productData.exportInfo.condition = exportInfo.condition.trim();
        }
      }
    }

    if (companyIntro && companyIntro.trim()) {
      productData.companyIntro = companyIntro.trim();
    }

    if (qualityDescription && qualityDescription.trim()) {
      productData.qualityDescription = qualityDescription.trim();
    }

    if (qualityImage && qualityImage.trim()) {
      productData.qualityImage = qualityImage.trim();
    }

    // Certifications - only include if provided and has at least one value
    if (certifications && typeof certifications === 'object') {
      const hasCertifications = 
        certifications.haccp ||
        certifications.globalgap ||
        certifications.vietgap ||
        (certifications.co && typeof certifications.co === 'string' && certifications.co.trim());
      if (hasCertifications) {
        productData.certifications = {
          haccp: certifications.haccp || false,
          globalgap: certifications.globalgap || false,
          vietgap: certifications.vietgap || false,
        };
        if (certifications.co && typeof certifications.co === 'string' && certifications.co.trim()) {
          productData.certifications.co = certifications.co.trim();
        }
      }
    }

    if (markets && Array.isArray(markets) && markets.length > 0) {
      productData.markets = markets.filter(m => m && m.trim());
    }

    if (supplyCapacity && supplyCapacity.trim()) {
      productData.supplyCapacity = supplyCapacity.trim();
    }

    // Detailed Info - only include if provided and has at least one value
    if (detailedInfo && typeof detailedInfo === 'object') {
      const hasDetailedInfo = Object.values(detailedInfo).some(v => v && typeof v === 'string' && v.trim());
      if (hasDetailedInfo) {
        productData.detailedInfo = {};
        if (detailedInfo.brand && typeof detailedInfo.brand === 'string' && detailedInfo.brand.trim()) {
          productData.detailedInfo.brand = detailedInfo.brand.trim();
        }
        if (detailedInfo.origin && typeof detailedInfo.origin === 'string' && detailedInfo.origin.trim()) {
          productData.detailedInfo.origin = detailedInfo.origin.trim();
        }
        if (detailedInfo.fruitType && typeof detailedInfo.fruitType === 'string' && detailedInfo.fruitType.trim()) {
          productData.detailedInfo.fruitType = detailedInfo.fruitType.trim();
        }
        if (detailedInfo.storageInstructions && typeof detailedInfo.storageInstructions === 'string' && detailedInfo.storageInstructions.trim()) {
          productData.detailedInfo.storageInstructions = detailedInfo.storageInstructions.trim();
        }
      }
    }

    if (fullDescription && fullDescription.trim()) {
      productData.fullDescription = fullDescription.trim();
    }

    // Price and unit - include with defaults if not provided
    productData.price = price !== undefined && price !== null ? price : 0;
    productData.unit = unit && unit.trim() ? unit.trim() : 'kg';

    // Specifications - only include if provided and not empty
    if (specifications && typeof specifications === 'object' && Object.keys(specifications).length > 0) {
      const cleanedSpecs = {};
      Object.entries(specifications).forEach(([key, value]) => {
        if (key && typeof key === 'string' && key.trim() && value && typeof value === 'string' && value.trim()) {
          cleanedSpecs[key.trim()] = value.trim();
        }
      });
      if (Object.keys(cleanedSpecs).length > 0) {
        productData.specifications = cleanedSpecs;
      }
    }

    // Status fields - always include with defaults
    productData.isActive = isActive !== undefined ? isActive : true;
    productData.isFeatured = isFeatured !== undefined ? isFeatured : false;
    productData.order = order !== undefined && order !== null ? order : 0;

    if (note && note.trim()) {
      productData.note = note.trim();
    }

    const product = await Product.create(productData);

    const populatedProduct = await Product.findById(product._id)
      .populate('category', 'name slug description')
      .select('-__v');

    res.status(201).json({
      success: true,
      message: 'Tạo sản phẩm thành công',
      data: transformProduct(populatedProduct),
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
      message: 'Lỗi khi tạo sản phẩm',
      error: error.message,
    });
  }
};

// @desc    Cập nhật sản phẩm
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm',
      });
    }

    // Kiểm tra danh mục nếu có thay đổi và có giá trị
    if (req.body.category && req.body.category !== null && req.body.category !== '') {
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy danh mục',
        });
      }
    }

    // Handle 'title' field from frontend (map to 'name')
    if (req.body.title) {
      req.body.name = req.body.title;
    }

    const {
      name,
      slug,
      category,
      type,
      description,
      shortDescription,
      image,
      images,
      features,
      exportInfo,
      companyIntro,
      qualityDescription,
      qualityImage,
      certifications,
      markets,
      supplyCapacity,
      detailedInfo,
      fullDescription,
      price,
      unit,
      specifications,
      isActive,
      isFeatured,
      order,
      note,
    } = req.body;

    // Update required fields
    if (name !== undefined && name !== null) {
      product.name = name.trim();
    }

    if (type !== undefined && type !== null) {
      product.type = type;
    }

    // Update slug - if provided and not empty, update it
    if (slug !== undefined) {
      if (slug && slug.trim()) {
        product.slug = slug.trim();
      }
      // If slug is empty string, don't update (keep existing or let pre-save hook regenerate)
    }

    // Update category - can be set to null to remove
    if (category !== undefined) {
      if (category === null || category === '') {
        product.category = undefined;
      } else {
        product.category = category;
      }
    }

    // Update optional string fields - only if provided
    if (description !== undefined) {
      product.description = description && description.trim() ? description.trim() : '';
    }

    if (shortDescription !== undefined) {
      product.shortDescription = shortDescription && shortDescription.trim() ? shortDescription.trim() : '';
    }

    if (image !== undefined) {
      product.image = image && image.trim() ? image.trim() : '';
    }

    if (companyIntro !== undefined) {
      product.companyIntro = companyIntro && companyIntro.trim() ? companyIntro.trim() : '';
    }

    if (qualityDescription !== undefined) {
      product.qualityDescription = qualityDescription && qualityDescription.trim() ? qualityDescription.trim() : '';
    }

    if (qualityImage !== undefined) {
      product.qualityImage = qualityImage && qualityImage.trim() ? qualityImage.trim() : '';
    }

    if (supplyCapacity !== undefined) {
      product.supplyCapacity = supplyCapacity && supplyCapacity.trim() ? supplyCapacity.trim() : '';
    }

    if (fullDescription !== undefined) {
      product.fullDescription = fullDescription && fullDescription.trim() ? fullDescription.trim() : '';
    }

    if (note !== undefined) {
      product.note = note && note.trim() ? note.trim() : '';
    }

    // Update arrays - only if provided
    if (images !== undefined) {
      if (Array.isArray(images)) {
        product.images = images.filter(img => img && img.trim());
      } else {
        product.images = [];
      }
    }

    if (features !== undefined) {
      if (Array.isArray(features)) {
        product.features = features.filter(f => f && f.trim());
      } else {
        product.features = [];
      }
    }

    if (markets !== undefined) {
      if (Array.isArray(markets)) {
        product.markets = markets.filter(m => m && m.trim());
      } else {
        product.markets = [];
      }
    }

    // Update exportInfo - only if provided
    if (exportInfo !== undefined) {
      if (exportInfo && typeof exportInfo === 'object') {
        product.exportInfo = {};
        if (exportInfo.variety !== undefined) {
          product.exportInfo.variety = exportInfo.variety && exportInfo.variety.trim() ? exportInfo.variety.trim() : '';
        }
        if (exportInfo.weight !== undefined) {
          product.exportInfo.weight = exportInfo.weight && exportInfo.weight.trim() ? exportInfo.weight.trim() : '';
        }
        if (exportInfo.packaging !== undefined) {
          product.exportInfo.packaging = exportInfo.packaging && exportInfo.packaging.trim() ? exportInfo.packaging.trim() : '';
        }
        if (exportInfo.condition !== undefined) {
          product.exportInfo.condition = exportInfo.condition && exportInfo.condition.trim() ? exportInfo.condition.trim() : '';
        }
      } else {
        product.exportInfo = {};
      }
    }

    // Update certifications - only if provided
    if (certifications !== undefined) {
      if (certifications && typeof certifications === 'object') {
        product.certifications = {
          haccp: certifications.haccp !== undefined ? certifications.haccp : false,
          globalgap: certifications.globalgap !== undefined ? certifications.globalgap : false,
          vietgap: certifications.vietgap !== undefined ? certifications.vietgap : false,
        };
        if (certifications.co !== undefined) {
          if (certifications.co && certifications.co.trim()) {
            product.certifications.co = certifications.co.trim();
          } else {
            // Remove co field if empty
            product.certifications.co = undefined;
          }
        }
      } else {
        product.certifications = {
          haccp: false,
          globalgap: false,
          vietgap: false,
        };
      }
    }

    // Update detailedInfo - only if provided
    if (detailedInfo !== undefined) {
      if (detailedInfo && typeof detailedInfo === 'object') {
        product.detailedInfo = {};
        if (detailedInfo.brand !== undefined) {
          product.detailedInfo.brand = detailedInfo.brand && detailedInfo.brand.trim() ? detailedInfo.brand.trim() : '';
        }
        if (detailedInfo.origin !== undefined) {
          product.detailedInfo.origin = detailedInfo.origin && detailedInfo.origin.trim() ? detailedInfo.origin.trim() : '';
        }
        if (detailedInfo.fruitType !== undefined) {
          product.detailedInfo.fruitType = detailedInfo.fruitType && detailedInfo.fruitType.trim() ? detailedInfo.fruitType.trim() : '';
        }
        if (detailedInfo.storageInstructions !== undefined) {
          product.detailedInfo.storageInstructions = detailedInfo.storageInstructions && detailedInfo.storageInstructions.trim() ? detailedInfo.storageInstructions.trim() : '';
        }
      } else {
        product.detailedInfo = {};
      }
    }

    // Update specifications - only if provided
    if (specifications !== undefined) {
      if (specifications && typeof specifications === 'object' && Object.keys(specifications).length > 0) {
        const cleanedSpecs = {};
        Object.entries(specifications).forEach(([key, value]) => {
          if (key && typeof key === 'string' && key.trim() && value && typeof value === 'string' && value.trim()) {
            cleanedSpecs[key.trim()] = value.trim();
          }
        });
        product.specifications = cleanedSpecs;
      } else {
        product.specifications = {};
      }
    }

    // Update price and unit - only if provided
    if (price !== undefined && price !== null) {
      product.price = price;
    }

    if (unit !== undefined) {
      product.unit = unit && unit.trim() ? unit.trim() : 'kg';
    }

    // Update status fields - only if provided
    if (isActive !== undefined) {
      product.isActive = isActive;
    }

    if (isFeatured !== undefined) {
      product.isFeatured = isFeatured;
    }

    if (order !== undefined && order !== null) {
      product.order = order;
    }

    await product.save();

    const updatedProduct = await Product.findById(product._id)
      .populate('category', 'name slug description')
      .select('-__v');

    res.status(200).json({
      success: true,
      message: 'Cập nhật sản phẩm thành công',
      data: transformProduct(updatedProduct),
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
      message: 'Lỗi khi cập nhật sản phẩm',
      error: error.message,
    });
  }
};

// @desc    Xóa sản phẩm
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm',
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Xóa sản phẩm thành công',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa sản phẩm',
      error: error.message,
    });
  }
};

// @desc    Lấy sản phẩm theo danh mục
// @route   GET /api/products/category/:categoryId
// @access  Public
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { isActive, type, page = 1, limit = 10 } = req.query;

    const query = { category: categoryId };

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (type) {
      query.type = type;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(query)
      .populate('category', 'name slug description')
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    const total = await Product.countDocuments(query);

    // Transform products for frontend
    const transformedProducts = products.map(transformProduct);

    res.status(200).json({
      success: true,
      count: transformedProducts.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: transformedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy sản phẩm theo danh mục',
      error: error.message,
    });
  }
};

// @desc    Lấy sản phẩm theo type (fresh, dried, powder)
// @route   GET /api/products/type/:type
// @access  Public
export const getProductsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { isActive, category, page = 1, limit = 10 } = req.query;

    // Validate type
    if (!['fresh', 'dried', 'powder'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Loại sản phẩm không hợp lệ. Phải là: fresh, dried, hoặc powder',
      });
    }

    const query = { type };

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (category) {
      query.category = category;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find(query)
      .populate('category', 'name slug description')
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    const total = await Product.countDocuments(query);

    // Transform products for frontend
    const transformedProducts = products.map(transformProduct);

    res.status(200).json({
      success: true,
      count: transformedProducts.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: transformedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy sản phẩm theo loại',
      error: error.message,
    });
  }
};

