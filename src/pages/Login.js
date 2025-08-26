import React, { useState } from "react";
import Toast from "../components/Toast";
import axios from "axios"; // make sure axios is installed

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_URL; // use env variable

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToastMessage("Please fill all fields!");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      // save token and admin flag in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", res.data.isAdmin); // store admin flag

      setToastMessage("Login successful!");

      // redirect after login
      setTimeout(() => {
        if (res.data.isAdmin) {
          window.location.href = "/admin/movies"; // admin dashboard
        } else {
          window.location.href = "/"; // regular user home
        }
      }, 1500);
    } catch (err) {
      setToastMessage(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-2xl w-96 flex flex-col gap-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-red-500 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-full hover:scale-105 transition transform"
        >
          Login
        </button>

        <p className="text-gray-400 text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-red-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}
