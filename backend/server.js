require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb');

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL || ['http://localhost:5173', 'http://localhost:8080', 'http://[::1]:8080', 'http://127.0.0.1:8080'],
  credentials: true,
}));

// Connect to MongoDB
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
  console.error('Please check your MONGODB_URI in .env file');
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const dbStatus = mongoose.connection.readyState;
  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({ 
    status: 'Server is running',
    database: dbStates[dbStatus] || 'unknown',
    databaseConnected: dbStatus === 1
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✓ Server is running on port ${PORT}`);
  console.log(`✓ API health check: http://localhost:${PORT}/api/health`);
});
