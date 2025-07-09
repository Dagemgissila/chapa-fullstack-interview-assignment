// src/components/Summary.js
import React, { useEffect, useState } from "react";
import axiosClient from "../axios";
import StatCard from "./StatCard";

const Summary = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay for demonstration
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/stats");
        setStats(response.data);

        // Simulate loading delay
        setTimeout(() => {
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-summary">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          label="Total Payments"
          value={`ETB ${stats.total_payments ?? 0}`}
          type="total_payments"
          loading={loading}
          trend="up"
          trendValue="12%"
        />
        <StatCard
          label="Pending Payments"
          value={`ETB ${stats.pending_payments ?? 0}`}
          type="pending_payments"
          loading={loading}
          trend="down"
          trendValue="3%"
        />
        <StatCard
          label="Failed Payments"
          value={`ETB ${stats.failed_payments ?? 0}`}
          type="failed_payments"
          loading={loading}
          trend="up"
          trendValue="5%"
        />
        <StatCard
          label="Total Transactions"
          value={stats.total_transactions ?? 0}
          type="total_transactions"
          loading={loading}
          trend="up"
          trendValue="18%"
        />
        <StatCard
          label="Active Users"
          value={stats.active_users ?? 0}
          type="active_users"
          loading={loading}
          trend="up"
          trendValue="22%"
        />
      </div>
    </div>
  );
};

export default Summary;
