import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store.js";

const UserLayout = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.user?.role);

  useEffect(() => {
    if (!isAuthenticated || role !== "ROLE_CODER") {
      navigate("/");
    }
  }, [isAuthenticated, role]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default UserLayout;
