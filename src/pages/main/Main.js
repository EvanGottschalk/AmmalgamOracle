import React from 'react'
// import About from '../../components/about/About'
// import Services from '../../components/services/Services'
//import Roadmap from '../../components/roadmap/Roadmap'
//import Team from '../../components/team/Team'
//import FAQ from '../../components/faq/FAQ'

// import Background from '../../components/background/Background';
import Banner from '../../components/banner/Banner';
import MintGUI from '../../components/mintgui/MintGUI';
import Universe from '../../components/universe/Universe';
import Guardians from '../../components/guardians/Guardians';
import Partners from '../../components/partners/Partners';
import Animation from '../../components/animation/Animation';
//import PageDescription from '../../components/pagedescription/PageDescription'
//import GetStarted from '../../components/getstarted/GetStarted'
//import EvolutionDescription from '../../components/evolutiondescription/EvolutionDescription'

import './main.css'

const Main = () => {
  return (
    <div className='main'>
      {/* <Background /> */}
      <Banner />
      <MintGUI />
      <Universe />
      <Guardians />
      <Partners />
      {/*/<About />*/}
      {/*/<Services />*/}
      <Animation />
    </div>
  )
}

export default Main
