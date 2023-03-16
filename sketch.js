let matoCount = 2;
// 12mato 125%zoom || 5mato 400%zoom || 40mato 67%zoom

let spawnBorder = 50; // PX (Base 50?)
let speedMod = .2; // BASE .5
let rotSpeedMod = .8; // .8?
let panicMode = false;
let panicCount = 1500;

//controllersetup
let controllers = [];
let ohjaimet = [];

let madot = [];
let array2d = [];

//POINTS SYSTEM
let wormsCounter = 0;
let points = 0;
let pointsText;

let wormsText;
let panicModeText = '';

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(Beige);
  angleMode(DEGREES);
  rectMode(CENTER);
  strokeCap(SQUARE);

  //controllers
  addConnection();

  for (let i = 0; i < matoCount; i++) {
    ohjaimet[i] = new Controller_8BitDoZero2(i);
  }

  // array that checks whether a (x,y) location has been 'used'
  create2dArray();
  setBorderToFalse(); //safeguard...

  print(posca[14]);
  posca.splice(14, 1); // removes Beige (#dbc48e) which is background color, from array
  shuffle(posca, true);
  for (let i = 0; i < matoCount; i++) {
    madot[i] = new mato(random(spawnBorder, width - spawnBorder), random(spawnBorder, height - spawnBorder), posca[i], random(360), i);
    wormsCounter++;
  }

  //POINTS SYSTEM
  pointsText = createP();
  pointsText.style('font-size', '16px');
  pointsText.position(3, -15);

  wormsText = createP();
  wormsText.style('font-size', '16px');
  wormsText.position(3, 0);

}

function draw() {
  controllerUsed(); //checks all buttons and updates values
  _OHJAIMET(); //controllers controller8bitdo...(ohjaimet[]) class speaks to madot class
  //_SPEED_UP_TEST();
  _GAME_UPDATE();
  _PANIC_MODE();
  _POINTS();
}

function _OHJAIMET() {
  for (let i = 0; i < matoCount; i++) {
    if (ohjaimet[i].LEFT) {
      madot[i].LEFT = true;
    } else {
      madot[i].LEFT = false;
    }

    if (ohjaimet[i].RIGHT) {
      madot[i].RIGHT = true;
    } else {
      madot[i].RIGHT = false;
    }

    if (ohjaimet[i].B) {
      madot[i].underground = true;
      ohjaimet[i].B = false; // turns button OFF

    } else {
      madot[i].underground = false;
    }
  }
}