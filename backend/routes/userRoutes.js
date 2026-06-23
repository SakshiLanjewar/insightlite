const express = require('express');
const router = express.Router();
const { getAllUsers, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllUsers);
router.put('/profile', protect, updateProfile);

module.exports = router;
