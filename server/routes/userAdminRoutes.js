const express = require('express');
const router = express.Router();
const userAdminController = require('../controllers/userAdminController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware.authenticate);
router.use(authMiddleware.authorize('admin'));

// User routes
router.post('/users', userAdminController.createUser);
router.get('/users', userAdminController.getAllUsers);
router.get('/users/:id', userAdminController.getUserById);
router.put('/users/:id', userAdminController.updateUser);
router.patch('/users/:id/toggle-status', userAdminController.toggleUserStatus);

// Profile routes
router.put('/users/:id/profile', userAdminController.updateProfile);

module.exports = router;