const pdfParse = require("pdf-parse");
const fs = require("fs");

const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/resumeGeminiService");

// ======================================
// Upload Resume
// ======================================
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    // Read PDF
    const dataBuffer = fs.readFileSync(req.file.path);

    // Extract Text
    const pdfData = await pdfParse(dataBuffer);

    const extractedText = pdfData.text.replace(/\s+/g, " ").trim();

    // AI Analysis
    const report = await analyzeResume(extractedText);

    // Save Resume
    const resume = await Resume.create({
      user: req.user.id,

      fileName: req.file.filename,
      originalName: req.file.originalname,

      filePath: req.file.path,

      fileType: req.file.mimetype,

      fileSize: req.file.size,

      extractedText,

      atsScore: report.atsScore,

      summary: report.summary,

      strengths: report.strengths,

      weaknesses: report.weaknesses,

      missingSkills: report.missingSkills,

      recommendations: report.recommendations,
    });

    return res.status(201).json({
      success: true,
      message: "Resume analyzed successfully.",

      resume,

      report,
    });

  } catch (error) {

    console.error("Resume Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Get My Resumes
// ======================================
const getMyResumes = async (req, res) => {
  try {

    const resumes = await Resume.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Get Resume By Id
// ======================================
const getResumeById = async (req, res) => {
  try {

    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Delete Resume
// ======================================
const deleteResume = async (req, res) => {
  try {

    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    // Delete PDF
    if (fs.existsSync(resume.filePath)) {
      fs.unlinkSync(resume.filePath);
    }

    await Resume.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  uploadResume,
  getMyResumes,
  getResumeById,
  deleteResume,
};