import { Link } from "react-router-dom";
import {
  FaBrain,
  FaFileAlt,
  FaMicrophone,
  FaChartBar,
  FaArrowRight,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      title: "AI Questions",
      description:
        "Generate role-based interview questions with customizable difficulty levels.",
      icon: <FaBrain size={42} />,
      link: "/questions",
      color: "text-cyan-400",
    },
    {
      title: "Resume Analysis",
      description:
        "Upload your resume and receive AI-powered feedback and improvement suggestions.",
      icon: <FaFileAlt size={42} />,
      link: "/resume",
      color: "text-green-400",
    },
    {
      title: "Speech Evaluation",
      description:
        "Analyze confidence, fluency, pronunciation and communication skills.",
      icon: <FaMicrophone size={42} />,
      link: "/speech",
      color: "text-pink-400",
    },
    {
      title: "Performance Dashboard",
      description:
        "Visualize interview progress with charts, analytics and AI recommendations.",
      icon: <FaChartBar size={42} />,
      link: "/performance",
      color: "text-yellow-400",
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#020617] text-white">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            🚀 Platform Features
          </h2>

          <p className="text-gray-400 mt-5 text-lg max-w-3xl mx-auto">
            Prepare smarter with AI-powered interview practice, resume
            analysis, speech evaluation and performance tracking.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <Link
              key={index}
              to={feature.link}
            >

              <div
                className="
                  h-full
                  bg-slate-900/80
                  backdrop-blur-lg
                  border
                  border-slate-700
                  rounded-3xl
                  p-8
                  hover:border-cyan-400
                  hover:shadow-2xl
                  hover:shadow-cyan-500/20
                  hover:-translate-y-3
                  transition-all
                  duration-300
                  group
                "
              >

                {/* Icon */}

                <div
                  className={`${feature.color} mb-8 group-hover:scale-110 transition`}
                >
                  {feature.icon}
                </div>

                {/* Title */}

                <h3 className="text-2xl font-bold mb-4">
                  {feature.title}
                </h3>

                {/* Description */}

                <p className="text-gray-400 leading-7">
                  {feature.description}
                </p>

                {/* Button */}

                <button
                  className="
                    mt-10
                    w-full
                    py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-indigo-600
                    hover:from-cyan-400
                    hover:to-indigo-500
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                  "
                >
                  Open Feature
                  <FaArrowRight />
                </button>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;