import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  type: {
    type: String,
    enum: ['followers_change', 'following_change', 'reposts_change'],
    required: true
  },
  message: String,
  previousValue: Number,
  newValue: Number,
  change: Number,
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Notification', notificationSchema);
