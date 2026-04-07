
import HP_nav from './HP_nav'
import HP_hero from './HP_hero'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
const [user, setUser] = useState(null)
const navigate = useNavigate();


 let isloggedIN = false;
  useEffect(() => {
    
    const authCheck = async () => {
      const response = await fetch("http://localhost:5000/api/me", {
        credentials: "include"
      })

      if (!response.ok) {
        navigate("/login");
        return;
      }

      const data = await response.json();
      setUser(data);
      isloggedIN = true;
    }

    authCheck();

  }, []);


    if (!user) return null;

  return (
    <>

      <HP_nav user={user} status_log={isloggedIN} />
      <HP_hero />
      {/* <Password_redirect/> */}

    </>
  )
}
