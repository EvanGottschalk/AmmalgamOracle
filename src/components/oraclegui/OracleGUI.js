import React, { useState, useContext, useEffect, useRef } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';

import Aos from "aos";
import "aos/dist/aos.css";

import { connectWallet, runContractFunction } from '../../scripts/SmartContractOperator';
import { getOpenSeaLink } from '../../scripts/SmartContractOperator';


import './oraclegui.css'

var opensea_link = '';
var symbol = 'ETH';

const OracleGUI = () => {


  const container = useRef();

  useEffect(
    () => {
      Aos.init({ duration: 1500 });
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "COINBASE:ETHUSD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    },
    []
  );


  let { user_address, setAddress_Context } = useContext(SmartContractContext);
  let { user_balance, setBalance_Context } = useContext(SmartContractContext);
  let { network_name, setNetwork_Context } = useContext(SmartContractContext);
  let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
  let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
  let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);
  let { contract_name, setContractName_Context } = useContext(SmartContractContext);

  network_name = 'base';
  contract_name = 'MelioraComicV1';
  user_address = false;
  var total_minted = 0; //runContractFunction(contract_name, 'getTotalSupply');

  function onMouseOver(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.10)';
  };
  
  function onMouseLeave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  };

  function handleFieldChange(event) {
    if (event.target.id === "tokenInputField") {
      const trading_view_container = document.getElementById("tradingViewContainer");
      while (trading_view_container.firstChild) {
        trading_view_container.removeChild(trading_view_container.firstChild);
      };
      symbol = event.target.value.toUpperCase();
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "COINBASE:${symbol}USD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    } else {
      const current_amount_entry = event.target.value;
      const current_total_price = parseFloat(current_amount_entry) * 0.01;
      if (current_amount_entry > 0) {
        document.getElementById('customPriceText').textContent = `Total Price: ${current_total_price} ETH`;
      } else {
        document.getElementById('customPriceText').textContent = `Total Price: 0.0 ETH`;
      };
    };
  };

  async function onMouseClick(event) {
    await setUserWalletInfo();
    const mint_button = document.getElementById(event.target.id);
    if (event.target.id === 'mint1Text') {
      await executeMint(1, mint_button);
    } else if (event.target.id === 'mint5Text') {
      await executeMint(5, mint_button);
    } else if (event.target.id === 'mintCustomText') {
      if (Number(document.getElementById("mintCustomInput").value) >= 0) {
        await executeMint(Number(document.getElementById("mintCustomInput").value), mint_button);
      }
    } else if(event.target.id === 'readComicText') {
      window.open('https://bafybeictavxgorrl67f2dsvfafu4zfdhts52bg7fystxeiz2bcnxkggb6y.ipfs.nftstorage.link/#p=1', '_blank');
    } else if(event.target.id === 'viewOnOpenseaText') {
      window.open(opensea_link, '_blank');
    };
    // await updateTotalMinted();
  };

  async function executeMint(amount, mint_button) {
    var token_ID;
    if (amount === 1) {
      token_ID = await runContractFunction(contract_name, 'mint', [], mint_button);
    } else {
      token_ID = await runContractFunction(contract_name, 'mintBatch', [amount], mint_button);
    }
    console.log('token_ID', token_ID);
    opensea_link = await getOpenSeaLink(contract_name, token_ID);
    document.getElementById('readButtonContainer').style.display = 'flex';
    mint_button.textContent = "Mint Success!";
  };

  
  async function setUserWalletInfo() {
    await setNetwork_Context(network_name);
    const user_wallet_info = await connectWallet(network_name);
    user_address = user_wallet_info['address'];
    await setAddress_Context(user_address);
    user_balance = user_wallet_info['balance'];
    await setContractName_Context(contract_name);
    await updateGUI();
  };


  async function updateGUI() {
    document.getElementById('connectButtonText').textContent = 'Connected: ' + user_address.substr(0, 4) + "..." + user_address.substr(-4, 4);
    document.getElementById('totalMintedText').textContent = symbol + ': ' + user_balance.toString().substr(0, 7);
    document.getElementById('totalMintedText').style.display = 'flex';
  };
  



  return (
    <div className='oraclegui'>
      <div id='oracleguiComponentContainer' className='oracleguiComponentContainer componentContainer'>
        <div id='oracleguiLeftContainer' className='oracleguiLeftContainer oracleguiSideContainer sideContainer leftContainer'>
          <div id='oracleguiContentContainer_Left' className='oracleguiContentContainer_Left oracleguiContentContainer contentContainer'>
            <div id='oracleguiImageContainer1_Comic' className='oracleguiImageContainer1_Comic imageContainer'>
              <div className="tradingview-widget-container" id="tradingViewContainer" ref={container}>
                <div className="tradingview-widget-container__widget" id="tradingViewChart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='oracleguiComponentContainer' className='oracleguiComponentContainer componentContainer'>
        <div id='oracleguiRightContainer' className='oracleguiRightContainer oracleguiSideContainer sideContainer rightContainer'>
          <div id='comicDescriptionContainer' className='comicDescriptionContainer oracleguiContentContainer_Right oracleguiContentContainer contentContainer'>
            <div id='oracleguiButtonContainer_Mint' className='oracleguiButtonContainer_Select oracleguiButtonContainer buttonContainer'>
              <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='selectTokenText' className='selectTokenText oracleguiText buttonText'>
                Select Token:
              </span>
              <input data-aos="fade-left" id='tokenInputField' className='tokenInputField  inputField oracleguiRightButtonText' placeholder="Enter token..." onChange={handleFieldChange} />
            </div>
          </div>
          <div id='connectButtonContainer' className='connectButtonContainer oracleguiContentContainer_Right oracleguiContentContainer contentContainer'>
            <div id='oracleguiButtonContainer_Connect' className='oracleguiButtonContainer_Connect oracleguiButtonContainer buttonContainer'>
              <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} alt='Connect Wallet' id='connectButtonText' className='connectButtonText oracleguiButtonText oracleguiText buttonText'>
                Connect Wallet
              </span>
            </div>
          </div>
          <div id='infoButtonContainer' className='infoButtonContainer oracleguiContentContainer_Right oracleguiContentContainer contentContainer'>
            <div id='oracleguiButtonContainer_Info' className='oracleguiButtonContainer_Info oracleguiButtonContainer buttonContainer'>
              {/* <span data-aos="fade-left" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='mintPriceText' className='mintPriceText oracleguiInfoText oracleguiText oracleguiButtonText buttonText'>
                ETH Price: $????
              </span> */}
              <span style={(user_address) ? {display: "flex"} : {display: "none"}} data-aos="fade-left" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='totalMintedText' className='totalMintedText oracleguiInfoText oracleguiText oracleguiButtonText buttonText oracleguiRightButtonText'>
                ETH Balance:
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OracleGUI
