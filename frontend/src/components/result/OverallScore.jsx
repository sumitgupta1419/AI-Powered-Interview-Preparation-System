function OverallScore({ score }) {
  const color =
    score >= 90
      ? "text-green-400"
      : score >= 75
      ? "text-cyan-400"
      : "text-yellow-400";

  return (
    <div className="bg-slate-900 rounded-3xl p-10 border border-slate-700 shadow-lg text-center">

      <h2 className="text-2xl font-bold mb-8">
        Overall Score
      </h2>

      <div className={`text-8xl font-bold ${color}`}>
        {score}%
      </div>

      <div className="w-full bg-slate-700 h-5 rounded-full mt-8 overflow-hidden">

        <div
          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-5 rounded-full"
          style={{ width: `${score}%` }}
        />

      </div>

      <p className="mt-6 text-gray-400 text-lg">
        Excellent Performance
      </p>

    </div>
  );
}

export default OverallScore;