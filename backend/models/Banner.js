import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tên banner là bắt buộc'],
      trim: true,
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, 'Ảnh banner là bắt buộc'],
      trim: true,
    },
    page: {
      type: String,
      enum: ['home', 'about', 'products', 'products-fresh', 'products-dried', 'products-powder', 'handbook', 'contact', 'news'],
      required: [true, 'Trang hiển thị là bắt buộc'],
    },
    title: {
      type: String,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
bannerSchema.index({ page: 1, isActive: 1, order: 1 });
bannerSchema.index({ slug: 1 });

// Auto-generate slug from name if not provided
bannerSchema.pre('save', async function (next) {
  if (!this.slug && this.name) {
    let baseSlug = this.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    let slug = baseSlug;
    let counter = 1;
    while (await mongoose.model('Banner').findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    this.slug = slug;
  }
  next();
});

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;

