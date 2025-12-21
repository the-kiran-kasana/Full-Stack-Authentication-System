import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  console.log(token)

  const submit = async (e) => {
    e.preventDefault();

    try {
      if(password != confirmPassword){
        setMessage("Password is not confirmed");
      }else{
        const res = await axios.post(`http://localhost:5050/userRoutes/reset-password/${token}`,{ password });
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <form className="p-6 bg-white border rounded-lg" onSubmit={submit}>
      <h1 className="font-bold text-pink-500 mb-6">Beauty&Groom</h1>
      <h2 className="text-xl text-pink-500 mb-4">Reset Password</h2>

      <input className="border p-3 mb-4 text-pink-400 rounded-lg w-full" type="password" placeholder="New password"  value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input className="border p-3 mb-4 text-pink-400 rounded-lg w-full" type="password" placeholder="Confirm New password"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
       <p className="mt-4 bg-pink-400 text-white px-4 py-2 rounded-lg">Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (e.g., !@#$%^&*).</p>
      <button className="mt-4 bg-pink-500 text-pink-500 px-4 py-2 rounded-lg">  Reset Password </button>

      {message && <p className="mt-3 text-sm text-red-500">{message}</p>}
    </form>
  );
}

export default ResetPassword;
