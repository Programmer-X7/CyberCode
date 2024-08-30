import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store.js";
import SidePanal from "../components/SidePanal.jsx";

const Layout = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.user?.role);

  useEffect(() => {
    if (!isAuthenticated || role !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [isAuthenticated, role]);

  return (
    <section className="flex h-screen">
      <aside className="flex-shrink-0">
        <SidePanal />
      </aside>
      <main className="flex-1 bg-gray-100 overflow-y-auto p-6">
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
