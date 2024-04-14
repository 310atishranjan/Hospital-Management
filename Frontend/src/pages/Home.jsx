import React from 'react'
import Hero from '../components/Hero';
import Department from '../components/Department';
import Biography from '../components/Biography';
function Home() {
  return (
    <>
    
        <Hero title={"Welcome to Aars Health Care"} url={'/doctor.jpg'}/>
        <Biography url={'/hospital.jpg'}/>
        <Department/>
    </>
  )
}

export default Home