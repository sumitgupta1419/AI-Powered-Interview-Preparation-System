const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ===============================================
// Helper Function
// ===============================================
function extractJSON(text) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

// ===============================================
// Generate Interview Questions
// ===============================================
async function generateInterviewQuestions(
  jobRole,
  experience,
  difficulty,
  questionCount
) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert technical interviewer.

Generate EXACTLY ${questionCount} interview questions.

Job Role: ${jobRole}
Experience Level: ${experience}
Difficulty Level: ${difficulty}

Rules:

1. Return ONLY valid JSON.
2. No markdown.
3. No explanations.
4. No code block.
5. Every object must contain ONLY one key:

{
  "question":"..."
}

Example

[
  {
    "question":"Tell me about yourself."
  },
  {
    "question":"Explain OOP."
  }
]
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleanText = extractJSON(text);

    let questions = JSON.parse(cleanText);

    if (!Array.isArray(questions)) {
      throw new Error("Gemini did not return an array.");
    }

    questions = questions.filter(
      (q) =>
        q &&
        typeof q.question === "string" &&
        q.question.trim() !== ""
    );

    console.log("=================================");
    console.log("Interview Generation");
    console.log("Requested Questions :", questionCount);
    console.log("Returned Questions  :", questions.length);
    console.log("=================================");

    return questions;
  }
  // catch (error) {
  //   console.error("Gemini Question Generation Error");
  //   console.error(error);
catch (error) {
  console.error("====================================");
  console.error("Gemini Question Generation Error");
  console.error(error);
  console.error(error.message);

  if (error.response) {
    console.error(error.response);
  }

  console.error("====================================");

  throw error;
}
    throw new Error("Failed to generate interview questions.");
  }


// ===============================================
// Evaluate Single Answer
// ===============================================
async function evaluateAnswer(question, answer) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a senior technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer.

Return ONLY JSON.

Format

{
  "score":8,
  "feedback":"Good explanation with clear concepts."
}

Rules

Score must be between 0 and 10.

Do not return markdown.
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleanText = extractJSON(text);

    const evaluation = JSON.parse(cleanText);

    return {
      score: evaluation.score || 0,
      feedback: evaluation.feedback || "",
    };
  } catch (error) {
    console.error("Gemini Evaluation Error");
    console.error(error);

    return {
      score: 0,
      feedback: "Unable to evaluate answer.",
    };
  }
}

// ===============================================
// Generate Overall Interview Report
// ===============================================
async function generateOverallFeedback(questions) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    let interviewText = "";

    questions.forEach((q, index) => {
      interviewText += `
Question ${index + 1}

${q.question}

Candidate Answer

${q.answer}

Question Score

${q.score}

Question Feedback

${q.feedback}

-----------------------------------------
`;
    });

    const prompt = `
You are a Senior Technical Interviewer.

Analyze the following interview.

${interviewText}

Return ONLY VALID JSON.

Format

{
  "score":85,

  "feedback":"Overall candidate performed well.",

  "skills":{
      "Java":92,
      "OOP":88,
      "SQL":80,
      "Communication":84,
      "Problem Solving":90
  },

  "strengths":[
      "Strong Java Fundamentals",
      "Clear Communication",
      "Logical Thinking"
  ],

  "weaknesses":[
      "Needs SQL Optimization",
      "System Design Knowledge"
  ],

  "recommendations":[
      "Practice SQL",
      "Improve System Design",
      "Solve More DSA Problems"
  ]
}

Rules

1. Overall score between 0-100.
2. Every skill between 0-100.
3. Return ONLY JSON.
4. No markdown.
5. No explanation.
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleanText = extractJSON(text);

    const report = JSON.parse(cleanText);

    return {
      score: report.score || 0,

      feedback: report.feedback || "",

      skills: report.skills || {},

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
    console.error("Gemini Overall Feedback Error");
    console.error(error);

    return {
      score: 0,

      feedback: "Unable to generate overall feedback.",

      skills: {},

      strengths: [],

      weaknesses: [],

      recommendations: [],
    };
  }
}

module.exports = {
  generateInterviewQuestions,
  evaluateAnswer,
  generateOverallFeedback,
};