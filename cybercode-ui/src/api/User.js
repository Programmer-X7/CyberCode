import axios from "axios";

export const userSignupApi = async ({ name, username, password }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/create-coder`,
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

// Get User/Admin Account Details
export const getAccountDetailsApi = async ({ userId, token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    
    return response;
  } catch (error) {
    // Handle error
    console.log("Auth Catch");
    console.error(error);
  }
};