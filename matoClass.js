class mato {
  constructor(x, y, _color, rot, controllerIndex) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -0.5 * speedMod / 8 * GD * 0.5);
    this.vel.rotate(rot);
    this.acc = createVector(0, -0.001 * speedMod / 8 * GD); // PANIC ACCELERATION
    this.acc.rotate(rot);
    this.color = color(_color);
    this.rotateAMT = 3 * rotSpeedMod;
    this.UGrotateAMT = 2.5 * rotSpeedMod;
    this.size = 2;
    this.stop = false;
    this.Rot;

    // TEST CONSTANT ACCELERATION
    this.acc_normal = createVector(0, -0.0007 * speedMod / 8 * GD); // poistin nollan!
    this.acc_normal.rotate(rot);


    //underground dive feature
    this.underground = false;
    this.uGTimer = new Timer(random(UGtime, UGtime * 2), true);
    this.uGSize;
    this.uGR = 0.26;
    this.r = 0.6 * GD;
    this.UGStart = false;

    // TURBO
    this.turbo = false;
    this.velTurbo = createVector(0, -2.85 * speedMod * 1.2 / 8 * GD);
    this.velTurbo.rotate(rot);
    this.accTurbo = createVector(0, -0.01 * speedMod * 1.2 / 8 * GD);
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
    this.name = wormNames[wormsCounter];

    // POOP
    this.poop = 0;
    this.poopsEaten = 0;

    // TAIL SIZE
    this.tail = 6000;

    // POOP DOLLARS
    this.dollars = startDollars;

    //GEAR
    this.gear = 'fast';
  }

  speedUP_PANIC() {
    this.vel.add(this.acc);
    this.velTurbo.add(this.acc);
    this.rotateAMT = this.rotateAMT + (this.rotateAMT * 0.000425 * speedMod); // panic rotate acc
    this.turboRotateAMT = this.turboRotateAMT + (this.turboRotateAMT * 0.0003 * speedMod); // panic rotate acc
    this.UGrotateAMT = this.UGrotateAMT + (this.UGrotateAMT * 0.00035 * speedMod); // panic rotate acc
    this.rotateAMT = constrain(this.rotateAMT, 0, 15 * 0.83);
    this.turboRotateAMT = constrain(this.rotateAMT, 0, 15);
    this.UGrotateAMT = constrain(this.rotateAMT, 0, 14);

  }

  speedUP() { // NEED TO ADD ALL THE NEEDED VECTORS...
    this.vel.add(this.acc_normal);
    this.velTurbo.add(this.acc_normal);
  }

  poopEaten() {
    this.tail += 10000;
    this.poopsEaten++;
    this.dollars++;
    //print(this.name + ' ate some poop, poops eaten: ' + this.poopsEaten + '. Tail size: ' + this.tail);
  }

  border() {

    if (this.pos.x < Pixel * 0.3) {
      this.pos.x = width - (Pixel * 2);
      print(this.name + ' used teleport!!');
    } else if (this.pos.x >= width - 2 * Pixel) {
      this.pos.x = Pixel * 0.3;
      print(this.name + ' used teleport!!');
    }

    if (this.pos.y < Pixel * 0.2) {
      this.pos.y = height - (Pixel * 2);
      print(this.name + ' used teleport!!');
    } else if (this.pos.y >= height - 2 * Pixel) {
      this.pos.y = Pixel * 0.2;
      print(this.name + ' used teleport!!');
    }

  }

  update() {
    let rX = round(this.pos.x / GD) * GD;
    let rY = round(this.pos.y / GD) * GD;
    if (!this.stop) { // IF DIDNT HIT STONE... (in array2d -> false)

      // UPDATE POSITION

      // SET ROTATION
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

      // is in frame... is this needed anymore with passable walls???
      if (this.pos.x > 0 && this.pos.x < width && this.pos.y > 0 && this.pos.y < height) {

        if (this.dollars >= costT) {
            // TURBO
          this.pos.add(this.velTurbo);
          this.dollars -= costT;
        }

        else {
          if (!this.turbo || this.underground || this.dollars <= costT) {
            this.pos.add(this.vel);
            if (this.gear === 'fast') {
              this.pos.add(this.vel);
            }
          }

        }
      } else {
        this.pos.add(this.vel);
        if (this.gear === 'fast') {
          this.pos.add(this.vel);
        }
        //OLD
        //this.stop = true;
      }

      // UNDERGROUND
      let diveTime = 4000 + panicCount; // move to this.
      let alertTime = 1500;

      if (this.uGTimer.expired()) {
        this.underground = false;
      } else if (this.uGTimer.getRemainingTime() < alertTime) {
        L_HUD.textSize(Pixel * 4);
        L_HUD.textAlign(CENTER, CENTER);
        L_HUD.fill(CacaoBrown);
        L_HUD.noStroke(Black);
        L_HUD.text('!', this.pos.x + Pixel * 3.7, this.pos.y + Pixel);
        this.underground = true;
      } else if (this.uGTimer.getRemainingTime() < diveTime) {
        //if (!panicMode) {
        this.underground = true;
        //} else {
        //  this.underground = false;
        //}
      } else if (this.uGTimer.getRemainingTime() < diveTime + alertTime) {
        L_HUD.textSize(Pixel * 4);
        L_HUD.textAlign(CENTER, CENTER);
        L_HUD.fill(CacaoBrown);
        L_HUD.noStroke(Black);
        L_HUD.text('!', this.pos.x + Pixel * 3.7, this.pos.y + Pixel);
        this.underground = false;
      }
      else {
      }

      if (this.uGTimer.expired()) {
        this.uGTimer.setTimer(UGtime);
        this.uGTimer.start();
      }

      if (this.uGTimer.getRemainingTime() > diveTime && this.UGStart && this.dollars >= costUG) {
        this.dollars -= costUG;
        this.uGTimer.setTimer(diveTime);
        this.uGTimer.start();
      }

      // SHOW -

      if (!this.underground) {
        //if (frameCount % 5 === 0 || this.turbo) {
        this.color.setAlpha(255);
        L_mato.fill(this.color);
        L_mato.noStroke();
        L_mato.rect(round(this.pos.x / GD) * GD, round(this.pos.y / GD) * GD, this.size * GD);

      } else {
        L_ground.fill(this.color);
        if (random() < this.uGR) {
          if (random() < 0.5) {
            L_ground.fill(Ivory);
          } else if (random() < 0.5) {
            L_ground.fill(Brown);
          } else {
            this.color.setAlpha(110);
            L_ground.fill(this.color);
          }

          if (!panicMode) {
            this.uGSize = random(0.5, 1);
          } else {
            this.uGSize = random(0.7, 1.5);
            this.uGR = 0.36;
          }
          L_ground.noStroke();
          L_ground.rect(round(this.pos.x / GD) * GD + random(-this.r, this.r) + Pixel, round(this.pos.y / GD) * GD + random(-this.r, this.r) + Pixel, this.size / 4 + this.uGSize * GD * 0.8);
        }
      }

      L_HUD.fill(White);
      L_HUD.stroke(Black);
      L_HUD.strokeWeight(txtPixel * 0.3);
      L_HUD.textAlign(CENTER, CENTER);
      // HUD INDEX
      let gamepadInd = this.index + 1 - onScreenCount;
      if (gamepadInd >= 1) {
        L_HUD.textSize(TextSize * 0.6);
        L_HUD.text('P' + (gamepadInd), this.pos.x + Pixel, this.pos.y - TextSize * 1.9);
      }
      // HUD NAME
      L_HUD.fill(White);
      L_HUD.stroke(Black);
      L_HUD.textSize(TextSize);
      L_HUD.text(this.name, this.pos.x + Pixel, this.pos.y - TextSize);
      L_HUD.textAlign(LEFT, CENTER);
      let MiniTextS = TextSize * 0.65;
      L_HUD.textSize(MiniTextS);
      L_HUD.fill(Black);
      L_HUD.noStroke();
      //POOPDOLLARS
      //L_HUD.text('poop eaten: ' + floor(this.poopsEaten), this.pos.x + Pixel + Pixel * 3, this.pos.y + Pixel);


    } else { // DID HIT STONE (or otherwise) -> kill worm
      if (this.deathToggler) {

        this.SX = txtPixel * 2;
        this.SY = txtPixel * 3;

        // SCORE TABLE 
        L_top.strokeWeight(txtPixel * 0.15);
        L_top.fill(this.color);
        L_top.stroke(Black);
        L_top.rectMode(CENTER);
        L_top.rect(width - this.SX, this.SY * wormsCounter, this.SX + txtPixel * 0.5);

        //NUMBER TEXT
        L_top.textAlign(CENTER, CENTER);
        L_top.textSize(txtPixel * 1.5);
        L_top.fill(White);
        L_top.stroke(Black);
        L_top.strokeWeight(txtPixel * 0.3);
        L_top.text(wormsCounter, width - this.SX, this.SY * wormsCounter);

        //GRAVE NAME

        // L_grave.fill(White);
        // L_grave.stroke(Black);
        // L_grave.strokeWeight(txtPixel * 0.3);
        // if (this.pos.x < width - 100) { // so it does not jump on top of scoreboard...
        //   L_grave.textSize(TextSize);
        //   L_grave.fill(225);
        //   L_grave.text(this.name, this.pos.x + Pixel, this.pos.y - TextSize);
        // }

        //NAME IN SCORE TABLE
        L_top.textAlign(RIGHT, CENTER);
        L_top.textSize(txtPixel * 1.5);
        L_top.fill(White);
        L_top.text(this.name, width - this.SX * 1.9, this.SY * wormsCounter);

        wormsCounter--;
        this.deathToggler = !this.deathToggler;

      }
    }
  }
}

class top_poop_eater_score {
  constructor() {
    this.sizeX = txtPixel * 18;
    this.sizeY = txtPixel * 20;
    this.gapX = Pixel * 10 + txtPixel * 15;
    this.x = width - this.sizeX - this.gapX;
    this.y = height - this.sizeY;
    this.textSize = txtPixel * 1.4;
    this.arr = [];
    this.color = color(White);
    this.color.setAlpha(110);
  }
  update() {
    for (let i = 0; i < madot.length; i++) {
      this.arr[i] = { name: madot[i].name, poops: madot[i].poopsEaten, color: madot[i].color };
    }
    this.arr.sort((firstItem, secondItem) => firstItem.poops - secondItem.poops);
    reverse(this.arr);
    this.sizeY = txtPixel * this.arr.length * 1.5 + 1.6 * Pixel;
    this.y = height - this.sizeY;



  }

  show() {
    L_HUD.noStroke();
    L_HUD.fill(this.color);
    L_HUD.rect(this.x, this.y - Pixel * 3, this.sizeX, this.sizeY + Pixel * 3);
    L_HUD.textSize(this.textSize * 1.5);
    L_HUD.fill(Black);
    L_HUD.text('Most Poop eaten:', this.x + txtPixel, this.y - Pixel);
    L_HUD.textSize(this.textSize);
    for (let i = 0; i < this.arr.length; i++) {
      L_HUD.fill(this.arr[i].color);
      L_HUD.textAlign(LEFT, TOP);
      L_HUD.text(this.arr[i].name, this.x + Pixel, this.y + Pixel + this.textSize * 1.5 * i);
      L_HUD.textAlign(RIGHT, TOP);
      L_HUD.fill(Black);
      L_HUD.text(this.arr[i].poops, this.x + this.sizeX - 1 * Pixel, this.y + Pixel + this.textSize * 1.5 * i);
    }
  }
}