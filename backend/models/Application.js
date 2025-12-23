const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Internship',
      required: true,
    },
    // Personal Information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    // Educational Information
    currentInstitution: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    yearOfStudy: {
      type: String,
      required: true,
    },
    cgpa: {
      type: String,
      trim: true,
    },
    // Additional Information
    previousExperience: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    coverLetter: {
      type: String,
      trim: true,
    },
    // Application Status
    status: {
      type: String,
      enum: ['pending', 'under-review', 'accepted', 'rejected'],
      default: 'pending',
    },
    // Admin Notes
    adminNotes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index for efficient queries
applicationSchema.index({ user: 1, internship: 1 });
applicationSchema.index({ status: 1 });

module.exports = mongoose.model('Application', applicationSchema);

