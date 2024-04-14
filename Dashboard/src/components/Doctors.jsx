import {useEffect,useState,useContext} from 'react'
import axios from "axios";
import { Context } from '../main';
import {useNavigate} from "react-router-dom";
const Doctors = () => {
  const {isAuthenticated}=useContext(Context);
  const [doctors,setdoctors]=useState([]);
  useEffect(()=>{
      const fetchUser=async()=>{
          const {data}=await axios.get("http://localhost:8000/api/v1/user/get-doctorlist");
          console.log(data.doctorData);
          setdoctors(data.doctorData);
      }
      fetchUser();
  },[])
  const nav=useNavigate();
  if(!isAuthenticated)
  nav('/login');
  return (
    <>
    <section className='page doctors'>
      <h1>Doctors</h1>
      <div className='banner'>
        {
          doctors&&doctors.length>0 ? 
          (
            doctors.map((element)=>{
              return(
                <>
                <div className="card">
                  <h4>{`${element.firstname} ${element.lastname}`}</h4>
                  <div className='details'>
                    <p>Email:<span>{element.email}</span></p>
                    <p>Phone:<span>{element.phone}</span></p>
                    <p>Degree:<span>{element.degree}</span></p>
                    <p>Specialist:<span>{element.specialist}</span></p>
                    <p>Department:<span>{element.doctordepartment}</span></p>
                  </div>
                </div>
                </>
              )
            })
          ):<h1>No Registered doctors found</h1>
        }
      </div>
    </section>
    </>
  )
}

export default Doctors