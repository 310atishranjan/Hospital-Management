import { useContext,useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Addnewdoctor from './components/Addnewdoctor'
import Addnewadmin from './components/Addnewadmin'
import Doctors from './components/Doctors'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {Context} from './main';
import Sidebar from './components/Sidebar'

function App() {
  const {isAuthenticated,setisAuthenticated,setuser,Token}=useContext(Context);
  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        let response = await axios.get("http://localhost:8000/api/v1/user/admin-details",
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          }
      });
        setisAuthenticated(true);
        setuser(response.data.details);
      }catch(err){
        setisAuthenticated(false);
        setuser({});
      }
    }
    fetchUser();
  },[isAuthenticated])
  return (
    <>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/add/newdoctor' element={<Addnewdoctor/>}/>
          <Route path='/add/newadmin' element={<Addnewadmin/>}/>
          <Route path='/doctor' element={<Doctors/>}/>
        </Routes>
        <ToastContainer position="top-center"/>
      </Router>
    </>
  )
}

export default App