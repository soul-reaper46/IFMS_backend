// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the POST route for user authentication
router.post('/login', authController.loginUser);
router.post('/signup', authController.signupUser);

module.exports = router;