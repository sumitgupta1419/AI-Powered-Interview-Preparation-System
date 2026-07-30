const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function cleanJSON(text) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

const analyzeResume = async (resumeText) => {
  try {
    if (!resumeText || resumeText.trim() === "") {
      return {
        atsScore: 0,
        summary: "",
        strengths: [],
        weaknesses: [],
        missingSkills: [],
        recommendations: [
          "Resume text could not be extracted."
        ],
      };
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an ATS Resume Analyzer.

Analyze the following resume.

Resume:

${resumeText}

Return ONLY valid JSON.

{
  "atsScore": 85,

  "summary":"Professional Java developer with MERN experience.",

  "strengths":[
    "Strong Java",
    "Good Projects",
    "Clean Resume"
  ],

  "weaknesses":[
    "Missing Certifications",
    "No Achievements Section"
  ],

  "missingSkills":[
    "Docker",
    "AWS",
    "CI/CD"
  ],

  "recommendations":[
    "Add measurable achievements.",
    "Improve ATS keywords.",
    "Add certifications."
  ]
}

Rules:

Return ONLY JSON.

No explanation.

No markdown.

ATS Score between 0 and 100.
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const report = JSON.parse(cleanJSON(text));

    return {
      atsScore: Number(report.atsScore) || 0,

      summary: report.summary || "",

      strengths: Array.isArray(report.strengths)
        ? report.strengths
        : [],

      weaknesses: Array.isArray(report.weaknesses)
        ? report.weaknesses
        : [],

      missingSkills: Array.isArray(report.missingSkills)
        ? report.missingSkills
        : [],

      recommendations: Array.isArray(report.recommendations)
        ? report.recommendations
        : [],
    };
  } catch (error) {
    console.error("Resume Gemini Error:", error);

    return {
      atsScore: 0,
      summary: "",
      strengths: [],
      weaknesses: [],
      missingSkills: [],
      recommendations: [],
    };
  }
};

module.exports = {
  analyzeResume,
};