import API from "../api/axios";

const getToken = () => localStorage.getItem("token");

// ==========================================
// Get Resume History
// GET /api/resume
// ==========================================
export const getResumeHistory = async () => {
  const response = await API.get("/resume", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ==========================================
// Get Resume By ID
// GET /api/resume/:id
// ==========================================
export const getResumeById = async (id) => {
  const response = await API.get(`/resume/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ==========================================
// Delete Resume
// DELETE /api/resume/:id
// ==========================================
export const deleteResume = async (id) => {
  const response = await API.delete(`/resume/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};