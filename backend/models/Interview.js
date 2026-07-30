const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    // ===============================
    // User Information
    // ===============================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobRole: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      required: true,
      trim: true,
    },

    questionCount: {
      type: Number,
      default: 10,
    },

    // ===============================
    // Interview Questions
    // ===============================
    questions: [
      {
        question: {
          type: String,
          required: true,
          trim: true,
        },

        answer: {
          type: String,
          default: "",
          trim: true,
        },

        score: {
          type: Number,
          default: 0,
          min: 0,
          max: 10,
        },

        feedback: {
          type: String,
          default: "",
          trim: true,
        },
      },
    ],

    // ===============================
    // Overall Interview Result
    // ===============================
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    feedback: {
      type: String,
      default: "",
      trim: true,
    },

    // ===============================
    // AI Skill Analysis
    // ===============================
    skills: {
      type: Map,
      of: Number,
      default: {},
    },

    // ===============================
    // AI Strengths
    // ===============================
    strengths: {
      type: [String],
      default: [],
    },

    // ===============================
    // AI Weaknesses
    // ===============================
    weaknesses: {
      type: [String],
      default: [],
    },

    // ===============================
    // AI Recommendations
    // ===============================
    recommendations: {
      type: [String],
      default: [],
    },

    // ===============================
    // Interview Status
    // ===============================
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interview", interviewSchema);