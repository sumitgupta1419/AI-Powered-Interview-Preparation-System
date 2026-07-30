import { useEffect, useState } from "react";

function AnswerBox({ value, onChange }) {
  const [answer, setAnswer] = useState("");

  // Update textarea whenever parent changes value
  useEffect(() => {
    setAnswer(value || "");
  }, [value]);

  const handleChange = (e) => {
    const text = e.target.value;

    setAnswer(text);

    if (onChange) {
      onChange(text);
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        💬 Your Answer
      </h2>

      <textarea
        rows={8}
        value={answer}
        onChange={handleChange}
        placeholder="Write your answer here..."
        maxLength={3000}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-5 text-white resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <div className="flex justify-between items-center mt-3 text-sm text-gray-400">

        <span>
          Give a clear and detailed answer.
        </span>

        <span>
          {answer.length}/3000
        </span>

      </div>

    </div>
  );
}

export default AnswerBox;