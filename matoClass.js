class mato {
  constructor(x, y, _color, rot, controllerIndex) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -0.5 * speedMod);
    this.vel.rotate(rot);
    this.acc = createVector(0, -0.00005 * speedMod);
    this.acc.rotate(rot);

    // TEST CONSTANT ACCELERATION
    this.acc_normal = createVector(0, -0.00005 * speedMod);
    this.acc_normal.rotate(rot);


    this.color = _color;
    this.rotateAMT = 3 * rotSpeedMod;
    this.size = 3; // hox 3x3 pixels is the size of stone check...
    this.stop = false;

    //underground dive feature
    this.underground = false;
    this.uGTimer = new Timer(random(8500,12500),true)
    this.uGSize;
    this.uGR = 0.1;

    //CONTROLS
    this.index = controllerIndex;

    this.LEFT = false;
    this.RIGHT = false;

    this.deathToggler = true; //POINTS SYSTEM
  }

  speedUP_PANIC() {
    this.vel.add(this.acc);
    this.rotateAMT = this.rotateAMT + (this.rotateAMT * 0.00007);
    this.rotateAMT = constrain(this.rotateAMT, 0, 5);
  }

  speedUP() {
    this.vel.add(this.acc_normal);
  }

  update() {
    if (!this.stop) {

      // UPDATE POSITION
      if (this.LEFT) {
        this.vel.rotate(-this.rotateAMT);
        this.acc.rotate(-this.rotateAMT);
        this.acc_normal.rotate(-this.rotateAMT);
      }
      if (this.RIGHT) {
        this.vel.rotate(this.rotateAMT);
        this.acc.rotate(this.rotateAMT);
        this.acc_normal.rotate(this.rotateAMT);
      }

      if (this.pos.x > 0 && this.pos.x < width && this.pos.y > 0 && this.pos.y < height) {
        this.pos.add(this.vel);
      } else {
        this.pos.add(this.vel);
        this.stop = true;
      }

      // UPDATE DIVE
      if (this.uGTimer.getRemainingTime() < 2500) {
        this.underground = true;
      } else {
        this.underground = false;
      }

      if (this.uGTimer.expired()) {
        this.uGTimer.setTimer(9500);
        this.uGTimer.start();
      }
      
      // if (this.uGTimer.expired()) {
      //   this.underground = false;
      //   this.oGTimer.start();
      // }

      // SHOW

      fill(this.color);
      noStroke();
      if (!this.underground) {
        rect(round(this.pos.x), round(this.pos.y), this.size);

      } else if (random() < this.uGR) {
        if (random() < 0.5) {
          fill(Ivory);
        } else if (random() < 0.5) {
          fill(Brown);
        } else {
          fill(this.color);
        }

        if (!panicMode) {
          this.uGSize = random(0.3, 0.7);
        } else {
          this.uGSize = random(0.5, 1.5);
          this.uGR = 0.16;
        }
        this.r = 0.7;
        rect(round(this.pos.x) + random(-this.r, this.r), round(this.pos.y) + random(-this.r, this.r), this.size / 4 + this.uGSize);
      }

    } else { // kill worm
      if (this.deathToggler) {

        // SCORE TABLE 0.01...
        strokeWeight(.5);
        fill(this.color)
        stroke(Black);
        rect(width-8, 11 * wormsCounter -3, 10)
        textAlign(CENTER, CENTER);
        textSize(6);
        fill(White);
        stroke(Black);
        strokeWeight(1.5);
        text(wormsCounter, width-8, 11 * wormsCounter -3)

        wormsCounter--;
        this.deathToggler = !this.deathToggler;
        
      }
    }
  }
}
