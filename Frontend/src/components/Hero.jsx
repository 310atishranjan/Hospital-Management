import React from 'react'

const Hero=({title,url})=> {
  return (
    <>
    <div className='hero container'>
    <div className='banner'>
        <h2>{title}</h2>
        <p>Aars health care is dedicated to 
            the people with affordable and reliable 
            test,treatment and ensures good health. 
        </p>
    </div>
    <div className='banner'>
        <img src={url} alt='doctor logo' className='doc-logo'></img>
    </div>
    </div>
    </>
  )
}

export default Hero