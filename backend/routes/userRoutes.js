const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userAuthMiddleware = require('../middleware/userAuth');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected routes
router.get('/profile', userAuthMiddleware, userController.getUserProfile);
router.put('/profile', userAuthMiddleware, userController.updateUserProfile);

module.exports = router;

