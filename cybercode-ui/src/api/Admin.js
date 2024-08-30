import axios from "axios";

// Create Admin
export const createAdminApi = async ({ name, username, password }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/create-admin`,
      {
        name: name,
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