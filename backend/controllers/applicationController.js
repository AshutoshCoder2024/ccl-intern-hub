const Application = require('../models/Application');
const Internship = require('../models/Internship');
const User = require('../models/User');

// Create Application
exports.createApplication = async (req, res) => {
  try {
    // Check if MongoDB is connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not connected. Please check your MongoDB connection.',
        error: 'Database unavailable'
      });
    }

    const userId = req.user.id;
    const {
      internshipId,
      fullName,
      email,
      phone,
      dateOfBirth,
      address,
      currentInstitution,
      course,
      yearOfStudy,
      cgpa,
      previousExperience,
      skills,
      coverLetter,
    } = req.body;

    // Validate required fields
    if (!internshipId || !fullName || !email || !phone || !dateOfBirth || !address ||
        !currentInstitution || !course || !yearOfStudy) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Validate internshipId format (MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(internshipId)) {
      return res.status(400).json({ message: 'Invalid internship ID format' });
    }

    // Check if internship exists
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found. Please select a valid internship.' });
    }

    // Check if internship is locked (seats full)
    if (internship.isLocked) {
      return res.status(403).json({ 
        message: 'This internship is no longer accepting applications. All seats have been filled.' 
      });
    }

    // Check if seats are full (even if isLocked is not set)
    if (internship.numberOfSeats && internship.numberOfSeats > 0) {
      if (internship.currentApplications >= internship.numberOfSeats) {
        // Update locked status
        internship.isLocked = true;
        await internship.save();
        return res.status(403).json({ 
          message: 'This internship is no longer accepting applications. All seats have been filled.' 
        });
      }
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      user: userId,
      internship: internshipId,
    });

    if (existingApplication) {
      return res.status(409).json({ message: 'You have already applied for this internship' });
    }

    // Prepare application data
    const applicationData = {
      user: userId,
      internship: internshipId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      dateOfBirth: new Date(dateOfBirth),
      address: address.trim(),
      currentInstitution: currentInstitution.trim(),
      course: course.trim(),
      yearOfStudy: yearOfStudy.trim(),
      cgpa: cgpa ? cgpa.trim() : undefined,
      previousExperience: previousExperience ? previousExperience.trim() : undefined,
      skills: Array.isArray(skills) ? skills : skills ? [skills] : [],
      coverLetter: coverLetter ? coverLetter.trim() : undefined,
      status: 'pending',
    };

    // Validate date
    if (isNaN(applicationData.dateOfBirth.getTime())) {
      return res.status(400).json({ message: 'Invalid date of birth format' });
    }

    // Create application
    const application = new Application(applicationData);

    await application.save();

    // Increment current applications count
    internship.currentApplications = (internship.currentApplications || 0) + 1;
    
    // Check if seats are now full
    if (internship.numberOfSeats && internship.numberOfSeats > 0) {
      if (internship.currentApplications >= internship.numberOfSeats) {
        internship.isLocked = true;
      }
    }
    
    await internship.save();

    // Populate references for response
    await application.populate('internship', 'title company location');
    await application.populate('user', 'name email');

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    console.error('Application creation error:', {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    // Handle MongoDB connection errors
    if (error.name === 'MongoServerError' || error.name === 'MongooseError') {
      return res.status(503).json({ 
        message: 'Database connection error. Please try again later.',
        error: 'Database unavailable'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: errors.join(', ') });
    }

    res.status(500).json({ 
      message: 'Server error during application submission',
      error: error.message 
    });
  }
};

// Get User's Applications
exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ user: userId })
      .populate({
        path: 'internship',
        select: 'title company location duration stipend',
        options: { lean: true }
      })
      .sort({ createdAt: -1 })
      .lean();

    // Filter out applications with null internships if needed, or keep them for display
    res.json({ applications });
  } catch (error) {
    console.error('Error fetching user applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Single Application (User)
exports.getApplicationById = async (req, res) => {
  try {
    const userId = req.user.id;
    const application = await Application.findById(req.params.id)
      .populate('internship', 'title company location duration stipend description')
      .populate('user', 'name email');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user owns this application
    if (application.user._id.toString() !== userId && req.user.role !== 'admin' && req.user.role !== 'super-admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get All Applications (Admin)
exports.getAllApplications = async (req, res) => {
  try {
    const { status, internshipId } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }
    if (internshipId) {
      filter.internship = internshipId;
    }

    const applications = await Application.find(filter)
      .populate({
        path: 'user',
        select: 'name email phone',
        options: { lean: true }
      })
      .populate({
        path: 'internship',
        select: 'title company location',
        options: { lean: true }
      })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ applications });
  } catch (error) {
    console.error('Error fetching all applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Application Status (Admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    if (!status || !['pending', 'under-review', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Valid status is required' });
    }

    // Get the current application to check previous status
    const existingApplication = await Application.findById(req.params.id)
      .populate('internship');

    if (!existingApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const previousStatus = existingApplication.status;
    const internship = existingApplication.internship;

    // Update the application status
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true, runValidators: true }
    )
      .populate('user', 'name email')
      .populate('internship', 'title company location');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Handle seat count changes based on status
    if (internship && internship.numberOfSeats && internship.numberOfSeats > 0) {
      const wasRejected = previousStatus === 'rejected';
      const isRejected = status === 'rejected';

      // If status changed from non-rejected to rejected: free up a seat (decrement)
      if (!wasRejected && isRejected) {
        internship.currentApplications = Math.max(0, (internship.currentApplications || 0) - 1);
        
        // If it was locked and we freed up a seat, unlock it
        if (internship.isLocked && internship.currentApplications < internship.numberOfSeats) {
          internship.isLocked = false;
        }
      }
      // If status changed from rejected to non-rejected: take up a seat (increment)
      else if (wasRejected && !isRejected) {
        internship.currentApplications = (internship.currentApplications || 0) + 1;
        
        // Check if seats are now full
        if (internship.currentApplications >= internship.numberOfSeats) {
          internship.isLocked = true;
        }
      }

      await internship.save();
    }

    res.json({
      message: 'Application status updated successfully',
      application,
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Application
exports.deleteApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const application = await Application.findById(req.params.id)
      .populate('internship');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Only allow deletion if user owns it or is admin
    if (application.user.toString() !== userId && req.user.role !== 'admin' && req.user.role !== 'super-admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const internship = application.internship;
    const wasRejected = application.status === 'rejected';

    // Delete the application
    await Application.findByIdAndDelete(req.params.id);

    // If application was not rejected, free up a seat
    if (internship && internship.numberOfSeats && internship.numberOfSeats > 0 && !wasRejected) {
      internship.currentApplications = Math.max(0, (internship.currentApplications || 0) - 1);
      
      // If it was locked and we freed up a seat, unlock it
      if (internship.isLocked && internship.currentApplications < internship.numberOfSeats) {
        internship.isLocked = false;
      }
      
      await internship.save();
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

