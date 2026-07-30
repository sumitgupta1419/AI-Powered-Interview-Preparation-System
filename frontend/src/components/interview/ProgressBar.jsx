function ProgressBar({ currentQuestion, totalQuestions }) {
  const progress =
    totalQuestions === 0
      ? 0
      : ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="w-full mb-8">

      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>
          Question {currentQuestion + 1}
        </span>

        <span>
          {totalQuestions} Questions
        </span>
      </div>

      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">

        <div
          className="bg-cyan-500 h-3 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        ></div>

      </div>

      <div className="text-right mt-2 text-cyan-400 font-semibold">
        {Math.round(progress)}%
      </div>

    </div>
  );
}

export default ProgressBar;