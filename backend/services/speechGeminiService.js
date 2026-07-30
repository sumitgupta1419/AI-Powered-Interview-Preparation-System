const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ======================================
// Clean Gemini Response
// ======================================

function cleanJSON(text) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

// ======================================
// Default Report
// ======================================

function defaultReport(message = "Speech analysis failed.") {
  return {
    overallScore: 0,

    fluency: {
      score: 0,
      speed: "Unknown",
      pauses: "Unknown",
    },

    pronunciation: {
      score: 0,
      clarity: "Unknown",
      confidence: "Unknown",
    },

    grammar: {
      score: 0,
      sentenceStructure: "Unknown",
      grammarAccuracy: "Unknown",
    },

    vocabulary: {
      score: 0,
      wordChoice: "Unknown",
      lexicalDiversity: "Unknown",
    },

    strengths: [],

    weaknesses: [],

    recommendations: [message],
  };
}

// ======================================
// Analyze Speech
// ======================================

const analyzeSpeech = async (transcription) => {
  try {
    if (!transcription || transcription.trim() === "") {
      return defaultReport(
        "No speech detected. Please record a clear response."
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert English Communication Trainer.

Analyze the following speech transcript.

Transcript:
"""
${transcription}
"""

Return ONLY valid JSON.

{
  "overallScore":85,

  "fluency":{
      "score":82,
      "speed":"Good",
      "pauses":"Few unnecessary pauses"
  },

  "pronunciation":{
      "score":80,
      "clarity":"Clear",
      "confidence":"Confident"
  },

  "grammar":{
      "score":88,
      "sentenceStructure":"Well structured",
      "grammarAccuracy":"Very Good"
  },

  "vocabulary":{
      "score":84,
      "wordChoice":"Good",
      "lexicalDiversity":"Moderate"
  },

  "strengths":[
      "Good confidence",
      "Logical flow",
      "Clear communication"
  ],

  "weaknesses":[
      "Some filler words",
      "Limited vocabulary variety"
  ],

  "recommendations":[
      "Slow down slightly.",
      "Reduce filler words.",
      "Use more advanced vocabulary."
  ]
}

Rules:

- overallScore must be between 0 and 100.
- Every score must be between 0 and 100.
- Return ONLY JSON.
- No markdown.
- No explanation.
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const report = JSON.parse(cleanJSON(text));

    return {
      overallScore: Number(report.overallScore) || 0,

      fluency: {
        score: Number(report.fluency?.score) || 0,
        speed: report.fluency?.speed || "Average",
        pauses: report.fluency?.pauses || "Average",
      },

      pronunciation: {
        score: Number(report.pronunciation?.score) || 0,
        clarity: report.pronunciation?.clarity || "Average",
        confidence: report.pronunciation?.confidence || "Average",
      },

      grammar: {
        score: Number(report.grammar?.score) || 0,
        sentenceStructure:
          report.grammar?.sentenceStructure || "Average",
        grammarAccuracy:
          report.grammar?.grammarAccuracy || "Average",
      },

      vocabulary: {
        score: Number(report.vocabulary?.score) || 0,
        wordChoice: report.vocabulary?.wordChoice || "Average",
        lexicalDiversity:
          report.vocabulary?.lexicalDiversity || "Average",
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
    };
  } catch (error) {
    console.error("Speech Gemini Error:", error);

    return defaultReport();
  }
};

module.exports = {
  analyzeSpeech,
};