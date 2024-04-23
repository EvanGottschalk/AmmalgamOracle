//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useEffect, useContext } from 'react';
import SmartContractContext from '../../scripts/SmartContractContext';
import Aos from "aos";
import "aos/dist/aos.css";

//import walletButton from '../../image/button_4x1.png'
//import connectWallet from '../../scripts/SmartContractOperator';

import logo from '../../image/logo.png'

import twitter_icon from '../../image/icons/twitter.png'
import linkedin_icon from '../../image/icons/linkedin.png'
import instagram_icon from '../../image/icons/instagram.png'
import discord_icon from '../../image/icons/discord.png'

import './navbar.css'











//--------------------------------------------------------------------------------------------------
//# Variables

const connect_on_load = false;

var mobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  console.log("Mobile device detected");
  mobile = true;
};



//AppStart
const Navbar = () => {

let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
let { user_balance, setBalance_Context } = useContext(SmartContractContext);
let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);

useEffect(() => {
  Aos.init({ duration: 2000 });
}, []);







//--------------------------------------------------------------------------------------------------
//# Functions

function mouseover(event) {
  let element = document.getElementById(event.target.id);
  element.style.transform = 'scale(1.20)';
};

function mouseleave(event) {
  let element = document.getElementById(event.target.id);
  element.style.transform = 'scale(1.0)';
};




//--------------------------------------------------------------------------------------------------
//# HTML

return (
  <div className='navbar'>
    {/* <div className='navbarMobile'>
      <div className='navbarCenterIcon'>
        <div className='navbarMobileTopRight '>MobileLeftTitle</div>
      </div>
    </div>
    <div className='navbarMobileButton'>
      <MobileMenu className={Mobile ? 'Mobile' : 'Mobile'} onClick={HandleMobileMenu} />
      <div className={Mobile ? 'navbarMobileContainerActive' : 'navbarMobileContainer'}>
        <div className={Mobile ? 'navbarMenu active' : 'navbarMenu'}>
          <div className='navbarMenuContainer'>
            <div className='navbarMobileTop'>
              <div className='navbarMobileTopRight menuOpen'>MobileMenuText</div>
              <div className='navbarMobileTopLeft'>
                <Close className='CloseIcon' onClick={HandleMobileMenu} />
              </div>
            </div>
            <div className='navbarMobileMain'>
              <div className='navbarCenterLink opacity7'>MobileMenuMiddleText</div>
              <div className='navbarCenterLink navbarRightButton'>MobileMenuButton</div>
            </div>
          </div>
        </div>
      </div>
    </div>*/}
    <div className='navbarContainer SlideRightAnimation'>
      <div className='navbarLeft'>
        <div id="navbarLogo" className='navbarLogo'>
          <a href={window.location['origin']}>
            <img data-aos="fade-down-right" className="navbarLogoImage" id="navbarLogoImage" src={logo} alt='Home' onMouseOver={mouseover} onMouseLeave={mouseleave}/>
          </a>
        </div>
      </div>
      <div className='navbarRight'>
        <div className='navbarSocialsContainer'>
          <div className='navbarIconContainer'>
            <a href='https://www.instagram.com/melioraapp/' target="_blank">
              <img data-aos="fade-down-left" src={instagram_icon} onMouseOver={mouseover} onMouseLeave={mouseleave} id='instagramIcon' className='navbarIcon instagramIcon' alt='@MelioraFun'/>
            </a>
            {/* <a href='https://www.linkedin.com/in/evan-gottschalk/' target="_blank">
              <img data-aos="fade-down" src={linkedin_icon} onMouseOver={mouseover} onMouseLeave={mouseleave} id='linkedinIcon' className='navbarIcon linkedinIcon' alt='NoFun Labs'/>
            </a> */}
            <a href='https://nofunz.one/discord/' target="_blank">
              <img data-aos="fade-down" src={discord_icon} onMouseOver={mouseover} onMouseLeave={mouseleave} id='discordIcon' className='navbarIcon discordIcon' alt='Join Discord'/>
            </a>
            <a href='https://twitter.com/melioraFun' target="_blank">
              <img data-aos="fade-down-right" src={twitter_icon} onMouseOver={mouseover} onMouseLeave={mouseleave} id='twitterIcon' className='navbarIcon twitterIcon' alt='@MelioraFun'/>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
//AppEnd

export default Navbar