import React,{createContext, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const Context=createContext({isAuthenticated:false});
const Appwrapper=()=>{
  const [isAuthenticated,setisAuthenticated]=useState(false);
  const [user,setUser]=useState({});
  const [Token,setToken]=useState('');
  const [role,setrole]=useState('');
  return (
  <Context.Provider value={{isAuthenticated,setisAuthenticated,user,setUser,Token,setToken,role,setrole}}>
    <App/>
  </Context.Provider>
  );
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Appwrapper/>
  </React.StrictMode>,
)