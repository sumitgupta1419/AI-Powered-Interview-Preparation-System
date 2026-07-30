function RecommendationCard({ recommendations }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        🎯 AI Recommendations
      </h2>

      {!recommendations || recommendations.length === 0 ? (

        <p className="text-gray-400 text-center py-6">
          Complete an interview to receive AI recommendations.
        </p>

      ) : (

        <ul className="space-y-4">

          {recommendations.map((item, index) => (

            <li
              key={index}
              className="bg-slate-800 rounded-xl p-4 hover:bg-slate-700 transition"
            >
              ✅ {item}
            </li>

          ))}

        </ul>

      )}

    </div>
  );
}

export default RecommendationCard;