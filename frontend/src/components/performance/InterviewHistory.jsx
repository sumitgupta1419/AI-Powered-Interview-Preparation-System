import {
  FaJava,
  FaReact,
  FaDatabase,
  FaArrowRight,
} from "react-icons/fa";

const interviews = [
  {
    role: "Java Developer",
    date: "28 June 2026",
    score: "92%",
    icon: <FaJava />,
    color: "text-orange-500",
  },
  {
    role: "Full Stack Developer",
    date: "26 June 2026",
    score: "88%",
    icon: <FaReact />,
    color: "text-cyan-400",
  },
  {
    role: "Data Scientist",
    date: "24 June 2026",
    score: "85%",
    icon: <FaDatabase />,
    color: "text-green-400",
  },
];

function InterviewHistory() {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-700">

      <h2 className="text-2xl font-bold mb-6">
        📅 Recent Interviews
      </h2>

      <div className="space-y-5">

        {interviews.map((item, index) => (

          <div
            key={index}
            className="flex justify-between items-center bg-slate-800 rounded-xl p-4 hover:bg-slate-700 transition"
          >

            <div className="flex items-center gap-4">

              <div className={`text-3xl ${item.color}`}>
                {item.icon}
              </div>

              <div>

                <h3 className="font-semibold text-lg">
                  {item.role}
                </h3>

                <p className="text-gray-400 text-sm">
                  {item.date}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-5">

              <span className="text-green-400 text-xl font-bold">
                {item.score}
              </span>

              <FaArrowRight className="text-gray-400" />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default InterviewHistory;