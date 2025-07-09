import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { EyeIcon } from "lucide-react";
import axiosClient from "../axios";
import UserTransactionTable from "./UserTransactionTable";

export default function HistoryDialog({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const open = () => {
    setIsOpen(true);
    fetchUserHistory();
  };

  const close = () => setIsOpen(false);

  const fetchUserHistory = () => {
    setLoading(true);
    axiosClient
      .get(`/user/${userId}/transactions`)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <>
      <button
        onClick={open}
        title="View History"
        className="text-gray-600 hover:text-gray-800"
      >
        <EyeIcon size={30} />
      </button>

      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-auto">
          <Dialog.Panel className="w-full max-w-5xl rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
              Payment History
            </Dialog.Title>
            {/* user transaction table  */}
            <UserTransactionTable
              transactions={transactions}
              loading={loading}
            />
            ;
            <div className="mt-4 text-right">
              <button
                onClick={close}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
