//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useState, useContext, useEffect } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';
import {connectWallet, runContractFunction, getJSONfromIPFS, setUserTokenID, setUserMetadata, setUserAvatarURI} from '../../scripts/SmartContractOperator';
import Aos from "aos";
import "aos/dist/aos.css";

import EXP_plus_5 from '../../image/animations/exp/EXP_plus_5.gif'
import EXP_plus_10 from '../../image/animations/exp/EXP_plus_10.gif'

import TAP_plus_3 from '../../image/animations/TAP_plus_3.gif'

import logo from '../../image/logo.png'
import clickToOpen from '../../image/click_to_open_button.png'
import melioraComicCover from '../../image/meliora_comic_cover.png'

import './gamegui.css'








//--------------------------------------------------------------------------------------------------
//# Variables


const connect_on_load = false;

var network_name = 'sepolia';
var user_wallet_info;
var game_loaded = false;


var scene_dict = {};

// var current_time = await getDateTime();

// let player_ledger = [
//                       {"world": "Meliora",
//                        "game": "The Birth of Meliora",
//                        "scene": "",
//                        "element": "",
//                        "time": current_time}
//                     ];

let player_leder = [];

const EXP_animation_dict = {5: EXP_plus_5,
                            10: EXP_plus_10};

const TAP_animation_dict = {3: TAP_plus_3};

const animation_dict = {"EXP": {5: EXP_plus_5,
                                10: EXP_plus_10},
                        "TAP": {3: TAP_plus_3}};

var current_world = "Meliora";
var current_game = "The Birth of Meliora";
var current_scene = 0;
var current_time;
var background_image = melioraComicCover;
var element_1_image;
var element_2_image;
var element_3_image;
// var element_4;
// var element_5;
// var element_6;
// var element_7;
// var element_8;
// var element_9;

var element_1_coordinates;
var element_2_coordinates;
var element_3_coordinates;


var mobile_device = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  console.log("Mobile device detected");
  mobile_device = true;
};

var vertical_display = false;
if (window.screen.width < window.screen.height) {
  console.log("Vertical screen detected");
  vertical_display = true;
  console.log("window.screen.width: ", window.screen.width);
  console.log("window.screen.height: ", window.screen.height);
};

var rotate_game = false;


//AppStart
const GameGUI = () => {


let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
let { user_balance, setBalance_Context } = useContext(SmartContractContext);
let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);

useEffect(() => {
  Aos.init({ duration: 2000 });
}, []);


var open_comic_button = document.getElementById('openComicButton');

var background = document.getElementById('backgroundImage');

var element_1 = document.getElementById('element_1');
var element_2 = document.getElementById('element_2');
var element_3 = document.getElementById('element_3');



onLoad();


//--------------------------------------------------------------------------------------------------
//# Functions

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


function pause(time) {
  const seconds = time/1000;
  console.log('PAUSE Start: ' + seconds.toString() + ' seconds');
  return new Promise(resolve => setTimeout(resolve, time));
};

async function getDateTimeString() {
  const date_object = new Date();
  const date_time_string = date_object.toLocaleString();
  return(date_time_string);
};

async function onLoad() {
  console.log('\nGameGUI >>> RUNNING onLoad()');
  //await connectWallet();
  //scene_dict = await runContractFunction('Signatures', 'getTask', [1000, 'world: ' + current_world + ', game: ' + current_game]);
  //await updatePlayerLedger("none");
  //console.log("Scene Dict:", scene_dict);
  // if (mobile_device || vertical_display) {
  //   //rotate_game = true;
  //   document.getElementById('playerGameInterfaceImage').style.opacity = '1';
  //   document.getElementById('playerGameInterfaceContainer').style.top = '100%';
  // };
};

async function loadGame() {
  console.log('\nGameGUI >>> RUNNING loadGame()');
  if (!game_loaded) {
    user_wallet_info = await connectWallet(network_name);
    await updatePlayerLedger("none");

    var transaction_info = await runContractFunction('Signatures', 'getTask', [1008, 'world: ' + current_world + ', game: ' + current_game]);
    scene_dict = await getJSONfromIPFS(transaction_info[0]);
    console.log("Scene Dict:", scene_dict);

    game_loaded = true;
    open_comic_button = document.getElementById('openComicButton');
    open_comic_button.style.display = 'none';
    await changeScene(1);
  };
};


// async function handleButtonClick(event) {
//   const button_ID = event.target.id.split('gameSceneCursorImage')[1];
//   console.log('Button ID:', button_ID);
//   await changeScene();
//   if (button_ID === '4') {
//     await changeScene();
//   }
// };

async function handleElementClick(event) {
  const element_ID = event.target.id.split('element_')[1];
  await updatePlayerLedger(element_ID);
  const new_scene_number = scene_dict['scenes'][current_scene.toString()]['elements'][element_ID.toString()]['linked_scene']
  await changeScene(new_scene_number);
};


async function updatePlayerLedger(world="", game="", scene=0, element_ID, time) {
  console.log('\nGameGUI >>> RUNNING updatePlayerLedger()');
  if (!world) {
    world = current_world;
  };
  if (!game) {
    game = current_game;
  };
  if (!scene) {
    scene = current_scene;
  };
  if (!time) {
    current_time = getDateTimeString();
    time = current_time;
  };
  const new_ledger_entry = {"world": world,
                            "game": game,
                            "scene": scene,
                            "element": element_ID,
                            "time": time};
  player_leder.push(new_ledger_entry);
  return(new_ledger_entry);
};


async function updateElementCoordinates(element, coordinates) {
  console.log('\nGameGUI >>> RUNNING updateElementCoordinates()');
  console.log('Coordinates Input: ', coordinates);
  element.style.left = coordinates[0].toString() + '%';
  element.style.bottom = coordinates[1].toString() + '%';
};


async function changeScene(new_scene_number = false) {
  console.log('\nGameGUI >>> RUNNING changeScene()');
  console.log('Scene # Input:', new_scene_number);
  if (!new_scene_number && new_scene_number !== 0) {
    new_scene_number = current_scene += 1;
  };
  
  current_scene = new_scene_number;
  console.log('New current_scene #:', current_scene);
  

  background_image = scene_dict['scenes'][current_scene.toString()]['background'];
  background = document.getElementById('backgroundImage');
  console.log(background);
  background.src = background_image;
  console.log('New Background:', background_image);

  element_1 = document.getElementById('element_1');
  if (scene_dict['scenes'][current_scene.toString()]['elements']['1']) {
    element_1_image = scene_dict['scenes'][current_scene.toString()]['elements']['1']['uri'];
    element_1.src = element_1_image;
    element_1.style.display = 'inline';
    element_1_coordinates = scene_dict['scenes'][current_scene.toString()]['elements']['1']['coordinates']
    await updateElementCoordinates(element_1, element_1_coordinates);
  } else {
    element_1.style.display = 'none';
  };

  element_2 = document.getElementById('element_2');
  if (scene_dict['scenes'][current_scene.toString()]['elements']['2']) {
    element_2_image = scene_dict['scenes'][current_scene.toString()]['elements']['2']['uri'];
    element_2.src = element_2_image;
    element_2.style.display = 'inline';
    element_2_coordinates = scene_dict['scenes'][current_scene.toString()]['elements']['2']['coordinates']
    await updateElementCoordinates(element_2, element_2_coordinates);
  } else {
    element_2.style.display = 'none';
  };
  
  element_3 = document.getElementById('element_3');
  if (scene_dict['scenes'][current_scene.toString()]['elements']['3']) {
    element_3_image = scene_dict['scenes'][current_scene.toString()]['elements']['3']['uri'];
    element_3.src = element_3_image;
    element_3.style.display = 'inline';
    element_3_coordinates = scene_dict['scenes'][current_scene.toString()]['elements']['3']['coordinates']
    await updateElementCoordinates(element_3, element_3_coordinates);
  } else {
    element_3.style.display = 'none';
  };

  // // EXP
  // var EXP_gain = 0;
  // if (scene_dict['scenes'][current_scene.toString()]['exp']) {
  //   EXP_gain = scene_dict['scenes'][current_scene.toString()]['exp'];
  // };

  // // TAP
  // var TAP_gain = 0;
  // if (scene_dict['scenes'][current_scene.toString()]['tap']) {
  //   TAP_gain = scene_dict['scenes'][current_scene.toString()]['tap'];
  // };
  

  // if (new_scene_number >= 0) {
  //   if (EXP_gain) {
  //     gainEXP(EXP_gain);
  //     await pause(2000);
  //   };
  //   if (TAP_gain) {
  //     gainTAP(TAP_gain);
  //     await pause(2000);
  //   };
  // };

  // Save to local storage for pre-account
  // sessionStorage.setItem(current_scene.toString(), 'EXP: ' + EXP_gain.toString() + ', TAP: ' + TAP_gain.toString());


};


// async function changeScene(new_scene_number = false) {
//   console.log('Scene # Input:', new_scene_number);
//   if (!new_scene_number && new_scene_number !== 0) {
//     new_scene_number = current_scene += 1;
//   };
  
  
//   current_scene = new_scene_number;
//   console.log('Scene Changed to:', current_scene);
  

//   background_image = scene_dict['scenes'][current_scene.toString()]['background'];
//   console.log('Background:', background_image);

//   const button_1 = document.getElementById('gameSceneCursorImage1');
//   const button_2 = document.getElementById('gameSceneCursorImage2');
//   const button_3 = document.getElementById('gameSceneCursorImage3');
//   const button_4 = document.getElementById('gameSceneCursorImage4');
//   const button_5 = document.getElementById('gameSceneCursorImage5');
  
//   // Button 1
//   if (scene_dict['scenes'][current_scene.toString()]['button_1'] === 'next') {
//     button_cursor_1 = cursor_image_Next;
//   } else if (scene_dict['scenes'][current_scene.toString()]['button_1'] === 'large' || scene_dict['scenes'][current_scene.toString()]['button_1'] === 'grey') {
//     button_cursor_1 = cursor_image_Large;
//   } else {
//     button_cursor_1 = '';
//   };
//   if (button_1) {
//     if (scene_dict['scenes'][current_scene.toString()]['button_1'] === 'grey') {
//       button_1.style.filter = 'brightness(35%)';
//     } else {
//       button_1.style.filter = 'brightness(100%)';
//     }
//   }


//   // Button 2
//   if (scene_dict['scenes'][current_scene.toString()]['button_2'] === 'large'|| scene_dict['scenes'][current_scene.toString()]['button_2'] === 'grey') {
//     button_cursor_2 = cursor_image_Large;
//     if (scene_dict['scenes'][current_scene.toString()]['button_2'] === 'grey') {
//       button_2.style.filter = 'brightness(35%)';
//     } else {
//       button_2.style.filter = 'brightness(100%)';
//     };
//   } else {
//     button_cursor_2 = '';
//   };
  

//   // Button 3
//   if (scene_dict['scenes'][current_scene.toString()]['button_3'] === 'large') {
//     button_cursor_3 = cursor_image_Large;
//   } else {
//     button_cursor_3 = '';
//   }


//   // Wallet Button
//   if (scene_dict['scenes'][current_scene.toString()]['wallet_button'] === 'next') {
//     button_cursor_4 = cursor_image_Next;
//   } else if (scene_dict['scenes'][current_scene.toString()]['wallet_button'] === 'large') {
//     button_cursor_4 = cursor_image_Large;
//   } else {
//     button_cursor_4 = '';
//   };


//   // Claim Button
//   if (scene_dict['scenes'][current_scene.toString()]['claim_button'] === 'next') {
//     button_cursor_5 = cursor_image_Next;
//   } else if (scene_dict['scenes'][current_scene.toString()]['claim_button'] === 'medium') {
//     button_cursor_5 = cursor_image_Medium;
//   } else if (scene_dict['scenes'][current_scene.toString()]['claim_button'] === 'large') {
//     button_cursor_5 = cursor_image_Large;
//   } else {
//     button_cursor_5 = '';
//   };


//   // EXP
//   var EXP_gain = 0;
//   if (scene_dict['scenes'][current_scene.toString()]['exp']) {
//     EXP_gain = scene_dict['scenes'][current_scene.toString()]['exp'];
//   };

//   // TAP
//   var TAP_gain = 0;
//   if (scene_dict['scenes'][current_scene.toString()]['tap']) {
//     TAP_gain = scene_dict['scenes'][current_scene.toString()]['tap'];
//   };
  

//   if (new_scene_number >= 0) {
//     document.getElementById('backgroundImage').src = background_image;
//     button_1.style.opacity = '0';
//     button_2.style.opacity = '0';
//     button_3.style.opacity = '0';
//     button_4.style.opacity = '0';
//     button_5.style.opacity = '0';
//     button_1.src = button_cursor_1;
//     button_2.src = button_cursor_2;
//     button_3.src = button_cursor_3;
//     button_4.src = button_cursor_4;
//     button_5.src = button_cursor_5;
//     if (EXP_gain) {
//       gainEXP(EXP_gain);
//       await pause(2000);
//     };
//     if (TAP_gain) {
//       gainTAP(TAP_gain);
//       await pause(2000);
//     };
//   };

//   // Save to local storage for pre-account
//   sessionStorage.setItem(current_scene.toString(), 'EXP: ' + EXP_gain.toString() + ', TAP: ' + TAP_gain.toString());


// };


async function gainEXP(EXP_gain) {
  if (EXP_gain > 0) {
    document.getElementById('expAnimation').src = EXP_animation_dict[EXP_gain];
    await pause(5000);
    document.getElementById('expAnimation').src = '';
  };
};

async function gainTAP(TAP_gain) {
  if (TAP_gain > 0) {
    document.getElementById('expAnimation').src = TAP_animation_dict[TAP_gain];
    await pause(5000);
    document.getElementById('expAnimation').src = '';
  };
};

async function saveProgress(event) {
  console.log(current_scene);
  if (current_scene === 0) {
    document.getElementById('saveButton').textContent = 'Save';
    scene_dict = await getJSONfromIPFS(scene_dict[0]);
    console.log('Scene:', scene_dict);
    changeScene(0);
  } else {
    let i = 0;
    let new_progress_array = {};
    while (i < current_scene) {
      new_progress_array[i] = sessionStorage.getItem(i.toString());
    };
  };
};


function handleMouseOver(event) {
  const element_ID = event.target.id.split('element_')[1];
  let element = document.getElementById(event.target.id);
  const current_width = parseFloat(window.getComputedStyle(event.target).width);
  const current_height = parseFloat(window.getComputedStyle(event.target).height);
  const new_width = current_width * 1.2;
  const new_height = current_height * 1.2;
  event.target.style.width = new_width + 'px';
  event.target.style.height = new_height + 'px';
  //element.style.transform = 'scale(1.20)';
}

function handleMouseLeave(event) {
  const element_ID = event.target.id.split('element_')[1];
  let element = document.getElementById(event.target.id);
  const current_width = parseFloat(window.getComputedStyle(event.target).width);
  const current_height = parseFloat(window.getComputedStyle(event.target).height);
  const new_width = current_width * 1.0 / 1.2;
  const new_height = current_height * 1.0 / 1.2;
  event.target.style.width = new_width + 'px';
  event.target.style.height = new_height + 'px';
  //element.style.transform = 'scale(1.0)';
}



//--------------------------------------------------------------------------------------------------
//# HTML

return (
  <div className='gameGUI'>
    <div className='gameGUIContainer'
      style={(rotate_game) ? {
        transform: "rotate(90deg)",
        transformOrigin: "left right"} :
        {}}>
      <div className='gameSceneContainer' 
        style={(vertical_display) ? {
          width: "100vw",
          margin: "0% 0% 0% 0%"} :
          {}}>
        <div className='backgroundContainer'>
          <img onClick={loadGame} src={background_image} alt='' id='backgroundImage' className='backgroundImage'/>
        </div>
        <div className='gameElementContainer'>
          <img src='' alt='' id='rewardAnimation' className='rewardAnimation'
            style={{opacity:'0'}}/>
          <img onClick={handleElementClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} src={element_1_image} alt='' id='element_1' className='gameElement'
            style={{opacity:'1'}}/>
          <img onClick={handleElementClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} src={element_2_image} alt='' id='element_2' className='gameElement'
            style={{opacity:'1'}}/>
          <img onClick={handleElementClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} src={element_3_image} alt='' id='element_3' className='gameElement'
            style={{opacity:'1'}}/>
        </div>
      </div>
    </div>
    <div className='openComicButtonContainer' id='openComicButtonContainer'>
      <img src={clickToOpen} alt='' onClick={loadGame} id='openComicButton' className='openComicButton'/>
    </div>
  </div>
  )
}
//AppEnd

export default GameGUI