function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  gameReadySetUp(); // RUNS ONLY ONCE

  // LAYER CLEAR
  L_HUD.clear(0, 0, 0, 0);
  background(Beige);

  // THE BEEF
  controllerUsed(); //checks all buttons and updates values
  _OHJAIMET(); //controllers controller8bitdo...(ohjaimet[]) class speaks to madot class
  _GAME_UPDATE();
  _PANIC_MODE();
  _POINTS();
  _LAYERS();
}