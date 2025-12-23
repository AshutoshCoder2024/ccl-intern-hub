const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    stipend: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      required: true,
    },
    monthPeriod: {
      type: String,
      trim: true,
    },
    numberOfSeats: {
      type: Number,
      default: null, // null means unlimited
      min: 1,
    },
    currentApplications: {
      type: Number,
      default: 0,
      min: 0,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    requirements: [String],
    category: {
      type: String,
      enum: ['web', 'mobile', 'data-science', 'ai-ml', 'devops', 'other'],
      default: 'other',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
    },
    applicationDeadline: {
      type: Date,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Virtual to check if internship is locked based on seats
internshipSchema.virtual('checkLocked').get(function() {
  if (this.numberOfSeats && this.numberOfSeats > 0) {
    return this.currentApplications >= this.numberOfSeats;
  }
  return false;
});

// Pre-save middleware to update isLocked status
internshipSchema.pre('save', function(next) {
  if (this.numberOfSeats && this.numberOfSeats > 0) {
    this.isLocked = this.currentApplications >= this.numberOfSeats;
  } else {
    this.isLocked = false;
  }
  next();
});

module.exports = mongoose.model('Internship', internshipSchema);
