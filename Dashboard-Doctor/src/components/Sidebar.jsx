import { useContext,useState} from 'react'
import { Context } from '../main'
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { TiHome } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiLogoutBoxFill } from 'react-icons/ri';
function Sidebar() {
    const [show,setshow]=useState(false);
    const {isAuthenticated,setisAuthenticated,Token}=useContext(Context);
    const nav=useNavigate();
    const gottoHome=()=>{
        nav('/');
    }
    const gotLogin=()=>{
        nav('/login');
    }
    const handleLogout=async()=>{
        try{
        const response= await axios.post("http://localhost:8000/api/v1/user/logout",null,{
            headers:{
                Bearer: `${Token}`
            }
        })
        setisAuthenticated(false);
        toast.success(response.data.message);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
  return (
    <>
    <nav className={show ? "show sidebar":"sidebar"}>
        <div className='links'>
            <TiHome onClick={gottoHome}/> 
            { !isAuthenticated ? 
            <button onClick={gotLogin}> Login </button>:
                <RiLogoutBoxFill onClick={handleLogout}/> 
            }
        </div>
    </nav>
    <div className="wrapper" style={{display:"flex"}}>
        <GiHamburgerMenu className="hamburger" onClick={()=>{setshow(!show)}}/>
    </div>
    </>
  )
}

export default Sidebar