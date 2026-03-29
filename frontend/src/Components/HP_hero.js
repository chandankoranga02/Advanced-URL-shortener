import React, { use } from 'react'
import { useState } from 'react';


export default function HP_hero() {
 
 
   const [urlState, setURLstate] = useState("");
   const [Password, setPassword]= useState("");
   const [shortURL, SetshortURL] = useState("");
 
   const Shortener_handler = () =>{
       
   }

   const Copy_handler = async ()=>{
    const copyURL  = shortURL;
    await navigator.clipboard.writeText(copyURL);
    alert("Copied to clipboard!");
   }
 
 
 
 
 
 
 
 
 
 
 
 
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center px-4">

      {/* Content Wrapper */}
      <div className="w-full max-w-5xl flex flex-col justify-center">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-semibold mb-4">
            Shorten Your Links
          </h1>
          <p className="text-zinc-400 text-base">
            Fast, secure and customizable URL shortening
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl p-8 md:p-10 shadow-2xl">

          {/* Input Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder='Enter your url here'
              value={urlState}
              onChange={(event) => setURLstate(event.target.value)}
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-base outline-none focus:border-blue-500 transition"
            />

            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition">
              Shorten
            </button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Password */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Password
              </label>
              <input
                type="text"
                placeholder="Optional"
                onChange={(event) => setPassword(event.target.value)}
                value={Password}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Expiry */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Expiry Date
              </label>
              <input
                type="date"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* QR */}
            <div className="flex flex-col justify-end">
              <label className="text-sm text-zinc-400 mb-2">
                QR Code
              </label>
              <button className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg py-3 transition">
                Generate QR
              </button>
            </div>

          </div>

        </div>

        {/* Output Section */}
        <div className="mt-8 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl">

          <p className="text-sm text-zinc-400 mb-3">
            Shortened URL
          </p>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="https://short.ly/abc23"
              value={shortURL}
              readOnly
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3"
            />

            <button onClick={Copy_handler} className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-lg transition">
              Copy
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}