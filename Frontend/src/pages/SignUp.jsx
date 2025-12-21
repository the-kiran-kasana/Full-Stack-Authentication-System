import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5050/userRoutes/api/auth/register",
        {
          name: name.trim(),
          email: email.trim(),
          password: password,
          role: role,
        }
      );

      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/"); // redirect to login/home
      }

      setError("");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <>
      <form
        className="text-pink-500 border bg-white border-gray-300 p-15 flex flex-col gap-4 rounded-lg"
        onSubmit={submitForm}
      >
        <h1 className="text-xl font-semibold">welcome SignUp page</h1>
        <p className="text-pink-400">Grow your beauty with product</p>

        <input
          className="border p-3 rounded-lg"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />

        <input
          className="border p-3 rounded-lg"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email..."
          required
        />

        <input
          className="border p-3 rounded-lg"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password..."
          required
        />

        <select
          className="border p-3 rounded-lg"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-pink-500 border border-indigo-600 bg-pink-600 text-pink-100 py-2 rounded-lg"
        >
          SignUp
        </button>

        <button
          type="button"
          onClick={() =>
            (window.location.href = "http://localhost:5050/auth/google")
          }
          className="flex items-center bg-white justify-center gap-3 border py-2 rounded-lg"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="h-5 w-5"
          />
          <span>Sign in with Google</span>
        </button>

        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/" className="font-semibold text-pink-600 underline">
            Login
          </Link>
        </p>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
}

export default SignUp;
