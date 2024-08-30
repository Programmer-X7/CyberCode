import React, { useState, useEffect } from "react";
import { loginApi } from "../api/Auth.js";
import Cookies from "js-cookie";
import useAuthStore from "../Store.js";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

  // useEffect(() => {
  //   // Checks if user already logged in
  //   if (isAuthenticated) {
  //     navigate("/problems");
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    // Checks if user is already logged in
    if (isAuthenticated) {
      // Redirect Coder to "/problems" and Admin to "/admin/dashboard"
      if (user?.role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/problems");
      }
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await loginApi(data);

    if (response.status === 200) {
      const data = response.data;

      // Set token & user ID in cookies
      Cookies.set("token", data.token);
      Cookies.set("userId", data.user.id);
      sessionStorage.setItem("user_details", JSON.stringify(data.user));

      login(data.user, data.token);
    }

    setIsLoading(false);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  return (
    <div>
      <h3>Login</h3>
      <form className="" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          name="username"
          value={data.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          autoComplete="false"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
