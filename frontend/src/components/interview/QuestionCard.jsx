function QuestionCard({
  question,
  currentQuestion = 0,
  totalQuestions = 0,
}) {
  if (!question) return null;

  const questionText =
    typeof question === "string"
      ? question
      : question.question;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-xl p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full font-semibold">
          Question {currentQuestion + 1}
        </span>

        <span className="text-gray-400 font-medium">
          {currentQuestion + 1} / {totalQuestions}
        </span>

      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-white leading-relaxed">

        {questionText}

      </h2>

      {/* Divider */}
      <div className="mt-8 border-t border-slate-700 pt-4">

        <p className="text-gray-400 text-sm">
          Read the question carefully before answering.
        </p>

      </div>

    </div>
  );
}

export default QuestionCard;