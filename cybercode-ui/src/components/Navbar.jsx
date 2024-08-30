import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Store";
import Cookies from "js-cookie";

const Navigation = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Cookies.remove("token");
    Cookies.remove("userId");
    sessionStorage.removeItem("user_details");
    navigate("/");
  };

  return (
    <nav className="w-full">
      <ul className="flex items-center justify-between font-semibold">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/problems">Problems</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/user/profile/afakeuuid">UserProfile</Link>
        </li>
        <li>
          <Link to="/user/update-profile">UserUpdate</Link>
        </li>
        <li>
          <Link to="/admin/dashboard">AdminDashboard</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
