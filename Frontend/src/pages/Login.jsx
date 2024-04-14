import React, { useContext,useState} from 'react'
import { Context } from '../main'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function Login() {
  const {isAuthenticated,setisAuthenticated,Token,setToken,role}=useContext(Context);
  const [email,setemail]=useState('');
  const [password,setpassword]=useState("");
  const [confirmpassword,setconfirmpassword]=useState("");

  const nav=useNavigate();
  if(isAuthenticated)
  return <Navigate to='/'/>

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    try{
      const response=await axios.post("http://localhost:8000/api/v1/user/login",{email,password,
      confirmpassword,role:"patient"},{withCredentials:true,
        headers: { "Content-Type": "application/json" }}
      );
      if(response.status===200)
      {
        setisAuthenticated(true);
        console.log(response);
        toast.success(response.data.message);
        setToken(response.data.token);
        nav('/');
        setemail('');
        setpassword('');
        setconfirmpassword('');
      }
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='container form-component login-form'>
      <h2>Please Login to continue</h2>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
      <input type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
      <input type="password" placeholder="Confirm-Password" value={confirmpassword} onChange={(e)=>{setconfirmpassword(e.target.value)}}/>
      <div>
      <button type="submit">Login</button>
      <div style={{marginTop:10}}>
        <p>Not Registered?</p>
        <Link to='/register'>Register</Link>
        </div>
      </div>
      </form>
    </div>
  )
}

export default Login