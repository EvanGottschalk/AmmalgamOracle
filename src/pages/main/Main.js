import React from 'react'

import Banner from '../../components/banner/Banner';
import OracleGUI from '../../components/oraclegui/OracleGUI';
import Animation from '../../components/animation/Animation';

import './main.css'

const Main = () => {
  return (
    <div className='main'>
      <Banner />
      <OracleGUI />
      <Animation />
    </div>
  )
}

export default Main
