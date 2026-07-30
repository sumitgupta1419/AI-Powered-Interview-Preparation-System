import API from "../api/axios";

// ======================================
// Get JWT Token
// ======================================

const getToken = () => localStorage.getItem("token");

// ======================================
// Common Auth Header
// ======================================

const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
});

// ======================================
// Upload Speech
// POST /api/speech/upload
// ======================================

export const uploadSpeech = async (audioBlob) => {
  try {
    const formData = new FormData();

    formData.append(
      "audio",
      audioBlob,
      `speech-${Date.now()}.webm`
    );

    const response = await API.post(
      "/speech/upload",
      formData,
      {
        headers: {
          ...authHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;

  } catch (error) {
    throw error;
  }
};

// ======================================
// Get Speech History
// GET /api/speech
// ======================================

export const getSpeechHistory = async () => {
  try {
    const response = await API.get("/speech", {
      headers: authHeader(),
    });

    return response.data;

  } catch (error) {
    throw error;
  }
};

// ======================================
// Get Single Speech Report
// GET /api/speech/:id
// ======================================

export const getSpeechById = async (id) => {
  try {
    const response = await API.get(
      `/speech/${id}`,
      {
        headers: authHeader(),
      }
    );

    return response.data;

  } catch (error) {
    throw error;
  }
};

// ======================================
// Delete Speech
// DELETE /api/speech/:id
// ======================================

export const deleteSpeech = async (id) => {
  try {
    const response = await API.delete(
      `/speech/${id}`,
      {
        headers: authHeader(),
      }
    );

    return response.data;

  } catch (error) {
    throw error;
  }
};