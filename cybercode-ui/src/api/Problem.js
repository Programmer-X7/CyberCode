import axios from "axios";

// Create Problem
// export const createProblemApi = async ({ userId, token }) => {
//   try {
//     const response = await axios.get(
//       `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return response;
//   } catch (error) {
//     // Handle error
//     console.error(error);
//   }
// };

// Get All Problems
export const getAllProblemsApi = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/problems/all`
    );

    return response;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

//  Get Problem Details
export const getProblemDetailsApi = async (problemId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/problems/${problemId}`
    );

    return response;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};
