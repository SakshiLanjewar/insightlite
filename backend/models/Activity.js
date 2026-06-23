const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['sale', 'signup', 'order', 'refund', 'login'],
      default: 'order',
    },
    amount: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ['completed', 'pending', 'failed', 'refunded'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Activity', activitySchema);
