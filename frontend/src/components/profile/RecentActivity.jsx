import {
  FaFileAlt,
  FaMicrophone,
  FaBrain,
  FaChartLine,
} from "react-icons/fa";

function RecentActivity({ activities }) {

  const recent = [
    {
      icon: <FaFileAlt />,
      title: "Resume Analyses",
      value: `${activities?.resumeAnalyses ?? 0} Completed`,
      color: "text-green-400",
    },
    {
      icon: <FaMicrophone />,
      title: "Speech Evaluations",
      value: `${activities?.speechEvaluations ?? 0} Completed`,
      color: "text-pink-400",
    },
    {
      icon: <FaBrain />,
      title: "Mock Interviews",
      value: `${activities?.mockInterviews ?? 0} Completed`,
      color: "text-cyan-400",
    },
    {
      icon: <FaChartLine />,
      title: "Average ATS Score",
      value: `${activities?.averageATS ?? 0}%`,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-3xl font-bold mb-8">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {recent.map((activity, index) => (

          <div
            key={index}
            className="flex items-center gap-5 bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 transition"
          >

            <div className={`text-3xl ${activity.color}`}>
              {activity.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-lg">
                {activity.title}
              </h3>

              <p className="text-gray-400 mt-1">
                {activity.value}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentActivity;