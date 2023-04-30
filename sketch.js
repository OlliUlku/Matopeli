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

  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  let inp = createInput(matoCountBT);
  inp.size(18);
  inp.center();
  inp.input(InputMatoCount);
  inp.changed(storeMenuData);


  let button = createButton('Start');
  button.position(width / 2, height / 2 + 20);
  button.center('horizontal');
  button.mousePressed(StartButton);

  let button2 = createButton('Start with on-screen controls (2x)');
  button2.position(width / 2, height / 2 + 20 + 30);
  button2.center('horizontal');
  button2.mousePressed(StartButton2);

  slider = createSlider(3, 24, 8, 1);
  slider.position(10, 10);
  slider.style('width', '80px');
  slider.changed(storeMenuData);


  // INIT FROM MEMORY
  initGD = getItem('Matopeli_GD');
  initMatoCountBT = getItem('Matopeli_matoCountBT');

  // if (initGD === !null) {
  slider.value(initGD);
  print('set slider ' + initGD);
  // }

  // if (initMatoCountBT === !null) {
  matoCountBT = initMatoCountBT;
  inp.value(initMatoCountBT);
  print('set matoCountBT ' + initMatoCountBT);
  // }


  //startup();
  // document.addEventListener("DOMContentLoaded", startup);


  // Prevent scrolling when touching the canvas
  document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);

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
    //drawDebug(); // DEBUG STONE PLACEMENT
    //_PANIC_MODE();
    _ONSCREENKEYS();
    //_STRESS();

    _SHOWWORMSALIVE();

    //_POINTS();

    _LAYERS();
    //_GAME_END_POINTS();
    _GAME_END();

    LENGTHADD += MATOJA * 5;
  }
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
  onScreenToggle = true;
  GAMESTATE = 'GAME';
}

function _MENU() {
  noStroke();
  background(40);
  textAlign(CENTER, CENTER);
  fill(LightPink);
  text('How many worms? (Bluetooth)', width / 2, height / 2 - 22);
  textAlign(LEFT, TOP);
  //text('Commit ProjectionTest', width / 2, 30);

  textAlign(LEFT, TOP);
  let thisText = 'Hi!!! Please use gamepads, bluetooth or otherwise! Be a WORM with funny NAMES and COLORS! Survive the longest! Oh no your tail turns into STONE!! LEFT to steer your worm left, RIGHT to steer right! Good luck love you kisses!!!';
  text(thisText, 10, 30, width / 2 - 100, height);

  let valS = slider.value();
  GD = valS;
  text(GD + ' x larger pixels', 100, 13);

  for (let i = 0; i < menuMadot.length; i++) {
    menuMadot[i].show();
  }
}

function touchStarted() {
}

function storeMenuData() {
  storeItem('Matopeli_GD', slider.value());
  print('store items');
}

function windowResized() {
  if (GAMESTATE === 'MENU') {
    resizeCanvas(windowWidth, windowHeight);
    print('new width and height ' + width + ' ' + height);
  }
}