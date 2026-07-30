const Interview = require("../models/Interview");

// ======================================
// Dashboard Statistics
// ======================================
const getDashboardStats = async (req, res) => {
  try {
    // Total Interviews
    const totalInterviews = await Interview.countDocuments({
      user: req.user.id,
    });

    // Completed Interviews
    const completedInterviews = await Interview.countDocuments({
      user: req.user.id,
      status: "Completed",
    });

    // Pending Interviews
    const pendingInterviews = await Interview.countDocuments({
      user: req.user.id,
      status: "Pending",
    });

    // Completed Interview List
    const completed = await Interview.find({
      user: req.user.id,
      status: "Completed",
    });

    let averageScore = 0;

    if (completed.length > 0) {
      const totalScore = completed.reduce(
        (sum, interview) => sum + (interview.score || 0),
        0
      );

      averageScore = Number(
        (totalScore / completed.length).toFixed(2)
      );
    }

    // Latest Completed Interview
    const latestInterview = await Interview.findOne({
      user: req.user.id,
      status: "Completed",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,

      stats: {
        totalInterviews,
        completedInterviews,
        pendingInterviews,
        averageScore,
      },

      skills: latestInterview?.skills || {},

      strengths: latestInterview?.strengths || [],

      weaknesses: latestInterview?.weaknesses || [],

      recommendations:
        latestInterview?.recommendations || [],
    });

  } catch (error) {

    console.error("Dashboard Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics.",
    });

  }
};

// ======================================
// Recent Interviews
// ======================================
const getRecentInterviews = async (req, res) => {
  try {

    const interviews = await Interview.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "jobRole difficulty score status createdAt"
      );

    res.status(200).json({
      success: true,
      recentInterviews: interviews,
    });

  } catch (error) {

    console.error("Recent Interviews Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load recent interviews.",
    });

  }
};

// ======================================
// Performance
// ======================================
const getPerformance = async (req, res) => {
  try {

    const interviews = await Interview.find({
      user: req.user.id,
      status: "Completed",
    });

    if (interviews.length === 0) {

      return res.status(200).json({
        success: true,
        performance: {
          highestScore: 0,
          lowestScore: 0,
          averageScore: 0,
          completedInterviews: 0,
        },
      });

    }

    const scores = interviews.map(
      (interview) => interview.score || 0
    );

    const highestScore = Math.max(...scores);

    const lowestScore = Math.min(...scores);

    const averageScore = Number(
      (
        scores.reduce((sum, score) => sum + score, 0) /
        scores.length
      ).toFixed(2)
    );

    res.status(200).json({
      success: true,
      performance: {
        highestScore,
        lowestScore,
        averageScore,
        completedInterviews: interviews.length,
      },
    });

  } catch (error) {

    console.error("Performance Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load performance.",
    });

  }
};

module.exports = {
  getDashboardStats,
  getRecentInterviews,
  getPerformance,
};