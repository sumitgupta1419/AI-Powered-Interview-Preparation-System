function MissingKeywords({ keywords = [] }) {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">
      <h2 className="text-3xl font-bold mb-6">
        Missing Skills / Keywords
      </h2>

      {keywords.length === 0 ? (
        <p className="text-green-400">
          🎉 No important keywords are missing.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default MissingKeywords;