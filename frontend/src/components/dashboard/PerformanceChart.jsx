import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PerformanceChart({ performance }) {
  const data = [
    {
      name: "Lowest",
      score: performance?.lowestScore || 0,
    },
    {
      name: "Average",
      score: Number(performance?.averageScore || 0),
    },
    {
      name: "Highest",
      score: performance?.highestScore || 0,
    },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-3xl font-bold mb-8 text-white">
        📈 Performance Summary
      </h2>

      <div className="w-full h-96">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="name"
              stroke="#94A3B8"
            />

            <YAxis
              domain={[0, 10]}
              stroke="#94A3B8"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#06B6D4"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#06B6D4",
              }}
              activeDot={{
                r: 9,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">

        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">
            Highest Score
          </p>

          <h3 className="text-3xl font-bold text-green-400">
            {performance?.highestScore || 0}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">
            Lowest Score
          </p>

          <h3 className="text-3xl font-bold text-red-400">
            {performance?.lowestScore || 0}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">
            Average Score
          </p>

          <h3 className="text-3xl font-bold text-cyan-400">
            {performance?.averageScore || 0}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">
            Completed
          </p>

          <h3 className="text-3xl font-bold text-yellow-400">
            {performance?.completedInterviews || 0}
          </h3>
        </div>

      </div>

    </div>
  );
}

export default PerformanceChart;