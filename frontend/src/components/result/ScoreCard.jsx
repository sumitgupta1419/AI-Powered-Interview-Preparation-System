function ScoreCard({ interview }) {
  const score = interview?.score ?? 0;

  const getPerformance = () => {
    if (score >= 90) return "Excellent Performance 🚀";
    if (score >= 75) return "Very Good 👍";
    if (score >= 60) return "Good 🙂";
    if (score >= 40) return "Needs Improvement 📚";

    return "Keep Practicing 💪";
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg text-center">

      <h2 className="text-3xl font-bold mb-6">
        Overall Score
      </h2>

      <div className="w-44 h-44 mx-auto rounded-full border-[10px] border-cyan-500 flex items-center justify-center">

        <span className="text-6xl font-bold text-cyan-400">
          {score}%
        </span>

      </div>

      <p className="mt-8 text-xl text-gray-400">
        {getPerformance()}
      </p>

    </div>
  );
}

export default ScoreCard;