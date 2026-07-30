function InterviewProgress({
  currentQuestion,
  totalQuestions,
}) {
  const percentage =
    ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div>

      <div className="flex justify-between mb-3">

        <span>
          Question {currentQuestion + 1} of {totalQuestions}
        </span>

        <span>
          {Math.round(percentage)}%
        </span>

      </div>

      <div className="w-full bg-slate-700 rounded-full h-3">

        <div
          className="bg-cyan-500 h-3 rounded-full transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

export default InterviewProgress;