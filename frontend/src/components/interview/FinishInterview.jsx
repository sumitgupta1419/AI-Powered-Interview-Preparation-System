import { Link } from "react-router-dom";

function FinishInterview() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">

      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">

        {/* Success Icon */}
        <div className="text-7xl mb-6">
          🎉
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Interview Completed Successfully
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg mb-10">
          Your answers have been submitted successfully.
          <br />
          AI has evaluated your interview.
          <br />
          Click below to view your complete performance report.
        </p>

        {/* Button */}
        <Link to="/result">

          <button
            className="bg-green-600 hover:bg-green-700 transition-all duration-300 px-10 py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105"
          >
            📊 View Result
          </button>

        </Link>

      </div>

    </div>
  );
}

export default FinishInterview;