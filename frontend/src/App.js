import "./App.css";
import HomePage from "./Components/HomePage";
import Error404 from "./Components/Error404";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Redirecterror from "./Components/Redirecterror";
import Passwordredirect from "./Components/Passwordredirect";
import Contact from "./Components/contact";
import { GoogleOAuthProvider } from "@react-oauth/google";




function App() {

    const GoogleAuthWrapperLogin = () => {
    return (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Login />
      </GoogleOAuthProvider>
    );
  };


  const GoogleAuthWrapperSignup =() => {
    return (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <SignUp />
      </GoogleOAuthProvider>
    );
  };


  return (
    <>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<GoogleAuthWrapperLogin/>} />
        <Route path="/signup" element={<GoogleAuthWrapperSignup/>} />
        <Route path="*" element={<Error404 />} />
        <Route path="/verify/:ShortCode" element={<Passwordredirect />} />
        <Route path="/error" element={<Redirecterror />} />
      </Routes>
    </>
  );
}

export default App;
