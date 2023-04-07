function gameReadySetup() {
  // RUNS ONCE THEN TURNS SETUP variable OFF
  if (SETUP) {

    frameRate(24);
    fadeColor = color(Beige);
    fadeColor.setAlpha(20);
    background(Beige);
    angleMode(DEGREES);
    strokeCap(SQUARE);
    matoCountBT = Number(matoCountBT);


    // LAYERS
    let pxDens = pixelDensity();
    L_top = createGraphics(pxDens * width, pxDens * height);
    L_top.angleMode(DEGREES);
    L_top.textAlign(CENTER, CENTER);

    L_stone = createGraphics(pxDens * width, pxDens * height);
    L_stone.angleMode(DEGREES);
    L_stone.textAlign(CENTER, CENTER);

    L_HUD = createGraphics(pxDens * width, pxDens * height);
    L_HUD.angleMode(DEGREES);
    L_HUD.textAlign(CENTER, CENTER);

    L_mato = createGraphics(pxDens * width, pxDens * height);
    L_mato.angleMode(DEGREES);
    L_mato.textAlign(CENTER, CENTER);

    L_ground = createGraphics(pxDens * width, pxDens * height);
    L_ground.angleMode(DEGREES);
    L_ground.textAlign(CENTER, CENTER);

    L_grave = createGraphics(pxDens * width, pxDens * height);
    L_grave.angleMode(DEGREES);
    L_grave.textAlign(CENTER, CENTER);

    L_pickup = createGraphics(pxDens * width, pxDens * height);
    L_pickup.angleMode(DEGREES);
    L_pickup.textAlign(CENTER, CENTER);

    // FONTS

    // _font = loadFont('Heebo-Regular.ttf')
    // L_top.textFont(_font);
    // L_HUD.textFont(_font);

    //CONTROLLERS
    addConnection();

    for (let i = 0; i < matoCountBT; i++) {
      ohjaimet[i] = new Controller_8BitDoZero2(i);
    }

    // array that checks whether a (x,y) location has been 'used'
    create2dArray();
    setBorderToFalse(); //safeguard...

    posca.splice(14, 1); // removes Beige (#dbc48e) which is background color, from array

    //shuffle(posca, true);
    shuffle(wormNames, true);
    print('Max colors', posca.length);
    print('Max Names', wormNames.length);


    //ONSCREENKEYS MADOT & NAPIT
    if (onScreenToggle) {
      onScreenKeysAR[wormsCounter] = new onScreenKeys(width / 2, height, 0, posca[wormsCounter], 0);
      madot[wormsCounter] = new mato(random(spawnBorder, width - spawnBorder), random(spawnBorder, height - spawnBorder), posca[wormsCounter], random(360), wormsCounter);
      wormsCounter++;
      onScreenCount++;

      onScreenKeysAR[wormsCounter] = new onScreenKeys(width / 2, 0, 1, posca[wormsCounter], 180);
      madot[wormsCounter] = new mato(random(spawnBorder, width - spawnBorder), random(spawnBorder, height - spawnBorder), posca[wormsCounter], random(360), wormsCounter);
      wormsCounter++;
      onScreenCount++;

      //SET MATOJA
      MATOJA = onScreenCount + matoCountBT;
    } else {
      MATOJA = matoCountBT;
    }

    //GAMEPAD
    for (let i = 0; i < matoCountBT; i++) {
      madot[wormsCounter] = new mato(random(spawnBorder, width - spawnBorder), random(spawnBorder, height - spawnBorder), posca[wormsCounter], random(360), wormsCounter);
      wormsCounter++;
    }


    //POINTS SYSTEM // OLD

    // pointsText = createP();
    // pointsText.style('font-size', '16px');
    // pointsText.style('font-family', 'Arial');
    // pointsText.position(3, -15);

    // wormsText = createP();
    // wormsText.style('font-size', '16px');
    // wormsText.position(3, 0);

    print('So called Pixels length X', array2d.length);
    print('So called Pixels length Y', array2d[0].length);
    Pixel = (width / GD / (array2d.length) * GD);
    txtPixel = (width / GD / array2d.length * txtDivision);

    print('Grid Division', GD);
    print('Pixel size', Pixel);
    print('txtDiv', txtDivision);

    print('txtPixel size', txtPixel);


    // wormname textsize
    TextSize = txtPixel * 2.1;

    //PANIC COUNT
    panicCount = 1500 / 8 * GD;

    //TURN SETUP OFF SO IT WONT RUN AGAIN
    SETUP = false;
  }
}

function _ONSCREENKEYS() {
  if (onScreenToggle) {
    for (let i = 0; i < onScreenCount; i++) {
      onScreenKeysAR[i].show();
    }
  }
}

function _OHJAIMET() {
  if (onScreenToggle) {
    if (touches.length != 0) {
      for (let _i = 0; _i < touches.length; _i++) {

        for (let i = 0; i < onScreenCount; i++) {

          let btnLx = onScreenKeysAR[i].leftBtnx;
          let btnRx = onScreenKeysAR[i].rightBtnx;
          //     dirty fix for button rotation!!!
          if (i === 1) {
            btnLx = onScreenKeysAR[i].leftBtnx2;
            btnRx = onScreenKeysAR[i].rightBtnx2;
          }
          let btny = onScreenKeysAR[i].y;

          let DistL = dist(btnLx, btny, touches[_i].x, touches[_i].y);
          if (DistL < onScreenKeysAR[0].size / 2) {
            madot[i].LEFT = true;

          } else {
            madot[i].LEFT = false;
          }

          let DistR = dist(btnRx, btny, touches[_i].x, touches[_i].y);
          if (DistR < onScreenKeysAR[0].size / 2) {
            madot[i].RIGHT = true;
          } else {
            madot[i].RIGHT = false;
          }
        }
      }
    } else { // IF NO TOUCHES
      for (let i = 0; i < onScreenCount; i++) {
        madot[i].RIGHT = false;
        madot[i].LEFT = false;
      }
    }
  }


  //HUOM i JATKAA/ALKAA SIITÄ MIHIN ONSCREENMADOT LOPPUU
  let ctrl_i;
  for (let i = onScreenCount; i < madot.length; i++) {

    ctrl_i = i - onScreenCount;

    if (ohjaimet[ctrl_i].LEFT || ohjaimet[ctrl_i].LEFT2 || keyIsDown(LEFT_ARROW)) {
      madot[i].LEFT = true;
      ohjaimet[ctrl_i].LEFT2 = false; //Turn button off
    } else {
      madot[i].LEFT = false;
    }

    if (ohjaimet[ctrl_i].RIGHT || ohjaimet[ctrl_i].RIGHT2 || keyIsDown(RIGHT_ARROW)) {
      madot[i].RIGHT = true;
      ohjaimet[ctrl_i].RIGHT2 = false; //Turn button off
    } else {
      madot[i].RIGHT = false;
    }

    if (ohjaimet[ctrl_i].B || keyIsDown(UP_ARROW)) {
      madot[i].turbo = true;
      ohjaimet[ctrl_i].B = false; // turns button OFF
    } else {
      madot[i].turbo = false;
    }

    if (ohjaimet[ctrl_i].A || keyIsDown(DOWN_ARROW)) {
      madot[i].UGStart = true;
      ohjaimet[ctrl_i].A = false; // turns button OFF
    } else {
      madot[i].UGStart = false;
    }
  }
}

function _PICKUPS_UPDATE() {
  if (pickups.length < 1) {
    // PICKUPS (X,Y,TYPE)
    pickups[0] = new pickup(random(30, width - 30), random(30, height - 30), 0);
  }

  for (let i = 0; i < pickups.length; i++) {
    pickups[i].show();
  }
}

function _WORMS_UPDATE() {
  for (let i = 0; i < madot.length; i++) {
    madot[i].update();
    for (let k = 0; k < pickups.length; k++) {
      // HUOM NELJÄLLÄ JAKAMINEN
      let mx = round(madot[i].pos.x / GD / 4);
      let my = round(madot[i].pos.y / GD / 4);
      let px = round(pickups[k].x / GD / 4);
      let py = round(pickups[k].y / GD / 4);
      if (mx === px && my === py) {
        pickups[k].grab(i);
        pickups.splice(k, 1);
      }
    }
  }

  updateBoardState();
}

function _SPEED_UP() {
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
  if (wormsCounter <= MATOJA * 0.6 || MATOJA === 3 && wormsCounter <= MATOJA * 0.9) {
    // OFF BECAUSE ITS BROKEN FOR THE TIME BEING
    panicMode = true;
  }

  if (panicMode) {

    wormsText.style('color', '#8c172a');

    for (let i = 0; i < madot.length; i++) {
      madot[i].speedUP_PANIC();
    }

    //remTime += 120;


    panicModeText = ' -> panic mode';
    if (panicCount > 0) {
      panicCount = panicCount - (1.55 * speedMod / 8 * GD);
    }
  }
}

function _GAME_END() {
  if (wormsCounter <= 1) {
    for (let i = 0; i < madot.length; i++) {
      if (!madot[i].stop) {
        L_HUD.rectMode(CENTER);
        L_HUD.noStroke();
        L_HUD.fill(249, 249, 249, 80);
        L_HUD.rect(width / 2, height / 2, width, height);
        L_top.textAlign(CENTER, CENTER);
        L_top.fill(madot[i].color);
        L_top.stroke(Black);
        let ts = width / 12;
        L_top.strokeWeight(ts / 18);
        L_top.textSize(ts);
        L_top.text(madot[i].name, width / 2, height / 2 + ts * 0.5);
        L_top.textSize(ts * 0.6);
        L_top.fill(Black);
        L_top.noStroke();
        L_top.textAlign(CENTER, TOP);
        L_top.text('The Winner is:', width / 2, height / 2 - ts * 0.5);
      }
    }
    background(Beige);
    image(L_HUD, 0, 0);
    image(L_mato, 0, 0);
    image(L_pickup, 0, 0);
    image(L_stone, 0, 0);
    image(L_HUD, 0, 0);
    image(L_HUD, 0, 0);
    image(L_top, 0, 0);
    noLoop();
  }
}

function _LAYERS() {
  image(L_ground, 0, 0);
  image(L_mato, 0, 0);
  image(L_pickup, 0, 0);
  image(L_stone, 0, 0);
  image(L_grave, 0, 0);
  image(L_HUD, 0, 0);
  image(L_top, 0, 0);
}

function create2dArray() {
  for (let _x = 0; _x < width / GD; _x++) {
    array2d[_x] = [];
    for (let _y = 0; _y < height / GD; _y++) {
      // 0 = PASSABLE (NO STONE), 1 = POOP
      array2d[_x][_y] = [true, false];
    }
  }
}

function setBorderToFalse() {
  for (let i = 0; i < height / GD; i++) {
    array2d[0][i][0] = false; //LEFT
    array2d[array2d.length - 1][i][0] = false; //RIGHT
  }
  for (let i = 0; i < width / GD; i++) {
    array2d[i][0][0] = false; //TOP
    array2d[i][array2d[1].length - 1][0] = false; //BOT
  }
}

function updateBoardState() {

  for (let i = 0; i < madot.length; i++) {
    if (!madot[i].stop) {
      let __x = round(madot[i].pos.x / GD);
      let __y = round(madot[i].pos.y / GD);
      // CHECK IF WITHIN BOUNDS
      if (__x > 0 && __x < width / GD && __y > 0 && __y < height / GD) {
        // NO STONE AND NO UNDERGROUND
        if (array2d[__x][__y][0]
          && array2d[__x + 1][__y][0]
          && array2d[__x][__y + 1][0]
          && array2d[__x + 1][__y + 1][0]
          && !madot[i].underground) {
          // HAS POOP
          for (let dx = 0; dx <= 1; dx++) {
            for (let dy = 0; dy <= 1; dy++) {
              if (array2d[__x + dx][__y + dy][1]) {
                array2d[__x + dx][__y + dy][1] = false;
                madot[i].poopEaten();
              }
            }
          }

        } else if (!madot[i].underground) {
          madot[i].stop = true;
          //print('hit wall');
        }
      } else { // OUT OF BOUNDS
        madot[i].stop = true;
        //print('hit wall');
      }
      if (!madot[i].underground) {
        setTimeout(set2dArrayFalse, (1000 + panicCount + stoneDelay) * 8 / GD, madot[i].pos.x, madot[i].pos.y, i); // tehokkuus -> pysäytä tän looppaaminen...
      }
    }
  }
}

function set2dArrayFalse(_x, _y, matoindex) {
  //neliön muotoisessa kuviossa kaikki pois päältä!
  _x = round(_x / GD);
  _y = round(_y / GD);
  L_stone.noStroke();
  for (let dx = 0; dx <= 1; dx++) {
    for (let dy = 0; dy <= 1; dy++) {
      if (array2d[_x + dx][_y + dy][0]) {
        array2d[_x + dx][_y + dy][0] = false;
        L_stone.fill(random(80, 120));
        L_stone.rect((_x + dx) * GD, (_y + dy) * GD, GD);
        setTimeout(removeStone, madot[matoindex].tail + remTime, _x + dx, _y + dy, true, matoindex);
      }
    }
  }
}

function removeStone(_x, _y, kakka, matoindex) {
  // HOX NEED TO BE ALREADY ROUNDED
  let Perc, pooped;
  pooped = kakka;
  if (pooped) {
    Perc = 0.95;
  } else if (!pooped) {
    Perc = 1;
  }

  if (!array2d[_x][_y][0]) {
    array2d[_x][_y][0] = true;
    L_stone.erase();
    L_stone.rect(_x * GD, _y * GD, GD);
    L_stone.noErase();
    if (random() < Perc) {
      L_mato.erase();
      L_mato.rect(_x * GD, _y * GD, GD);
      L_mato.noErase();
    } else {
      let matoIND = matoindex;
      array2d[_x][_y][1] = true; // set poop[eli 1] true
      madot[matoIND].poop++;
      print('mato', madot[matoIND].name, 'poops made:', madot[matoIND].poop);
    }
  }
}

function drawDebug() { //DEBUG PURPOSES
  if (frameCount % 10 === 0) {
    for (let x = 0; x < width / GD; x++) {
      for (let y = 0; y < height / GD; y++) {
        if (!array2d[x][y][0]) { // DRAW STONE
          L_HUD.fill(10, 20, 30, 40);
          L_HUD.noStroke();
          L_HUD.rect(x * GD, y * GD, Pixel);
        }
        if (array2d[x][y][1]) { // DRAW POOP
          L_HUD.fill(10, 20, 30, 40);
          L_HUD.noStroke();
          L_HUD.rect(x * GD, y * GD, Pixel);
        }
      }
    }
  }
}

