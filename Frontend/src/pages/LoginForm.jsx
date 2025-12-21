import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5050/userRoutes/api/auth/login",
        { email, password }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/dashboard"; // redirect
      }

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <>
      <form className="text-pink-500 border bg-white border-gray-300 p-15 flex flex-col gap-4 rounded-lg" onSubmit={submitForm} >
        <h1 className="text-xl font-semibold">welcome login page</h1>
        <p className="text-pink-400">Grow your beauty with product</p>

        <input className="border p-3 rounded-lg" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email..." required/>

        <input className="border p-3 rounded-lg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..." required />

        <Link to="/ForgotPassword" className="text-sm text-pink-500 flex justify-end  cursor-pointer hover:underline"> Forgot Password?</Link>

        <button type="submit" className="bg-pink-500 border border-indigo-600 bg-white text-pink-500 py-2 rounded-lg" > Login </button>

        {/* Google Login */}

        <button type="button" onClick={() => (window.location.href = "http://localhost:5050/auth/google")}
          className="flex items-center  bg-white justify-center gap-3 border py-2 rounded-lg" >
          <img  src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="h-5 w-5" />
          <span>Sign in with Google</span>
        </button>

        <p className="text-sm"> Don’t have an account? <Link to="/SignUp" className=" font-semibold text-pink-600 underline">SignUp</Link> </p>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
}

export default LoginForm;
