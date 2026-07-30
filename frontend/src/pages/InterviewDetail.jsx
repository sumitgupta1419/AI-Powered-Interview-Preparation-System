import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getInterviewById } from "../services/interviewService";

function InterviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await getInterviewById(id);
        setInterview(response.interview);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white text-3xl">
        Loading Interview...
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white text-3xl">
        Interview Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white py-10 px-6">

      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-xl"
        >
          ← Back
        </button>

        <h1 className="text-5xl font-bold mb-6">
          {interview.jobRole}
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-2">
              Overall Score
            </h2>

            <div className="text-5xl text-cyan-400 font-bold">
              {interview.score}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-2">
              Overall Feedback
            </h2>

            <p className="text-gray-300">
              {interview.feedback}
            </p>
          </div>

        </div>

        <div className="space-y-8">

          {interview.questions.map((item, index) => (

            <div
              key={index}
              className="bg-slate-900 rounded-3xl border border-slate-700 p-8"
            >

              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Question {index + 1}
              </h2>

              <p className="mb-6 text-xl">
                {item.question}
              </p>

              <div className="mb-4">

                <h3 className="font-bold mb-2">
                  Your Answer
                </h3>

                <p className="text-gray-300">
                  {item.answer || "Not Answered"}
                </p>

              </div>

              <div className="mb-4">

                <h3 className="font-bold mb-2">
                  AI Score
                </h3>

                <div className="text-3xl font-bold text-green-400">
                  {item.score ?? 0}/10
                </div>

              </div>

              <div>

                <h3 className="font-bold mb-2">
                  AI Feedback
                </h3>

                <p className="text-gray-300">
                  {item.feedback || "No feedback"}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default InterviewDetail;