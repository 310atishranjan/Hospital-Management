import React from 'react'
import Hero from '../components/Hero'
import AppointmentForm from '../components/AppointmentForm'

function Appointment() {
  return (
    <>
    <Hero title='Schedule Your Appointment' url='/appointment.jpg'/>
    <AppointmentForm/>
    </>
  )
}

export default Appointment