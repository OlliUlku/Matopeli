class mato {
  constructor(x, y, _color, rot, controllerIndex) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -0.5 * speedMod);
    this.vel.rotate(rot);
    this.acc = createVector(0, -0.0006 * speedMod); // PANIC ACCELERATION
    this.acc.rotate(rot);
    this.color = _color;
    this.rotateAMT = 3 * rotSpeedMod;
    this.size = 3; // hox 3x3 pixels is the size of stone check...
    this.stop = false;

    // TEST CONSTANT ACCELERATION
    this.acc_normal = createVector(0, -0.00005 * speedMod);
    this.acc_normal.rotate(rot);


    //underground dive feature
    this.underground = false;
    this.uGTimer = new Timer(random(8500, 9500 * 2), true);
    this.uGSize;
    this.uGR = 0.26;
    this.r = 0.6;

    // TURBO
    this.turbo = false;
    this.velTurbo = createVector(0, -2.85 * speedMod);
    this.velTurbo.rotate(rot);
    this.accTurbo = createVector(0, -0.01 * speedMod);
    this.accTurbo.rotate(rot);

    //CONTROLS
    this.index = controllerIndex;

    this.LEFT = false;
    this.RIGHT = false;

    this.deathToggler = true; //POINTS SYSTEM

    // HUD
    this.name = wormNames[this.index];
  }

  speedUP_PANIC() {
    this.vel.add(this.acc);
    this.velTurbo.add(this.acc);
    this.rotateAMT = this.rotateAMT + (this.rotateAMT * 0.0007 * speedMod); // panic rotate acc
    this.rotateAMT = constrain(this.rotateAMT, 0, 11);
  }

  speedUP() { // NEED TO ADD ALL THE NEEDED VECTORS...
    this.vel.add(this.acc_normal);
  }

  update() {
    if (!this.stop) {

      // UPDATE POSITION
      if (this.LEFT) {
        this.vel.rotate(-this.rotateAMT);
        this.velTurbo.rotate(-this.rotateAMT);
        this.accTurbo.rotate(-this.rotateAMT);
        this.acc.rotate(-this.rotateAMT);
        this.acc_normal.rotate(-this.rotateAMT);
      }
      if (this.RIGHT) {
        this.vel.rotate(this.rotateAMT);
        this.velTurbo.rotate(this.rotateAMT);
        this.accTurbo.rotate(this.rotateAMT);
        this.acc.rotate(this.rotateAMT);
        this.acc_normal.rotate(this.rotateAMT);
      }

      if (this.pos.x > 0 && this.pos.x < width && this.pos.y > 0 && this.pos.y < height) {
        if (!this.turbo || this.underground) {
          this.pos.add(this.vel);
        } else {
          this.pos.add(this.velTurbo);
        }
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

      // SHOW
      L_mato.fill(this.color);
      L_mato.noStroke();
      if (!this.underground) {
        //if (frameCount % 10 === 0) {
        L_mato.rect(round(this.pos.x), round(this.pos.y), this.size);
        //}
      } else if (random() < this.uGR) {
        if (random() < 0.5) {
          L_mato.fill(Ivory);
        } else if (random() < 0.5) {
          L_mato.fill(Brown);
        } else {
          L_mato.fill(this.color);
        }

        if (!panicMode) {
          this.uGSize = random(0.5, 0.8);
        } else {
          this.uGSize = random(0.7, 1.5);
          this.uGR = 0.36;
        }
        L_mato.rect(round(this.pos.x) + random(-this.r, this.r), round(this.pos.y) + random(-this.r, this.r), this.size / 4 + this.uGSize);
      }

      L_HUD.textSize(6);
      L_HUD.fill(White);
      L_HUD.stroke(Black);
      L_HUD.strokeWeight(1.5);
      L_HUD.text(this.name, this.pos.x, this.pos.y - 8);

    } else { // kill worm
      if (this.deathToggler) {

        // SCORE TABLE 0.01...
        L_top.textAlign(CENTER, CENTER);
        L_top.strokeWeight(.5);
        L_top.fill(this.color);
        L_top.stroke(Black);
        L_top.rect(width - 8, 11 * wormsCounter - 3, 10);
        L_top.textSize(6);
        L_top.fill(White);
        L_top.stroke(Black);
        L_top.strokeWeight(1.5);
        L_top.text(wormsCounter, width - 8, 11 * wormsCounter - 3);

        L_top.textSize(6);
        L_top.fill(White);
        L_top.stroke(Black);
        L_top.strokeWeight(1.5);
        if (this.pos.x < width - 100) { // so it does not jump on top of scoreboard...
          L_top.text(this.name, this.pos.x, this.pos.y - 8);
        }
        L_top.textAlign(RIGHT, CENTER);
        L_top.text(this.name, width - 8 - 7, 11 * wormsCounter - 3);

        wormsCounter--;
        this.deathToggler = !this.deathToggler;

      }
    }
  }
}