import {useState,useContext} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { Context } from '../main';
function Addnewdoctor(){
  const [firstname,setfirstname]=useState('');
  const [lastname,setlastname]=useState('');
  const [email,setemail]=useState('');
  const [phone,setphone]=useState('');
  const [idProof,setidProof]=useState('');
  const [gender,setgender]=useState('');
  const [dob,setdob]=useState('');
  const [password,setpassword]=useState('');
  const [degree,setdegree]=useState('');
  const [specialist,setspecialist]=useState('');
  const [doctordepartment,setdepartment]=useState('');
  const {isAuthenticated}=useContext(Context);
  const nav=useNavigate();
  const departmentsArray = [
    "Pediatrics",
    "Cardiology",
    "Gastro",
    "Neurology",
  ];
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:8000/api/v1/user/add-doctor",{
        firstname,lastname,email,phone,idProof,gender,dob,password,degree,specialist,doctordepartment,role:"doctor"
      }).then((res)=>{
        toast.success(res.data.message);
        setfirstname('');
        setlastname('');
        setemail('');
        setphone('');
        setdob('');
        setgender('');
        setpassword('');
        setidProof('');
        setdegree('');
        setdepartment('');
        setspecialist('');
        nav('/');
      })
    }catch(error){
      toast.error(error.response.data.message);
    }
  }
  if(!isAuthenticated){
    nav('/login');
  }
  return (
    <section className='page'>
          <div className='container form-component add-doctor-form'>
      <h2>Add new Doctor</h2>
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
      <div style={{height:"65px"}}>
      <input type='text' placeholder='All-degree' value={degree} onChange={(e)=>{setdegree(e.target.value)}}/>
      <input type="text" placeholder="Specialist" value={specialist} onChange={(e)=>{setspecialist(e.target.value)}}/>
      </div>
      <div style={{height:"65px"}}>
      <select value={doctordepartment} onChange={(e)=>{setdepartment(e.target.value)}}>
        <option value="">Select department</option>
          {
            departmentsArray.map((val,index)=>{
              return(
              <option value={val} key={index}>{val}</option>
              )
            })
          }
      </select>
      </div>
      <div>
      <button type="submit">ADD NEW Doctor</button>
      </div>
       </form>
     </div>
    </section>
  )
}

export default Addnewdoctor