import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
function AppointmentForm() {
    const [name,setname]=useState('');
    const [gender,setgender]=useState('');
    const [age,setage]=useState('');
    const [phone,setphone]=useState('');
    const [appointmentDate,setappointmentDate]=useState('');
    const [address,setaddress]=useState('');
    const [uniqueId,setuniqueId]=useState('');
    const [doctor_firstName,setdoctorfirstname]=useState('');
    const [doctor_lastName,setdoctorlastname]=useState('');
    const [department,setdepartment]=useState('');

    const departmentArray=[
       "Pediatrics",
       "Cardiology",
       "Gastro",
       "Neurology",
    ];
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
      const response=await axios.post("http://localhost:8000/api/v1/appoint/book-appoint",{name,gender,age,phone,
      appointmentDate,uniqueId,doctor_firstName,doctor_lastName
      });
      toast.success(response.data.message);
      setname('');
      setaddress('');
      setage('');
      setappointmentDate('');
      setdepartment('');
      setdoctorfirstname('');
      setdoctorlastname('');
      setgender('');
      setdepartment('');
      setphone('');
    }catch(error){
      toast.error(error.response.data.message);
    }
    }
    const [doctors,setdoctors]=useState([]);
    useEffect(()=>{
        const fetchUser=async()=>{
            const {data}=await axios.get("http://localhost:8000/api/v1/user/get-doctorlist");
            setdoctors(data.doctorData);
        }
        fetchUser();
    },[])
  return (
    <div className='container form-component register-form'>
      <h2>Book Your Appointment</h2>
      <form onSubmit={handleSubmit}>
      <div>
      <input type='text' placeholder='Name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
      <select value={gender} onChange={(e)=>{setgender(e.target.value)}}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      </div>
      <div>
      <input type="text" placeholder="Age" value={age} onChange={(e)=>{setage(e.target.value)}}/>
      <input type='number' placeholder='Phone' value={phone} onChange={(e)=>{setphone(e.target.value)}}/>
      </div>
      <div>
      <input type='date' placeholder='Appointment Date' value={appointmentDate}  onChange={(e)=>{setappointmentDate(e.target.value)}} />
      <input type='number' placeholder='id-Proof' value={uniqueId} onChange={(e)=>{setuniqueId(e.target.value)}}/>
      </div>
      <div>
        <select value={department} onChange={(e)=>{setdepartment(e.target.value);
        setdoctorfirstname('');
        setdoctorlastname('');
        }}>
          {
            departmentArray.map((depart,index)=>{
              return(
                <option value={depart} key={index}>
                  {depart}
                </option>
              )
            })
          }
        </select>
        <select value={`${doctor_firstName} ${doctor_lastName}`} onChange={(e)=>{
          const [firstname,lastname]=e.target.value.split(' ');
          setdoctorfirstname(firstname);
          setdoctorlastname(lastname);
        }} disabled={!department}>
          <option value="">Select Doctor
          {
            doctors.filter((doctor)=>doctor.doctordepartment===department).map((doctor,index)=>{
              <option value={`${doctor.firstname} ${doctor.lastname}`} key={index}>
                {doctor.firstname} {doctor.lastname}
              </option>
            })
          }
          </option>
        </select>
      </div>
      <textarea rows="10" value={address} placeholder='Address' onChange={(e)=>setaddress(e.target.value)}></textarea>
      <button type="submit">Book Appointment</button>
       </form>
    </div>
  )
}

export default AppointmentForm