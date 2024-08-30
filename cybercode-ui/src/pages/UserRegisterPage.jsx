import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store.js";
import { userSignupApi } from "../api/User.js";

const UserRegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Checks if user already logged in
    if (isAuthenticated) {
      navigate("/problems");
    }
  }, [isAuthenticated]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await userSignupApi(data);

    if (response.status === 201) {
      const data = response.data;

      navigate("/login");
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
      <h3>Create Account</h3>
      <form onSubmit={handleSignup}>
        <input
          type="name"
          placeholder="Full Name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default UserRegisterPage;
