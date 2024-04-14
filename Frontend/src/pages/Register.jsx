import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
function Register() {
  const [firstname,setfirstname]=useState('');
  const [lastname,setlastname]=useState('');
  const [email,setemail]=useState('');
  const [phone,setphone]=useState('');
  const [idProof,setidProof]=useState('');
  const [gender,setgender]=useState('');
  const [dob,setdob]=useState('');
  const [password,setpassword]=useState('');
  const nav=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post("http://localhost:8000/api/v1/user/register",{
        firstname,lastname,email,phone,idProof,gender,dob,password,role:"patient"
      });
      if(response.status===200)
      {
        toast.success(response.data.message);
        setfirstname('');
        setlastname('');
        setemail('');
        setphone('');
        setdob('');
        setgender('');
        setpassword('');
        setidProof('');
        nav('/login');
      }
    }catch(error){
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='container form-component register-form'>
      <h2>Please Register to continue</h2>
      <form onSubmit={handleSubmit}>
      <div>
      <input type='text' placeholder='First Name' value={firstname} onChange={(e)=>{setfirstname(e.target.value)}}/>
      <input type='text' placeholder='Last Name' value={lastname} onChange={(e)=>{setlastname(e.target.value)}}/>
      </div>
      <div>
      <input type="text" placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
      <input type='number' placeholder='Phone' value={phone} onChange={(e)=>{setphone(e.target.value)}}/>
      </div>
      <div>
      <input type='number' placeholder='id-Proof' value={idProof} onChange={(e)=>{setidProof(e.target.value)}}/>
      <select value={gender} onChange={(e)=>{setgender(e.target.value)}}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      </div>
      <div style={{height:"65px"}}>
      <input type='date' placeholder='Date of Birth' value={dob} onChange={(e)=>{setdob(e.target.value)}}/>
      <input type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
      </div>
      <div>
      <button type="submit">Register</button>
      <div style={{marginTop:10}}>
        <p>Already Registered?</p>
        <Link to='/login'>Login</Link>
      </div>
      </div>
       </form>
     </div>
  )
}

export default Register