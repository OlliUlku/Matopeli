let matoCount = 30;
// 12mato 125%zoom || 5mato 400%zoom || 40mato 67%zoom

let spawnBorder = 50; // PX (Base 50?)
let MOD = 2.5;
let speedMod = .4 * MOD; // BASE .5
let rotSpeedMod = .7 * MOD; // .8?
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
let fontSize; // varies with width and height
let fontSizeString;

//LAYERS
let L_top;
let L_stone;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(24);
  background(Beige);
  angleMode(DEGREES);
  rectMode(CENTER);
  strokeCap(SQUARE);

  // LAYERS
  let pxDens = pixelDensity();
  L_top = createGraphics(pxDens * width, pxDens * height);
  L_top.angleMode(DEGREES);
  L_top.rectMode(CENTER);

  L_stone = createGraphics(pxDens * width, pxDens * height);
  L_stone.angleMode(DEGREES);
  L_stone.rectMode(CENTER);

  //controllers
  addConnection();

  for (let i = 0; i < matoCount; i++) {
    ohjaimet[i] = new Controller_8BitDoZero2(i);
  }

  // array that checks whether a (x,y) location has been 'used'
  create2dArray();
  setBorderToFalse(); //safeguard...

  posca.splice(14, 1); // removes Beige (#dbc48e) which is background color, from array
  shuffle(posca, true);
  for (let i = 0; i < matoCount; i++) {
    madot[i] = new mato(random(spawnBorder, width - spawnBorder), random(spawnBorder, height - spawnBorder), posca[i], random(360), i);
    wormsCounter++;
  }

  //POINTS SYSTEM

  // html text formatting hohhoijaa
  // fontSize = round((width + height) * 0.1);
  // print('fontsize', fontSize)
  // fontSizeString = '\'' + fontSize + 'px\'';
  // print(fontSizeString)

  pointsText = createP();
  pointsText.style('font-size', '16px');
  pointsText.style('font-family', 'Arial');
  pointsText.position(3, -15);

  wormsText = createP();
  wormsText.style('font-size', '16px');
  wormsText.position(3, 0);
}

function draw() {
  controllerUsed(); //checks all buttons and updates values
  _OHJAIMET(); //controllers controller8bitdo...(ohjaimet[]) class speaks to madot class
  //_SPEED_UP_TEST(); //constant acceleration from the beginning
  _GAME_UPDATE();
  _PANIC_MODE();
  _POINTS();

  // LAYERS
  image(L_stone,0,0);
  image(L_top,0,0);

  // DEBUG

  if (deltaTime > 56) {
    print('long time between frames?', round(deltaTime));
  }

}

function _OHJAIMET() {
  for (let i = 0; i < matoCount; i++) {
    if (ohjaimet[i].LEFT || ohjaimet[i].LEFT2) {
      madot[i].LEFT = true;
      ohjaimet[i].LEFT2 = false; //Turn button off
    } else {
      madot[i].LEFT = false;
    }

    if (ohjaimet[i].RIGHT || ohjaimet[i].RIGHT2) {
      madot[i].RIGHT = true;
      ohjaimet[i].RIGHT2 = false; //Turn button off
    } else {
      madot[i].RIGHT = false;
    }

    //   if (ohjaimet[i].B) {
    //     madot[i].dive(); // dive underground!!
    //     ohjaimet[i].B = false; // turns button OFF

    //   } else {
    //   }
  }
}