import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useInterview } from "../context/InterviewContext";
import {
  submitAnswer,
  finishInterview,
} from "../services/interviewService";

import Timer from "../components/interview/Timer";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerBox from "../components/interview/AnswerBox";
import InterviewProgress from "../components/interview/InterviewProgress";
import InterviewNavigation from "../components/interview/InterviewNavigation";
import FinishInterview from "../components/interview/FinishInterview";
import SpeechControls from "../components/interview/SpeechControls";

import useSpeechRecognition from "../hooks/useSpeechRecognition";

function Interview() {
  const navigate = useNavigate();

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    questions,
    currentQuestion,
    nextQuestion,
    previousQuestion,
    completed,
    resetInterview,
    saveAnswer,
  } = useInterview();

  const {
    supported,
    transcript,
    isListening,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechRecognition();

  // Auto-fill answer using speech transcript
  useEffect(() => {
    if (transcript) {
      setAnswer(transcript);
    }
  }, [transcript]);

  // ===============================
  // Submit Current Answer
  // ===============================
  const submitCurrentAnswer = async () => {
    const interviewId = localStorage.getItem("interviewId");

    if (!interviewId) {
      throw new Error("Interview ID not found.");
    }

    return await submitAnswer(
      interviewId,
      currentQuestion,
      answer
    );
  };

  // ===============================
  // Handle Next
  // ===============================
  const handleNext = async () => {
    if (!answer.trim()) {
      alert("Please provide an answer before continuing.");
      return;
    }

    try {
      setLoading(true);

      // Save locally
      // saveAnswer(answer);
      saveAnswer(currentQuestion, answer);

      // Save to backend + Gemini evaluation
      await submitCurrentAnswer();

      // Stop microphone
      if (isListening) {
        stopListening();
      }

      clearTranscript();
      setAnswer("");

      // Last Question
      if (currentQuestion === questions.length - 1) {
        const interviewId = localStorage.getItem("interviewId");

        if (interviewId) {
          await finishInterview(interviewId);
        }

        nextQuestion();

        navigate("/result");
      } else {
        nextQuestion();
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to submit answer."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // No Questions
  // ===============================
  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="bg-slate-900 rounded-3xl p-12 border border-slate-700 text-center">

          <h1 className="text-4xl font-bold mb-4">
            🎤 AI Mock Interview
          </h1>

          <p className="text-gray-400 mb-8">
            Please generate interview questions first.
          </p>

          <button
            onClick={() => navigate("/questions")}
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-bold"
          >
            Generate Questions
          </button>

        </div>
      </div>
    );
  }

  // ===============================
  // Interview Completed
  // ===============================
  if (completed) {
    return (
      <FinishInterview
        resetInterview={resetInterview}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-10 px-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-4">
          🎤 AI Mock Interview
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Answer confidently. AI will evaluate your responses.
        </p>

        <Timer
          duration={60}
          currentQuestion={currentQuestion}
          onTimeUp={handleNext}
        />

        <div className="mt-8">
          <InterviewProgress
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
          />
        </div>

        <div className="mt-8">
          <QuestionCard
            question={questions[currentQuestion]}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
          />
        </div>

        <div className="mt-8">
          <SpeechControls
            supported={supported}
            isListening={isListening}
            startListening={startListening}
            stopListening={stopListening}
            clearTranscript={clearTranscript}
          />
        </div>

        {transcript && (
          <div className="mt-4 text-center text-cyan-400 italic">
            {transcript}
          </div>
        )}

        <div className="mt-8">
          <AnswerBox
            value={answer}
            onChange={setAnswer}
          />
        </div>

        <div className="mt-10">
          <InterviewNavigation
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            onPrevious={previousQuestion}
            onNext={handleNext}
            loading={loading}
          />
        </div>

      </div>
    </div>
  );
}

export default Interview;