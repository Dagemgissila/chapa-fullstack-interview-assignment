import { Dialog, Input } from "@headlessui/react";
import { useState } from "react";
import axiosClient from "../axios";
import { toast } from "react-toastify";

export default function AddPayment({ ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CBE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axiosClient
      .post("/make-payment", {
        amount: parseFloat(amount),
        payment_method: paymentMethod,
      })
      .then(() => {
        setLoading(false);
        setAmount("");
        close();
        toast.success("Payment added succesfully");
        props.onSuccess?.(); // call the parent's callback to refresh data
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response?.data?.message || "Failed to submit payment");
      });
  };

  return (
    <>
      <button onClick={open}>Make Payment</button>

      <Dialog open={isOpen} onClose={close} className="relative z-50">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl transition-all">
            <Dialog.Title className="text-lg font-semibold text-gray-800">
              Make Paymnet
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="amount">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded border px-3 py-2"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label
                  className="block mb-1 font-medium"
                  htmlFor="paymentMethod"
                >
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded border px-3 py-2"
                  required
                >
                  <option value="CBE">CBE</option>
                  <option value="Awash">Awash</option>
                  <option value="BOA">BOA</option>
                </select>
              </div>

              {error && <p className="text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-500 disabled:opacity-60"
              >
                {loading ? "Processing..." : "Submit Payment"}
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
