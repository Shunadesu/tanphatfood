import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tên liên hệ là bắt buộc'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['phone', 'messenger', 'zalo', 'email', 'whatsapp', 'telegram', 'viber', 'skype', 'other'],
      required: [true, 'Loại liên hệ là bắt buộc'],
    },
    label: {
      type: String,
      required: [true, 'Nhãn hiển thị là bắt buộc'],
      trim: true,
    },
    value: {
      type: String,
      required: [true, 'Giá trị liên hệ là bắt buộc'],
      trim: true,
    },
    href: {
      type: String,
      required: [true, 'Link liên hệ là bắt buộc'],
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    iconType: {
      type: String,
      enum: ['image', 'svg', 'icon'],
      default: 'image',
    },
    color: {
      type: String,
      default: 'bg-blue-500',
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
contactSchema.index({ type: 1, isActive: 1, order: 1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;

