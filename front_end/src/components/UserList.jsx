import { EyeIcon, ToggleLeftIcon, ToggleRightIcon } from "lucide-react";
import HistoryDialog from "./HistoryDialog";
import React from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";

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
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto text-sm text-left border border-gray-200">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Wallet Balance</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((u, index) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">ETB {u.wallet_balance}</td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      u.status === "active"
                        ? "bg-green-100 text-green-700"
                        : u.status === "inactive"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      title={u.status === "active" ? "Deactivate" : "Activate"}
                      className={`hover:text-indigo-800 ${
                        u.status === "active"
                          ? "text-green-600 hover:text-green-800"
                          : "text-red-600 hover:text-red-800"
                      }`}
                      onClick={() => changeStatus(u.id)}
                    >
                      {u.status === "active" ? (
                        <ToggleLeftIcon size={30} />
                      ) : (
                        <ToggleRightIcon size={30} />
                      )}
                    </button>

                    <HistoryDialog userId={u.id} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
