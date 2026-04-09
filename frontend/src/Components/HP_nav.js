import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function HP_nav({ status }) {

  const navigate = useNavigate();
  const [msg , setmsg] = useState("")


  const logoutHandler = async () => {
    const response = await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    })

    navigate("/login")
  }



  return (
    <>
      <header className="bg-zinc-950 border-b border-zinc-800 w-full">
        <div className="w-full px-10 h-[60px] flex items-center justify-between">

          <h1 className="font-mono text-lg font-bold text-white tracking-tight">
            Dev<span className="text-emerald-400">Utils</span>
          </h1>



          <div className="flex items-center gap-8">
            <a href="#" className="text-zinc-400 text-sm hover:text-white transition-colors">About us</a>
            <a href="#" className="text-zinc-400 text-sm hover:text-white transition-colors">Contact us</a>
            <a href="#" className="text-zinc-400 text-sm hover:text-white transition-colors">Explore Others</a>

            {!status ? (
              <button onClick={() => { navigate("/login") }} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-sm font-semibold px-4 py-1.5 rounded cursor-pointer transition-colors">
                Login
              </button>
            ) :

              (<button onClick={logoutHandler} className="bg-red-500 hover:bg-red-400 text-zinc-950 font-mono text-sm font-semibold px-4 py-1.5 rounded cursor-pointer transition-colors">
                Logout
              </button>)
            }
          </div>

        </div>
      </header>
    </>
  )
}
