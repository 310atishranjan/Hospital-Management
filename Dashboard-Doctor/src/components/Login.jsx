import {useState,useContext} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Context } from '../main';
import { toast } from 'react-toastify';
function Login(){
  const {isAuthenticated,setisAuthenticated,setToken,setuser}=useContext(Context);
  const [email,setemail]=useState('');
  const [password,setpassword]=useState("");
  const [confirmpassword,setconfirmpassword]=useState("");

  const nav=useNavigate();

  if(isAuthenticated)
  return <nav to='/'/>

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    try{
      const response=await axios.post("http://localhost:8000/api/v1/user/login",{email,password,
      confirmpassword,role:"doctor"},{withCredentials:true,
        headers: { "Content-Type": "application/json" }});
      if(response.status===200)
      {
        setisAuthenticated(true);
        console.log(response);

        toast.success(response.data.message);
        setToken(response.data.token);
        setuser(response.data.user);
        nav('/');
        setemail('');
        setpassword('');
        setconfirmpassword('');
      }
      else{
        toast.error(response.data.message);
      }
    }catch(error){
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='container form-component'>
      <h1>Welcome to Aars Care</h1>
      <p>only Doctor are allowed to access this resources!</p>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
      <input type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
      <input type="password" placeholder="Confirm-Password" value={confirmpassword} onChange={(e)=>{setconfirmpassword(e.target.value)}}/>
      <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login;