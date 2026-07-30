import {
  FaFileAlt,
  FaMicrophone,
  FaComments,
  FaChartLine,
  FaStar,
} from "react-icons/fa";

function StatisticsCard({ statistics }) {

  const stats = [
    {
      title: "Resume Analyses",
      value: statistics?.resumeCount ?? 0,
      icon: <FaFileAlt />,
      color: "bg-cyan-600",
    },
    {
      title: "Speech Evaluations",
      value: statistics?.speechCount ?? 0,
      icon: <FaMicrophone />,
      color: "bg-purple-600",
    },
    {
      title: "Mock Interviews",
      value: statistics?.mockInterviewCount ?? 0,
      icon: <FaComments />,
      color: "bg-green-600",
    },
    {
      title: "Average ATS Score",
      value: `${statistics?.averageATS ?? 0}%`,
      icon: <FaChartLine />,
      color: "bg-orange-600",
    },
    {
      title: "Average Speech Score",
      value: `${statistics?.averageSpeech ?? 0}%`,
      icon: <FaStar />,
      color: "bg-pink-600",
    },
    {
      title: "Total Activities",
      value: statistics?.totalActivities ?? 0,
      icon: <FaChartLine />,
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-8">
        Statistics
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-6 hover:scale-105 transition duration-300"
          >
            <div
              className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center text-2xl`}
            >
              {item.icon}
            </div>

            <h3 className="mt-5 text-gray-400">
              {item.title}
            </h3>

            <p className="text-4xl font-bold mt-2">
              {item.value}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default StatisticsCard;