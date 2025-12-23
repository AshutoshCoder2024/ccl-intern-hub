require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const connectDB = require('../config/mongodb');

const createDefaultAdmin = async () => {
  try {
    // Connect to database
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@ccl.com' });
    if (existingAdmin) {
      console.log('Admin account already exists!');
      console.log('Email: admin@ccl.com');
      process.exit(0);
    }

    // Create default admin
    const admin = new Admin({
      name: 'Admin',
      email: 'admin@ccl.com',
      password: 'password123',
      role: 'super-admin',
    });

    await admin.save();

    console.log('✓ Default admin created successfully!');
    console.log('Email: admin@ccl.com');
    console.log('Password: password123');
    console.log('Role: super-admin');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createDefaultAdmin();

