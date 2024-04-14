import { useContext, useState } from "react"
import { Context } from "../main"
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import  axios from "axios";
function Sidebar(){
    const [show,setshow]=useState(false);
    const {isAuthenticated,setisAuthenticated,Token,setToken}=useContext(Context);
    const nav=useNavigate();
    const gottoHome=()=>{
        nav("/");
        setshow(!show);
    }
    const gotoDoctorsPage = () => {
        nav("/doctor");
        setshow(!show);
      };
      const gotoAddNewDoctor = () => {
        nav("/add/newdoctor");
        setshow(!show);
      };
      const gotoAddNewAdmin = () => {
        nav("/add/newadmin");
        setshow(!show);
      };
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
        toast.error(err.respoane.data.message);
    }
}
  return (
    <>
    <nav style={{dispaly:'flex'}} 
    className={show ? "show sidebar":"sidebar"}>
        <div className='links'>
            <TiHome onClick={gottoHome}/>
            <FaUserDoctor onClick={gotoDoctorsPage}/>
            <MdAddModerator onClick={gotoAddNewAdmin}/>
            <IoPersonAddSharp onClick={gotoAddNewDoctor}/>
            <RiLogoutBoxFill onClick={handleLogout}/>
        </div>
    </nav>
    <div style={{display:"flex"}} className="wrapper">
        <GiHamburgerMenu className="hamburger" onClick={()=>{setshow(!show)}}/>
    </div>
    </>
  )
}

export default Sidebar