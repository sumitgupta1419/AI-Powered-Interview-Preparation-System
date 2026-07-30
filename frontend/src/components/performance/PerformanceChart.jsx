import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const performanceData = [
  {
    interview: "1",
    score: 68,
  },
  {
    interview: "2",
    score: 74,
  },
  {
    interview: "3",
    score: 79,
  },
  {
    interview: "4",
    score: 85,
  },
  {
    interview: "5",
    score: 90,
  },
  {
    interview: "6",
    score: 94,
  },
];

function PerformanceChart() {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-700">

      <h2 className="text-2xl font-bold mb-6 text-white">
        📈 Interview Performance
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={performanceData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="interview"
              stroke="#94A3B8"
            />

            <YAxis
              domain={[0, 100]}
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
              }}
              activeDot={{
                r: 8,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default PerformanceChart;