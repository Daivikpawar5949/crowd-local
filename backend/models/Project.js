import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    founderName: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    goal: {
      type: Number,
      required: true,
    },
    currentFunding: {
      type: Number,
      default: 0,
    },
    daysRemaining: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['Tech', 'Design', 'Community'],
      required: true,
    },
    image: {
      type: String,
      default: '🚀',
    },
    contributors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
