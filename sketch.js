let madot = []
let matoCount;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(Beige);
  angleMode(DEGREES);

  shuffle(posca, true);
  matoCount = 3; //posca.length
  for (let i = 0; i < matoCount; i++) {
    madot[i] = new mato(width / 2, height / 2, posca[i], 360 / matoCount * i)
  }
}

function draw() {
  //background(Beige)
  for (let i = 0; i < madot.length; i++) {
    madot[i].update()
  }
}

function keyPressed() {
  if (keyCode === 32) {
    for (let i = 0; i < matoCount; i++) {
      madot[i].stop = !madot[i].stop
    }
  }
}
class mato {
  constructor(x, y, _color, rot) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -0.5);
    this.vel.rotate(rot)
    this.acc = createVector(0, 0);
    this.color = _color;
    this.rotateAMT = 20;
    this.size = 10;
    this.stop = false;
  }

  update() {
    // add acc?
    // this.vel.add(this.acc);

    if (keyIsDown(LEFT_ARROW)) {
      this.vel.rotate(-this.rotateAMT)
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.vel.rotate(this.rotateAMT)
    }
    if (keyIsDown(UP_ARROW)) {
      this.size++;
      //this.rotateAMT--;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.size--;
      //this.rotateAMT++;
    }

    if (!this.stop) {
      this.pos.add(this.vel);
    }

    //show
    strokeWeight(this.size / 10);
    noFill();
    stroke(this.color);
    point(this.pos.x, this.pos.y);
  }
  // comment to test github.... commit
}