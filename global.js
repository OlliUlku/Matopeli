let wormNames = ['Marjatta',
  'Reetta',
  'Kalevi',
  'Mauno',
  'Pekka',
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
  'The Concept Of Timo',
  'Maire',
  'UlkuniemiJussiSakari'];

let spawnBorder = 150; // PX (Base 150?)
let MOD = 2.5; // Base 2.5
let speedMod = .8 * MOD; // BASE 1.3
let rotSpeedMod = .5 * MOD; // .5?
let panicMode = false;
let panicONCE = true;
let panicCount;

// GRID DIVISION UPDATE
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
let L_fruits;
let L_pickup;
let L_ghost;
let L_action;
let L_poop;

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
let TextSize;

// REMOVE STONE
let remTime = 0;

// Global UNDERGROUND TIME
let UGtime = 17000; //22000 ???
let diveTime;

// To Keep text from scaling with division... LOL i made it a static size through this?
let txtDivision = 8;
let txtPixel;

// to slowly sink UG dirt
let fadeColor;

// menu DOM buttons etc.
let slider;

//POOP
let pooped;

// PICKUPS
let pickups = [];
let pickups_newTime = 3500; //5000
let pickups_newTimeINIT = 8000; //3000
let pickups_count = 0;
let PickupSpawnTime = pickups_newTime;

// PRICES
let startDollars = 0;
let omenaVal = 8;
let costT = 1 / 5;
let costUG = 5;

// IMAGES
let img_panicMode;
let img_kakkakruunu;
let img_valtikka;
let img_align;
let img_ghostRoyalty;
let img_aliveRoyalty;
let img_takeOutsRoyalty;
let img_matoFace;
let img_ghostFace;
let img_chiliPickup;
let img_applePickup;
let img_spadePickup;

// POOP/APPLE SCORE
let poopScore;
let appleScore;
let aliveScore;
let ghostScore;
let takeOutsScore;

// SPAWNRADIUS
let spawnRadiusZeroX;
let spawnRadiusZeroY;
let spawnRadius;

// STRESS
let stressColor;
let stressLevel = 0;

// FRAMERATE
let FRAMERATE = 24;

// CENTER CANVAS
let CNVS;

// FLAMETHROWER
let flameParticles = [];

// POINTS WINNER
let WINNER;
let winnerArr;
let WINNERCOLOR;
let pointsArr;

// GLOBAL LENGTH ADD
let LENGTHADD = 4000; //120000
let POOPLENGTHDIVIDER = 30;

// MENUMADOT
let menuMadot = [];

// POP UP TEXTS
let popUpTexts = [];


// GAME END
let FINISHED = false;
let finishCountdown = 5000 / 24;
let finishCountdownINIT = finishCountdown;
let stressStrenght;

// CLASSICMODE
let classicMode = false;