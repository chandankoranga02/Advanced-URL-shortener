import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'


export default function Redirect_error () {
  const navigate = useNavigate();

   const [title, settitle ]= useState("")
   const [message, setmessage] = useState("")


    useEffect(() => {

      const fetchError =  () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");

        if(type === "notfound"){
          settitle("Link Not Found")
          setmessage(" The link you are trying to find , it not exist or changed or deleted ")
        }

          else if(type === "expired"){
          settitle("Link Expired")
          setmessage(" The link you are trying to reach has been Expired ")
        }

        else{
          settitle("Server Error")
          setmessage("Sorry, Server Failed to process your request ")
        }

      }

      fetchError()

    },[])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-lg text-center w-[350px]">
        
        <h1 className="text-red-500 text-2xl font-bold mb-3">
          {title}
        </h1>

        <p className="text-gray-400 mb-6">
          {message}
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-white text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}