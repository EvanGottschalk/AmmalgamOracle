import React, { useState, useContext, useEffect } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';

import Aos from "aos";
import "aos/dist/aos.css";

import { connectWallet, runContractFunction } from '../../scripts/SmartContractOperator';
import { getOpenSeaLink } from '../../scripts/SmartContractOperator';


import meliora_comic_cover_image from '../../image/meliora_comic_cover.png';
import meliora_comic_description_image from '../../image/meliora_comic_description.png';
// import mint_button_image from '../../image/mint_comic_button.png'
// import play_read_button_image from '../../image/play_read_button.png'
// import sign_up_image from '../../image/sign_up_button.png'
// import blank_button_image from '../../image/blank_button.png'
import base_logo_image from '../../image/base-logo.png';

import './mintgui.css'

var opensea_link = '';

const MintGUI = () => {

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

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
    const current_amount_entry = event.target.value;
    const current_total_price = parseFloat(current_amount_entry) * 0.01;
    if (current_amount_entry > 0) {
      document.getElementById('customPriceText').textContent = `Total Price: ${current_total_price} ETH`;
    } else {
      document.getElementById('customPriceText').textContent = `Total Price: 0.0 ETH`;
    }
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
    await updateTotalMinted();
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
    await showMintUI();
  };


  async function showMintUI() {
    document.getElementById('connectButtonContainer').style.display = 'none';
    document.getElementById('infoButtonContainer').style.display = 'flex';
    document.getElementById('mintButtonContainer1').style.display = 'flex';
    document.getElementById('mintButtonContainer2').style.display = 'flex';
    document.getElementById('customPriceContainer').style.display = 'flex';
  };
  

  async function updateTotalMinted() {
    const total_minted_display = document.getElementById('totalMintedText');
    total_minted = await runContractFunction(contract_name, 'getCurrentSupply');
    total_minted_display.textContent = 'Total Minted: ' + total_minted.toString();
  };



  return (
    <div className='mintgui'>
      <div id='mintguiComponentContainer' className='mintguiComponentContainer componentContainer'>
        <div id='mintguiLeftContainer' className='mintguiLeftContainer mintguiSideContainer sideContainer leftContainer'>
          <div id='mintguiContentContainer_Left' className='mintguiContentContainer_Left mintguiContentContainer contentContainer'>
            <div id='mintguiImageContainer1_Comic' className='mintguiImageContainer1_Comic imageContainer'>
              <img data-aos="fade-right" src={meliora_comic_cover_image} alt='The Genesis of Meliora' id='comicCoverImage' className='comicCoverImage largeImage verticalImage'  />
            </div>
          </div>
        </div>
      </div>
      <div id='mintguiComponentContainer' className='mintguiComponentContainer componentContainer'>
        <div id='mintguiRightContainer' className='mintguiRightContainer mintguiSideContainer sideContainer rightContainer'>
          <div id='comicDescriptionContainer' className='comicDescriptionContainer mintguiContentContainer_Right mintguiContentContainer contentContainer'>
            <div id='mintguiImageContainer_Description' className='mintguiImageContainer_Description mintguiImageContainer imageContainer'>
              <img data-aos="fade-left" src={meliora_comic_description_image} alt='Plus hidden secrets!' id='descriptionImage' className='descriptionImage largeImage verticalImage'  />
            </div>
          </div>
          <div id='connectButtonContainer' className='connectButtonContainer mintguiContentContainer_Right mintguiContentContainer contentContainer'>
            <div id='mintguiButtonContainer_Connect' className='mintguiButtonContainer_Connect mintguiButtonContainer buttonContainer'>
              <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} alt='Connect Wallet' id='connectButtonText' className='connectButtonText mintguiButtonText mintguiText buttonText'>
                Connect Wallet
              </span>
            </div>
          </div>
          <div id='mintWithBaseContainer' className='mintWithBaseContainer mintguiContentContainer_Right mintguiContentContainer contentContainer'>
            <div id='mintguiTextContainer_Base' className='mintguiTextContainer_Base mintguiTextContainer textContainer'>
              <span data-aos="fade-left" id='mintWithBaseText' className='mintWithBaseText mintguiText mintguiFloatingText floatingText'>
                Mint with
              </span>
            </div>
            <div id='mintguiImageContainer_Base' className='mintguiImageContainer_Base mintguiImageContainer imageContainer'>
              <img data-aos="fade-left" src={base_logo_image} alt='Mint with Base' id='mintWithBaseImage' className='mintWithBaseImage mintguiImage horizontalImage smallImage' />
            </div>
          </div>
          <div style={(user_address) ? {display: "flex"} : {display: "none"}} id='infoButtonContainer' className='infoButtonContainer mintguiContentContainer_Right mintguiContentContainer contentContainer'>
            <div id='mintguiButtonContainer_Info' className='mintguiButtonContainer_Info mintguiButtonContainer buttonContainer'>
              <span data-aos="fade-left" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='mintPriceText' className='mintPriceText mintguiInfoText mintguiText mintguiButtonText buttonText'>
                Mint Price: .01 ETH
              </span>
              <span data-aos="fade-left" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='totalMintedText' className='totalMintedText mintguiInfoText mintguiText mintguiButtonText buttonText mintguiRightButtonText'>
                Total Minted:
              </span>
            </div>
          </div>
          <div style={(user_address) ? {display: "flex"} : {display: "none"}} id='mintButtonContainer1' className='mintButtonContainer1 mintguiContentContainer_Right mintguiContentContainer contentContainer'>
            <div id='mintguiButtonContainer_Mint' className='mintguiButtonContainer_Mint mintguiButtonContainer buttonContainer'>
              <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='mint1Text' className='mint1Text mintguiMint1Text mintguiMintButtonText mintguiText mintguiButtonText buttonText'>
                Mint 1 for .01 ETH
              </span>
              <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='mint5Text' className='mint5Text mintguiMint1Text mintguiMintButtonText mintguiText mintguiButtonText buttonText mintguiRightButtonText'>
                Mint 5 for .05 ETH
              </span>
            </div>
          </div>
          <div style={(user_address) ? {display: "flex"} : {display: "none"}} id='mintButtonContainer2' className='mintButtonContainer2 mintguiContentContainer_Right mintguiContentContainer contentContainer'>
            <div id='mintguiButtonContainer_Mint' className='mintguiButtonContainer_Mint mintguiButtonContainer buttonContainer'>
              <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='mintCustomText' className='mintCustomText mintguiMintCustomText mintguiMintButtonText mintguiText mintguiButtonText buttonText'>
                Mint Custom Amount
              </span>
              <input data-aos="fade-left" id='mintCustomInput' className='mintCustomInput mintguiInputField inputField mintguiRightButtonText' placeholder="# of Copies" type="number" onChange={handleFieldChange} />
            </div>
          </div>
          <div style={(user_address) ? {display: "flex"} : {display: "none"}} id='customPriceContainer' className='customPriceContainer mintguiContentContainer_Right mintguiContentContainer contentContainer'>
            <div id='mintguiTextContainer_TotalPrice' className='mintguiTextContainer_TotalPrice mintguiTextContainer textContainer'>
              <span data-aos="fade-left" id='customPriceText' className='customPriceText mintguiText mintguiFloatingText floatingText'>
                Total Price: 0.0 ETH
              </span>
            </div>
          </div>
          <div style={(user_address) ? {display: "flex"} : {display: "none"}} id='readButtonContainer' className='readButtonContainer mintguiContentContainer_Right mintguiContentContainer contentContainer'>
            <div id='mintguiButtonContainer_Read' className='mintguiButtonContainer_Read mintguiButtonContainer buttonContainer'>
              <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='readComicText' className='readComicText mintguiReadText mintguiMintButtonText mintguiText mintguiButtonText buttonText'>
                Read Comic
              </span>
              <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='viewOnOpenseaText' className='viewOnOpenseaText mintguiReadText mintguiMintButtonText mintguiText mintguiButtonText buttonText mintguiRightButtonText'>
                View on OpenSea
              </span>
            </div>
          </div>
          {/* <div id='infoButtonContainer' className='infoButtonsContainer mintguiContentContainer_Right mintguiContentContainer contentContainer'>
            <div id='mintguiButtonContainer_Info' className='mintguiButtonContainer_Info mintguiButtonContainer buttonContainer'>
              <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} alt='Connect Wallet' id='connectButtonText' className='connectButtonText mintguiButtonText buttonText'>
                Connect Wallet
              </span>
            </div>
          </div> */}
        </div>
      </div>
      {/* <div className='mintguiRightContainer' id='mintguiRightContainer'>
        <div className='mintguiRightInnerContainer'>
          <img data-aos="fade-left" src={meliora_comic_description_image} alt='' id='comicDescriptionImage' className='mintguiImage comicDescriptionImage' />
        </div>
        <div id='connectContainer' className='mintguiConnectContainer buttonGroupContainer' style={(user_address) ? {display: "none"} : {display: "inline-block"}}>
          <div className='mintButtonContainer buttonContainer'>
            <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='connectButton' className='mintguiButton connectButton'>
              Connect Wallet
            </span>
          </div>
        </div>
        <div id='infoContainer' className='mintguiInfoContainer buttonGroupContainer' style={(user_address) ? {display: "inline-block"} : {display: "none"}}>
          <div className='mintButtonContainer buttonContainer'>
            <span data-aos="fade-left" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='mintPrice' className='mintguiInfo mintButton'>
              Mint Price: .01 ETH
            </span>
            <span data-aos="fade-left" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='totalMinted' className='mintguiInfo readButton'>
              Total Minted:
            </span>
          </div>
        </div>
        <div id='mintWithBaseContainer' className='mintguiRightInnerContainer mintWithBaseContainer'>
          <span data-aos="fade-left" id='mintOnBaseText' className='mintOnBaseText customAmountText'>
            Mint with
          </span>
          <img data-aos="fade-left" src={base_logo_image} alt='' id='baseLogoImage' className='mintguiImage baseLogoImage' />
        </div>
        <div id='mintContainer1' className='mintguiButtonsContainer1 buttonGroupContainer' style={(user_address) ? {display: "inline-block"} : {display: "none"}}>
          <div className='mintButtonContainer buttonContainer'>
            <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='mintButton1' className='mintguiButton mintButton'>
              Mint 1 for .01 ETH
            </span>
            <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='mintButton5' className='mintguiButton readButton'>
              Mint 5 for .05 ETH
            </span>
          </div>
        </div>
        <div id='mintContainer2' className='mintguiButtonsContainer2 buttonGroupContainer' style={(user_address) ? {display: "inline-block"} : {display: "none"}}>
          <div className='mintButtonContainer buttonContainer'>
            <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='mintButtonCustom' className='mintguiButton mintButton'>
              Mint Custom Amount
            </span>
            <span data-aos="fade-left" id='amountButton' className='mintguiInputField readButton'>
              <input className='amountEntry' id='amountEntry' placeholder="# of Copies" type="number" onChange={handleFieldChange} />
            </span>
          </div>
          <span data-aos="fade-left" id='customAmountText' className='customAmountText'>
            Total Price: 0.0 ETH
          </span>
        </div>
        <div id='mintContainer3' className='mintedContainer mintguiButtonsContainer1 buttonGroupContainer' style={(user_address) ? {display: "inline-block"} : {display: "none"}}>
          <div className='mintButtonContainer buttonContainer'>
            <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='readButton' className='mintguiButton mintButton'>
              Read Comic
            </span>
            <span data-aos="fade-left" onClick={onMouseClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} id='mintguiOpenSeaLink' className='mintguiButton readButton'>
              View on OpenSea
            </span>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default MintGUI
