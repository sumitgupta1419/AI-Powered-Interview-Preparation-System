const fs = require("fs");

const Speech = require("../models/Speech");

const {
  analyzeSpeech,
} = require("../services/speechGeminiService");

const {
  speechToText,
} = require("../services/speechToTextService");

// ======================================
// Upload Speech
// ======================================

const uploadSpeech = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an audio file.",
      });
    }

    console.log("=====================================");
    console.log("Speech Upload Started");
    console.log("File:", req.file.originalname);

    // ======================================
    // Speech To Text
    // ======================================

    const transcription = await speechToText(req.file.path);

    console.log("Transcription:");
    console.log(transcription);

    if (!transcription || transcription.trim() === "") {
      throw new Error("Speech transcription failed.");
    }

    // ======================================
    // Gemini Analysis
    // ======================================

    const report = await analyzeSpeech(transcription);

    console.log("Gemini Report:");
    console.dir(report, { depth: null });

    if (!report) {
      throw new Error("AI report generation failed.");
    }

    // ======================================
    // Save To MongoDB
    // ======================================

    const speech = await Speech.create({
      user: req.user.id,

      fileName: req.file.filename,
      originalName: req.file.originalname,

      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,

      transcription,

      overallScore: Number(report.overallScore) || 0,

      fluency: report.fluency || {
        score: 0,
        speed: "",
        pauses: "",
      },

      pronunciation: report.pronunciation || {
        score: 0,
        clarity: "",
        confidence: "",
      },

      grammar: report.grammar || {
        score: 0,
        sentenceStructure: "",
        grammarAccuracy: "",
      },

      vocabulary: report.vocabulary || {
        score: 0,
        wordChoice: "",
        lexicalDiversity: "",
      },

      strengths: Array.isArray(report.strengths)
        ? report.strengths
        : [],

      weaknesses: Array.isArray(report.weaknesses)
        ? report.weaknesses
        : [],

      recommendations: Array.isArray(report.recommendations)
        ? report.recommendations
        : [],
    });

    console.log("Speech Saved Successfully");
    console.log("=====================================");

    return res.status(201).json({
      success: true,
      message: "Speech analyzed successfully.",
      speech,
      report,
    });

  } catch (error) {

    console.error("Speech Upload Error:");
    console.error(error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Speech analysis failed.",
    });
  }
};

// ======================================
// Get All My Speeches
// ======================================

const getMySpeeches = async (req, res) => {
  try {

    const speeches = await Speech.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: speeches.length,
      speeches,
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
// Get Single Speech
// ======================================

const getSpeechById = async (req, res) => {
  try {

    const speech = await Speech.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!speech) {
      return res.status(404).json({
        success: false,
        message: "Speech report not found.",
      });
    }

    return res.status(200).json({
      success: true,
      speech,
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
// Delete Speech
// ======================================

const deleteSpeech = async (req, res) => {
  try {

    const speech = await Speech.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!speech) {
      return res.status(404).json({
        success: false,
        message: "Speech report not found.",
      });
    }

    if (speech.filePath && fs.existsSync(speech.filePath)) {
      fs.unlinkSync(speech.filePath);
    }

    await Speech.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Speech deleted successfully.",
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
  uploadSpeech,
  getMySpeeches,
  getSpeechById,
  deleteSpeech,
};