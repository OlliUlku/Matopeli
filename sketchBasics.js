function gameReadySetup() {
  // RUNS ONCE THEN TURNS SETUP variable OFF
  if (SETUP) {
    resizeCanvas(floor(windowWidth / GD - 2) * GD, floor(windowHeight / GD - 2) * GD);

    let newWindowX = (windowWidth - width) / 2;
    let newWindowY = (windowHeight - height) / 2;

    CNVS.position(newWindowX, newWindowY);

    frameRate(FRAMERATE);
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
    //L_HUD.textFont(PEEPO);

    L_mato = createGraphics(pxDens * width, pxDens * height);
    L_mato.angleMode(DEGREES);
    L_mato.textAlign(CENTER, CENTER);

    L_ground = createGraphics(pxDens * width, pxDens * height);
    L_ground.angleMode(DEGREES);
    L_ground.textAlign(CENTER, CENTER);

    L_fruits = createGraphics(pxDens * width, pxDens * height);
    L_fruits.angleMode(DEGREES);
    L_fruits.textAlign(CENTER, CENTER);

    L_pickup = createGraphics(pxDens * width, pxDens * height);
    L_pickup.angleMode(DEGREES);
    L_pickup.textAlign(CENTER, CENTER);

    L_ghost = createGraphics(pxDens * width, pxDens * height);
    L_ghost.angleMode(DEGREES);
    L_ghost.textAlign(CENTER, CENTER);

    L_action = createGraphics(pxDens * width, pxDens * height);
    L_action.angleMode(DEGREES);
    L_action.textAlign(CENTER, CENTER);

    L_poop = createGraphics(pxDens * width, pxDens * height);
    L_poop.angleMode(DEGREES);
    L_poop.textAlign(CENTER, CENTER);

    // FONTS

    // _font = loadFont('Heebo-Regular.ttf')
    // L_top.textFont(_font);
    // L_HUD.textFont(_font);



    // array that checks whether a (x,y) location has been 'used' etc..
    create2dArray();
    //setBorderToFalse(); //safeguard...





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

    Pixel = (width / GD / (array2d.length) * GD);
    txtPixel = (width / GD / array2d.length * txtDivision);

    //GAMEPAD


    for (let i = 0; i < matoCountBT; i++) {
      angleMode(RADIANS);
      let spawnX, spawnY;
      spawnX = sin(PI * 2 / MATOJA * i);
      spawnY = sin(PI * 2 / MATOJA * i + HALF_PI);
      //// print(spawnX);
      spawnX = map(spawnX, -1, 1, txtPixel * (4 + 5), width - txtPixel * (6 + 5));
      spawnY = map(spawnY, -1, 1, txtPixel * (4 + 5), height - txtPixel * (6 + 5));
      angleMode(DEGREES);
      madot[wormsCounter] = new mato(spawnX + random(-txtPixel * 1, txtPixel * 1), spawnY + random(-txtPixel * 1, txtPixel * 1), posca[wormsCounter], -360 / MATOJA * i + random(-13, 13), wormsCounter);
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




    //PRINT INFO FOR DEBUG?
    //// print('Max colors', posca.length);
    //// print('Max Names', wormNames.length);
    //// print('So called Pixels length X', array2d.length);
    //// print('So called Pixels length Y', array2d[0].length);
    //// print('Grid Division', GD);
    // print('Pixel size', Pixel);
    //// print('txtDiv', txtDivision);
    //// print('txtPixel size', txtPixel);
    //// print('MATOJA ' + MATOJA);


    // wormname textsize
    TextSize = txtPixel * 2.1;

    //PANIC COUNT
    panicCount = 1500 / 8 * GD;


    poopScore = new top_poop_eater_score();
    appleScore = new top_apple_eater_score();
    aliveScore = new top_generic_score('aliveDuration', LightGreen, txtPixel * 19 * 1);
    ghostScore = new top_ghost_score('ghostDuration', SlateGrey, txtPixel * 19 * 2);
    takeOutsScore = new top_takeOuts_score('takeOuts', RedWine, txtPixel * 19 * 3);


    // PICKUPS
    if (!classicMode) {
      setTimeout(pickupSpawner, pickups_newTimeINIT);
      setTimeout(pointPickupSpawner, 10);
    }

    // STRESSCOLOR
    stressColor = color(Red);



    if (classicMode) {
      finishCountdown = 1;
      finishCountdownINIT = finishCountdown;
    } else {
      setTimeout(turnNamesOffOnce, 8000);
    }




    //TURN SETUP OFF SO IT WONT RUN AGAIN
    SETUP = false;
    // print('GAME START!!!');
    print(gearToggle);
  }
}

function turnNamesOffOnce() {
  for (let i = 0; i < madot.length; i++) {
    madot[i].showHudInfo = false;
  }
}

function _ONSCREENKEYS() {
  if (onScreenToggle) {
    for (let i = 0; i < onScreenCount; i++) {
      onScreenKeysAR[i].show();
    }
  }
}



function _MENU_OHJAIMET() {
  let ctrl_i;
  for (let i = 0; i < ohjaimet.length; i++) {

    ctrl_i = i;


    if (ohjaimet[ctrl_i].LEFT || ohjaimet[ctrl_i].LEFT2) {
      ohjaimet[ctrl_i].LEFT2 = false; //Turn button off

    } else {
    }

    if (ohjaimet[ctrl_i].RIGHT || ohjaimet[ctrl_i].RIGHT2) {
      ohjaimet[ctrl_i].RIGHT2 = false; //Turn button off
    } else {
    }

    if (ohjaimet[ctrl_i].B) {
      ohjaimet[ctrl_i].B = false; // turns button OFF
      menuMadot[ctrl_i].highlight = true;
    } else {
      menuMadot[ctrl_i].highlight = false;
    }

    if (ohjaimet[ctrl_i].A) {
      ohjaimet[ctrl_i].A = false; // turns button OFF
    } else {
    }

    if (ohjaimet[ctrl_i].L) {
      ohjaimet[ctrl_i].L = false; // turns button OFF
    }

    if (ohjaimet[ctrl_i].R) {
      ohjaimet[ctrl_i].R = false; // turns button OFF
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

    if (ohjaimet[ctrl_i].B || keyIsDown(ENTER)) {
      ohjaimet[ctrl_i].B = false; // turns button OFF
      if (ohjaimet[ctrl_i].Bonce) {
        madot[i].showHudInfo = !madot[i].showHudInfo;

        ohjaimet[ctrl_i].Bonce = false;
        setTimeout(turnTrue, 300, 'B', ctrl_i);
      }
    } else {
    }

    if (ohjaimet[ctrl_i].A || keyIsDown(DOWN_ARROW)) {
      ohjaimet[ctrl_i].A = false; // turns button OFF
    } else {
    }

    if (ohjaimet[ctrl_i].L || keyIsDown(DOWN_ARROW)) {
      ohjaimet[ctrl_i].L = false;
      if (ohjaimet[ctrl_i].Lonce) {

        if (madot[i].gear > 1 && gearToggle) {
          madot[i].gearDown();
          // print(madot[i].gear);
        }

        ohjaimet[ctrl_i].Lonce = false;
        setTimeout(turnTrue, 1000, 'L', ctrl_i);
      }
    }

    if (ohjaimet[ctrl_i].R || keyIsDown(UP_ARROW)) {
      ohjaimet[ctrl_i].R = false;
      if (ohjaimet[ctrl_i].Ronce) {

        if (madot[i].gear < gearINIT && gearToggle) {
          madot[i].gearUp();
          // print(madot[i].gear);
        }

        ohjaimet[ctrl_i].Ronce = false;
        setTimeout(turnTrue, 1000, 'R', ctrl_i);
      }
    }
  }
}

function turnTrue(LorR, ctrl_ID) {
  if (LorR === 'L') {
    ohjaimet[ctrl_ID].Lonce = true;
  } else if (LorR === 'R') {
    ohjaimet[ctrl_ID].Ronce = true;
  } else if (LorR === 'B') {
    ohjaimet[ctrl_ID].Bonce = true;
  }
}

function _PICKUPS_UPDATE() {
  for (let i = 0; i < pickups.length; i++) {
    pickups[i].show();
    for (let k = 0; k < pickups.length; k++) {

      //MASSIVE PERFORMANCE ISSUE???
      if (pickups[i].rx === pickups[k].rx && pickups[i].ry === pickups[k].ry && i != k) {
        pickups[i].move();
        pickups[k].move();
      }
    }
  }
}

function _MADOT_UPDATE() {
  for (let i = 0; i < madot.length; i++) {
    madot[i].update();
    madot[i].border();
    madot[i].show();
    madot[i].showGhostHUD();
    madot[i].showHUD();
    madot[i].showName();

    if (!madot[i].ghostMode && !madot[i].underground) {
      // TOUCHING PICKUP?
      //reverse for splice if 2 pickups are hit at same frame?
      for (let k = 0; k < pickups.length; k++) {
        // HUOM NELJÄLLÄ JAKAMINEN
        let mx = round(madot[i].pos.x / GD);
        let my = round(madot[i].pos.y / GD);
        let px = round(pickups[k].x / GD);
        let py = round(pickups[k].y / GD);
        let done = false;
        for (let dx = 0; dx <= 1; dx++) {
          for (let dy = 0; dy <= 1; dy++) {
            for (let ix = 0; ix <= 1; ix++) {
              for (let iy = 0; iy <= 1; iy++) {
                if (mx + dx === px + ix && my + dy === py + iy) {
                  if (!done) {
                    if (pickups[k].timerPickupSpawn.expired()) {
                      pickups[k].grab(i);
                      if (pickups[k].type === 3) {
                        setTimeout(pointPickupSpawner, 30);
                      }
                      pickups.splice(k, 1);
                      pickups_count -= 1;
                      done = true;

                    }
                  }
                }
              }
            }
          }

        }
      }
    }
  }

  for (let i = flameParticles.length - 1; i >= 0; i--) {
    flameParticles[i].show();
    flameParticles[i].update();
    flameParticles[i].show();
    flameParticles[i].update();
    flameParticles[i].show();
    flameParticles[i].updateFinal();
    flameParticles[i].border();
    flameParticles[i].show();
    if (flameParticles[i].duration <= 0 || flameParticles[i].hitStone) {
      flameParticles.splice(i, 1);
    }
  }

  for (let i = popUpTexts.length - 1; i >= 0; i--) {
    popUpTexts[i].show();
    popUpTexts[i].update();
    if (popUpTexts[i].duration <= 0) {
      popUpTexts.splice(i, 1);
    }
  }
}

function _SPEED_UP() {
  for (let i = 0; i < madot.length; i++) {
    madot[i].speedUP();
  }
}

function _SHOWWORMSALIVE() {
  L_HUD.fill(Black);
  L_HUD.textAlign(LEFT, CENTER);
  L_HUD.textSize(TextSize * 0.8);
  L_HUD.text('Worms alive: ' + wormsCounter, txtPixel * 2, txtPixel * 2);
}

function _POINTS() {
  for (let i = 0; i < madot.length; i++) {
    madot[i].addVP();
  }
}

function _PANIC_MODE() {

  if (wormsCounter <= MATOJA * 0.8 || MATOJA === 3 && wormsCounter <= MATOJA * 0.9) {
    if (panicONCE) {
      img_panicMode.position(10, 10);
      img_panicMode.size(480 / 3, 432 / 3);
      panicONCE = false;
      panicMode = true;
    }
  }

  if (panicMode) {

    for (let i = 0; i < madot.length; i++) {
      madot[i].speedUP_PANIC();
    }

    if (panicCount > 0) {
      panicCount = panicCount - (1.55 * speedMod / 8 * GD);
    }
  }
}

function _GAME_END() {
  if (FINISHED) {
    SCORES();

    if (winnerArr[0].scoreItem != winnerArr[1].scoreItem) {
      WINNER = winnerArr[0].name;
      WINNERCOLOR = winnerArr[0].color;
    } else {
      WINNER = 'I\'s a tie!!!';
      WINNERCOLOR = Black;
    }

    let ts = width / 14;

    L_top.textSize(ts * 0.6);
    L_top.fill(Black);
    L_top.noStroke();
    L_top.textAlign(CENTER, TOP);
    L_top.text('GAME END, THE WINNER IS', width / 2, height / 2 - ts * 0.5);
    L_top.stroke(GRAY);
    L_top.fill(WINNERCOLOR);
    L_top.strokeWeight(txtPixel * 0.5);
    L_top.text(WINNER, width / 2, height / 2 - ts * 0.5 + ts * 0.7);

    if (!classicMode) {
      poopScore.show();
      appleScore.show();
      aliveScore.show();
      ghostScore.show();
      takeOutsScore.show();
    } else {
      aliveScore.showClassic();
    }

    image(L_HUD, 0, 0);
    image(L_top, 0, 0);


    replayButton = createButton('Replay');
    replayButton.position(0, height / 4 * 3);
    replayButton.center('horizontal');
    replayButton.mousePressed(replayButtonPress);
    noLoop();
    // print('GAME END!!!');

  }
}

function SCORES() {
  _POINTS();
  winnerArr = [];
  for (let i = 0; i < madot.length; i++) {
    winnerArr[i] = { name: madot[i].name, scoreItem: madot[i].VP, color: madot[i].colorINIT, Index: i };
  }

  winnerArr.sort((firstItem, secondItem) => firstItem.scoreItem - secondItem.scoreItem);

  reverse(winnerArr);

  // let _loopL = 3;
  // if (FINISHED) {
  _loopL = winnerArr.length;
  // }

  for (let i = 0; i < _loopL; i++) {
    let _pointWidth = txtPixel * 8 / winnerArr[0].scoreItem;
    let _blockWidth = winnerArr[i].scoreItem * _pointWidth + txtPixel * 2;
    let _sizeY = txtPixel * 1.5;
    if (FINISHED) {
      _pointWidth = txtPixel * 40 / winnerArr[0].scoreItem;
      _blockWidth = winnerArr[i].scoreItem * _pointWidth + txtPixel * 2;
      _sizeY = txtPixel * 3;
    }

    if (winnerArr[i].scoreItem != 0 || FINISHED) {
      L_HUD.push();
      L_HUD.translate(0, txtPixel * 3);
      L_HUD.noStroke();
      L_HUD.fill(winnerArr[i].color);
      L_HUD.rect(0, i * (_sizeY * 1.3), _blockWidth, _sizeY);
      L_HUD.fill(Black);
      L_HUD.textAlign(LEFT, TOP);
      L_HUD.textSize(_sizeY);
      L_HUD.text(winnerArr[i].name + ': ' + winnerArr[i].scoreItem + 'pts', _blockWidth + txtPixel, i * (_sizeY * 1.3));
      L_HUD.pop();
    }
  }
}

function _GAME_END_POINTS() {
  //if (wormsCounter <= 0) {

  // for (let i = 0; i < madot.length; i++) {
  //   if (!madot[i].stop) {
  //     L_HUD.rectMode(CENTER);
  //     L_HUD.noStroke();
  //     L_HUD.fill(249, 249, 249, 80);
  //     //L_HUD.rect(width / 2, height / 2, width, height);
  //     L_top.textAlign(CENTER, CENTER);
  //     L_top.fill(madot[i].color);
  //     L_top.stroke(Black);
  let ts = width / 12;
  //     L_top.strokeWeight(ts / 18);
  //     L_top.textSize(ts);
  //     L_top.text(madot[i].name, width / 2, height / 2 + ts * 0.5);
  //     L_top.textSize(ts * 0.6);
  //     L_top.fill(Black);
  //     L_top.noStroke();
  //     L_top.textAlign(CENTER, TOP);
  //     L_top.text('The Winner is:', width / 2, height / 2 - ts * 0.5);
  //   }
  // }

  L_top.textSize(ts * 0.6);
  L_top.fill(Black);
  L_top.noStroke();
  L_top.textAlign(CENTER, TOP);
  L_top.text('GAME END, WINNER IS ' + WINNER, width / 2, height / 2 - ts * 0.5);


  background(Beige);
  image(L_ground, 0, 0);
  image(L_mato, 0, 0);
  image(L_pickup, 0, 0);
  image(L_stone, 0, 0);
  image(L_ghost, 0, 0);
  image(L_fruits, 0, 0);
  image(L_HUD, 0, 0);
  image(L_top, 0, 0);
  noLoop();
  // print('GAME END!!!');

  //}
}

function _STRESS() {

}

function _LAYERS() {
  image(L_ground, 0, 0);
  image(L_poop, 0, 0);
  image(L_action, 0, 0);
  image(L_mato, 0, 0);
  image(L_pickup, 0, 0);
  image(L_stone, 0, 0);
  image(L_ghost, 0, 0);
  image(L_fruits, 0, 0);
  image(L_HUD, 0, 0);
  image(L_top, 0, 0);
}

function create2dArray() {
  for (let _x = 0; _x < width / GD; _x++) {
    array2d[_x] = [];
    for (let _y = 0; _y < height / GD; _y++) {
      // 0 = PASSABLE (NO STONE), 1 = POOP, 2 = onFire, 3 = flameSpawnerIND
      array2d[_x][_y] = [true, false, false, undefined];
    }
  }

  //SAFETY EXTRA X
  array2d[array2d.length] = [];
  for (let _y = 0; _y < height / GD; _y++) {
    array2d[array2d.length - 1][_y] = [true, false];
  }
}

// OLD NON USED??
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

function _WORLD_UPDATE() {

  for (let i = 0; i < madot.length; i++) {
    if (!madot[i].stop && !madot[i].ghostMode) {
      let __x = round(madot[i].pos.x / GD);
      let __y = round(madot[i].pos.y / GD);
      // CHECK IF WITHIN BOUNDS
      //if (__x > 0 && __x < width / GD && __y > 0 && __y < height / GD) {

      //PIXEL TOUCHES FLAME?
      let done = false;
      for (let dx = 0; dx <= 1; dx++) {
        for (let dy = 0; dy <= 1; dy++) {
          if (array2d[__x + dx][__y + dy][2]) {
            //NOT THE OWNER OF THE FLAME AND NOT UNDERGROUND
            if (i != array2d[__x + dx][__y + dy][3] && !madot[i].underground && !madot[i].ghostMode && !madot[i].invulnerable) {
              // print('touch fire?');
              madot[i].becomeGhost();
              madot[array2d[__x + dx][__y + dy][3]].grillAnother();
              // print(madot[array2d[__x + dx][__y + dy][3]].name, madot[array2d[__x + dx][__y + dy][3]].takeOuts);
            }
          }
        }
      }

      // NO STONE AND NO UNDERGROUND
      if (!madot[i].underground) {
        if (array2d[__x][__y][0]
          && array2d[__x + 1][__y][0]
          && array2d[__x][__y + 1][0]
          && array2d[__x + 1][__y + 1][0]) {
          // HAS POOP
          for (let dx = 0; dx <= 1; dx++) {
            for (let dy = 0; dy <= 1; dy++) {
              if (array2d[__x + dx][__y + dy][1]) {
                array2d[__x + dx][__y + dy][1] = false;
                madot[i].poopEaten();
                L_poop.erase();
                L_poop.rect((__x + dx) * GD - 1, (__y + dy) * GD - 1, Pixel + 2);
                L_poop.noErase();
              }
            }
          }
          //BIG DEATH MOMENT!
        } else if (!madot[i].underground && !madot[i].invulnerable) {
          madot[i].becomeGhost();
        }
      } else { // OUT OF BOUNDS // OLD???
      }
      if (!madot[i].underground) {
        setTimeout(set2dArrayFalse, (2500 + panicCount + stoneDelay) / madot[i].gear * 8 / GD, madot[i].pos.x, madot[i].pos.y, i); // tehokkuus -> pysäytä tän looppaaminen...
      }
      //}
    }
  }
  poopScore.update();
  appleScore.update();
  aliveScore.update();
  ghostScore.update();
  takeOutsScore.update();
  //poopScore.show();
  //appleScore.show();
  //aliveScore.show();
  //ghostScore.show();
  //takeOutsScore.show();
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
        if (!classicMode) {
          setTimeout(removeStone, madot[matoindex].tail + remTime, _x + dx, _y + dy, true, matoindex);
        }
      }
    }
  }
}

function removeStone(_x, _y, kakka, matoindex) {
  // HOX NEED TO BE ALREADY ROUNDED
  let Perc, pooped;
  pooped = kakka;
  if (pooped) {
    Perc = 0.999;
    //HOX!!!!!! KAKKA säätö (ALLA)
  } else if (!pooped) {
    Perc = 1;
  }

  if (!array2d[_x][_y][0]) {
    array2d[_x][_y][0] = true;
    L_stone.erase();
    L_stone.rect(_x * GD, _y * GD, GD);
    L_stone.noErase();

    L_mato.erase();
    L_mato.rect(_x * GD, _y * GD, GD);
    L_mato.noErase();
    if (random() < Perc) {

    } else {
      let matoIND = matoindex;
      L_poop.fill(Brown);
      L_poop.noStroke();
      L_poop.rect(_x * GD, _y * GD, Pixel);
      array2d[_x][_y][1] = true; // set poop[eli 1] true
      madot[matoIND].poop++;
      popUpTexts[popUpTexts.length] = new popUpText(_x * GD, _y * GD, 'poop', CacaoBrown, 80);
      if (!madot[matoIND].stop) {
        // print(madot[matoIND].name, 'pooped. Poopcount:', madot[matoIND].poop);
      }
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

function pickupSpawner() {
  if (pickups_count < MATOJA / 2 + 1) {
    pickups[pickups_count] = new pickup(random(Pixel * 3, width - (Pixel * 3)), random(30, height - 30), floor(random(3)));
    pickups_count += 1;
  }
  setTimeout(pickupSpawner, pickups_newTime);
}

function pointPickupSpawner() {
  //if (pickups_count < MATOJA / 2 + 1) {
  pickups[pickups_count] = new pickup(random(Pixel * 3, width - (Pixel * 3)), random(30, height - 30), 3);
  pickups_count += 1;
  //}
}

function extinguish(x, y) {
  array2d[x][y][2] = false;
  array2d[x][y][3] = undefined;


  //DEBUG
  // L_top.erase();
  // L_top.noStroke();
  // L_top.fill(Black);
  // L_top.rect(x * GD, y * GD, Pixel);
  // L_top.noErase();
  // // print('extinguish');
}

function replayButtonPress() {
  window.location.reload();
}