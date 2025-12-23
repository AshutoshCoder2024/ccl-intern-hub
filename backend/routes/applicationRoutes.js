const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const userAuthMiddleware = require('../middleware/userAuth');
const authMiddleware = require('../middleware/auth');

// Admin routes (protected) - must come before parameterized routes
router.get('/', authMiddleware, applicationController.getAllApplications);
router.put('/:id/status', authMiddleware, applicationController.updateApplicationStatus);

// User routes (protected)
router.post('/', userAuthMiddleware, applicationController.createApplication);
router.get('/my-applications', userAuthMiddleware, applicationController.getUserApplications);
router.get('/:id', userAuthMiddleware, applicationController.getApplicationById);
router.delete('/:id', userAuthMiddleware, applicationController.deleteApplication);

module.exports = router;

