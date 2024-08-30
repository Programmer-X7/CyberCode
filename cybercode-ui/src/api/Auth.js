import axios from "axios";

export const loginApi = async ({ username, password }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      {
        username: username,
        password: password,
      }
    );
    return response;
  } catch (error) {
    // Handle error
    console.log("Auth Catch");
    console.error(error);
  }
};
