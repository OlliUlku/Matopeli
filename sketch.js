let matoCountBT = 2;
let GD = 8; // Grid division, base 8, max 24

// function startup() {
//   const el = document.getElementById("canvas");
//   el.addEventListener("touchstart", handleStart);
//   el.addEventListener("touchend", handleEnd);
//   el.addEventListener("touchcancel", handleCancel);
//   el.addEventListener("touchmove", handleMove);
//   print("Initialized.");
// }


function setup() {
  //fullscreen(true);
  CNVS = createCanvas(windowWidth, windowHeight);

  // for (let element of document.getElementsByClassName("p5Canvas")) {
  //   element.addEventListener("contextmenu", (e) => e.preventDefault());
  // }

  let inp = createSlider(2, 25, 2, 1);
  inp.size(width / 3);
  inp.center();
  inp.input(InputMatoCount);
  inp.changed(storeMenuData);


  let button = createButton('Start');
  button.position(width / 2, height / 2 + 20);
  button.center('horizontal');
  button.mousePressed(StartButton);

  //OLDIE onscreenctrlstuff...

  let button2 = createButton('Start Classic mode');
  button2.position(width / 2, height / 2 + 20 + 30);
  button2.center('horizontal');
  button2.mousePressed(StartButton2);

  menuPosY = 22;

  slider = createSlider(7, 24, 8, 1);
  slider.position(10, menuPosY);
  slider.style('width', '120px');
  slider.changed(storeMenuData);

  sliderGear = createSlider(1, 6, 2, 1);
  sliderGear.position(10, menuPosY * 2);
  sliderGear.style('width', '120px');
  sliderGear.changed(storeMenuDataGear);

  let initGearCheckbox = getItem('Matopeli_gearsCheckbox');
  gearToggle = initGearCheckbox;
  checkboxGear = createCheckbox('  Gears', initGearCheckbox);
  checkboxGear.changed(gearCheckboxChanged);
  checkboxGear.position(115, menuPosY * 3);
  checkboxGear.style('color', LightPink);


  // INIT FROM MEMORY
  initGD = getItem('Matopeli_GD');
  initMatoCountBT = getItem('Matopeli_matoCountBT');
  let initGear = getItem('Matopeli_Gear');

  slider.value(initGD);
  print('set slider ' + initGD);

  matoCountBT = initMatoCountBT;
  inp.value(initMatoCountBT);
  print('set matoCountBT ' + initMatoCountBT);

  gearINIT = initGear;
  sliderGear.value(gearINIT);

  //startup();
  // document.addEventListener("DOMContentLoaded", startup);


  // Prevent scrolling when touching the canvas
  // document.body.addEventListener("touchstart", function (e) {
  //   if (e.target == canvas) {
  //     e.preventDefault();
  //   }
  // }, false);
  // document.body.addEventListener("touchend", function (e) {
  //   if (e.target == canvas) {
  //     e.preventDefault();
  //   }
  // }, false);
  // document.body.addEventListener("touchmove", function (e) {
  //   if (e.target == canvas) {
  //     e.preventDefault();
  //   }
  // }, false);

  // PEEPO = loadFont('Peepo.ttf');
  // textFont(PEEPO)

  posca.splice(14, 1); // removes Beige (#dbc48e) which is background color, from array

  shuffle(posca, true);
  shuffle(wormNames, true);

  //CONTROLLERS
  addConnection();

  for (let i = 0; i < matoCountBT; i++) {
    ohjaimet[i] = new Controller_8BitDoZero2(i);
  }

  for (let i = 0; i < matoCountBT; i++) {
    angleMode(RADIANS);
    let spawnX, spawnY;
    spawnX = sin(PI * 2 / matoCountBT * i);
    spawnY = sin(PI * 2 / matoCountBT * i + HALF_PI);
    //print(spawnX);
    spawnX = map(spawnX, -1, 1, 100, width - 100);
    spawnY = map(spawnY, -1, 1, 60, height - 60);
    angleMode(DEGREES);
    menuMadot[i] = new menuMato(spawnX, spawnY, posca[i], -360 / matoCountBT * i, i);
  }

}


function draw() {

  if (GAMESTATE === 'MENU') {
    controllerUsed(); //checks all buttons and updates values
    _MENU();
    _MENU_OHJAIMET();



  } else if (GAMESTATE === 'GAME') {
    gameReadySetup(); // RUNS ONLY ONCE

    // LAYER CLEAR
    L_HUD.clear(0, 0, 0, 0);
    L_fruits.clear(0, 0, 0, 0);
    L_action.clear(0, 0, 0, 0);
    L_pickup.clear(0, 0, 0, 0);
    L_ghost.clear(0, 0, 0, 0);
    background(Beige);

    //background fader

    if (frameCount % 15 === 0) {
      L_ground.background(fadeColor);
    }
    // if (frameCount % 15 === 0) {
    // }

    // THE BEEF

    controllerUsed(); //checks all buttons and updates values
    _OHJAIMET(); //controllers controller8bitdo...(ohjaimet[]) class speaks to madot class
    _PICKUPS_UPDATE();
    //_SPEED_UP();
    _MADOT_UPDATE();
    _WORLD_UPDATE();
    _SHOWSCORES();
    //drawDebug(); // DEBUG STONE PLACEMENT
    //_PANIC_MODE();
    _ONSCREENKEYS();
    _IFZEROWORMS();
    //_SHOWWORMSALIVE();
    _LAYERS();
    // _GAME_END_POINTS();
    _GAME_END();

    LENGTHADD += MATOJA * 5;
  }
}

function _SHOWSCORES() {
  if (!classicMode) {
    poopScore.show();
    appleScore.show();
    aliveScore.show();
    ghostScore.show();
    takeOutsScore.show();
  } else {
    aliveScore.showClassic();
  }
}


function _IFZEROWORMS() {
  if (!classicMode) {
    if (wormsCounter < MATOJA / 2) {
      finishCountdown--;
      if (finishCountdown <= 0) {
        FINISHED = true;
      }
    } else if (finishCountdown <= finishCountdownINIT) {
      finishCountdown += 1 / 10;
    }
  } else {
    if (wormsCounter <= 1) {
      finishCountdown--;
      if (finishCountdown <= 0) {
        FINISHED = true;
      }
    } else if (finishCountdown <= finishCountdownINIT) {
      finishCountdown += 1 / 10;
    }
  }


  if (!FINISHED) {
    L_HUD.rectMode(CORNER);
    L_HUD.noStroke();
    stressStrenght = map(finishCountdown, 0, finishCountdownINIT, 0, -85);
    stressColor.setAlpha(map(sin(millis() / 3), -1, 1, 10 + stressStrenght, 45 + stressStrenght));
    L_HUD.fill(stressColor);
    L_HUD.rect(0, 0, width, height);
  }
  if (wormsCounter < MATOJA / 2) {
    if (stressLevel < 300) {
      stressLevel++;
    }
  } else if (stressLevel > 0) {
    stressLevel -= 1 / 10;
  }

  let gameEndBar = map(finishCountdown, 0, finishCountdownINIT, 0, width);
  let _color = color(White);
  _color.setAlpha(map(stressLevel, 0, 300, 0, 600));
  L_HUD.noStroke();
  L_HUD.fill(_color);
  L_HUD.rect(0, 0, gameEndBar, TextSize * 1.2);
}

function InputMatoCount() {
  matoCountBT = this.value();
  storeItem('Matopeli_matoCountBT', matoCountBT);
  print('store matoCountBT');
}

function StartButton() {
  removeElements();
  GAMESTATE = 'GAME';
}

function StartButton2() {
  removeElements();
  //OLD ONSCREENBUTTONS
  //onScreenToggle = true;
  classicMode = true;
  GAMESTATE = 'GAME';
}

function _MENU() {
  noStroke();
  background(40);
  textSize(TextSize * 1.3);
  textAlign(CENTER, CENTER);
  fill(LightPink);
  text('Number of players/worms: ' + matoCountBT, width / 2, height / 2 - 28);
  textAlign(LEFT, TOP);
  //text('Commit ProjectionTest', width / 2, 30);
  textSize(TextSize * 1.7);
  textAlign(CENTER, CENTER);
  let thisText = 'Hi!!! Please use gamepads, bluetooth or otherwise! Be a WORM with funny NAMES and COLORS! Oh no your tail turns into STONE!! Avoid STONE (and FLAMES!!) or you turn into a GHOST! (Only to revive in 7 seconds) Press LEFT to steer your worm left, RIGHT to steer right! L or R buttons to shift your GEARS to go slower or faster, respectively! B (or X) button to show and hide your name.. ...The game ends when there is too much scary ghosts at the same time for too long...! Good luck, love you!!!';
  text(thisText, width / 2 - width / 2 / 2, height / 2 - 50, width / 2, height / 2);

  let valS = slider.value();
  GD = valS;
  gearINIT = sliderGear.value();
  textSize(TextSize * 1.3);
  textAlign(LEFT, TOP);

  text(GD - 6 + ' x pixel Size (Use bigger sizes for bigger screens, smaller sizes for longer games etc.)', 10 + 130, menuPosY);
  text(gearINIT + ' x speed', 10 + 130, menuPosY * 2);

  for (let i = 0; i < menuMadot.length; i++) {
    menuMadot[i].show();
  }
}

function touchStarted() {
}

function storeMenuData() {
  //way more than storing... :D

  shuffle(posca, true);
  shuffle(wormNames, true);

  ohjaimet = [];
  menuMadot = [];

  for (let i = 0; i < matoCountBT; i++) {
    ohjaimet[i] = new Controller_8BitDoZero2(i);
  }


  for (let i = 0; i < matoCountBT; i++) {
    angleMode(RADIANS);
    let spawnX, spawnY;
    spawnX = sin(PI * 2 / matoCountBT * i);
    spawnY = sin(PI * 2 / matoCountBT * i + HALF_PI);
    //print(spawnX);
    spawnX = map(spawnX, -1, 1, 100, width - 100);
    spawnY = map(spawnY, -1, 1, 60, height - 60);
    angleMode(DEGREES);
    menuMadot[i] = new menuMato(spawnX, spawnY, posca[i], -360 / matoCountBT * i, i);
  }

  storeItem('Matopeli_GD', slider.value());
  print('store items');
}

function storeMenuDataGear() {
  storeItem('Matopeli_Gear', sliderGear.value());
  print('store items');
}


function gearCheckboxChanged() {
  if (checkboxGear.checked()) {
    storeItem('Matopeli_gearsCheckbox', true);
    gearToggle = true;
    // console.log('Checking!');
  } else {
    storeItem('Matopeli_gearsCheckbox', false);
    gearToggle = false;
    // console.log('Unchecking!');
  }
}


function windowResized() {
  if (GAMESTATE === 'MENU') {
    resizeCanvas(windowWidth, windowHeight);
    print('new width and height ' + width + ' ' + height);
  }
}