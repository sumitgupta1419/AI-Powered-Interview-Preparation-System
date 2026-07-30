import { Link } from "react-router-dom";
import { FaRocket, FaFileAlt, FaUserCircle } from "react-icons/fa";

function Hero() {
  return (
    <section className="text-center mt-32 px-6">

      <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
        Master Your{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
          Interview Skills
        </span>
      </h1>

      <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
        Prepare smarter with AI-powered mock interviews,
        resume analysis, speech evaluation, and personalized feedback.
      </p>

      {/* Hero Buttons */}
      <div className="mt-12 flex flex-wrap justify-center gap-5">

        {/* Start Interview */}
        <Link
          to="/questions"
          className="
            flex items-center gap-3
            px-8 py-4
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-indigo-600
            font-semibold
            text-white
            hover:scale-105
            transition
            duration-300
            shadow-lg
            shadow-cyan-500/30
          "
        >
          <FaRocket />
          Start Interview
        </Link>

        {/* Resume Analyzer */}
        <Link
          to="/resume"
          className="
            flex items-center gap-3
            px-8 py-4
            rounded-xl
            border
            border-cyan-500
            text-cyan-400
            hover:bg-cyan-500
            hover:text-white
            transition
            duration-300
          "
        >
          <FaFileAlt />
          Analyze Resume
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className="
            flex items-center gap-3
            px-8 py-4
            rounded-xl
            border
            border-indigo-500
            text-indigo-400
            hover:bg-indigo-600
            hover:text-white
            transition
            duration-300
          "
        >
          <FaUserCircle />
          My Profile
        </Link>

      </div>

    </section>
  );
}

export default Hero;