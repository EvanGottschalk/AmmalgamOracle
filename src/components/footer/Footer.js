import React, { useEffect } from 'react';

import Aos from "aos";
import "aos/dist/aos.css";

import './footer.css'

import nofun_logo_title_image from '../../image/nofun-logo-title.png';
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
          <img src={powered_by_image} alt="Powered by NoFun Labs" className='poweredByImage' id='poweredByTextImage'/>
          <a href='https://nofunlabs.xyz' target='_blank'>
            <img onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} src={nofun_logo_title_image} alt="Powered by NoFun Labs" className='poweredByImage footerButton' id='poweredByImage'/>
          </a>
        </div>
        <div className='footerTextContainer'>
          <marquee>Contract Address: "0x4E35d70889B5A698fE9AE2C19CB280f29DBDF7eC". . . . . . . . . . . . . . . . . . . . Contract Name: "TheBirthOfMeliora". . . . . . . . . . . . . . . . . . . . Contract Symbol: MELIORA1 . . . . . . . . . . . . . . . . . . . .  Collection URI: https://nftstorage.link/ipfs/bafybeidicmrt6v64jdchhn7jtzz4ydtj3vfmruzyn2t4fxybxhhhyv3lo4/TheGenesisOfMeliora.json . . . . . . . . . . . . . . . . . . . . Collection Name: "The Genesis of Meliora" . . . . . . . . . . . . . . . . . . . . </marquee>
        </div>
      </div>
      <div className='creatorAttributionContainer'>
        <div className='creatorAttributionText'>Site created by </div><a className='creatorAttributionLink' href="https://twitter.com/EvanOnEarth_eth">@EvanOnEarth_eth</a>
      </div>
    </div>
  )
}

export default Footer