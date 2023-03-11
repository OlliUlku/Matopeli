let matoCount = 5;
let speedMod = .5;
let rotSpeedMod = 1;



let madot = [];
let array2d = [];

//POINTS SYSTEM
let wormsCounter = 0;
let points = 0;
let pointsText;

let wormsText;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(Beige);
  angleMode(DEGREES);
  rectMode(CENTER);
  strokeCap(SQUARE);

  create2dArray();
  setBorderToFalse();

  shuffle(posca, true);
  for (let i = 0; i < matoCount; i++) {
    madot[i] = new mato(random(50, width - 50), random(50, height - 50), posca[i], random(360));
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
  for (let i = 0; i < madot.length; i++) {
    madot[i].update();
    updateBoardState();
  }

  // POINTS SYSTEM

  let timefactor = floor(millis() / 1000 / 5);
  if (wormsCounter < 1) {
    timefactor = 0;
  }
  let pointsINC = (wormsCounter * wormsCounter) + timefactor;
  points = points + pointsINC;
  pointsText.html('POINTS: ' + floor(points / 100) + '    ' + '(x' + pointsINC + ')');
  wormsText.html('worms: ' + wormsCounter);

  if (wormsCounter <= 3) {
    for (let i = 0; i < madot.length; i++) {
      madot[i].speedUP();
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    for (let i = 0; i < matoCount; i++) {
      madot[i].stop = !madot[i].stop;
    }
  }
}

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
    if (array2d[round(madot[i].pos.x)][round(madot[i].pos.y)]) {
      setTimeout(set2dArrayFalse, 2000, madot[i].pos.x, madot[i].pos.y);
    } else {
      madot[i].stop = true;
      //print('hit wall');
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

    this.color = _color;
    this.rotateAMT = 3 * rotSpeedMod;
    this.size = 1.5;
    this.stop = false;
    this.toggle = true; //POINTS SYSTEM
  }

  speedUP() {
    this.vel.add(this.acc);
    this.rotateAMT = this.rotateAMT + (this.rotateAMT*0.0008)
  }

  update() {
    // add acc?
    // this.vel.add(this.acc);

    if (!this.stop) {

      if (keyIsDown(LEFT_ARROW)) {
        this.vel.rotate(-this.rotateAMT);
        this.acc.rotate(-this.rotateAMT);
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.vel.rotate(this.rotateAMT);
        this.acc.rotate(this.rotateAMT);
      }
      // if (keyIsDown(UP_ARROW)) {
      //   this.size++;
      // }
      // if (keyIsDown(DOWN_ARROW)) {
      //   this.size--;
      // }

      this.pos.add(this.vel);

      //show
      fill(this.color);
      noStroke();
      rect(round(this.pos.x), round(this.pos.y),this.size);
    } else { // POINTS SYSTEM
      if (this.toggle) {
        wormsCounter--;
        this.toggle = !this.toggle;
      }
    }
  }
}