import axios from "axios";

// Get Problem starred status
export const hasProblemStarredApi = async (userId, problemId, token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/starred-problems/has-starred`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
          problemId: problemId,
        },
      }
    );

    return response;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

// Star Problem
export const starProblemApi = async (userId, problemId, token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/starred-problems/star`,
      null,
      {
        params: {
          userId: userId,
          problemId: problemId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

// Star Problem
export const unStarProblemApi = async (userId, problemId, token) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/starred-problems/unstar`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
          problemId: problemId,
        },
      }
    );

    return response;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

// Get All Starred Problems for a User
export const getAllStarredProblemsApi = async (userId, token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/starred-problems/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};
