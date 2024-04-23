import React, { useContext } from 'react';
import SmartContractContext from '../../scripts/SmartContractContext';

import services_image from '../../image/services-image.png'
import twitter_icon from '../../image/icons/twitter.png'
import linkedin_icon from '../../image/icons/linkedin.png'
import instagram_icon from '../../image/icons/instagram.png'



import './services.css'

const Services = () => {

  function mouseover(event) {
    console.log(event.target.id);
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.40)';
  }
  
  function mouseleave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }


  return (
    <div className='services'>
      <div className='servicesLeftContainer'>
        <div className='servicesRightTop'>
          <div className='servicesImageContainer'>
            <img data-aos="fade-right" data-aos-delay="2000" src={services_image} alt='' className='servicesImage' />
          </div>
        </div>
      </div>
      <div className='servicesRightContainer'>
        <div className='servicesTextContainer'>
          <div data-aos="fade-left" data-aos-delay="200" className='servicesText' style={{
            textDecoration: 'underline',
            fontSize: '35px'}}>The Bull Market is Coming.</div>
          <div data-aos="fade-left" data-aos-delay="400" className='servicesText' style={{
            textDecoration: 'none',
            fontSize: '25px'}}>Can you afford to wait?</div>
          <br></br>
          <div data-aos="fade-left" data-aos-delay="600" className='servicesText servicesDescription' style={{
            textDecoration: 'none',
            fontSize: '14.5px'}}>Book a 30-minute consultation for $99:</div>
          <br></br>
          <div data-aos="fade-left" data-aos-delay="800" className='paypalContainer'>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="ALDLNQ6GM5HWY" />
              <table>
                <tr>
                  <td>
                    <input type="hidden" name="on0" value="Please enter your email:"/>
                    Please enter your email:
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" name="os0" maxLength="200" />
                  </td>
                </tr>
              </table>
              <input type="hidden" name="currency_code" value="USD" />
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Buy Now" />
            </form>
          </div>
        </div>
        <div className='tokenMetricsCTA'>
          <div data-aos="fade-left" data-aos-delay="1000">Pro tip!</div>
          <div data-aos="fade-left" data-aos-delay="1200">
            <span>You can easily </span>
            <a href='https://tokenmetrics.sjv.io/g1LqQr' className='linkToTokenMetrics' target="_blank">reduce risk in your crypto portfolio with AI -></a>
          </div>
        </div>
        <div className='servicesFooter'>
          <div className='servicesFooterIconContainer'>
            <div className='servicesFooterSocialsContainer'>
              <a href='https://twitter.com/EvanOnEarth_eth' target="_blank">
                <img data-aos="fade-right" src={twitter_icon} id='servicesTwitterIcon' onMouseOver={mouseover} onMouseLeave={mouseleave} className='servicesFooterIcon twitterServicesFooterIcon'/>
              </a>
              <a href='https://www.linkedin.com/in/evan-gottschalk/' target="_blank">
                <img data-aos="fade-up" src={linkedin_icon} id='servicesLinkedinIcon' onMouseOver={mouseover} onMouseLeave={mouseleave} className='servicesFooterIcon linkedinServicesFooterIcon'/>
              </a>
              <a href='https://www.instagram.com/evanonearth_eth/' target="_blank">
                <img data-aos="fade-left" src={instagram_icon} id='servicesInstagramIcon' onMouseOver={mouseover} onMouseLeave={mouseleave} className='servicesFooterIcon instagramServicesFooterIcon'/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
