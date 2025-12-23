const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/ccl-intern-hub';
    
    const conn = await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✓ Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    console.error('Full error:', error);
    // Don't exit process, let the server continue (for development)
    // process.exit(1);
    throw error;
  }
};

module.exports = connectDB;
