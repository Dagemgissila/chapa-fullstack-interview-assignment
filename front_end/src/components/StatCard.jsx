// src/components/StatCard.js
import React from "react";
import {
  CreditCard,
  Loader2,
  XCircle,
  Users,
  BarChart2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const iconMap = {
  total_payments: <CreditCard size={24} />,
  pending_payments: <Loader2 size={24} />,
  failed_payments: <XCircle size={24} />,
  total_transactions: <BarChart2 size={24} />,
  active_users: <Users size={24} />,
};

const colorMap = {
  total_payments: {
    bg: "bg-indigo-50",
    icon: "text-indigo-600",
    border: "border-indigo-100",
    trend: "text-indigo-600",
    progress: "bg-indigo-600",
  },
  pending_payments: {
    bg: "bg-yellow-50",
    icon: "text-yellow-600",
    border: "border-yellow-100",
    trend: "text-yellow-600",
    progress: "bg-yellow-500",
  },
  failed_payments: {
    bg: "bg-red-50",
    icon: "text-red-600",
    border: "border-red-100",
    trend: "text-red-600",
    progress: "bg-red-600",
  },
  total_transactions: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    border: "border-blue-100",
    trend: "text-blue-600",
    progress: "bg-blue-600",
  },
  active_users: {
    bg: "bg-green-50",
    icon: "text-green-600",
    border: "border-green-100",
    trend: "text-green-600",
    progress: "bg-green-500",
  },
};

const StatCard = ({ label, value, type, loading, trend, trendValue }) => {
  const colors = colorMap[type] || colorMap.total_payments;

  return (
    <div
      className={`stat-card ${colors.bg} ${colors.border} rounded-xl border transition-all duration-300 hover:shadow-md overflow-hidden`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div
            className={`icon-container p-3 rounded-lg ${colors.bg} inline-block`}
          >
            {React.cloneElement(iconMap[type], { className: colors.icon })}
          </div>

          <div className="trend-indicator flex items-center">
            {trend === "up" ? (
              <ArrowUp size={16} className={`${colors.trend} mr-1`} />
            ) : (
              <ArrowDown size={16} className={`${colors.trend} mr-1`} />
            )}
            <span className={`text-xs font-medium ${colors.trend}`}>
              {trendValue}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-600 mb-1">{label}</h4>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ) : (
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
