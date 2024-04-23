import React from 'react'

import guardians_image from '../../image/guardians-image.png'



import './guardians.css'

const Guardians = () => {

  function mouseover(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.20)';
  }
  
  function mouseleave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }

  return (
    <div className='guardiansContainer'>
      <div className='guardians'>
        <img data-aos="fade-left" src={guardians_image} alt='' className='universe' />
      </div>
    </div>
  )
}

export default Guardians
