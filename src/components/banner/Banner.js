import React from 'react'; 

import banner_image from '../../image/banner.png';
import collect_forever_onchain_image from '../../image/sub-banner.png';

import './banner.css'

const Banner = () => {
  

  return (
    <div className='banner'>
      <div className='bannerContainer'>
        <img data-aos="fade-left" src={banner_image} alt='' className='bannerImage' />
      </div>
      <div className='bannerContainer subBannerBannerContainer'>
        <img data-aos="fade-left" src={collect_forever_onchain_image} alt='' id='subBannerBanner' className='subBannerBannerImage'  />
      </div>
    </div>
  )
}

export default Banner