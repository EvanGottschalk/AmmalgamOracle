import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Banner from './components/banner/Banner';
import Background from './components/background/Background';
import Main from './pages/main/Main';
import Footer from './components/footer/Footer';
import ComicPlay from './pages/comicplay/ComicPlay';
import ComicMint from './pages/comicmint/ComicMint';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import SmartContractContext from './scripts/SmartContractContext';


const App = () => {
     let [user_address, setAddress_Context] = useState(null);
     let [user_balance, setBalance_Context] = useState(null);
     let [network_name, setNetwork_Context] = useState(null);
     let [user_token_ID, setTokenID_Context] = useState(null);
     let [user_metadata, setMetadata_Context] = useState(null);
     let [user_avatar_URI, setAvatarURI_Context] = useState(null);
     let [contract_name, setContractName_Context] = useState(null);
     return (
          <SmartContractContext.Provider value={{ user_address, setAddress_Context,
                                                  user_balance, setBalance_Context,
                                                  network_name, setNetwork_Context,
                                                  user_token_ID, setTokenID_Context,
                                                  user_metadata, setMetadata_Context,
                                                  user_avatar_URI, setAvatarURI_Context,
                                                  contract_name, setContractName_Context }}>
               <Background />
               <Navbar />
               <Banner />
               <ComicMint />
               <Footer />
               {/* <BrowserRouter>
                    <Background />
                    <Navbar />
                    <Routes>
                         <Route exact path="/" element={<Main />} />
                         <Route exact path="/comics/meliora/volume1/play" element={<ComicPlay />} />
                         <Route exact path="/comics/meliora/volume1/mint" element={<ComicMint />} />
                    </Routes>
                    <Footer />
               </BrowserRouter> */}
          </SmartContractContext.Provider>
     )
}

export default App
