import React, { useContext, useEffect, useRef } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';

import Aos from "aos";
import "aos/dist/aos.css";

import Moralis from 'moralis';

import { connectWallet } from '../../scripts/SmartContractOperator';



import './oraclegui.css';

require('dotenv').config();


let MORALIS_API_KEY = process.env.MORALIS_API_KEY;


var symbol = 'ETH';
var user_balances = {};
var token_balance = 0;

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



  user_address = false;

  function onMouseOver(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.10)';
  };
  
  function onMouseLeave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  };

  async function handleFieldChange(event) {
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
      token_balance = await getTokenBalance(user_balances, symbol);
      await updateGUI();
    };
  };

  async function onMouseClick(event) {
    await setUserWalletInfo();
    await updateGUI();
  };


  
  async function setUserWalletInfo() {
    await setNetwork_Context(network_name);
    const user_wallet_info = await connectWallet(network_name);
    user_address = user_wallet_info['address'];
    await setAddress_Context(user_address);
    user_balance = user_wallet_info['balance'];
    await setBalance_Context(user_balance);
    user_balances = await getUserBalances();
  };

  async function getUserBalances() {
    try {
      await Moralis.start({
        apiKey: MORALIS_API_KEY
      });
    
      const response = await Moralis.EvmApi.token.getWalletTokenBalances({
        "chain": "0x1",
        "address": user_address
      });
    
      return (response.raw);
    } catch (e) {
      console.error(e);
    }
  };


  async function getTokenBalance(user_balances, symbol) {
    console.log(user_balances);
    if (symbol.toUpperCase() === 'ETH') {
      token_balance = user_balance;
      return token_balance;
    } else {
      for (let i = 0; i < user_balances.length; i++) {
        console.log('symbol', symbol, user_balances[i].name);
          if (user_balances[i].name === symbol) {
              token_balance = user_balances[i].balance / 1000000000000000000;
              console.log("Token Balance:", token_balance);
              return token_balance;
          }
      }
    }
    // Return null or handle case where symbol is not found
    return null;
}


  async function updateGUI() {
    if (user_address) {
      document.getElementById('connectButtonText').textContent = 'Connected: ' + user_address.substr(0, 4) + "..." + user_address.substr(-4, 4);
    };
    document.getElementById('totalMintedText').textContent = symbol + ' Balance: ';
    if (token_balance) {
      document.getElementById('totalMintedText').textContent += token_balance.toString();
    };
    document.getElementById('totalMintedText').style.display = 'flex';
  };
  



  return (
    <div className='oraclegui'>
      <div id='oracleguiComponentContainer' className='oracleguiComponentContainer componentContainer'>
        <div id='oracleguiLeftContainer' className='oracleguiLeftContainer oracleguiSideContainer sideContainer leftContainer'>
          <div id='oracleguiContentContainer_Left' className='oracleguiContentContainer_Left oracleguiContentContainer contentContainer'>
            <div id='oracleguiImageContainer1_Oracle' className='oracleguiImageContainer1_Oracle imageContainer'>
              <div className="tradingview-widget-container" id="tradingViewContainer" ref={container}>
                <div className="tradingview-widget-container__widget" id="tradingViewChart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='oracleguiComponentContainer' className='oracleguiComponentContainer componentContainer'>
        <div id='oracleguiRightContainer' className='oracleguiRightContainer oracleguiSideContainer sideContainer rightContainer'>
          <div id='oracleDescriptionContainer' className='oracleDescriptionContainer oracleguiContentContainer_Right oracleguiContentContainer contentContainer'>
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
