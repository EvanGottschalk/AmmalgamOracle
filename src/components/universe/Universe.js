import React from 'react'

import universe_image from '../../image/universe-image.png'



import './universe.css'

const Universe = () => {

  function mouseover(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.20)';
  }
  
  function mouseleave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }

  return (
    <div className='universeContainer'>
      <div className='universe'>
        <img data-aos="fade-left" src={universe_image} alt='' className='universe' />
      </div>
    </div>
  )
}

export default Universe
