import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-cyan-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-8 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-cyan-400">
              AI Interview
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Practice smarter with AI-powered mock interviews,
              resume analysis, speech evaluation, and detailed
              performance reports.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-cyan-400 cursor-pointer transition">
                Home
              </li>

              <li className="hover:text-cyan-400 cursor-pointer transition">
                Resume Analyzer
              </li>

              <li className="hover:text-cyan-400 cursor-pointer transition">
                AI Interview
              </li>

              <li className="hover:text-cyan-400 cursor-pointer transition">
                Dashboard
              </li>

              <li className="hover:text-cyan-400 cursor-pointer transition">
                Contact
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Connect With Us
            </h3>

            <div className="flex gap-5 text-2xl text-cyan-400">

              <FaGithub className="cursor-pointer hover:scale-125 transition" />

              <FaLinkedin className="cursor-pointer hover:scale-125 transition" />

              <FaTwitter className="cursor-pointer hover:scale-125 transition" />

              <FaEnvelope className="cursor-pointer hover:scale-125 transition" />

            </div>

            <p className="text-gray-400 mt-6">
              support@aiinterview.com
            </p>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-gray-500">
          © 2026 AI Interview Preparation Platform. Built with React,
          FastAPI & AI.
        </div>

      </div>
    </footer>
  );
}

export default Footer;