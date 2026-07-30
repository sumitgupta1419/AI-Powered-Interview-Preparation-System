import { FaArrowUp } from "react-icons/fa";

function StatsCard({
  title,
  value,
  icon,
  color = "text-cyan-400",
  bg = "bg-slate-900",
  subtitle = "Updated Today",
}) {
  return (
    <div
      className={`${bg} rounded-3xl p-6 shadow-lg border border-slate-700 hover:border-cyan-500 hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300`}
    >
      {/* Top */}
      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-400 text-sm">
            {title}
          </p>

          <h2 className={`text-4xl font-bold mt-3 ${color}`}>
            {value}
          </h2>
        </div>

        <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-3xl">
          {icon}
        </div>

      </div>

      {/* Bottom */}

      <div className="mt-6 flex items-center justify-between">

        <span className="text-gray-500 text-sm">
          {subtitle}
        </span>

        <span className="flex items-center gap-1 text-green-400 text-sm font-semibold">
          <FaArrowUp />
          +12%
        </span>

      </div>

    </div>
  );
}

export default StatsCard;