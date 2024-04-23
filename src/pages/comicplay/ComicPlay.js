import React from 'react'

import Animation from '../../components/animation/Animation'
import GameGUI from '../../components/gamegui/GameGUI'
// import Background from '../../components/background/Background';

import './comicplay.css'

const ComicPlay = () => {
  return (
    <div className='comicplay'>
      {/* <Background /> */}
      <GameGUI />
      <Animation />
    </div>
  )
}

export default ComicPlay
