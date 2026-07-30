import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useInterview } from "../context/InterviewContext";
import { createInterview } from "../services/interviewService";

import RoleSelector from "../components/ai/RoleSelector";
import ExperienceSelector from "../components/ai/ExperienceSelector";
import DifficultySelector from "../components/ai/DifficultySelector";
import QuestionCounter from "../components/ai/QuestionCounter";

function AIQuestions() {
  const navigate = useNavigate();

  const { loadQuestions } = useInterview();

  const [jobRole, setJobRole] = useState("Java Developer");
  const [experience, setExperience] = useState("Fresher");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState(10);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const response = await createInterview({
        jobRole,
        experience,
        difficulty,
        questionCount,
      });

      console.log("Interview Created:", response);

      if (!response?.success) {
        throw new Error(response?.message || "Failed to create interview.");
      }

      if (!response?.interview) {
        throw new Error("Interview data not received.");
      }

      // Save Interview ID
      localStorage.setItem(
        "interviewId",
        response.interview._id
      );

      // Load Questions into Context
      loadQuestions(response.interview.questions || []);

      alert(response.message || "Interview created successfully.");

      navigate("/interview");
    } catch (error) {
      console.error("Generate Interview Error:", error);

      alert(
        error?.message ||
        "Unable to generate interview."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-12">
          🤖 AI Interview Generator
        </h1>

        <div className="space-y-8">

          <RoleSelector
            value={jobRole}
            onChange={setJobRole}
          />

          <ExperienceSelector
            value={experience}
            onChange={setExperience}
          />

          <DifficultySelector
            value={difficulty}
            onChange={setDifficulty}
          />

          <QuestionCounter
            value={questionCount}
            onChange={setQuestionCount}
          />

        </div>

        <div className="text-center mt-12">

          <button
            onClick={generateQuestions}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600 transition px-12 py-4 rounded-xl text-xl font-bold disabled:opacity-50"
          >
            {loading
              ? "Generating AI Questions..."
              : "Generate Interview"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default AIQuestions;