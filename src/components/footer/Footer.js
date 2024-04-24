import React, { useEffect } from 'react';

import Aos from "aos";
import "aos/dist/aos.css";

import './footer.css'

import logo_title_image from '../../image/ammalgam-logo-title.png';
import powered_by_image from '../../image/powered-by.PNG';

const Footer = () => {
  
  
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);


  function onMouseOver(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.05)';
  };
  
  function onMouseLeave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  };


  return (
    <div className='footer'>
      <div className='footerContainer'>
        <div className='poweredByContainer' id='poweredByContainer'>
          <img src={powered_by_image} alt="Powered by Ammalgam" className='poweredByImage' id='poweredByTextImage'/>
          <a href='https://ammalgam.xyz' target='_blank'>
            <img onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} src={logo_title_image} alt="Powered by Ammalgam" className='poweredByImage footerButton' id='poweredByImage'/>
          </a>
        </div>
      </div>
      <div className='creatorAttributionContainer'>
        <div className='creatorAttributionText'>Site created by </div><a className='creatorAttributionLink' href="https://twitter.com/EvanOnEarth_eth">@EvanOnEarth_eth</a>
      </div>
    </div>
  )
}

export default Footer