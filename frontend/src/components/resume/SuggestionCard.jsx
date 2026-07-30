function SuggestionCard({ suggestions = [] }) {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-2xl font-bold text-white mb-6">
        💡 AI Suggestions
      </h2>

      <ul className="space-y-4">

        {suggestions.map((item, index) => (

          <li
            key={index}
            className="bg-slate-800 p-4 rounded-xl"
          >
            ✅ {item}
          </li>

        ))}

      </ul>

    </div>
  );
}

export default SuggestionCard;