const User = require("../models/User");
const Resume = require("../models/Resume");
const Speech = require("../models/Speech");
const bcrypt = require("bcryptjs");

// ======================================
// Get User Profile + Statistics
// GET /api/profile
// ======================================

const getProfile = async (req, res) => {
  try {
    console.log("🔥 GET PROFILE API CALLED");

    // ======================================
    // Find User
    // ======================================

    const user = await User.findById(req.user.id)
      .select("-password")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ======================================
    // Resume & Speech Count
    // ======================================

    const [resumeCount, speechCount] = await Promise.all([
      Resume.countDocuments({ user: req.user.id }),
      Speech.countDocuments({ user: req.user.id }),
    ]);

    // ======================================
    // Average ATS Score
    // ======================================

    const atsResult = await Resume.aggregate([
      {
        $match: {
          user: user._id,
        },
      },
      {
        $group: {
          _id: null,
          avg: {
            $avg: "$atsScore",
          },
        },
      },
    ]);

    const averageATS =
      atsResult.length > 0
        ? Math.round(atsResult[0].avg)
        : 0;

    // ======================================
    // Average Speech Score
    // ======================================

    const speechResult = await Speech.aggregate([
      {
        $match: {
          user: user._id,
        },
      },
      {
        $group: {
          _id: null,
          avg: {
            $avg: "$overallScore",
          },
        },
      },
    ]);

    const averageSpeech =
      speechResult.length > 0
        ? Math.round(speechResult[0].avg)
        : 0;

    // ======================================
    // Interview Count
    // ======================================

    const interviewCount =
      user.interviewsTaken || 0;

    // ======================================
    // Statistics Object
    // ======================================

    const statistics = {
      resumeCount,
      speechCount,
      mockInterviewCount: interviewCount,
      averageATS,
      averageSpeech,
      totalActivities:
        resumeCount +
        speechCount +
        interviewCount,
    };

    // ======================================
    // Achievements
    // ======================================

    const achievements = [
      {
        title: "First Resume Uploaded",
        description: "Upload your first resume.",
        unlocked: resumeCount > 0,
      },
      {
        title: "First Speech Evaluation",
        description:
          "Complete your first speech analysis.",
        unlocked: speechCount > 0,
      },
      {
        title: "Interview Explorer",
        description:
          "Complete 5 AI interviews.",
        unlocked: interviewCount >= 5,
      },
      {
        title: "90+ ATS Score",
        description:
          "Achieve an ATS score above 90.",
        unlocked: averageATS >= 90,
      },
      {
        title: "Speech Expert",
        description:
          "Achieve an average speech score above 90.",
        unlocked: averageSpeech >= 90,
      },
      {
        title: "Interview Master",
        description:
          "Complete 20 AI interviews.",
        unlocked: interviewCount >= 20,
      },
    ];

    // ======================================
    // Recent Activity
    // ======================================

    const recentActivity = {
      resumeAnalyses: resumeCount,
      speechEvaluations: speechCount,
      mockInterviews: interviewCount,
      averageATS,
    };

    // ======================================
    // Final Response
    // ======================================

    return res.status(200).json({
      success: true,
      user,
      statistics,
      achievements,
      recentActivity,
    });

  } catch (error) {

    console.error("Get Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ======================================
// Update Profile
// PUT /api/profile
// ======================================

const updateProfile = async (req, res) => {
  try {

    const {
      name,
      targetRole,
      college,
      branch,
      graduationYear,
      skills,
      profilePicture,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ===============================
    // Update Fields
    // ===============================

    if (name !== undefined)
      user.name = name;

    if (targetRole !== undefined)
      user.targetRole = targetRole;

    if (college !== undefined)
      user.college = college;

    if (branch !== undefined)
      user.branch = branch;

    if (graduationYear !== undefined)
      user.graduationYear = graduationYear;

    if (profilePicture !== undefined)
      user.profilePicture = profilePicture;

    if (skills !== undefined) {

      if (Array.isArray(skills)) {

        user.skills = skills;

      } else {

        user.skills = skills
          .split(",")
          .map(skill => skill.trim())
          .filter(Boolean);

      }

    }

    await user.save();

    const updatedUser = await User.findById(req.user.id)
      .select("-password")
      .lean();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });

  } catch (error) {

    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Change Password
// PUT /api/profile/change-password
// ======================================

const changePassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {

      return res.status(400).json({
        success: false,
        message: "Current and new password are required.",
      });

    }

    const user = await User.findById(req.user.id);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found.",
      });

    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });

    }

    user.password = newPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });

  } catch (error) {

    console.error("Change Password Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================================
// Exports
// ======================================

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};
