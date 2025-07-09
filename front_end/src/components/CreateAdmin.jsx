import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";

export default function CreateAdmin({ onSuccess }) {
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    status: "active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setForm({ name: "", email: "", password: "", status: "active" });
    setError(null);
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axiosClient
      .post("/create-admin", form)
      .then(() => {
        setLoading(false);
        toast.success("Admin created successfully");
        close();
        onSuccess?.();
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response?.data?.message || "Failed to create admin");
      });
  };

  return (
    <>
      <button
        onClick={open}
        className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
      >
        Create Admin
      </button>

      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold text-gray-800">
              Create Admin
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {error && <p className="text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-500 disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Admin"}
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
