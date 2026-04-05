import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setsuccess] = useState("");
  const [formData, SetformData] = useState({
    fullName: "",
    email: "",
    password: "",
    Confirmpassword: ""

  })

  const onchangeHandler = (e) => {
    SetformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const API_sighnup = "http://localhost:5000/signup";

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    const response = await fetch(API_sighnup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })


    const data = await response.json();

    if (!response.ok) {
      setError(data.msg);
    } else {
      setsuccess(data.msg);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

  }




  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">

      {error && (
        <div style={{
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          backgroundColor: "#dcfce7",
          color: "#166534",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}>
          {success}
        </div>
      )}

      {/* Container */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-lg">

        {/* Heading */}
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create your account
        </h1>

        {/* Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-4">

          {/* Username */}
          <div>
            <label className="block text-sm mb-1 text-zinc-400">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              onChange={onchangeHandler}
              placeholder="Chadan singh kornga"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-zinc-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={onchangeHandler}
              placeholder="you@example.com"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-zinc-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={onchangeHandler}
              placeholder="••••••••"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-1 text-zinc-400">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={onchangeHandler}
              name="Confirmpassword"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-semibold py-2 rounded-lg transition"
          >
            Sign Up
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-zinc-700"></div>
          <span className="text-sm text-zinc-500">or</span>
          <div className="flex-1 h-px bg-zinc-700"></div>
        </div>

        {/* Login Redirect */}
        <p className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <button onClick={() => { navigate("/login") }} className="text-emerald-400 hover:text-emerald-300">
            Login
          </button>
        </p>

      </div>
    </div>
  );
}
