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
  
      for (let i = 0; i < madot.length; i++) {
        madot[i].speedUP_PANIC();
      }
  
      panicModeText = ' -> panic mode';
      if (panicCount > 0) {
        panicCount = panicCount - 1.5;
      }
    }
  }
  
  // // OLDIE STOP ON SPACEBAR
  // function keyPressed() {
  //   if (keyCode === 32) {
  //     for (let i = 0; i < matoCount; i++) {
  //       madot[i].stop = !madot[i].stop;
  //     }
  //   }
  // }
  
  function create2dArray() {
    for (let _x = 0; _x < width; _x++) {
      array2d[_x] = [];
      for (let _y = 0; _y < height; _y++) {
        array2d[_x][_y] = true;
      }
    }
  }
  
  function setBorderToFalse() {
    for (let i = 0; i < height; i++) {
      array2d[0][i] = false;
      array2d[width - 1][i] = false;
    }
  }
  
  function updateBoardState() {
    for (let i = 0; i < matoCount; i++) {
      // CHECK IF WITHIN BOUNDS
      let __x = round(madot[i].pos.x);
      let __y = round(madot[i].pos.y);
      if (__x > 0 && __x < width && __y > 0 && __y < height) {
        if (array2d[__x][__y] && !madot[i].underground) {
          setTimeout(set2dArrayFalse, 1000 + panicCount, madot[i].pos.x, madot[i].pos.y);
        } else if (!madot[i].underground) {
          madot[i].stop = true;
          //print('hit wall');
        }
      }
    }
  }
  
  function set2dArrayFalse(_x, _y) {
    //ristin muotoisessa kuviossa kaikki pois päältä!
    _x = round(_x);
    _y = round(_y);
    // simplify sometime??? 3x3 grid gets turned 'false'
    array2d[_x][_y] = false;
    array2d[_x - 1][_y] = false;
    array2d[_x - 1][_y - 1] = false;
    array2d[_x + 1][_y + 1] = false;
    array2d[_x - 1][_y + 1] = false;
    array2d[_x + 1][_y - 1] = false;
    array2d[_x][_y + 1] = false;
    array2d[_x + 1][_y] = false;
    array2d[_x][_y - 1] = false;
  
    fill(100);
    noStroke();
    rect(_x, _y, 2);
  }

  