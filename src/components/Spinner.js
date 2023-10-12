import React from 'react'
import loader from '../loading.gif'

const Spinner =()=>{
  
    return (
      <div className='text-center'>
        <img src={loader} />
      </div>
    )
  
}

export default Spinner