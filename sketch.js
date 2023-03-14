let matoCount = 5;
// 12mato 125%zoom || 5mato 400%zoom || 40mato 67%zoom

let spawnBorder = 50; // PX (Base 50?)
let speedMod = .5; // BASE .5
let rotSpeedMod = 1;
let panicMode = false;
let panicCount = 1500;

//controllers
let ohjaimet = [];
let leftPressed = false;
let rightPressed = false;

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
  controllerUsed(); //checks all buttons and updates values
  //_SPEED_UP_TEST();
  _GAME_UPDATE();
  _PANIC_MODE();
  _POINTS();
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
  if (wormsCounter <= matoCount * 0.6) {
    panicMode = true;
  }

  if (panicMode) {

    for (let i = 0; i < madot.length; i++) {
      madot[i].speedUP_PANIC();
    }

    panicModeText = ' -> panic mode';
    if (panicCount > 0) {
      panicCount = panicCount - 0.46;
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
    if (madot[i].pos.x > 0 && madot[i].pos.x < width && madot[i].pos.y > 0 && madot[i].pos.y < height) {
      if (array2d[round(madot[i].pos.x)][round(madot[i].pos.y)]) {
        setTimeout(set2dArrayFalse, 500 + panicCount, madot[i].pos.x, madot[i].pos.y);
      } else {
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
  array2d[_x][_y] = false;
  array2d[_x - 1][_y] = false;
  array2d[_x][_y + 1] = false;
  array2d[_x + 1][_y] = false;
  array2d[_x][_y - 1] = false;

  fill(100);
  noStroke();
  rect(_x, _y, 1.8);

}


class mato {
  constructor(x, y, _color, rot) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -0.5 * speedMod);
    this.vel.rotate(rot);
    this.acc = createVector(0, -0.0005);
    this.acc.rotate(rot);

    this.acc_normal = createVector(0, -0.0005 / 10);


    this.color = _color;
    this.rotateAMT = 3 * rotSpeedMod;
    this.size = 1.5;
    this.stop = false;
    this.deathToggler = true; //POINTS SYSTEM
  }

  speedUP_PANIC() {
    this.vel.add(this.acc);
    this.rotateAMT = this.rotateAMT + (this.rotateAMT * 0.0007);
    this.rotateAMT = constrain(this.rotateAMT, 0, 10);
  }

  speedUP() {
    this.vel.add(this.acc_normal);
  }

  update() {
    if (!this.stop) {

      if (leftPressed || keyIsDown(LEFT_ARROW)) {
        this.vel.rotate(-this.rotateAMT);
        this.acc.rotate(-this.rotateAMT);
      }
      if (rightPressed || keyIsDown(RIGHT_ARROW)) {
        this.vel.rotate(this.rotateAMT);
        this.acc.rotate(this.rotateAMT);
      }

      //OLDIE
      // if (keyIsDown(UP_ARROW)) {
      //   this.size++;
      // }
      // if (keyIsDown(DOWN_ARROW)) {
      //   this.size--;
      // }

      if (this.pos.x > 0 && this.pos.x < width && this.pos.y > 0 && this.pos.y < height) {
        this.pos.add(this.vel);
      } else {
        this.stop = true;
      }

      //show
      fill(this.color);
      noStroke();
      rect(round(this.pos.x), round(this.pos.y), this.size);
    } else { // kill worm
      if (this.deathToggler) {
        wormsCounter--;
        this.deathToggler = !this.deathToggler;
      }
    }
  }
}