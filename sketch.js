let matoCountBT = 0;
let GD = 8; // Grid division, base 8

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
  createCanvas(windowWidth, windowHeight);

  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  let inp = createInput(matoCountBT);
  inp.size(18);
  inp.center();
  inp.input(InputMatoCount);

  let button = createButton('Start');
  button.position(width / 2, height / 2 + 20);
  button.center('horizontal');
  button.mousePressed(StartButton);

  let button2 = createButton('Start with on-screen controls (2x)');
  button2.position(width / 2, height / 2 + 20 + 30);
  button2.center('horizontal');
  button2.mousePressed(StartButton2);

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
}


function draw() {

  if (GAMESTATE === 'MENU') {
    _MENU();

  } else if (GAMESTATE === 'GAME') {
    gameReadySetup(); // RUNS ONLY ONCE

    // LAYER CLEAR
    L_HUD.clear(0, 0, 0, 0);
    background(Beige);
    if (frameCount % 15 === 0) {
      L_ground.background(fadeColor);
    }

    // THE BEEF
    controllerUsed(); //checks all buttons and updates values
    _OHJAIMET(); //controllers controller8bitdo...(ohjaimet[]) class speaks to madot class
    _GAME_UPDATE();

    //drawStone(); // DEBUG STONE PLACEMENT
    _PANIC_MODE();
    _ONSCREENKEYS();
    _POINTS();
    _LAYERS();
    //_GAME_END(); // at one worm left

    remTime += 20;
  }
}

function InputMatoCount() {
  matoCountBT = this.value();
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
  background(RedWine);
  textAlign(CENTER, CENTER);
  fill(LightPink);
  text('How many worms? (Bluetooth)', width / 2, height / 2 - 22);
  textAlign(LEFT, TOP);
  text('Commit ProjectionTest', width / 2, 30);

  textAlign(LEFT, TOP);
  let thisText = 'Hi!!! Please use gamepads, bluetooth or otherwise! Be a WORM with funny NAMES and COLORS! Survive the longest! Oh no your tail turns into STONE!! if you touch this stone you lose!! Please touch everything else, even other worms!!  Every 7 seconds or so (Didnt remember exact time!!) your worm DIVES underground for a couple of seconds! This lets you DIVE under the rocks and emerge on the other side!  LEFT to steer your worm left, RIGHT to steer right! B (button name varies per gamepad...) for UNLIMITED TURBO! (No TURBO while underground though!!) That might be everything but this text could be outdated!! Good luck love you kisses!!! Oh right when there is only 60% of worms left you enter PANIC mode!!';
  text(thisText, 10, 30, width / 2 - 100, height);
}

function touchStarted() {
}

