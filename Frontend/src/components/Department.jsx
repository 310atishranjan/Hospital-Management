import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
function Department() {
    const departmentArray=[
        {
            name:"Pediatrics",
            url:"/pediatric.jpg"
        },
        {
            name:"Cardiology",
            url:"/cardio.jpg"
        },
        {
            name:"Neurology",
            url:"/doctor.jpg"
        },
        {
            name:"Gastro-ENT",
            url:"/gastro.png"
        },
    ]
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (
    <div className='container departments'>
        <h2>Departments</h2>
    <Carousel responsive={responsive} removeArrowOnDeviceType={["mobile","tablet"]}>
        {
            departmentArray.map((depart,index)=>{
                return(
                    <div className="card" key={index}>
                        <div className='depart-name'>{depart.name}</div>
                        <img src={depart.url} alt={depart.name} />
                    </div>
                )
            })
        }
    </Carousel>
    </div>
  )
}

export default Department