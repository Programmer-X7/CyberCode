import React from "react";
import { Link } from "react-router-dom";
import SidePanal from "../components/SidePanal";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Create Admin: <Link to="/admin/create-admin">Add Admin</Link></p>
    </div>
  );
};

export default AdminDashboard;
