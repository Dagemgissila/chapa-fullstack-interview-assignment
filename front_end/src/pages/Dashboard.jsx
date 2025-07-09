import React from "react";
import { useAuth } from "../context/AuthContext";
import Userdashboard from "../components/user/Userdashboard";
import AdminDashboard from "../components/admin/AdminDashboard";
import SuperAdminDashboard from "../components/admin/SuperAdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  switch (user.role) {
    case "user":
      return <Userdashboard />;
    case "admin":
      return <AdminDashboard />;
    case "super_admin":
      return <SuperAdminDashboard />;
    default:
      return <p>unauthorized</p>;
  }
};

export default Dashboard;
