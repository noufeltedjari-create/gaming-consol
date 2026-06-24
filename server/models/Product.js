const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    title_ar: {
      type: String,
      required: [true, 'Arabic product title is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['playstation', 'xbox', 'nintendo', 'other'],
      lowercase: true,
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
      enum: ['console', 'game'],
      lowercase: true,
    },
    image: {
      type: String, // base64 or URL
      default: null,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// Index for faster searches
productSchema.index({ category: 1, type: 1 });
productSchema.index({ title: 'text', title_ar: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
