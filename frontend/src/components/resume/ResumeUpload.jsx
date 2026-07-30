import { useRef, useState } from "react";

function ResumeUpload({ onFileSelect }) {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);

  // ==========================================
  // Handle File Selection
  // ==========================================
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // PDF only
    if (selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    // Max Size (5 MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Maximum allowed file size is 5 MB.");
      return;
    }

    setFile(selectedFile);

    if (onFileSelect) {
      onFileSelect(selectedFile);
    }
  };

  // ==========================================
  // File Size
  // ==========================================
  const fileSize =
    file &&
    (file.size >= 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${(file.size / 1024).toFixed(2)} KB`);

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-3xl font-bold mb-8">
        Upload Resume
      </h2>

      <p className="text-gray-400 mb-6">
        Upload your resume in PDF format (Maximum 5 MB).
      </p>

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Select Button */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition"
      >
        📄 Select Resume
      </button>

      {/* Selected File */}
      {file && (
        <div className="mt-8 bg-slate-800 rounded-2xl p-5 border border-slate-700">

          <h3 className="text-green-400 font-bold text-lg mb-3">
            Selected Resume
          </h3>

          <p className="text-gray-200 break-all">
            {file.name}
          </p>

          <p className="text-gray-400 mt-2">
            Size : {fileSize}
          </p>

          <button
            onClick={() => fileInputRef.current.click()}
            className="mt-5 bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-lg transition"
          >
            Choose Another File
          </button>

        </div>
      )}

    </div>
  );
}

export default ResumeUpload;