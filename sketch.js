let matoCount = 3;
// 12mato 125%zoom || 5mato 400%zoom || 40mato 67%zoom

let wormNames = ['Marjatta',
  'Kalevi',
  'Mauno',
  'Pekka',
  'Reetta',
  'Kissa',
  'Koira',
  'Hevonen',
  'Raquel',
  'Miguel',
  'Mato 19',
  'Kukkis',
  'Lost sock',
  'Crouching tiger',
  'Hidden dragon',
  'Shampoo',
  'postfeminist',
  'The Concept Of Time',
  'The Concept Of Space',
  'Timon sijainen Simo',
  'Jaana',
  'Mimi',
  'Baus',
  'Cobra',
  'Ferrari',
  'Pomppu',
  'Nieminen',
  'Giselle',
  'Åke',
  'Timon sijainen Timo',
  'Maire'];

let spawnBorder = 150; // PX (Base 50?)
let MOD = 2.5;
let speedMod = .8 * MOD; // BASE .5
let rotSpeedMod = .5 * MOD; // .7?
let panicMode = false;
let panicCount = 1500;

// GRID DIVISION UPDATE
let GridDivision = 8; // HUOM TÄLLÄ HETKELLÄ NÄYTÖN PIKSELEIDEN MÄÄRÄ TÄYTYY OLLA TÄLLÄ JAOLLINEN... ehkä... KORJAA?
let Pixel; //PIXEL SIZE
let stoneDelay = 0; // 2000 if div is 32 :D

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
let L_HUD;
let L_mato;
let L_ground;

//FONT
let _font;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(24);
  background(Beige);
  angleMode(DEGREES);
  //rectMode(CENTER);
  strokeCap(SQUARE);


  // LAYERS
  let pxDens = pixelDensity();
  L_top = createGraphics(pxDens * width, pxDens * height);
  L_top.angleMode(DEGREES);
  //L_top.rectMode(CENTER);
  L_top.textAlign(CENTER, CENTER);

  L_stone = createGraphics(pxDens * width, pxDens * height);
  L_stone.angleMode(DEGREES);
  //L_stone.rectMode(CENTER);
  L_stone.textAlign(CENTER, CENTER);

  L_HUD = createGraphics(pxDens * width, pxDens * height);
  L_HUD.angleMode(DEGREES);
  //L_HUD.rectMode(CENTER);
  L_HUD.textAlign(CENTER, CENTER);

  L_mato = createGraphics(pxDens * width, pxDens * height);
  L_mato.angleMode(DEGREES);
  //L_mato.rectMode(CENTER);
  L_mato.textAlign(CENTER, CENTER);

  L_ground = createGraphics(pxDens * width, pxDens * height);
  L_ground.angleMode(DEGREES);
  L_ground.textAlign(CENTER, CENTER);

  // FONTS

  // _font = loadFont('Heebo-Regular.ttf')
  // L_top.textFont(_font);
  // L_HUD.textFont(_font);
  
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
  shuffle(wormNames, true);
  print('Max colors', posca.length);
  print('Max Names', wormNames.length);

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

  print('So called Pixels length X', array2d.length);
  print('So called Pixels length Y', array2d[0].length);
  Pixel = (width / GridDivision / (array2d.length) * GridDivision);
  print('Pixel length', Pixel);
}

function draw() {
  // LAYER CLEAR
  L_HUD.clear(0, 0, 0, 0);
  //clear();
  background(Beige);

  controllerUsed(); //checks all buttons and updates values
  _OHJAIMET(); //controllers controller8bitdo...(ohjaimet[]) class speaks to madot class
  //_SPEED_UP_TEST(); //constant acceleration from the beginning
  _GAME_UPDATE();
  _PANIC_MODE();
  _POINTS();

  // LAYERS
  image(L_ground, 0, 0);
  image(L_mato, 0, 0);
  image(L_stone, 0, 0);
  image(L_HUD, 0, 0);
  image(L_top, 0, 0);



  // DEBUG

  fill(Red);
  noStroke();
  rect(Pixel,Pixel,Pixel);
  // if (deltaTime > 56) {
  //   print('long time between frames?', round(deltaTime));
  // }

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

    if (ohjaimet[i].B) {
      madot[i].turbo = true;
      ohjaimet[i].B = false; // turns button OFF
    } else {
      madot[i].turbo = false;
    }
  }
}