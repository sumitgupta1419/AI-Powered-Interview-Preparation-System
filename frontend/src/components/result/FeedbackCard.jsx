import {
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";

function FeedbackCard({ interview }) {
  // Convert feedback into an array
  const feedback =
    Array.isArray(interview?.feedback)
      ? interview.feedback
      : interview?.feedback
      ? [interview.feedback]
      : [];

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">

        <FaLightbulb className="text-yellow-400" />

        AI Feedback

      </h2>

      {feedback.length === 0 ? (

        <div className="text-gray-400">
          No feedback available.
        </div>

      ) : (

        <div className="space-y-5">

          {feedback.map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-4"
            >

              <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />

              <p className="text-gray-300">
                {item}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default FeedbackCard;