function PerformanceBreakdown() {
  const scores = [
    {
      title: "Confidence",
      score: 92,
    },
    {
      title: "Communication",
      score: 90,
    },
    {
      title: "Technical Knowledge",
      score: 87,
    },
    {
      title: "Grammar",
      score: 88,
    },
    {
      title: "Fluency",
      score: 91,
    },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-2xl font-bold mb-8">
        Performance Breakdown
      </h2>

      {scores.map((item, index) => (

        <div key={index} className="mb-7">

          <div className="flex justify-between mb-2">

            <span className="text-gray-300">
              {item.title}
            </span>

            <span className="text-cyan-400 font-bold">
              {item.score}%
            </span>

          </div>

          <div className="w-full bg-slate-700 h-3 rounded-full">

            <div
              className="bg-gradient-to-r from-cyan-500 to-indigo-600 h-3 rounded-full"
              style={{
                width: `${item.score}%`,
              }}
            />

          </div>

        </div>

      ))}

    </div>
  );
}

export default PerformanceBreakdown;