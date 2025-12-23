const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
  try {
    // Check if MongoDB is connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not connected. Please check your MongoDB connection.',
        error: 'Database unavailable'
      });
    }

    const { name, email, password, phone, dateOfBirth, address } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Prepare user data (only include fields that have values)
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    };

    if (phone && phone.trim()) {
      userData.phone = phone.trim();
    }

    if (dateOfBirth) {
      const date = new Date(dateOfBirth);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ message: 'Invalid date of birth format' });
      }
      userData.dateOfBirth = date;
    }

    if (address && address.trim()) {
      userData.address = address.trim();
    }

    const user = new User(userData);
    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: 'user' },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Registration error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    // Handle MongoDB connection errors
    if (error.name === 'MongoServerError' || error.name === 'MongooseError') {
      return res.status(503).json({ 
        message: 'Database connection error. Please try again later.',
        error: 'Database unavailable'
      });
    }

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: errors.join(', ') });
    }
    
    res.status(500).json({ 
      message: 'Server error during registration',
      error: error.message 
    });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: 'user' },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, phone, dateOfBirth, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, dateOfBirth, address },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

