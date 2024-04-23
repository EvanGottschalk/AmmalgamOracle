import React from 'react'

// import background1 from '../../image/background1.png'
import background2 from '../../image/background2.png'
//import background3 from '../../image/background3.png'


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
      <div className='background1Container' style={{display: 'none'}}>
        <img src={background2} alt='' className='background1' />
      </div>
      <div className='background2Container' style={{display: 'none'}}>
        <img src={background2} alt='' className='background2'/>
      </div>
      <div className='background3Container' style={{display: 'none'}}>
        <img src={background2} alt='' className='background3' />
      </div>
    </div>
  )
}

export default Background