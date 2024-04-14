import { Context } from "../main"
import { useContext,useState,useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
const Dashboard = () => {
  const {isAuthenticated,user,Token}=useContext(Context);
  const [appointment,setAppointment]=useState([]);
  const nav=useNavigate();
  const handleUpdate=async(appointmentId,status)=>{
    try{
    const {data}=await axios.put(`http://localhost:8000/api/v1/appoint/update-status/${appointmentId}`,{status},{
      headers: {
        Authorization: `Bearer ${Token}`
      }
    })
    setAppointment((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  useEffect(()=>{
    const fetchAppointment=async()=>{
      try{
      const response=await axios.get("http://localhost:8000/api/v1/appoint/get-allappoint",{
        headers: {
          Authorization: `Bearer ${Token}`
        }
      });
      console.log(response.data);
      setAppointment(response.data.Appointment);
      }catch(error){
        setAppointment([]);
        console.log(error);
      }
    }
    fetchAppointment();
  },[])
  
  if(!isAuthenticated){
    nav('/');
  }
  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <div className="content">
            <div><p>Hello!</p>
            <h5>{user && `${user.firstname} ${user.lastname}`}</h5>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, molestiae!</p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>2800</h3>
        </div>
        <div className="thirdBox">
          <p>Total Registered Doctors</p>
          <h3>28</h3>
        </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
            <tr>
              <th>Patient-Name</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
              {
                appointment && appointment.length>0 ?
                (
                  appointment.map((element)=>{
                    return(
                        <tr key={element._id}>
                          <td>{`${element.name}`}</td>
                          <td>{`${element.appointmentDate}`}</td>
                          <td>{`${element.doctor_firstName} ${element.doctor_lastName}`}</td>
                          <td>{`${element.department}`}</td>
                          <select className={
                            element.status === "Pending"
                              ? "value-pending"
                              : element.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          } value={appointment.status} onChange={(e)=>handleUpdate(element._id,e.target.value)}>
                          <option value="Pending" className="value-pending">Pending</option>
                          <option value="Accepted" className="value-accepted">Accepted</option>
                          <option value="Rejected" className="value-rejected">Rejected</option>
                          </select>
                        </tr>
                    )
                  })
                ):<h3>No Appointments</h3>
              }
            </tbody>
          </table>
       
      </div>
    </section>
  )
}

export default Dashboard