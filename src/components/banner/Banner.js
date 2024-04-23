import React from 'react'; 

import banner_image from '../../image/meliora-comic-banner-2.png';
import collect_forever_onchain_image from '../../image/collect-forever-onchain.png';

import './banner.css'

const Banner = () => {
  

  return (
    <div className='banner'>
      <div className='bannerContainer'>
        <img data-aos="fade-left" src={banner_image} alt='' className='bannerImage' />
      </div>
      <div className='bannerContainer collectForeverBannerContainer'>
        <img data-aos="fade-left" src={collect_forever_onchain_image} alt='' id='collectForeverBanner' className='collectForeverBannerImage'  />
      </div>
    </div>
  )
}

export default Banner