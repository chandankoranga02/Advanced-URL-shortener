import React from 'react'

export default function Login() {
  return (

    <d
      iv className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">

      {/* Container */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-lg">

        {/* Heading */}
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Login to your account
        </h1>

        {/* Form */}
        <form action="/home" method='POST' className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-zinc-400">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              name='email'
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
              placeholder="••••••••"
              name='password'
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-semibold py-2 rounded-lg transition"

          >
            Login
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-zinc-700"></div>
          <span className="text-sm text-zinc-500">or</span>
          <div className="flex-1 h-px bg-zinc-700"></div>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-zinc-400">
          Don’t have an account?{" "}
          <button className="text-emerald-400 hover:text-emerald-300"
            onClick={() => { window.location.href = "/signup" }}
          >
            Sign up
          </button>
        </p>

      </div>
    </d>
  );
}