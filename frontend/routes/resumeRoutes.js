const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume,
  getMyResumes,
  getResumeById,
  deleteResume,
} = require("../controllers/resumeController");

// =====================================
// Upload Resume
// POST /api/resume/upload
// =====================================
router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

// =====================================
// Get All User Resumes
// GET /api/resume
// =====================================
router.get(
  "/",
  protect,
  getMyResumes
);

// =====================================
// Get Resume By Id
// GET /api/resume/:id
// =====================================
router.get(
  "/:id",
  protect,
  getResumeById
);

// =====================================
// Delete Resume
// DELETE /api/resume/:id
// =====================================
router.delete(
  "/:id",
  protect,
  deleteResume
);

module.exports = router;