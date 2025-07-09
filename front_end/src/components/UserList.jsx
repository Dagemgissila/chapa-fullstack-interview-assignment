import React from "react";
import { ToggleLeftIcon, ToggleRightIcon, User } from "lucide-react";
import HistoryDialog from "./HistoryDialog";
import { toast } from "react-toastify";
import axiosClient from "../axios";

const StatusBadge = ({ status }) => {
  const statusColors = {
    active: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
    inactive: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
  };

  const colors = statusColors[status] || statusColors.inactive;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
    >
      <span className={`w-2 h-2 rounded-full mr-2 ${colors.dot}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

const UserList = ({ users, loading, onStatusChange }) => {
  const changeStatus = (id) => {
    axiosClient
      .post("/change-status", { id })
      .then(() => {
        toast.success("User status updated successfully");
        onStatusChange?.();
      })
      .catch(() => toast.error("Failed to update status"));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-indigo-50 to-indigo-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <User className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">
                      No users found
                    </h3>
                    <p className="text-gray-400 mt-1">
                      Try adjusting your search or filter
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <React.Fragment key={u.id}>
                  <tr
                    className={`hover:bg-indigo-50 cursor-pointer transition-colors `}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {u.avatar ? (
                          <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={u.avatar}
                            alt={u.name}
                          />
                        ) : (
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {u.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {u.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {u.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{u.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ETB {u.wallet_balance}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={u.status} />
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => changeStatus(u.id)}
                          className={`flex items-center gap-1 text-xs px-3 py-1 rounded-md border transition-all duration-200 ${
                            u.status === "active"
                              ? "text-red-600 border-red-200 hover:bg-red-50"
                              : "text-green-600 border-green-200 hover:bg-green-50"
                          }`}
                        >
                          {u.status === "active" ? (
                            <ToggleLeftIcon className="h-4 w-4" />
                          ) : (
                            <ToggleRightIcon className="h-4 w-4" />
                          )}
                          {u.status === "active" ? "Deactivate" : "Activate"}
                        </button>

                        <HistoryDialog userId={u.id} />
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
