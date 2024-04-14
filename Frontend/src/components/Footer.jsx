import React from 'react'
import { FaLocationArrow, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom'

function Footer() {
    const Timing=[
        {
            id:1,
            day:"Sunday,Tuesday,Friday ",
            department:"Cardiology ",
            time:"9:00am to 6:00pm"
        },
        {
            id:2,
            day:"Monday,Wednesday,Thursday ",
            department:"Neurology ",
            time:"12:00am to 6:00pm"
        },
        {
            id:3,
            day:"Monday to Saturday ",
            department:"Gastro-General ",
            time:"9:00am to 6:00pm"
        }
    ];
  return (
    <>
  
    <footer className='container'>
    <hr/>
        <div className='content'>
            <div><h4>Aars</h4></div>
            <div>
                <h4>Quick Links</h4>
                <ul>
                    <Link to='/'>Home</Link>
                    <Link to='/appointment'>Appointment</Link>
                    <Link to='/about'>About</Link>
                </ul>
            
        </div>
        <div>
        <h4>Timing</h4>
        <ul>
            {
                Timing.map((element)=>{
                    return(
                        <li key={element.id}>
                             <span>{element.department}</span><br/>
                            <span>{element.day}</span>
                            <span>{element.time}</span>
                        </li>
                    )
                })
            }
        </ul>
        </div>
        <div>
            <h4>Contact</h4>
        
        <div>
            <FaPhone/>
            <span>777-777-7777</span>
        </div>
        <div>
            <MdEmail/>
            <span>care@gmail.com</span>
        </div>
        <div>
            <FaLocationArrow/>
            <span>Nabinagar Aurangabad Bihar</span>
        </div>
        </div>
        </div>
    </footer>
    </>
  )
}

export default Footer