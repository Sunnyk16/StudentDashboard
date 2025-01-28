import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@123.com" && password === "admin@123") {
      navigate("/students");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="p-10">
      <h1 className="mb-8 font-extrabold text-4xl text-center text-indigo-600">Login</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="mb-6">
            <label className="block font-semibold text-lg text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-4 text-xl bg-gray-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-lg text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-4 text-xl bg-gray-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Instructions Sidebar */}
        <aside class="">
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="font-bold text-2xl">Instructions</h2>
            <ul className="list-disc mt-4 list-inside text-lg">
              <li>Use a valid email and password to log in.</li>
              <li>Make sure your credentials are correct.</li>
              
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default LoginPage;
