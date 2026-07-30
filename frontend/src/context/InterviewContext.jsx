import { createContext, useContext, useState } from "react";

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Final interview score
  const [score, setScore] = useState(0);

  // Store answers by question index
  const [answers, setAnswers] = useState([]);

  // ===============================
  // Load Questions
  // ===============================
  const loadQuestions = (questionList = []) => {
    setQuestions(Array.isArray(questionList) ? questionList : []);
    setCurrentQuestion(0);
    setCompleted(false);
    setScore(0);
    setAnswers([]);
  };

  // ===============================
  // Save Answer
  // ===============================
  const saveAnswer = (index, answer) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = answer;
      return updated;
    });
  };

  // ===============================
  // Next Question
  // ===============================
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  // ===============================
  // Previous Question
  // ===============================
  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // ===============================
  // Reset Interview
  // ===============================
  const resetInterview = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setCompleted(false);
    setScore(0);
    setAnswers([]);
  };

  return (
    <InterviewContext.Provider
      value={{
        questions,
        currentQuestion,
        completed,
        score,
        answers,

        loadQuestions,
        saveAnswer,
        nextQuestion,
        previousQuestion,
        resetInterview,

        setScore,
        setAnswers,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  return useContext(InterviewContext);
}