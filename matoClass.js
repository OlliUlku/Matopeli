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

      if (keyIsDown(LEFT_ARROW)) {
        this.vel.rotate(-this.rotateAMT);
        this.acc.rotate(-this.rotateAMT);
      }
      if (keyIsDown(RIGHT_ARROW)) {
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
