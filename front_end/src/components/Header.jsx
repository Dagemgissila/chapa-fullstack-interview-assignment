// src/components/Header.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>

      {user && (
        <div className="flex items-center gap-4">
          <span>Welcome, {user.name}</span>
          <button
            onClick={logout}
            className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
