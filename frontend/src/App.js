import logo from './logo.svg';
import './App.css';
import Login from './pages/Login'
import Signup from './pages/Signup';
import Home from './pages/Home'
import {Routes,Route, Navigate} from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import {authContext} from './context/AuthContext.js'
import { useContext } from 'react';

// axios.defaults.baseURL = "http://localhost:5000/api/"
// axios.defaults.withCredentials = true

function App() {
  const { authUser,setAuthUser } = useContext(authContext)
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
