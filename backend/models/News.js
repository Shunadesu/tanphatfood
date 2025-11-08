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
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NewsCategory',
      required: [true, 'Danh mục tin tức là bắt buộc'],
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Nội dung tin tức là bắt buộc'],
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

// Tạo slug tự động từ title
newsSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
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

