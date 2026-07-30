import API from "../api/axios";

const getToken = () => localStorage.getItem("token");

// ===============================
// Upload Resume
// ===============================
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await API.post("/resume/upload", formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ===============================
// Get Resume History
// ===============================
export const getResumeHistory = async () => {
  const response = await API.get("/resume", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ===============================
// Get Resume By ID
// ===============================
export const getResumeById = async (id) => {
  const response = await API.get(`/resume/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// ===============================
// Delete Resume
// ===============================
export const deleteResume = async (id) => {
  const response = await API.delete(`/resume/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
