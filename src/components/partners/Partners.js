import React from 'react'

import partners_image from '../../image/partners-image.png'



import './partners.css'

const Partners = () => {

  function mouseover(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.20)';
  }
  
  function mouseleave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }

  return (
    <div className='partnersContainer'>
      <div className='partners'>
        <img data-aos="fade-left" src={partners_image} alt='' className='partners' />
      </div>
    </div>
  )
}

export default Partners
