import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axios";
import { createRef } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();

  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken, token } = useAuth();

  const [message, setMessage] = useState(null);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setMessage(null);

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("auth_token", token);
        setUser(user);
        setToken(token); // Update token in context
        setTimeout(() => {
          navigate("/dashboard");
        }, 100);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mb-6 space-y-2">
            <p className="text-sm text-gray-600">
              Click to auto-fill credentials:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  emailRef.current.value = "superadmin@example.com";
                  passwordRef.current.value = "password";
                }}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded text-sm hover:bg-indigo-200"
              >
                Superadmin
              </button>
              <button
                type="button"
                onClick={() => {
                  emailRef.current.value = "admin@example.com";
                  passwordRef.current.value = "password";
                }}
                className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm hover:bg-green-200"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  emailRef.current.value = "user@example.com";
                  passwordRef.current.value = "password";
                }}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-200"
              >
                User
              </button>
            </div>
          </div>

          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {message && (
            <div className="bg-red-400 p-4 text-white rounded-2xl mb-4">
              <p>{message}</p>
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
