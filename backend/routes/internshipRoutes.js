const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', internshipController.getAllInternships);
router.get('/:id', internshipController.getInternshipById);

// Protected routes (Admin only)
router.post('/', authMiddleware, internshipController.createInternship);
router.put('/:id', authMiddleware, internshipController.updateInternship);
router.delete('/:id', authMiddleware, internshipController.deleteInternship);

module.exports = router;
