const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);

// Protected routes
router.get('/', authMiddleware, adminController.getAllAdmins);
router.get('/:id', authMiddleware, adminController.getAdminById);
router.put('/:id', authMiddleware, adminController.updateAdmin);
router.delete('/:id', authMiddleware, adminController.deleteAdmin);

module.exports = router;
