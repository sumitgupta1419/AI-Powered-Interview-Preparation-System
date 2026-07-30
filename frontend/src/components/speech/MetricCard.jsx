function MetricCard({
  title,
  value,
  color = "text-cyan-400",
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-700">

      <h3 className="text-gray-400 text-lg">
        {title}
      </h3>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>

    </div>
  );
}

export default MetricCard;