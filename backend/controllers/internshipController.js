const Internship = require('../models/Internship');

// Create internship
exports.createInternship = async (req, res) => {
  try {
    // Check if MongoDB is connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not connected. Please check your MongoDB connection.',
        error: 'Database unavailable'
      });
    }

    const { title, description, company, location, stipend, duration, monthPeriod, numberOfSeats, requirements, category, applicationDeadline } = req.body;

    // Validate required fields
    if (!title || !description || !company || !location || !duration) {
      return res.status(400).json({ 
        message: 'Title, description, company, location, and duration are required fields' 
      });
    }

    // Prepare internship data
    const internshipData = {
      title: title.trim(),
      description: description.trim(),
      company: company.trim(),
      location: location.trim(),
      duration: duration.trim(),
      stipend: stipend ? parseFloat(stipend) || 0 : 0,
      category: category || 'other',
      requirements: Array.isArray(requirements) ? requirements : requirements ? [requirements] : [],
      currentApplications: 0,
      isLocked: false,
    };

    // Add month period if provided
    if (monthPeriod && monthPeriod.trim()) {
      internshipData.monthPeriod = monthPeriod.trim();
    }

    // Add number of seats if provided
    if (numberOfSeats !== undefined && numberOfSeats !== null && numberOfSeats !== '') {
      const seats = parseInt(numberOfSeats);
      if (seats > 0) {
        internshipData.numberOfSeats = seats;
      }
    }

    if (applicationDeadline) {
      const deadline = new Date(applicationDeadline);
      if (!isNaN(deadline.getTime())) {
        internshipData.applicationDeadline = deadline;
      }
    }

    const internship = new Internship(internshipData);
    await internship.save();

    res.status(201).json({
      message: 'Internship created successfully',
      internship,
    });
  } catch (error) {
    console.error('Internship creation error:', {
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
      message: 'Server error during internship creation',
      error: error.message 
    });
  }
};

// Get all internships
exports.getAllInternships = async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;

    const internships = await Internship.find(filter);
    res.json({ internships });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get internship by ID
exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json({ internship });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update internship
exports.updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json({
      message: 'Internship updated successfully',
      internship,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete internship
exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json({ message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
