import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'

function Aboutus() {
  return (
    <div>
      <Hero title='Learn More About our Hospital' url='/hospital.jpg'/>
      <Biography url={'/pediatric.jpg'}/>
    </div>
  )
}

export default Aboutus