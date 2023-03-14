let matoCount = 5;
// 12mato 125%zoom || 5mato 400%zoom || 40mato 67%zoom

let spawnBorder = 50; // PX (Base 50?)
let speedMod = .5; // BASE .5
let rotSpeedMod = 1;
let panicMode = false;
let panicCount = 1500;

//controllersetup
let controllers = [];

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

  // array that checks whether a (x,y) location has been 'used'
  create2dArray();
  setBorderToFalse();

  shuffle(posca, true);
  for (let i = 0; i < matoCount; i++) {
    madot[i] = new mato(random(spawnBorder, width - spawnBorder), random(spawnBorder, height - spawnBorder), posca[i], random(360));
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
  controllerUsed; //checks all buttons and updates values
  //_SPEED_UP_TEST();
  _GAME_UPDATE();
  _PANIC_MODE();
  _POINTS();
}