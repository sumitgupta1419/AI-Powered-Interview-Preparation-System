import { FaAward } from "react-icons/fa";

function ResultHeader() {
  return (
    <div className="text-center mb-10">

      <div className="flex justify-center mb-4">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-full">
          <FaAward className="text-white text-5xl" />
        </div>
      </div>

      <h1 className="text-5xl font-bold text-white">
        Interview Results
      </h1>

      <p className="text-gray-400 mt-4 text-lg">
        Your AI interview performance summary
      </p>

    </div>
  );
}

export default ResultHeader;