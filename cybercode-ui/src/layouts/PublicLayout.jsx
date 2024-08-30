import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PublicLayout = () => {
  return (
    <>
      <header className="flex items-center bg-lime-300 px-16 h-14">
        <Navbar />
      </header>
      <section className="bg-black text-gray-300 min-h-[calc(100vh-3.5rem)]">
        <Outlet />
      </section>
    </>
  );
};

export default PublicLayout;
