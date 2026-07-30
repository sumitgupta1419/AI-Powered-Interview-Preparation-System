const Interview = require("../models/Interview");
const User = require("../models/User");

const {
  generateInterviewQuestions,
  evaluateAnswer,
  generateOverallFeedback,
} = require("../services/geminiService");

// ========================================
// Create Interview
// ========================================
const createInterview = async (req, res) => {
  try {
    const {
      jobRole,
      experience,
      difficulty,
      questionCount,
    } = req.body;

    if (
      !jobRole ||
      !experience ||
      !difficulty ||
      !questionCount
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const questions = await generateInterviewQuestions(
      jobRole,
      experience,
      difficulty,
      Number(questionCount)
    );

    const interview = await Interview.create({
      user: req.user.id,
      jobRole,
      experience,
      difficulty,
      questionCount: Number(questionCount),
      questions,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Interview created successfully.",
      interview,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

// ========================================
// Submit Answer
// ========================================
const submitAnswer = async (req,res)=>{

  try{

    const {questionIndex,answer}=req.body;

    const interview=await Interview.findOne({
      _id:req.params.id,
      user:req.user.id,
    });

    if(!interview){

      return res.status(404).json({
        success:false,
        message:"Interview not found."
      });

    }

    const evaluation=await evaluateAnswer(

      interview.questions[questionIndex].question,

      answer

    );

    interview.questions[questionIndex].answer=answer;

    interview.questions[questionIndex].score=evaluation.score;

    interview.questions[questionIndex].feedback=evaluation.feedback;

    await interview.save();

    return res.status(200).json({

      success:true,

      message:"Answer submitted.",

      question:interview.questions[questionIndex]

    });

  }

  catch(error){

    console.error(error);

    return res.status(500).json({

      success:false,

      message:error.message

    });

  }

};

// ========================================
// Finish Interview
// ========================================



// ========================================
// Finish Interview
// ========================================
const finishInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found.",
      });
    }

    // Prevent finishing twice
    if (interview.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Interview already completed.",
      });
    }

    // Generate AI Feedback
    const result = await generateOverallFeedback(interview.questions);

    interview.score = result.score;
    interview.feedback = result.feedback;
    interview.skills = result.skills;
    interview.strengths = result.strengths;
    interview.weaknesses = result.weaknesses;
    interview.recommendations = result.recommendations;
    interview.status = "Completed";

    await interview.save();

    // ======================================
    // Increase Interview Count of User
    // ======================================

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $inc: {
          interviewsTaken: 1,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Interview completed successfully.",
      interview,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// Get Interview By Id
// ========================================
const getInterviewById=async(req,res)=>{

  try{

    const interview=await Interview.findOne({

      _id:req.params.id,

      user:req.user.id,

    });

    if(!interview){

      return res.status(404).json({

        success:false,

        message:"Interview not found."

      });

    }

    return res.status(200).json({

      success:true,

      interview

    });

  }

  catch(error){

    console.error(error);

    return res.status(500).json({

      success:false,

      message:error.message

    });

  }

};

// ========================================
// Interview History
// ========================================
const getInterviewHistory=async(req,res)=>{

  try{

    const interviews=await Interview.find({

      user:req.user.id

    }).sort({

      createdAt:-1

    });

    return res.status(200).json({

      success:true,

      count:interviews.length,

      interviews

    });

  }

  catch(error){

    console.error(error);

    return res.status(500).json({

      success:false,

      message:error.message

    });

  }

};

// ========================================
// Delete Interview
// ========================================
const deleteInterview=async(req,res)=>{

  try{

    const interview=await Interview.findOne({

      _id:req.params.id,

      user:req.user.id,

    });

    if(!interview){

      return res.status(404).json({

        success:false,

        message:"Interview not found."

      });

    }

    await Interview.findByIdAndDelete(req.params.id);

    return res.status(200).json({

      success:true,

      message:"Interview deleted successfully."

    });

  }

  catch(error){

    console.error(error);

    return res.status(500).json({

      success:false,

      message:error.message

    });

  }

};

module.exports={

  createInterview,

  submitAnswer,

  finishInterview,

  getInterviewById,

  getInterviewHistory,

  deleteInterview,

};