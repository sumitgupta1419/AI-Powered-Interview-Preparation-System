import { FaFilePdf } from "react-icons/fa";

function ResumePreview({ file }) {
  if (!file) return null;

  const size = (file.size / 1024).toFixed(2);

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        📁 Uploaded Resume
      </h2>

      <div className="flex items-center gap-5">

        <FaFilePdf className="text-red-500 text-5xl" />

        <div>

          <h3 className="text-xl font-semibold text-white">
            {file.name}
          </h3>

          <p className="text-gray-400 mt-2">
            {size} KB
          </p>

          <p className="text-green-400 mt-2">
            ✓ Ready for analysis
          </p>

        </div>

      </div>

    </div>
  );
}

export default ResumePreview;