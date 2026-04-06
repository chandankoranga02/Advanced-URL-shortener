
import HP_nav from './HP_nav'
import HP_hero from './HP_hero'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
 const [isAuth, setIsAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const authCheck = async () => {
      const response = await fetch("http://localhost:5000/api/me", {
        credentials: "include"
      })

      if (!response.ok) {
        navigate("/login");
        setIsAuth(false);
      }

      else {
        setIsAuth(true);
      }

    }

    authCheck();


  }, []);


    if (isAuth === null) return null;

  return (
    <>

      <HP_nav />
      <HP_hero />
      {/* <Password_redirect/> */}

    </>
  )
}
