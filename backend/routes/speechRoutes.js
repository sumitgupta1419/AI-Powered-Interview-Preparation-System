const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
// const upload = require("../middleware/uploadMiddleware");
const speechUpload = require("../middleware/speechUploadMiddleware");

const {
  uploadSpeech,
  getMySpeeches,
  getSpeechById,
  deleteSpeech,
} = require("../controllers/speechController");

// ======================================
// Upload Speech
// POST /api/speech/upload
// ======================================
router.post(
  "/upload",
  protect,
  // upload.single("audio"),
  speechUpload.single("audio"),
  uploadSpeech
);

// ======================================
// Get My Speech History
// GET /api/speech/my-speeches
// ======================================
router.get(
  "/my-speeches",
  protect,
  getMySpeeches
);

// ======================================
// Get Single Speech
// GET /api/speech/:id
// ======================================
router.get(
  "/:id",
  protect,
  getSpeechById
);

// ======================================
// Delete Speech
// DELETE /api/speech/:id
// ======================================
router.delete(
  "/:id",
  protect,
  deleteSpeech
);

module.exports = router;