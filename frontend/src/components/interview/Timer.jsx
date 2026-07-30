import { useEffect, useRef, useState } from "react";

function Timer({
  duration = 60,
  currentQuestion,
  onTimeUp,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Prevent multiple calls
  const timerFinished = useRef(false);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(duration);
    timerFinished.current = false;
  }, [currentQuestion, duration]);

  // Countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!timerFinished.current) {
        timerFinished.current = true;

        if (onTimeUp) {
          onTimeUp();
        }
      }

      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Progress Percentage
  const percentage = (timeLeft / duration) * 100;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg">

      <div className="flex justify-between items-center mb-4">

        <h3 className="text-xl font-bold">
          ⏱ Time Remaining
        </h3>

        <span
          className={`text-3xl font-bold ${
            timeLeft <= 10
              ? "text-red-500 animate-pulse"
              : "text-cyan-400"
          }`}
        >
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </span>

      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

        <div
          className={`h-full transition-all duration-1000 ${
            timeLeft <= 10
              ? "bg-red-500"
              : "bg-cyan-500"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      {timeLeft <= 10 && (
        <p className="text-center text-red-400 mt-3 font-semibold animate-pulse">
          Hurry up! Time is running out.
        </p>
      )}

    </div>
  );
}

export default Timer;