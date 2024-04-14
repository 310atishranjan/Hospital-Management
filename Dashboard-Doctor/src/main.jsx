import React, { createContext,useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const Context=createContext({isAuthenticated:false});
const AppWrapper=()=>{
  const [isAuthenticated,setisAuthenticated]=useState(false);
  const [user,setuser]=useState({});
  const [Token,setToken]=useState('');
  return (
    <Context.Provider value={{isAuthenticated,setisAuthenticated,user,setuser,Token,setToken}}>
      <App/>
    </Context.Provider>
    );
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
