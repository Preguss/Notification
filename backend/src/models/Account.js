import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: false
  },
  metrics: {
    followers: {
      type: Number,
      default: 0
    },
    following: {
      type: Number,
      default: 0
    },
    reposts: {
      type: Number,
      default: 0
    }
  },
  alerts: [{
    type: {
      type: String,
      enum: ['followers', 'following', 'reposts']
    },
    threshold: Number,
    enabled: Boolean,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastChecked: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Account', accountSchema);
