const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  title: { type: String, required: true },
  title_ar: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  image: { type: String },
  category: { type: String },
  type: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    // Customer Info
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    wilaya: {
      type: String,
      required: [true, 'Wilaya (state) is required'],
      trim: true,
    },

    // Order Items
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: 'Order must contain at least one item',
      },
    },

    // Financials
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },

    // Optional note
    note: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster seller queries
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ phone: 1 });

module.exports = mongoose.model('Order', orderSchema);
