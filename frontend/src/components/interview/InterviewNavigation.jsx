function InterviewNavigation({
  onPrevious,
  onNext,
  currentQuestion = 0,
  totalQuestions = 0,
  loading = false,
}) {
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex justify-between items-center mt-10">

      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstQuestion || loading}
        className="px-8 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        ← Previous
      </button>

      {/* Question Counter */}
      <div className="text-gray-400 font-semibold">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>

      {/* Next / Finish Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={loading}
        className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading
          ? "Saving..."
          : isLastQuestion
          ? "Finish Interview"
          : "Next →"}
      </button>

    </div>
  );
}

export default InterviewNavigation;