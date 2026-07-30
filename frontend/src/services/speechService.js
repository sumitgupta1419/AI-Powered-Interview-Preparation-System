import API from "../api/axios";

// ======================================
// Get JWT Token
// ======================================
const getToken = () => localStorage.getItem("token");

// ======================================
// Upload Speech
// POST /api/speech/upload
// ======================================
export const uploadSpeech = async (audioBlob) => {
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
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ======================================
// Get My Speech History
// GET /api/speech/my-speeches
// ======================================
export const getSpeechHistory = async () => {
  const response = await API.get(
    "/speech/my-speeches",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// ======================================
// Get Speech By ID
// GET /api/speech/:id
// ======================================
export const getSpeechById = async (id) => {
  const response = await API.get(
    `/speech/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// ======================================
// Delete Speech
// DELETE /api/speech/:id
// ======================================
export const deleteSpeech = async (id) => {
  const response = await API.delete(
    `/speech/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};