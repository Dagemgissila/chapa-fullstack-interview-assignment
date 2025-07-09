import React, { useState } from "react";
import { CreditCard, CheckCircle, Clock, XCircle, Search } from "lucide-react";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    paid: {
      bg: "bg-green-100",
      text: "text-green-800",
      icon: <CheckCircle size={14} className="text-green-500 mr-1" />,
      label: "Paid",
    },
    pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      icon: <Clock size={14} className="text-yellow-500 mr-1" />,
      label: "Pending",
    },
    failed: {
      bg: "bg-red-100",
      text: "text-red-800",
      icon: <XCircle size={14} className="text-red-500 mr-1" />,
      label: "Failed",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.icon}
      {config.label}
    </div>
  );
};

const PaymentMethodBadge = ({ method }) => {
  const methodConfig = {
    CBE: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      icon: <CreditCard size={14} className="text-blue-500 mr-1" />,
      label: "CBE",
    },
    Awash: {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      icon: <CreditCard size={14} className="text-indigo-500 mr-1" />,
      label: "AWASH",
    },
    BOA: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      icon: <CreditCard size={14} className="text-purple-500 mr-1" />,
      label: "BOA",
    },
  };

  const config = methodConfig[method] || methodConfig.card;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.icon}
      {config.label}
    </div>
  );
};

const TransactionList = ({
  transactions = [],
  loading = false,
  currentPage = 1,
  perPage = 10,
  onPageChange,
}) => {
  const [expandedTxId, setExpandedTxId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleExpand = (id) => {
    setExpandedTxId(expandedTxId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Search and filter bar */}
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-indigo-50 to-indigo-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-indigo-800 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-16 text-center text-gray-500"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-indigo-50 transition-colors"
                  onClick={() => toggleExpand(tx.id)}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-800">
                      {tx.reference}
                    </div>
                    <div className="text-xs text-gray-500">ID: {tx.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-800">{tx.user?.name}</div>
                    <div className="text-xs text-gray-500">
                      {tx.user?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      ETB {tx.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <PaymentMethodBadge method={tx.payment_method} />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {tx.created_at}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center p-6">
          <span className="text-sm text-gray-600">
            Showing page {currentPage}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={transactions.length < perPage}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
