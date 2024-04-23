import React from 'react'

import about_image from '../../image/about-image.png'



import './about.css'

const About = () => {

  function mouseover(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.20)';
  }
  
  function mouseleave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }

  return (
    <div className='about'>
      <div className='aboutLeftContainer'>
        <div className='aboutTextContainer'>
          <div className='aboutText aboutTitle' data-aos="fade-right" data-aos-delay="100">Co-founder at NoFun Labs</div>
          <div className='aboutText aboutTagline' data-aos="fade-right" data-aos-delay="200" style={{
            textDecoration: 'none',
            color: '#00ef63'}}>- Blockchain Onboarding Solutions -</div>
          <div className='aboutText' data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Start onboarding your next 1,000,000 users now:</div>
          <a data-aos="flip-down" data-aos-delay="0" href='https://evanon.earth/nofunlabs' target="_blank" 
          className='aboutText aboutLink' id='nofunlabsLink' onMouseOver={mouseover} onMouseLeave={mouseleave} style={{
            textDecoration: 'none',
            color: '#7CE2F9'}}>evanon.earth/nofunlabs -></a>
          <br></br>
          <div data-aos="fade-right"  data-aos-delay="500" className='aboutText aboutTitle'>Advisor at BrightID</div>
          <div data-aos="fade-right" data-aos-delay="600" className='aboutText aboutTagline' style={{
            textDecoration: 'none',
            color: '#ff9500'}}>- Decentralized Identity Protocol -</div>
          <div data-aos="fade-right" data-aos-delay="700" className='aboutText' style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Your identity, your privacy, all in your custody. No "orb" required:</div>
          <a data-aos="flip-down" data-aos-delay="0" href='https://evanon.earth/brightid' target="_blank"
          className='aboutText aboutLink' id='brightidLink' onMouseOver={mouseover} onMouseLeave={mouseleave} style={{
            textDecoration: 'none',
            color: '#7CE2F9'}}>evanon.earth/brightid -></a>
          <br></br>
          <div data-aos="fade-right" data-aos-delay="900" className='aboutText aboutTitle'>Advisor at Unitap</div>
          <div data-aos="fade-right" data-aos-delay="1000" className='aboutText aboutTagline' style={{
            textDecoration: 'none',
            color: '#ea49ff'}}>- Universal Token Distribution Platform -</div>
          <div data-aos="fade-right" data-aos-delay="1100" className='aboutText' style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Grow your dapp's userbase with free gas and token raffles:</div>
          <a data-aos="flip-down" data-aos-delay="00" href='https://evanon.earth/unitap' target="_blank"
          className='aboutText aboutLink' id='unitapLink' onMouseOver={mouseover} onMouseLeave={mouseleave} style={{
            textDecoration: 'none',
            color: '#7CE2F9'}}>evanon.earth/unitap -></a>
        </div>
      </div>
      <div className='aboutRightContainer'>
        <div className='aboutRightTop'>
          <div className='aboutImageContainer'>
            <img data-aos="fade-left" src={about_image} alt='' className='aboutImage' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
