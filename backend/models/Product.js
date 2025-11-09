import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tên sản phẩm là bắt buộc'],
      trim: true,
    },
    slug: {
      type: String,
      required: false, // Sẽ được tự động tạo từ name nếu không có
      unique: true,
      sparse: true, // Cho phép nhiều document không có slug (chỉ unique khi có giá trị)
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false, // Không bắt buộc, có thể cập nhật sau
    },
    type: {
      type: String,
      enum: ['fresh', 'dried', 'powder'],
      required: [true, 'Loại sản phẩm là bắt buộc'],
    },
    description: {
      type: String,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    images: [
      {
        type: String,
      },
    ],
    features: [
      {
        type: String,
      },
    ],
    exportInfo: {
      variety: String,
      weight: String,
      packaging: String,
      condition: String,
    },
    companyIntro: {
      type: String,
      trim: true,
    },
    qualityDescription: {
      type: String,
      trim: true,
    },
    qualityImage: {
      type: String,
      default: '',
    },
    certifications: {
      haccp: {
        type: Boolean,
        default: false,
      },
      globalgap: {
        type: Boolean,
        default: false,
      },
      vietgap: {
        type: Boolean,
        default: false,
      },
      co: String, // Certificate of Origin forms
    },
    markets: [
      {
        type: String,
      },
    ],
    supplyCapacity: {
      type: String,
      trim: true,
    },
    detailedInfo: {
      brand: String,
      origin: String,
      fruitType: String,
      storageInstructions: String,
    },
    fullDescription: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: 'kg',
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    note: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Tạo slug tự động từ name nếu không có
productSchema.pre('save', async function (next) {
  // Nếu không có slug hoặc slug bị thay đổi và rỗng
  if (!this.slug || this.slug === '') {
    let baseSlug = this.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Đảm bảo slug là unique
    let slug = baseSlug;
    let counter = 1;
    const Product = mongoose.model('Product');
    
    while (await Product.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = slug;
  } else {
    // Nếu có slug, đảm bảo format đúng
    this.slug = this.slug
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Index để tìm kiếm nhanh
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ type: 1, isActive: 1 });
productSchema.index({ type: 1, category: 1, isActive: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;

