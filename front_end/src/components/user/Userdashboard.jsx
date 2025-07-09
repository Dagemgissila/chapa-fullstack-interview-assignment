import React, { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { useAuth } from "../../context/AuthContext";
import AddPayment from "../AddPayment";
import UserTransactionTable from "../UserTransactionTable";

const Userdashboard = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const { user, fetchUser } = useAuth();

  const fetchData = () => {
    setLoading(true);
    axiosClient
      .get("/user-transaction")
      .then((response) => {
        setTransactions(response.data);
        fetchUser();
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      {/* Wallet Balance */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white shadow rounded-lg p-4 w-full max-w-sm border-1">
          <h2 className="text-sm text-gray-500">Wallet Balance</h2>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {"ETB"} {user?.wallet_balance ?? 0}
          </p>
        </div>
        <button className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">
          <AddPayment onSuccess={fetchData} />
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Transactions History
        </h1>
      </div>
      {/* user transaction table  */}
      <UserTransactionTable transactions={transactions} loading={loading} />;
    </div>
  );
};

export default Userdashboard;
