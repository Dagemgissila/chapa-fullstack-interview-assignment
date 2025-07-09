import React from "react";

const UserTransactionTable = ({
  transactions = [],
  loading = false,
  className = "",
}) => {
  return (
    <div
      className={`overflow-x-auto border border-gray-200 rounded-lg ${className}`}
    >
      <table className="min-w-full text-sm text-left">
        <thead className="bg-indigo-600 text-white whitespace-nowrap">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Reference</th>
            <th className="px-4 py-3">Method</th>
            <th className="px-4 py-3">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 whitespace-nowrap">
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((u, index) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      u.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : u.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : u.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {u.currency} {u.amount}
                </td>
                <td className="px-4 py-3">{u.reference}</td>
                <td className="px-4 py-3">{u.payment_method}</td>
                <td className="px-4 py-3">
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
