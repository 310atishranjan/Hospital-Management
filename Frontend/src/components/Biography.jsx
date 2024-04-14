import React from 'react'

function Biography({url}) {
  return (
    <>
    <div className='container biography'>
        <div className='banner'>
            <img src={url} alt="about" />
        </div>
        <div className='banner'>
            <p>Biography</p>
            <p>who we are ?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                Esse neque maiores ullam excepturi nobis. Explicabo.</p>

            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Reprehenderit, distinctio.</p>
        </div>
    </div>
    </>
  )
}

export default Biography