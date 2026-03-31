import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage';
import Error_404 from './Components/Error_404';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { Routes, Route } from "react-router-dom";
import Redirect_error from './Components/Redirect_error'
import Password_redirect from './Components/Password_redirect'

function App() {
  return (
    <>
    

    <Routes>

     <Route path="/home" element={<HomePage/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<SignUp/>}/>
     <Route path="*" element={<Error_404/>}/>
     <Route path='/verify/abc' element={<Password_redirect/>}/>
     <Route path='/verify/abcd' element={<Redirect_error/>}/>
    </Routes>
    
    
    </>
  );
}

export default App;