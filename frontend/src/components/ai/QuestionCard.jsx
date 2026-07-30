function QuestionCard({ question, index }) {
  if (!question) return null;

  const questionText =
    typeof question === "string"
      ? question
      : question.question;

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg hover:border-cyan-500 transition duration-300 mb-6">
      <p className="text-cyan-400 text-lg font-semibold mb-4">
        Question {index + 1}
      </p>

      <h2 className="text-2xl md:text-3xl font-bold leading-relaxed text-white">
        {questionText}
      </h2>
    </div>
  );
}

export default QuestionCard;