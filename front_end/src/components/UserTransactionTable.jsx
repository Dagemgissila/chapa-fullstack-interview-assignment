import React from "react";

const StatusBadge = ({ status }) => {
  const statusColors = {
    paid: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
    pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      dot: "bg-yellow-500",
    },
    failed: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
  };

  const colors = statusColors[status] || statusColors.failed;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
    >
      <span className={`w-2 h-2 rounded-full mr-2 ${colors.dot}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

const UserTransactionTable = ({
  transactions = [],
  loading = false,
  className = "",
}) => {
  return (
    <div
      className={`overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white ${className}`}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-indigo-50 to-indigo-100">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
              Reference
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
              Method
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((u, index) => (
              <tr
                key={u.id}
                className="hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={u.status} />
                </td>
                <td className="px-6 py-4 font-medium">
                  {u.currency} {u.amount}
                </td>
                <td className="px-6 py-4 text-gray-600">{u.reference}</td>
                <td className="px-6 py-4 capitalize">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {u.payment_method}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(u.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTransactionTable;
