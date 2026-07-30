const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ======================================
// Create Upload Folder
// ======================================

const uploadDir = path.join(__dirname, "../uploads/speeches");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ======================================
// Storage
// ======================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ======================================
// Allowed Audio Types
// ======================================

const allowedTypes = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/webm",
  "audio/mp4",
  "audio/m4a",
  "audio/ogg",
  "audio/x-m4a",
];

// ======================================
// File Filter
// ======================================

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only MP3, WAV, M4A, OGG and WebM audio files are allowed."
      ),
      false
    );
  }
};

// ======================================
// Upload
// ======================================

const speechUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

module.exports = speechUpload;