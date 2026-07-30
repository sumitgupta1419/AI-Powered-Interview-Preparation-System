function SummaryCard({ summary }) {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        📄 Resume Summary
      </h2>

      <p className="text-gray-300 leading-8">
        {summary || "No summary available."}
      </p>

    </div>
  );
}

export default SummaryCard;