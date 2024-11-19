const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/get-user-details', userController.getUserDetails);
router.put('/update-user-details', userController.updateUserDetails);

module.exports = router;
