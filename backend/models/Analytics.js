const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    month: {
      type: String,
      required: true, // e.g., "Jan", "Feb"
    },
    year: {
      type: Number,
      required: true,
    },
    sales: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      default: 0,
    },
    orders: {
      type: Number,
      default: 0,
    },
    newUsers: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Analytics', analyticsSchema);
