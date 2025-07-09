import React, { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../axios";
import StatCard from "./StatCard";
const Summary = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    axiosClient.get("/stats").then((res) => setStats(res.data));
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <StatCard
        label="Total Payments"
        value={`ETB ${stats.total_payments ?? 0}`}
        type="total_payments"
      />
      <StatCard
        label="Pending Payments"
        value={`ETB ${stats.pending_payments ?? 0}`}
        type="pending_payments"
      />
      <StatCard
        label="Failed Payments"
        value={`ETB ${stats.failed_payments ?? 0}`}
        type="failed_payments"
      />
      <StatCard
        label="Total Transactions"
        value={stats.total_transactions ?? 0}
        type="total_transactions"
      />
      <StatCard
        label="Active Users"
        value={stats.active_users ?? 0}
        type="active_users"
      />
    </div>
  );
};

export default Summary;
