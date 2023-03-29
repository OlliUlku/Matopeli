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

let spawnBorder = 150; // PX (Base 150?)
let MOD = 2.5;
let speedMod = .8 * MOD; // BASE .8
let rotSpeedMod = .5 * MOD; // .5?
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
let L_grave;

//FONT
let _font;

// MENU
let SETUP = true;
let GAMESTATE = 'MENU';

//ON SCREEN KEYS
let onScreenKeysAR = [];
let onScreenMadot = [];
let onScreenCount = 0;
let onScreenToggle = false;

let MATOJA;

// hudname textsize
let _ts;

// REMOVE STONE
let remTime = 4000;

// Global UNDERGROUND TIME
let UGtime = 9000; //22000