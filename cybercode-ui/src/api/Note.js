import axios from "axios";
import toast from "react-hot-toast";

// Fetch Note
export const getNoteApi = async (userId, problemId, token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/notes`,
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

// Save Note
export const saveNoteApi = async (token, noteContent) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/notes/save`,
      noteContent,
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

// Delete Note
export const deleteNoteApi = async (token, userId, problemId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/notes/delete`,
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
    toast.error("Failed to delete note! Try again later.");
  }
};
