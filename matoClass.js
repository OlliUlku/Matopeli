class mato {
  constructor(x, y, _color, rot, controllerIndex) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -0.5 * speedMod);
    this.vel.rotate(rot);
    this.acc = createVector(0, -0.0005);
    this.acc.rotate(rot);

    // TEST CONSTANT ACCELERATION
    this.acc_normal = createVector(0, -0.0005 / 10);

    this.color = _color;
    this.rotateAMT = 3 * rotSpeedMod;
    this.size = 1.5;
    this.stop = false;

    //underground dive feature

    this.underground = false;

    //CONTROLS
    this.index = controllerIndex;

    this.LEFT = false;
    this.RIGHT = false;

    this.deathToggler = true; //POINTS SYSTEM
  }

  speedUP_PANIC() {
    this.vel.add(this.acc);
    this.rotateAMT = this.rotateAMT + (this.rotateAMT * 0.0007);
    this.rotateAMT = constrain(this.rotateAMT, 0, 8);
  }

  speedUP() {
    this.vel.add(this.acc_normal);
  }

  update() {
    if (!this.stop) {

      if (this.LEFT) {
        this.vel.rotate(-this.rotateAMT);
        this.acc.rotate(-this.rotateAMT);
      }
      if (this.RIGHT) {
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
        this.pos.add(this.vel);
        this.stop = true;
      }

      //show
      fill(this.color);
      noStroke();
      if (!this.underground) {
        rect(round(this.pos.x), round(this.pos.y), this.size);
      } else if (random() < 0.1) {
        this.r = 0.5;
        if (random() < 0.5) {
          fill(Ivory);
        } else if (random() < 0.5) {
          fill(Brown);
        } else {
          fill(this.color);
        }
        rect(round(this.pos.x) + random(-this.r, this.r), round(this.pos.y) + random(-this.r, this.r), this.size / 4 + random(0.2));
      }
    } else { // kill worm
      if (this.deathToggler) {
        wormsCounter--;
        this.deathToggler = !this.deathToggler;
      }
    }
  }
}
