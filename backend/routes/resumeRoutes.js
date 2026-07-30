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

// Upload Resume
router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

// Resume History
router.get("/", protect, getMyResumes);

// Resume Details
router.get("/:id", protect, getResumeById);

// Delete Resume
router.delete("/:id", protect, deleteResume);

module.exports = router;