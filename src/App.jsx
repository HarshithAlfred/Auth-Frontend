import SignUp from "./pages/SignUp.jsx";
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import Home from './pages/Home.jsx';
import { Route ,Routes } from 'react-router-dom';
import PasswordC from "./pages/password.jsx";
function App() {
  const Admins_entry=import.meta.env.VITE_TEXT;
  return (

   <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path={Admins_entry} element={<Chat/>}/>
        <Route path="/changepass" element={<PasswordC/>}/>
        <Route path="/chat" element={<Chat/>}/>

    </Routes>

  )
}

export default App
