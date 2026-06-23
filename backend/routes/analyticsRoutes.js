const express = require('express');
const router = express.Router();
const {
  getSummary,
  getChartData,
  getPieData,
  getActivities,
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

// All analytics routes are protected (require login)
router.get('/summary', protect, getSummary);
router.get('/chart', protect, getChartData);
router.get('/pie', protect, getPieData);
router.get('/activities', protect, getActivities);

module.exports = router;
