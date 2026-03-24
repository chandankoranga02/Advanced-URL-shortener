import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage';
import Error_404 from './Components/Error_404';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    
 

    <Routes>

     <Route path="/home" element={<HomePage/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<SignUp/>}/>
     <Route path="*" element={<Error_404/>}/>

    </Routes>
    
    
    </>
  );
}

export default App;