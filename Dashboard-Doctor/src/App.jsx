import { useContext,useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { Context } from './main';
import axios from "axios";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {isAuthenticated,setisAuthenticated,setuser,Token}=useContext(Context);
  useEffect(()=>{
    const fetchUser=async()=>{
        try{
          let response = await axios.get("http://localhost:8000/api/v1/user/doctor-details",
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
        </Routes>
        <ToastContainer position='top-center'></ToastContainer>
      </Router>
    </>
  )
}

export default App
