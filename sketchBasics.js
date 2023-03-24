function gameReadySetup() {
  // RUNS ONCE THEN TURNS SETUP variable OFF
  if (SETUP) {

    frameRate(24);
    background(Beige);
    angleMode(DEGREES);
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
      madot[i] = new mato(random(spawnBorder, width - spawnBorder), random(spawnBorder, height - spawnBorder), posca[poscaIndex], random(360), i);
      wormsCounter++;
      poscaIndex++
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

    //TURN SETUP OFF SO IT WONT RUN AGAIN
    SETUP = false;
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

    if (ohjaimet[i].B) {
      madot[i].turbo = true;
      ohjaimet[i].B = false; // turns button OFF
    } else {
      madot[i].turbo = false;
    }
  }
}

function _GAME_UPDATE() {
  for (let i = 0; i < madot.length; i++) {
    madot[i].update();
  }
  updateBoardState();
}

function _SPEED_UP_TEST() {
  for (let i = 0; i < madot.length; i++) {
    madot[i].speedUP();
  }
}

function _POINTS() {
  let timefactor = floor(millis() / 1000 / 5);
  if (wormsCounter < 1) {
    timefactor = 0;
  }

  let pointsINC = (wormsCounter * wormsCounter) + timefactor;
  points = points + pointsINC;
  pointsText.html('POINTS: ' + floor(points / 100) + '    ' + '(x' + pointsINC + ')');
  wormsText.html('worms: ' + wormsCounter + panicModeText);
}

function _PANIC_MODE() {
  if (wormsCounter <= matoCount * 0.6 || matoCount === 3 && wormsCounter <= matoCount * 0.9) {
    panicMode = true;
  }

  if (panicMode) {

    wormsText.style('color', '#8c172a');

    for (let i = 0; i < madot.length; i++) {
      madot[i].speedUP_PANIC();
    }

    panicModeText = ' -> panic mode';
    if (panicCount > 0) {
      panicCount = panicCount - (1.55 * speedMod);
    }
  }
}

function _LAYERS() {
  image(L_ground, 0, 0);
  image(L_mato, 0, 0);
  image(L_stone, 0, 0);
  image(L_HUD, 0, 0);
  image(L_top, 0, 0);
}

function create2dArray() {
  for (let _x = 0; _x < width / GridDivision; _x++) {
    array2d[_x] = [];
    for (let _y = 0; _y < height / GridDivision; _y++) {
      array2d[_x][_y] = true;
    }
  }
}

function setBorderToFalse() {
  for (let i = 0; i < height / GridDivision; i++) {
    array2d[0][i] = false;
    array2d[array2d.length - 1][i] = false;
  }
}

function updateBoardState() {
  for (let i = 0; i < matoCount; i++) {
    // CHECK IF WITHIN BOUNDS
    let __x = round(madot[i].pos.x / GridDivision);
    let __y = round(madot[i].pos.y / GridDivision);
    if (__x > 0 && __x < width / GridDivision && __y > 0 && __y < height / GridDivision) {
      if (array2d[__x][__y]
        //&& array2d[__x - 1][__y] 
        && array2d[__x + 1][__y]
        //&& array2d[__x][__y - 1] 
        && array2d[__x][__y + 1]
        && array2d[__x + 1][__y + 1]
        //&& array2d[__x - 1][__y - 1] 
        //&& array2d[__x + 1][__y - 1] 
        //&& array2d[__x - 1][__y + 1] 
        && !madot[i].underground) {
        setTimeout(set2dArrayFalse, 1000 + panicCount + stoneDelay, madot[i].pos.x, madot[i].pos.y);
      } else if (!madot[i].underground) {
        madot[i].stop = true;
        setTimeout(set2dArrayFalse, 1000 + panicCount + stoneDelay, madot[i].pos.x, madot[i].pos.y); // tehokkuus -> pysäytä tän looppaaminen...
        //print('hit wall');
      }
    }
  }
}

function set2dArrayFalse(_x, _y) {
  //ristin muotoisessa kuviossa kaikki pois päältä!
  _x = round(_x / GridDivision);
  _y = round(_y / GridDivision);
  // simplify sometime??? 3x3 grid gets turned 'false'
  array2d[_x][_y] = false;
  //array2d[_x - 1][_y] = false;
  //array2d[_x - 1][_y - 1] = false;
  array2d[_x + 1][_y + 1] = false;
  //array2d[_x - 1][_y + 1] = false;
  //array2d[_x + 1][_y - 1] = false;
  array2d[_x][_y + 1] = false;
  array2d[_x + 1][_y] = false;
  //array2d[_x][_y - 1] = false;

  L_stone.fill(100);
  L_stone.noStroke();
  L_stone.rect(_x * GridDivision, _y * GridDivision, 2 * GridDivision);
}

