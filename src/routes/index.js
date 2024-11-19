const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const authRoutes = require('./authRoutes');

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
