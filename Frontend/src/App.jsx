// import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import Register from './pages/Register'
import Login from './pages/Login'
import Aboutus from './pages/Aboutus'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from './components/Navbar'
import { useContext, useEffect, useState } from 'react'
import { Context } from './main'
import Footer from './components/Footer';

function App() {
  const {isAuthenticated,setisAuthenticated,setUser,Token}=useContext(Context);
  
  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        let response = await axios.get("http://localhost:8000/api/v1/user/patient-details",
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          }
      });
        setisAuthenticated(true);
        setUser(response.data.details);
        
      }catch(err){
        console.log(err);
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Server responded with error:", err.response.data);
          
      } else if (err.request) {
          // The request was made but no response was received
          console.log("No response received:", err.request);
         
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error setting up the request:", err.message);
         
      }
        setisAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  },[isAuthenticated])
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/appointment' element={<Appointment/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<Aboutus/>}/>
        </Routes>
        <Footer/>
        <ToastContainer position="top-center"/>
      </Router>
    </>
  )
}

export default App