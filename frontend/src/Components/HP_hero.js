import React, { use } from 'react'
import { useState } from 'react';


export default function HP_hero({ User_name, status }) {


  const [urlState, setURLstate] = useState("");
  const [Password, setPassword] = useState("");
  const [shortURL, SetshortURL] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [showQR, setShowQR] = useState(false)


  // For Guest user who is not logged in 

  const handleProtectedAction = () => {
    if (!status) {
      window.location.href = "/login";
      return false;
    }
    return true;
  };


  const Shortener_handler = async () => {

    if (!urlState) {
      return setError("URL is required");
    }

    setError("")
    setLoading(true);

    const response = await fetch("http://localhost:5000/api/shortern",
      {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalURL: urlState,
          Password: Password,
          expiryDate: expiry
        }),
      });



    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed");
    }

    SetshortURL(data.ShortURL);
    setLoading(false)
    setQrCode(data.qrcode);
    setShowQR(false)

  };



  const Copy_handler = async () => {
    const copyURL = shortURL;
    await navigator.clipboard.writeText(copyURL);
    alert("Copied to clipboard!");
  }



let FirstName = User_name?.fullName?.trim().split(" ")[0] || "Guest";
FirstName = FirstName.charAt(0).toUpperCase() + FirstName.slice(1).toLowerCase();
    


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center px-4">


      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="flex flex-col items-center gap-4">

            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            {/* Text */}
            <p className="text-white text-sm">Processing...</p>

          </div>

        </div>
      )}

      {/* Content Wrapper */}
      <div className="w-full max-w-5xl flex flex-col gap-10 justify-center">


        {/* Heading */}
        <div className="text-center mb-12">


          {status ? (<h1 className="text-5xl md:text-6xl font-semibold mb-5">
            Hi , <span className="text-blue-500">{FirstName}</span>
          </h1>) : (null)}



          <h1 className="text-5xl text-yellow-500 md:text-6xl font-semibold mb-4">
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
              onFocus={() => {
                if (!status) {
                  window.location.href = "/login";
                }
              }}
              onChange={(event) => setURLstate(event.target.value)}
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-base outline-none focus:border-blue-500 transition"
            />

            <button onClick={ ()=> {if (!handleProtectedAction()) return;  Shortener_handler(); }} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition">
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
                onFocus={() => {
                  if (!status) {
                    window.location.href = "/login";
                  }
                }}
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
                value={expiry}
                onFocus={() => {
                  if (!status) {
                    window.location.href = "/login";
                  }
                }}
                onChange={(event) => setExpiry(event.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* QR */}
            <div className="flex flex-col justify-end">
              <label className="text-sm text-zinc-400 mb-2">
                QR Code
              </label>
              <button onClick={() => { setShowQR(true) }} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg py-3 transition">
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

        {qrCode && showQR && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <img src={qrCode} alt="QR Code" className="w-64 h-64" />

            <a
              href={qrCode}
              download="qr-code.png"
              className="bg-green-600 px-4 py-2 rounded-lg"
            >
              Download QR
            </a>
          </div>
        )}

      </div>
    </div>
  );
}