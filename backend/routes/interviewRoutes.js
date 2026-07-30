const express = require("express");

const router = express.Router();

const {
  createInterview,
  submitAnswer,
  finishInterview,
  getInterviewById,
  getInterviewHistory,
  deleteInterview,
} = require("../controllers/interviewController");

// Import Protect Middleware
const { protect } = require("../middleware/authMiddleware");

// ======================================
// Create Interview
// POST /api/interview/create
// ======================================
router.post("/create", protect, createInterview);

// ======================================
// Submit Answer
// POST /api/interview/:id/answer
// ======================================
router.post("/:id/answer", protect, submitAnswer);

// ======================================
// Finish Interview
// POST /api/interview/:id/finish
// ======================================
router.post("/:id/finish", protect, finishInterview);

// ======================================
// Interview History
// GET /api/interview/history
// ======================================
router.get("/history", protect, getInterviewHistory);

// ======================================
// Get Interview By ID
// GET /api/interview/:id
// ======================================
router.get("/:id", protect, getInterviewById);

// ======================================
// Delete Interview
// DELETE /api/interview/:id
// ======================================
router.delete("/:id", protect, deleteInterview);

module.exports = router;