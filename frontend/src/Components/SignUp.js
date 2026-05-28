import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { endpoints } from "../utils/api";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setsuccess] = useState("");
  const [loading, setLoading] = useState(false); // ✅ added

  const [formData, SetformData] = useState({
    fullName: "",
    email: "",
    password: "",
    Confirmpassword: "",
  });

  const onchangeHandler = (e) => {
    SetformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ start loading

    const response = await fetch(endpoints.SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.msg);
      setLoading(false); // ✅ stop loading
    } else {
      setsuccess(data.msg);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const success_handler = async (AuthCode) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",  // for google login , so that we can accept token after jwt sign directly from ouath
        body: JSON.stringify({
          code: AuthCode.code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg);
        setLoading(false); // ✅ stop loading
      } else {
        setsuccess(data.msg);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }

    } catch (error) {
      console.log("error : ", error);
    }
  };

  const error_handler = () => {
    console.log("error");
  };

  const Signup_with_google = useGoogleLogin({
    onSuccess: success_handler,
    onError: error_handler,
    flow: "auth-code",
  });

  return (
    <>
      <Helmet>
        <title>Sign Up - App Nests</title>

        <meta
          name="description"
          content="Create your App Nests account and start shortening links, generating QR codes, and building your app ecosystem."
        />

        <meta
          name="keywords"
          content="signup App Nests, create account, URL shortener signup, register"
        />

        <meta property="og:title" content="Sign Up - App Nests" />
        <meta
          property="og:description"
          content="Join App Nests and start managing your links efficiently."
        />
      </Helmet>

      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        {/* 🔥 LOADING OVERLAY */}
        {loading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white text-sm">Creating account...</p>
            </div>
          </div>
        )}

        {/* Container */}
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-lg">
          {/* Heading */}
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Create your account
          </h1>

          {/* ✅ FIXED MESSAGE UI */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm mb-4 text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-2 rounded-lg text-sm mb-4 text-center">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-1 text-zinc-400">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                onChange={onchangeHandler}
                placeholder="Chandan Singh Koranga"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-zinc-400">Email</label>
              <input
                type="email"
                name="email"
                onChange={onchangeHandler}
                placeholder="you@example.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 transition"
              />
            </div>

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

            <div>
              <label className="block text-sm mb-1 text-zinc-400">
                Confirm Password
              </label>
              <input
                type="password"
                name="Confirmpassword"
                onChange={onchangeHandler}
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading} // ✅ disable
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-semibold py-2 rounded-lg transition"
            >
              {loading ? "Creating..." : "Sign Up"} {/* ✅ dynamic text */}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-zinc-700"></div>
            <span className="text-sm text-zinc-500">or</span>
            <div className="flex-1 h-px bg-zinc-700"></div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={Signup_with_google}
            className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            bg-white
            text-black
            py-2.5
            rounded-lg
            font-medium
            hover:bg-zinc-200
            transition
          "
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-zinc-700"></div>

            <div className="flex-1 h-px bg-zinc-700"></div>
          </div>

          {/* Login Redirect */}
          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="text-emerald-400 hover:text-emerald-300"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
