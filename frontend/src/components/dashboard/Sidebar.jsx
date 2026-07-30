import { Link } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaRobot,
  FaChartBar,
  FaUser,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 min-h-screen">

      <div className="p-6">

        <h1 className="text-3xl font-bold text-cyan-400">
          AI Prep
        </h1>

      </div>

      <nav className="flex flex-col px-4 gap-3">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl bg-cyan-500 text-white"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/resume"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <FaFileAlt />
          Resume
        </Link>

        <Link
          to="/interview"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <FaRobot />
          Interview
        </Link>

        <Link
          to="/result"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <FaChartBar />
          Results
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <FaUser />
          Profile
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <FaCog />
          Settings
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;