import jsPDF from "jspdf";

export const downloadInterviewReport = (interview) => {
  const doc = new jsPDF();

  let y = 20;

  // ==========================
  // Title
  // ==========================
  doc.setFontSize(22);
  doc.text("AI Interview Report", 20, y);

  y += 15;

  // ==========================
  // Candidate Details
  // ==========================
  doc.setFontSize(14);

  doc.text(`Candidate : ${interview.user || "N/A"}`, 20, y);
  y += 10;

  doc.text(`Job Role : ${interview.jobRole || "N/A"}`, 20, y);
  y += 10;

  doc.text(`Experience : ${interview.experience || "N/A"}`, 20, y);
  y += 10;

  doc.text(`Difficulty : ${interview.difficulty || "N/A"}`, 20, y);
  y += 10;

  doc.text(`Overall Score : ${interview.score || 0}%`, 20, y);
  y += 20;

  // ==========================
  // Overall Feedback
  // ==========================
  doc.setFontSize(16);
  doc.text("Overall Feedback", 20, y);

  y += 10;

  doc.setFontSize(12);

  const feedback = doc.splitTextToSize(
    interview.feedback || "No feedback available.",
    170
  );

  doc.text(feedback, 20, y);

  y += feedback.length * 7 + 10;

  // ==========================
  // Skills
  // ==========================
  if (interview.skills) {

    doc.setFontSize(16);
    doc.text("Skill Analysis", 20, y);

    y += 10;

    doc.setFontSize(12);

    Object.entries(interview.skills).forEach(([skill, score]) => {

      doc.text(`${skill} : ${score}%`, 25, y);

      y += 8;

    });

    y += 5;
  }

  // ==========================
  // Strengths
  // ==========================
  if (interview.strengths?.length) {

    doc.setFontSize(16);
    doc.text("Strengths", 20, y);

    y += 10;

    doc.setFontSize(12);

    interview.strengths.forEach((item) => {

      doc.text(`• ${item}`, 25, y);

      y += 8;

    });

    y += 5;
  }

  // ==========================
  // Weaknesses
  // ==========================
  if (interview.weaknesses?.length) {

    doc.setFontSize(16);
    doc.text("Areas to Improve", 20, y);

    y += 10;

    doc.setFontSize(12);

    interview.weaknesses.forEach((item) => {

      doc.text(`• ${item}`, 25, y);

      y += 8;

    });

    y += 5;
  }

  // ==========================
  // Recommendations
  // ==========================
  if (interview.recommendations?.length) {

    doc.setFontSize(16);
    doc.text("AI Recommendations", 20, y);

    y += 10;

    doc.setFontSize(12);

    interview.recommendations.forEach((item) => {

      const lines = doc.splitTextToSize(`• ${item}`, 165);

      doc.text(lines, 25, y);

      y += lines.length * 7;

    });

  }

  // ==========================
  // Footer
  // ==========================
  doc.setFontSize(10);

  doc.text(
    `Generated on ${new Date().toLocaleString()}`,
    20,
    285
  );

  doc.save("AI_Interview_Report.pdf");
};