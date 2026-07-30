import {
  FaBriefcase,
  FaClock,
  FaQuestionCircle,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

function InterviewSummary() {
  const summary = [
    {
      icon: <FaBriefcase />,
      title: "Role",
      value: "Java Developer",
    },
    {
      icon: <FaStar />,
      title: "Difficulty",
      value: "Medium",
    },
    {
      icon: <FaQuestionCircle />,
      title: "Questions",
      value: "10",
    },
    {
      icon: <FaCheckCircle />,
      title: "Answered",
      value: "10",
    },
    {
      icon: <FaClock />,
      title: "Duration",
      value: "18 Minutes",
    },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-2xl font-bold mb-8">
        Interview Summary
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {summary.map((item, index) => (

          <div
            key={index}
            className="bg-slate-800 rounded-xl p-5 flex items-center gap-4"
          >

            <div className="text-cyan-400 text-3xl">
              {item.icon}
            </div>

            <div>

              <p className="text-gray-400">
                {item.title}
              </p>

              <h3 className="text-xl font-bold">
                {item.value}
              </h3>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default InterviewSummary;