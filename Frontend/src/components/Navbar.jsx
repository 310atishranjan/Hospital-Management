import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import {GiHamburgerMenu} from 'react-icons/gi'
function Navbar() {
    const nav=useNavigate();
    const [show,setshow]=useState(false);
    const {isAuthenticated,setisAuthenticated,Token,setToken}=useContext(Context);
    const handleLogout=async()=>{
        try{
        const response=await axios.post("http://localhost:8000/api/v1/user/logout",null,
        {
            headers: {
              Authorization: `Bearer ${Token}`
            }
        });
        console.log(response);
        if(response.status===200){
            toast.success("Logout successful");
            setToken('');
            setisAuthenticated(false);
        }
        else{
            toast.error(response.data.message);
        }
    }catch(err){
    //     toast.error(err.response.data.error);
    //    console.log("err in logout",err);
       if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Server responded with error:", err.response.data);
        toast.error(err.response.data.message || "An error occurred");
    } else if (err.request) {
        // The request was made but no response was received
        console.log("No response received:", err.request);
        toast.error("No response received from the server");
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error setting up the request:", err.message);
        toast.error("Error setting up the request");
    }
    }
}
    const gotoLogin=()=>{
        setshow(!show);
        nav('/login');
    }
  return (
    <nav className='container'>
        <div className='logo'>Aars</div>
        <div className={show ? "navLinks showmenu":"navLinks"}>
            <div className='links' onClick={()=>{setshow(!show)}}>
                <Link to='/'>Home</Link>
                <Link to='/about'>About us</Link>
                <Link to='/appointment'>Appointment</Link>
            </div>
            {isAuthenticated ? (<button className='logoutBtn btn' onClick={handleLogout}>Logout</button>)
            :(<button className='loginBtn btn' onClick={gotoLogin}>Login</button>)}
        </div>
        <div className='hamburger' onClick={()=>{setshow(!show)}}>
            <GiHamburgerMenu/>
        </div>
    </nav>
  )
}

export default Navbar