
import './App.css';
import HomePage from './Components/HomePage';
import Error_404 from './Components/Error_404';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { Routes, Route } from "react-router-dom";
import Redirect_error from './Components/Redirect_error'
import Password_redirect from './Components/Password_redirect'
import Contact from './Components/contact'

function App() {
  
  return (
    <>
    

    <Routes>

     <Route path="/contact" element={<Contact/>} />
     <Route path="/" element={<HomePage/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<SignUp/>}/>
     <Route path="*" element={<Error_404/>}/>
     <Route path='/verify/:ShortCode' element={<Password_redirect/>}/>
     <Route path="/error" element={<Redirect_error />} />
    </Routes>
    
    
    </>
  );
}

export default App;