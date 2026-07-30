import { FaChartLine, FaUserTie, FaBrain } from "react-icons/fa";

function DashboardPreview() {
  return (
    <section className="py-24 px-8">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold">
          Smart Interview Dashboard
        </h2>

        <p className="text-gray-400 mt-4">
          Track progress, confidence score, and AI insights.
        </p>
      </div>

      <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 rounded-2xl p-6">
            <FaUserTie size={35} className="text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold">Interviews</h3>
            <p className="text-4xl font-bold mt-4">42</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <FaBrain size={35} className="text-indigo-400 mb-4" />
            <h3 className="text-xl font-semibold">AI Score</h3>
            <p className="text-4xl font-bold mt-4">89%</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <FaChartLine size={35} className="text-green-400 mb-4" />
            <h3 className="text-xl font-semibold">Confidence</h3>
            <p className="text-4xl font-bold mt-4">91%</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DashboardPreview;