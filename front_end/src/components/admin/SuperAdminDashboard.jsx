import React, { useState, useEffect } from "react";
import UserList from "../UserList";
import TransactionList from "../TransactionList";
import axiosClient from "../../axios";
import StatCard from "../StatCard";
import CreateAdmin from "../CreateAdmin";
import { toast } from "react-toastify";
import Summary from "../Summary";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  const [activeTab, setActiveTab] = useState("users");

  const [transactionMeta, setTransactionMeta] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoadingUsers(true);
    axiosClient
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Failed to fetch users"))
      .finally(() => setLoadingUsers(false));
  };

  const fetchTransactions = (page = 1) => {
    setLoadingTransactions(true);
    axiosClient
      .get(`/transactions?page=${page}`)
      .then((res) => {
        setTransactions(res.data.data);
        setTransactionMeta(res.data.meta);
      })
      .catch(() => toast.error("Failed to fetch transactions"))
      .finally(() => setLoadingTransactions(false));
  };

  useEffect(() => {
    if (activeTab === "transactions") {
      fetchTransactions(transactionMeta.current_page);
    }
  }, [activeTab]);

  const handlePageChange = (newPage) => {
    fetchTransactions(newPage);
  };

  return (
    <div className="p-6">
      {/* Stats Section */}
      <Summary />

      {/* Tabs Section */}
      <div className="flex justify-between items-center mt-8 border-b pb-4 mb-4">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded ${
              activeTab === "users"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 rounded ${
              activeTab === "transactions"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Transactions
          </button>
        </div>

        {activeTab === "users" && <CreateAdmin onSuccess={fetchUsers} />}
      </div>

      {/* Content Area */}
      {activeTab === "users" ? (
        <UserList
          users={users}
          loading={loadingUsers}
          onStatusChange={fetchUsers}
        />
      ) : (
        <TransactionList
          transactions={transactions}
          loading={loadingTransactions}
          currentPage={transactionMeta.current_page}
          perPage={transactionMeta.per_page}
          total={transactionMeta.total}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SuperAdminDashboard;
