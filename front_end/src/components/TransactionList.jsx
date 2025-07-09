import React from "react";

const TransactionList = ({
  transactions = [],
  loading = false,
  currentPage = 1,
  perPage = 10,
  onPageChange,
}) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto text-sm text-left border border-gray-200">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Wallet</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Payment Method</th>
            <th className="px-4 py-3">Reference</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            <tr>
              <td colSpan="9" className="text-center py-4 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-4 text-gray-500">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((tx, index) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {(currentPage - 1) * perPage + index + 1}
                </td>
                <td className="px-4 py-3">{tx.user?.name ?? "-"}</td>
                <td className="px-4 py-3">{tx.user?.email ?? "-"}</td>
                <td className="px-4 py-3">
                  ETB {tx.user?.wallet_balance ?? "0.00"}
                </td>
                <td className="px-4 py-3">ETB {tx.amount}</td>
                <td className="px-4 py-3">{tx.payment_method}</td>
                <td className="px-4 py-3">{tx.reference}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      tx.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : tx.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(tx.created_at).toLocaleString()}
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
  );
};

export default TransactionList;
