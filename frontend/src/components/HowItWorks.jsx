function HowItWorks() {
  const steps = [
    "Upload Resume",
    "AI Analyzes Resume",
    "Start Mock Interview",
    "Get Feedback Report",
  ];

  return (
    <section className="py-20 px-10">
      <h2 className="text-4xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-slate-900 rounded-2xl p-6 text-center"
          >
            <div className="w-12 h-12 bg-cyan-500 rounded-full mx-auto flex items-center justify-center font-bold">
              {index + 1}
            </div>

            <h3 className="mt-4 font-semibold">
              {step}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;