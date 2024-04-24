import React from 'react'

import background_image from '../../image/background.png'


import './background.css'

const Background = () => {

  var mobile_device = false;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    console.log("Mobile device detected");
    mobile_device = true;
  };
  
  window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.background1Container');
    let scrollPosition = window.scrollY;

    parallax.style.transform = 'translateY(' + scrollPosition * 0.7 + 'px)';
  });
  return (
    <div className='background'>
      <div className='background1Container'>
        <img src={background_image} alt='' className='backgroundImage' />
      </div>
    </div>
  )
}

export default Background