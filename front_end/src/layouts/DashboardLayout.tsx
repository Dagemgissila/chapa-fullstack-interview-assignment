// src/layouts/DashboardLayout.jsx
import React from "react";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <main className="p-4">{children}</main>
    </div>
  );
}
