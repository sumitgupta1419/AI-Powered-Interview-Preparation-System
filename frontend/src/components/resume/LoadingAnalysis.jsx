function LoadingAnalysis() {
  return (
    <div className="bg-slate-900 rounded-3xl p-10 border border-slate-700 shadow-lg text-center">

      <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

      <h2 className="text-3xl font-bold text-white mt-8">
        Analyzing Resume...
      </h2>

      <p className="text-gray-400 mt-4">
        AI is reading your resume and generating feedback.
      </p>

      <div className="mt-8 bg-slate-700 rounded-full h-4 overflow-hidden">

        <div
          className="bg-cyan-500 h-4 rounded-full animate-pulse"
          style={{ width: "70%" }}
        ></div>

      </div>

    </div>
  );
}

export default LoadingAnalysis;