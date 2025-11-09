import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Tiêu đề tin tức là bắt buộc'],
      trim: true,
    },
    slug: {
      type: String,
      required: false, // Sẽ được tự động tạo từ title nếu không có
      unique: true,
      sparse: true, // Cho phép nhiều document không có slug (chỉ unique khi có giá trị)
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NewsCategory',
      required: false, // Không bắt buộc, có thể cập nhật sau
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: false, // Không bắt buộc, có thể tạo draft trước
    },
    featuredImage: {
      type: String,
      default: '',
    },
    images: [
      {
        type: String,
      },
    ],
    author: {
      type: String,
      default: 'Tấn Phát Food',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Tạo slug tự động từ title nếu không có
newsSchema.pre('save', async function (next) {
  // Nếu không có slug hoặc slug bị thay đổi và rỗng
  if (!this.slug || this.slug === '') {
    let baseSlug = this.title
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
    const News = mongoose.model('News');
    
    while (await News.findOne({ slug, _id: { $ne: this._id } })) {
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

// Tăng view khi xem bài viết
newsSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

// Index để tìm kiếm nhanh
newsSchema.index({ category: 1, isPublished: 1, publishedAt: -1 });
newsSchema.index({ slug: 1 });
newsSchema.index({ tags: 1 });
newsSchema.index({ title: 'text', content: 'text' });

const News = mongoose.model('News', newsSchema);

export default News;

