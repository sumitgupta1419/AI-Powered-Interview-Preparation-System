const express = require("express");
console.log("Dashboard Routes Loaded");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getRecentInterviews,
  getPerformance,
} = require("../controllers/dashboardController");

// ======================================
// Dashboard Statistics
// GET /api/dashboard/stats
// ======================================
router.get("/stats", protect, getDashboardStats);

// ======================================
// Recent Interviews
// GET /api/dashboard/recent
// ======================================
router.get("/recent", protect, getRecentInterviews);

// ======================================
// Performance
// GET /api/dashboard/performance
// ======================================
router.get("/performance", protect, getPerformance);

module.exports = router;