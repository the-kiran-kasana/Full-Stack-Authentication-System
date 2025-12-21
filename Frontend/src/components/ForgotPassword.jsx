import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post( "http://localhost:5050/userRoutes/forget-password",{ email } );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "something went wrong");
    }finally{
       setLoading(false);
    }
  };

  return (

    <form className="p-8 bg-white border  rounded-lg" onSubmit={submit}>
      <h2 className="text-xl text-pink-500 mb-4">Forgot Password</h2>

      <input className="border p-3 text-pink-400 rounded-lg w-full" type="email" placeholder="Enter registered email"  value={email} onChange={(e) => setEmail(e.target.value)} required />

      <button className="mt-4  text-pink-500 px-4 py-2 rounded-lg"> Send Reset Link</button>
        {loading && <p className="text-gray-500">Loading...</p>}

        {message && !loading && (
          <p className="mt-3 text-sm text-blue-700">{message}</p>
        )}

    </form>
  );
}

export default ForgotPassword;
