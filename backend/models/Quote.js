import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tên khách hàng là bắt buộc'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email là bắt buộc'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: false, // Có thể gửi báo giá chung không cần sản phẩm cụ thể
    },
    productName: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    quantity: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'quoted', 'closed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index để tìm kiếm nhanh
quoteSchema.index({ status: 1, createdAt: -1 });
quoteSchema.index({ isRead: 1, createdAt: -1 });
quoteSchema.index({ email: 1 });

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;

