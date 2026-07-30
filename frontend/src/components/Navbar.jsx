import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-slate-950 text-white">
      <h1 className="text-2xl font-bold text-cyan-400">
        AI Interview Prep
      </h1>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-5 py-2 rounded-lg border border-cyan-500 hover:bg-cyan-500 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;