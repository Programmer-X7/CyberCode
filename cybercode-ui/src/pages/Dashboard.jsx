import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fun();
  }, []);

  const fun = async () => {
    // Get the token from the cookie
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwtToken="));
    const token = tokenCookie ? tokenCookie.split("=")[1] : null;

    if (token) {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/private/health-check",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        // Handle the response data here
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Redirect to the /do-login page
          navigate("/do-login");
        } else {
          console.error("Dashboard page says: " + error.message);
        }
      }
    } else {
      // Redirect to the /do-login page if token is not found
      navigate("/do-login");
    }
  };

  return <div>Dashboard</div>;
};

export default Dashboard;
