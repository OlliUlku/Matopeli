class mato {
  constructor(x, y, _color, rot, controllerIndex) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -0.5 * speedMod);
    this.vel.rotate(rot);
    this.acc = createVector(0, -0.004 * speedMod); // PANIC ACCELERATION
    this.acc.rotate(rot);
    this.color = _color;
    this.rotateAMT = 3 * rotSpeedMod;
    this.UGrotateAMT = 2.5 * rotSpeedMod;
    this.size = 2;
    this.stop = false;
    this.Rot;

    // TEST CONSTANT ACCELERATION
    this.acc_normal = createVector(0, -0.00005 * speedMod);
    this.acc_normal.rotate(rot);


    //underground dive feature
    this.underground = false;
    this.uGTimer = new Timer(random(8500, 9500 * 2), true);
    this.uGSize;
    this.uGR = 0.26;
    this.r = 0.6 * GridDivision;

    // TURBO
    this.turbo = false;
    this.velTurbo = createVector(0, -2.85 * speedMod);
    this.velTurbo.rotate(rot);
    this.accTurbo = createVector(0, -0.01 * speedMod);
    this.accTurbo.rotate(rot);
    this.turboRotateAMT = 2.5 * rotSpeedMod;


    //CONTROLS
    this.index = controllerIndex;

    this.LEFT = false;
    this.RIGHT = false;

    this.deathToggler = true; //POINTS SYSTEM
    // SCORE TABLE
    this.SX; // SCORETABLE X
    this.SY; // SCORETABLE Y

    // HUD
    this.name = wormNames[this.index];
  }

  speedUP_PANIC() {
    this.vel.add(this.acc);
    this.velTurbo.add(this.acc);
    this.rotateAMT = this.rotateAMT + (this.rotateAMT * 0.0017 * speedMod); // panic rotate acc
    this.turboRotateAMT = this.turboRotateAMT + (this.turboRotateAMT * 0.0017 * speedMod); // panic rotate acc
    this.UGrotateAMT = this.UGrotateAMT + (this.UGrotateAMT * 0.0014 * speedMod); // panic rotate acc
    this.rotateAMT = constrain(this.rotateAMT, 0, 15);
    this.turboRotateAMT = constrain(this.rotateAMT, 0, 15);
    this.UGrotateAMT = constrain(this.rotateAMT, 0, 14);
  }

  speedUP() { // NEED TO ADD ALL THE NEEDED VECTORS...
    this.vel.add(this.acc_normal);
  }

  update() {
    if (!this.stop) { // IF DIDNT HIT STONE... (in array2d -> false)

      // UPDATE POSITION

      if (!this.turbo) {
        if (!this.underground) {
          this.Rot = this.rotateAMT;
        } else {
          this.Rot = this.UGrotateAMT;
        }
      } else {
        this.Rot = this.turboRotateAMT;
      }

      if (this.LEFT) {
        this.vel.rotate(-this.Rot);
        this.velTurbo.rotate(-this.Rot);
        this.accTurbo.rotate(-this.Rot);
        this.acc.rotate(-this.Rot);
        this.acc_normal.rotate(-this.Rot);
      }
      if (this.RIGHT) {
        this.vel.rotate(this.Rot);
        this.velTurbo.rotate(this.Rot);
        this.accTurbo.rotate(this.Rot);
        this.acc.rotate(this.Rot);
        this.acc_normal.rotate(this.Rot);
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

      // UNDERGROUND
      if (this.uGTimer.getRemainingTime() < 1500 + panicCount * 2) {
        //if (!panicMode) {
        this.underground = true;
        //} else {
        //  this.underground = false;
        //}
      } else {
        this.underground = false;
      }

      if (this.uGTimer.expired()) {
        this.uGTimer.setTimer(12000);
        this.uGTimer.start();
      }

      // SHOW -

      if (!this.underground) {
        //if (frameCount % 5 === 0 || this.turbo) {
        L_mato.fill(this.color);
        L_mato.noStroke();
        L_mato.rect(round(this.pos.x / GridDivision) * GridDivision, round(this.pos.y / GridDivision) * GridDivision, this.size * GridDivision);

      } else {
        L_ground.fill(this.color);
        if (random() < this.uGR) {
          if (random() < 0.5) {
            L_ground.fill(Ivory);
          } else if (random() < 0.5) {
            L_ground.fill(Brown);
          } else {
            L_ground.fill(this.color);
          }

          if (!panicMode) {
            this.uGSize = random(0.5, 1);
          } else {
            this.uGSize = random(0.7, 1.5);
            this.uGR = 0.36;
          }
          L_ground.noStroke();
          L_ground.rect(round(this.pos.x / GridDivision) * GridDivision + random(-this.r, this.r) + Pixel, round(this.pos.y / GridDivision) * GridDivision + random(-this.r, this.r) + Pixel, this.size / 4 + this.uGSize * GridDivision * 0.8);
        }
      }

      L_HUD.fill(White);
      L_HUD.stroke(Black);
      L_HUD.strokeWeight(Pixel * 0.3);
      L_HUD.textAlign(CENTER, CENTER);
      // HUD INDEX
      L_HUD.textSize(Pixel);
      L_HUD.text('P' + (this.index + 1), this.pos.x + Pixel, this.pos.y - (Pixel * 3.2));
      // HUD NAME
      L_HUD.fill(White);
      L_HUD.stroke(Black);
      L_HUD.textSize(Pixel * 1.3);
      L_HUD.text(this.name, this.pos.x + Pixel, this.pos.y - (Pixel * 2));

    } else { // DID HIT STONE (or otherwise) -> kill worm
      if (this.deathToggler) {

        this.SX = Pixel * 2;
        this.SY = Pixel * 3;

        // SCORE TABLE 
        L_top.strokeWeight(Pixel * 0.15);
        L_top.fill(this.color);
        L_top.stroke(Black);
        L_top.rectMode(CENTER);
        L_top.rect(width - this.SX, this.SY * wormsCounter, this.SX + Pixel * 0.5);

        //NUMBER TEXT
        L_top.textAlign(CENTER, CENTER);
        L_top.textSize(Pixel * 1.5);
        L_top.fill(White);
        L_top.stroke(Black);
        L_top.strokeWeight(Pixel * 0.3);
        L_top.text(wormsCounter, width - this.SX, this.SY * wormsCounter);

        //GRAVE NAME
        L_top.fill(White);
        L_top.stroke(Black);
        L_top.strokeWeight(Pixel * 0.3);
        if (this.pos.x < width - 100) { // so it does not jump on top of scoreboard...
          L_top.textSize(Pixel * 1.3);
          L_top.fill(225);
          L_top.text(this.name, this.pos.x + Pixel, this.pos.y - (Pixel * 2));
        }

        //NAME IN SCORE TABLE
        L_top.textAlign(RIGHT, CENTER);
        L_top.textSize(Pixel * 1.5);
        L_top.fill(White);
        L_top.text(this.name, width - this.SX * 1.9, this.SY * wormsCounter);

        wormsCounter--;
        this.deathToggler = !this.deathToggler;

      }
    }
  }
}