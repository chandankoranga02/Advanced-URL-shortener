import React, { useState } from "react";
import { useParams } from "react-router-dom";



export default function Password_redirect( ) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const {ShortCode} =  useParams();
  
  const API_password = `http://localhost:5000/verify/${ShortCode}`

  const handleSubmit = async (e) => {
    
    console.log("FORM SUBMITTED");
    console.log(API_password);
    console.log(password)
    e.preventDefault();
    
    const response = await fetch(API_password , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password})
    })
    
    const data = await response.json()

    if (data.msg) {
      setError(true);
      return;
    }

    else {
      setError(false);
      window.location.href= data.redirectUrl;
    }

  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-[320px]"
      >
        <h2 className="text-white text-xl font-semibold mb-6 text-center">
          Enter Password
        </h2>

        {/* INPUT */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          className="w-full px-4 py-2 mb-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />


        {error && (
          <div className="w-full bg-red-900/20 border border-red-500 text-red-400 px-3 py-2 rounded-lg flex items-center gap-2 mb-4">
            <span className="text-red-500 text-sm">✖</span>
            <p className="text-sm">Password do not match, try again</p>
          </div>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition active:scale-95"
        >
          Go
        </button>
      </form>

    </div>
  );
}