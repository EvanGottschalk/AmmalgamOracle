import React from 'react'

import Animation from '../../components/animation/Animation'
import MintGUI from '../../components/mintgui/MintGUI'
// import Background from '../../components/background/Background';

import './comicmint.css'

const ComicMint = () => {
  return (
    <div className='comicmint'>
      {/* <Background /> */}
      <MintGUI />
      <Animation />
    </div>
  )
}

export default ComicMint
