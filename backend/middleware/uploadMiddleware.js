const multer = require("multer");
const path = require("path");
const fs = require("fs");

// =======================================
// Create Upload Folder
// =======================================

const uploadPath = path.join(__dirname, "../uploads/resumes");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// =======================================
// Storage
// =======================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
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

// =======================================
// Allowed File Types
// =======================================

const allowedMimeTypes = [
  "application/pdf",

  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// =======================================
// File Filter
// =======================================

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF, DOC and DOCX files are allowed."
      ),
      false
    );
  }
};

// =======================================
// Multer Upload
// =======================================

const uploadResume = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

// =======================================
// Export
// =======================================

module.exports = uploadResume;