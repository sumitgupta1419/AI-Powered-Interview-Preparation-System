function StatCard({
  title,
  value,
  color,
}) {

  return (

    <div
      className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800 hover:scale-105 transition"
    >

      <h3 className="text-gray-400">

        {title}

      </h3>

      <h1
        className={`text-4xl font-bold mt-4 ${color}`}
      >

        {value}

      </h1>

    </div>

  );

}

export default StatCard;