const mongoose = require("mongoose");

const speechSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    transcription: {
      type: String,
      default: "",
    },

    overallScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    fluency: {
      score: {
        type: Number,
        default: 0,
      },
      speed: {
        type: String,
        default: "",
      },
      pauses: {
        type: String,
        default: "",
      },
    },

    pronunciation: {
      score: {
        type: Number,
        default: 0,
      },
      clarity: {
        type: String,
        default: "",
      },
      confidence: {
        type: String,
        default: "",
      },
    },

    grammar: {
      score: {
        type: Number,
        default: 0,
      },
      sentenceStructure: {
        type: String,
        default: "",
      },
      grammarAccuracy: {
        type: String,
        default: "",
      },
    },

    vocabulary: {
      score: {
        type: Number,
        default: 0,
      },
      wordChoice: {
        type: String,
        default: "",
      },
      lexicalDiversity: {
        type: String,
        default: "",
      },
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    recommendations: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Speech", speechSchema);