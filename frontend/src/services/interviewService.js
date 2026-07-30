import API from "../api/axios";

// ======================================
// Authorization Header
// ======================================
const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw {
      success: false,
      message: "User is not authenticated.",
    };
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ======================================
// Common Error Handler
// ======================================
const handleError = (error, defaultMessage) => {
  console.error(error);

  throw (
    error.response?.data || {
      success: false,
      message: defaultMessage,
    }
  );
};

// ======================================
// Create Interview
// ======================================
export const createInterview = async (data) => {
  try {
    const response = await API.post(
      "/interview/create",
      data,
      getAuthHeader()
    );

    return response.data;
  } catch (error) {
    handleError(error, "Unable to create interview.");
  }
};

// ======================================
// Submit Answer
// ======================================
export const submitAnswer = async (
  interviewId,
  questionIndex,
  answer
) => {
  try {
    const response = await API.post(
      `/interview/${interviewId}/answer`,
      {
        questionIndex,
        answer,
      },
      getAuthHeader()
    );

    return response.data;
  } catch (error) {
    handleError(error, "Unable to submit answer.");
  }
};

// ======================================
// Finish Interview
// ======================================
export const finishInterview = async (interviewId) => {
  try {
    const response = await API.post(
      `/interview/${interviewId}/finish`,
      {},
      getAuthHeader()
    );

    return response.data;
  } catch (error) {
    handleError(error, "Unable to finish interview.");
  }
};

// ======================================
// Get Single Interview
// ======================================
export const getInterviewById = async (interviewId) => {
  try {
    const response = await API.get(
      `/interview/${interviewId}`,
      getAuthHeader()
    );

    return response.data;
  } catch (error) {
    handleError(error, "Unable to fetch interview.");
  }
};

// ======================================
// Get Interview History
// ======================================
export const getInterviewHistory = async () => {
  try {
    const response = await API.get(
      "/interview/history",
      getAuthHeader()
    );

    return response.data;
  } catch (error) {
    handleError(error, "Unable to fetch interview history.");
  }
};

// ======================================
// Delete Interview
// ======================================
export const deleteInterview = async (interviewId) => {
  try {
    const response = await API.delete(
      `/interview/${interviewId}`,
      getAuthHeader()
    );

    return response.data;
  } catch (error) {
    handleError(error, "Unable to delete interview.");
  }
};