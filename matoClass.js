class menuMato {
  constructor(x, y, _color, rot, controllerIndex) {
    this.pos = createVector(x, y);
    this.rotation = rot;
    this.color = color(_color);
    this.colorINIT = color(_color);
    this.size = 4;
    this.index = controllerIndex;
    this.name = wormNames[controllerIndex];

    this.highlight = false;
    // print('created menumato ' + this.index + this.name);
  }
  show() {
    fill(this.color);
    noStroke();
    if (this.highlight) {
      stroke(Pink);
      strokeWeight(5);
    }
    rect(this.pos.x, this.pos.y, this.size * 8);


    TextSize = 10;
    Pixel = this.size * 4;
    txtPixel = 5;

    fill(White);
    strokeWeight(2);
    stroke(DeepGrey);
    textSize(TextSize);
    textAlign(CENTER, CENTER);
    text(this.name, this.pos.x + Pixel, this.pos.y - TextSize - txtPixel);
  }
}

class mato {
  constructor(x, y, _color, rot, controllerIndex) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -0.5 * speedMod / 8 * GD);
    this.vel.rotate(rot);
    this.acc = createVector(0, -0.001 * speedMod / 8 * GD); // PANIC ACCELERATION
    this.acc.rotate(rot);
    this.color = color(_color);
    this.colorINIT = color(_color);
    this.rotateAMT = 3 * rotSpeedMod;
    this.UGrotateAMT = 2.5 * rotSpeedMod;
    this.size = 2;
    this.stop = false;
    this.Rot;
    this.rotation = rot;

    // TEST CONSTANT ACCELERATION
    this.acc_normal = createVector(0, -0.0007 * speedMod / 8 * GD); // poistin nollan!
    this.acc_normal.rotate(rot);


    //underground dive feature
    this.underground = false;
    this.uGTimer = new Timer(random(UGtime, UGtime * 2));
    this.uGTimer.endTimer();
    //this.uGTimer.pause();

    this.uGSize;
    this.uGR = 0.76;
    this.r = 0.6 * GD;
    this.UGStart = false;
    this.diveTime = 6000;
    this.alertTime = 1500;

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
    this.showHudInfo = true;

    // COLLECTIBLES // POOP // FRUITS
    this.poop = 0;

    this.poopsEaten = 0;
    this.fruitsEaten = 0;
    this.aliveDuration = 0;
    this.ghostDurationScore = 0;

    // ROYALTY
    this.poopRoyalty = false;
    this.appleRoyalty = false;
    this.aliveRoyalty = false;
    this.ghostRoyalty = false;
    this.takeOutsRoyalty = false;

    this.poopRoyaltyOnce = true;
    this.appleRoyaltyOnce = true;
    this.aliveRoyaltyOnce = true;
    this.ghostRoyaltyOnce = true;
    this.takeOutsRoyaltyOnce = true;

    this.VP = 0;
    this.VPExtra = 0;

    this.VPpoop = 0;
    this.VPfruit = 0;
    this.VPalive = 0;
    this.VPghost = 0;
    this.VPtakeOuts = 0;


    // TAIL SIZE
    this.tail = 2500;

    // POOP DOLLARS
    this.PickupTurbo = startDollars;

    //GEAR
    this.gear = gearINIT;



    // GHOST
    this.ghostMode = false;
    this.ghostColor = color(White);
    this.ghostColor2 = color(White);
    // for different ghost flicker time
    this.rndNum = random(1000);

    this.ghostMOD = 3;
    this.ghostVel = createVector(0, -0.5 * speedMod / 8 * GD * 0.5 * this.ghostMOD);
    this.ghostVel.rotate(rot);
    this.ghostDuration = 7500;
    this.ghostDurationINIT = this.ghostDuration;
    this.ghostTimer = new Timer(1000, false);
    this.ghostTimer.pause();
    this.ghostsHappened = 0;

    //FLAME AND TAKEOUTS
    this.rndNum2 = floor(random(15));
    this.takeOuts = 0;
    this.chiliOil = 0;

    // CLASSIC MODE
    this.checkBorder = false;

    // INVULNERABILITY
    this.invulnerable = false;
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

  gearUp() {
    this.gear++;
    if (this.gear != 6) {
      popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, 'Gear ' + this.gear);
    } else {
      popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, 'Gear ' + this.gear + '! Vroom Vroom!!');
    }
  }

  gearDown() {
    this.gear--;
    if (this.gear != 1) {
      popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, 'Gear ' + this.gear);
    } else {
      popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, 'Gear ' + this.gear + ', I will take my time...');
    }
  }

  speedUP() {
    this.vel.add(this.acc_normal);
    this.velTurbo.add(this.acc_normal);
  }

  poopEaten() {
    this.tail += LENGTHADD / POOPLENGTHDIVIDER / MATOJA;
    this.poopsEaten++;
    this.PickupTurbo++;
    popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, this.name + ' found some poop, great job! :)');
    this.poopRoyaltyOnce = true;
  }

  appleEaten() {
    this.tail += LENGTHADD / MATOJA;
    this.fruitsEaten++;
    this.PickupTurbo += omenaVal * 4 / GD;
    this.appleRoyaltyOnce = true;


    popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, this.name + ' ate an apple! :)');
  }

  chiliEaten() {
    this.tail += LENGTHADD / MATOJA;
    this.fruitsEaten++;
    this.chiliOil = omenaVal * 0.75;
    this.appleRoyaltyOnce = true;


    popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, this.name + ' just had a chili! Hot!!');
  }

  spadeFruitEaten() {
    this.tail += LENGTHADD / MATOJA;
    this.fruitsEaten++;

    this.uGTimer.endTimer();
    this.uGTimer.reset();
    this.uGTimer.setTimer(this.diveTime);
    this.uGTimer.start();
    this.appleRoyaltyOnce = true;


    popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, this.name + ' ate a delicious spade!');
  }

  pointFruitEaten() {
    this.tail += LENGTHADD / MATOJA;
    //this.fruitsEaten++;
    this.VPExtra++;
    //this.appleRoyaltyOnce = true;

    popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, this.name + ' collected a victory point! Extra points collected: ' + this.VPExtra);
  }

  grillAnother() {
    this.takeOuts++;
    if (random() < 0.33) {
      popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, 'Take that!!');
    } else if (random() < 0.33) {
      popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, 'Burn!!');
    } else {
      popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, 'Take this!!!');
    }
    this.takeOutsRoyaltyOnce = true;

  }

  royaltiesText() {
    if (this.aliveRoyaltyOnce && this.aliveRoyalty) {
      popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y - Pixel * 4, this.name + ' has spent the longest time alive!!', AquaGreen, 100);
      this.aliveRoyaltyOnce = false;
    }

    if (this.ghostRoyaltyOnce && this.ghostRoyalty && !classicMode) {
      popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y - Pixel * 4, this.name + ' has turned into a ghost the most!', Violet, 100);
      this.ghostRoyaltyOnce = false;
    }

    if (this.poopRoyaltyOnce && this.poopRoyalty) {
      popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y - Pixel * 4, this.name + ' is the leading poop collector!', Brown, 100);
      this.poopRoyaltyOnce = false;

    }
    if (this.appleRoyaltyOnce && this.appleRoyalty) {
      this.fruitRoyaltyText();
      this.appleRoyaltyOnce = false;

    }
    if (this.takeOutsRoyaltyOnce && this.takeOutsRoyalty) {
      popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y - Pixel * 4, this.name + ' is the GrillMaster', Red, 100);
      this.takeOutsRoyaltyOnce = false;
    }

  }

  fruitRoyaltyText() {
    popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y - Pixel * 4, this.name + ' is the leading fruit picker!!', Pink, 100);
  }

  border() {

    this.checkBorder = false;

    if (this.pos.x < Pixel * 0.3) {
      if (!classicMode) {
        this.pos.x = width - (Pixel * 2);
      }
      this.checkBorder = true;

    } else if (this.pos.x >= width - 2 * Pixel) {

      if (!classicMode) {
        this.pos.x = Pixel * 0.3;
      }
      this.checkBorder = true;
    }

    if (this.pos.y < Pixel * 0.2) {
      if (!classicMode) {
        this.pos.y = height - (Pixel * 2);
      }
      this.checkBorder = true;

    } else if (this.pos.y >= height - 2 * Pixel) {
      if (!classicMode) {
        this.pos.y = Pixel * 0.2;
      }
      this.checkBorder = true;
    }

    if (classicMode && this.checkBorder) {
      this.becomeGhost();
    }

  }

  rotate() {
    if (!this.turbo) {
      if (!this.underground) {
        this.Rot = this.rotateAMT;
      } else {
        this.Rot = this.UGrotateAMT;
      }
    } else {
      this.Rot = this.turboRotateAMT;
    }
    if (!this.ghostMode) {
      this.ghostMOD = 1;
    }
    if (this.LEFT) {
      this.vel.rotate(-this.Rot * this.ghostMOD);
      this.ghostVel.rotate(-this.Rot * this.ghostMOD);
      this.velTurbo.rotate(-this.Rot * this.ghostMOD);
      this.accTurbo.rotate(-this.Rot * this.ghostMOD);
      this.acc.rotate(-this.Rot * this.ghostMOD);
      this.acc_normal.rotate(-this.Rot * this.ghostMOD);
      this.rotation += (-this.Rot * this.ghostMOD);
    }
    if (this.RIGHT) {
      this.vel.rotate(this.Rot * this.ghostMOD);
      this.ghostVel.rotate(this.Rot * this.ghostMOD);
      this.velTurbo.rotate(this.Rot * this.ghostMOD);
      this.accTurbo.rotate(this.Rot * this.ghostMOD);
      this.acc.rotate(this.Rot * this.ghostMOD);
      this.acc_normal.rotate(this.Rot * this.ghostMOD);
      this.rotation += (this.Rot * this.ghostMOD);
    }
  }

  becomeGhost() {
    if (!this.ghostMode) {
      this.ghostMode = true;
      if (gearToggle) {
        this.gear = 1;
      }
      if (random() < 0.25) {
        popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, 'Ouch!!!');
      } else if (random() < 0.25) {
        popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, 'Ouchie!');
      } else if (random() < 0.25) {
        popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, 'Oof!');
      } else {
        popUpTexts[popUpTexts.length] = new popUpText(this.pos.x, this.pos.y, 'Oww! :<');
      }
      if (!classicMode) {
        this.ghostTimer.endTimer();
        this.ghostTimer.reset();
        this.ghostTimer.setTimer(this.ghostDuration);
        this.ghostTimer.start();
      }
      //this.ghostDuration += 4000;
      this.ghostsHappened++;
      wormsCounter--;
      this.ghostRoyaltyOnce = true;



    }
  }

  updateGhost() {
    if (!classicMode) {
      this.ghostDurationScore += 1 / FRAMERATE;
      this.chiliOil -= costT / 150;

      if (!this.ghostTimer.expired()) {
        this.ghostMOD = map(sin(millis() / 13 + this.rndNum), -1, 1, .5, 3);

        this.ghostVel.add(this.ghostVel); // adds 'infinite speed' to be limited later
        let ghostSPEED = map(this.ghostMOD, .5, 3, .5, 4);
        this.ghostVel.limit(ghostSPEED * GD / 11 * 1.7);

        let rX = round(this.pos.x / GD) * GD;
        let rY = round(this.pos.y / GD) * GD;

        // UPDATE POSITION

        // SET ROTATION
        this.rotate();

        if (this.pos.x > 0 && this.pos.x < width && this.pos.y > 0 && this.pos.y < height) {

          if (this.PickupTurbo >= costT) {
            // TURBO
            this.pos.add(this.ghostVel);
            this.pos.add(this.ghostVel);
            this.PickupTurbo -= costT;
          }

          else {
            if (!this.turbo || this.underground || this.PickupTurbo <= costT) {
              this.pos.add(this.ghostVel);
              this.pos.add(this.ghostVel);
            }

          }
        } else {
          this.pos.add(this.ghostVel);
          this.pos.add(this.ghostVel);
        }
      } else {
        this.becomeInvulnerable();
        this.ghostMode = false;
        wormsCounter++;
        // print(this.name + ' revived! worms alive: ' + wormsCounter);

      }
    }
  }

  showGhost() {
    if (!classicMode) {
      this.color.setAlpha(map(sin(millis() / 13 + this.rndNum), -1, 1, -1, 100));
      this.ghostColor.setAlpha(map(sin(millis() / 13 + this.rndNum), -1, 1, -1, 100));
      L_ghost.fill(this.color);
      L_ghost.stroke(this.ghostColor);
      L_ghost.strokeWeight(Pixel * .2);
      L_ghost.rect(round(this.pos.x / GD) * GD, round(this.pos.y / GD) * GD, this.size * GD);
    }
  }

  showGhostHUD() {
    if (this.ghostMode && !classicMode) {
      let _cw = map(this.ghostTimer.getRemainingTime(), 0, this.ghostDurationINIT, 0, Pixel * 16);
      let _alpha = map(this.ghostTimer.getRemainingTime(), 0, this.ghostDurationINIT, 255, -355);
      this.ghostColor2.setAlpha(_alpha);
      L_HUD.stroke(this.ghostColor2);
      L_HUD.noFill();
      L_HUD.strokeWeight(Pixel * 0.2);
      L_HUD.circle(round(this.pos.x / GD) * GD + Pixel, round(this.pos.y / GD) * GD + Pixel, _cw);
    }
  }

  flamethrower() {
    if (!this.underground && this.chiliOil > 0) {
      for (let i = 0; i < 2; i++) {
        let p = new flameParticle(this.pos.x, this.pos.y, this.rotation, this.index, this.vel);
        flameParticles.push(p);
      }
    }
  }



  update() {
    if (this.chiliOil > 0) {
      this.chiliOil -= costT / 3;
    }

    if (this.ghostMode) {
      this.updateGhost();
    } else {

      this.flamethrower();


      this.aliveDuration += 1 / FRAMERATE;

      let rX = round(this.pos.x / GD) * GD;
      let rY = round(this.pos.y / GD) * GD;
      if (!this.stop) { // IF DIDNT HIT STONE... (in array2d -> false)

        // UPDATE POSITION

        // SET ROTATION


        this.rotate();

        if (this.pos.x > 0 && this.pos.x < width && this.pos.y > 0 && this.pos.y < height) {

          if (this.PickupTurbo >= costT) {
            // TURBO
            this.pos.add(this.velTurbo);
            this.PickupTurbo -= costT;
          }

          // BASIC POS.ADD
          if (!this.turbo || this.underground || this.PickupTurbo <= costT) {

            for (let k = 0; k < this.gear; k++) {
              this.pos.add(this.vel);
            }
          }

          //DOES THIS EVER FIRE XD DONT THINK SO DELETE?
        } else {
          this.pos.add(this.vel);
          // print('firing out of bounds???');
          if (this.gear === 'fast') {
            this.pos.add(this.vel);
          }
          if (this.gear === 'supaFast') {
            this.pos.add(this.vel);
            this.pos.add(this.vel);
          }
          //OLD
          //this.stop = true;
        }
        // UNDERGROUND

        if (this.uGTimer.expired()) {
          this.underground = false;
        } else if (this.uGTimer.getRemainingTime() < this.alertTime) {
          L_HUD.textSize(Pixel * 4);
          L_HUD.textAlign(CENTER, CENTER);
          L_HUD.fill(CacaoBrown);
          L_HUD.noStroke();
          L_HUD.text('!', this.pos.x + Pixel * 3.7, this.pos.y + Pixel);
          this.underground = true;
        } else if (this.uGTimer.getRemainingTime() < this.diveTime) {
          //if (!panicMode) {
          this.underground = true;
          //} else {
          //  this.underground = false;
          //}
        } else if (this.uGTimer.getRemainingTime() < this.diveTime + this.alertTime) {
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
          // this.uGTimer.setTimer(UGtime);
          // this.uGTimer.start();
        }

        if (this.uGTimer.getRemainingTime() > this.diveTime && this.UGStart && this.PickupTurbo >= costUG) {
          this.PickupTurbo -= costUG;
          this.uGTimer.setTimer(this.diveTime);
          this.uGTimer.start();
        }
      }
    }
  }

  becomeInvulnerable() {
    this.invulnerable = true;
    setTimeout(() => {
      this.invulnerable = false;
    }, 4000);
  }



  addVP() {
    if (!this.stop) { //OLD
      if (this.poopRoyalty && !classicMode) {
        this.VPpoop = poopVP;
      } else { this.VPpoop = 0; }
      if (this.appleRoyalty && !classicMode) {
        this.VPfruit = fruitVP;
      } else { this.VPfruit = 0; }
      if (this.aliveRoyalty) {
        this.VPalive = aliveVP;
      } else { this.VPalive = 0; }
      if (this.ghostRoyalty && !classicMode) {
        this.VPghost = ghostVP;
      } else { this.VPghost = 0; }
      if (this.takeOutsRoyalty && !classicMode) {
        this.VPtakeOuts = takeOutsVP;
      } else { this.VPtakeOuts = 0; }
    }

    this.VP = this.VPExtra + this.VPpoop + this.VPfruit + this.VPalive + this.VPghost;

  }

  //HOX ALSO ADDS VP, NOT THE RIGHT PLACE???
  showHUD() {
    if (!this.stop) {
      //circleFACE

      // if (!this.ghostMode && !this.underground) {
      //   L_HUD.noStroke();
      //   L_HUD.fill(this.color);
      //   L_HUD.circle(this.pos.x + Pixel, this.pos.y + Pixel, this.size * 1.8 * Pixel);
      // }

      //ROYALTIES

      if (this.poopRoyalty) {
        // L_HUD.image(img_kakkakruunu, this.pos.x - Pixel * 4, this.pos.y - Pixel * 4, Pixel * 10, Pixel * 10);
        L_HUD.push();
        L_HUD.translate(this.pos.x + Pixel, this.pos.y + Pixel);
        L_HUD.rotate(this.rotation + 28);
        L_HUD.image(img_kakkakruunu, -Pixel * 6, -Pixel * 6, Pixel * 12, Pixel * 12);
        L_HUD.pop();
      }
      if (this.appleRoyalty) {
        L_HUD.push();
        L_HUD.translate(this.pos.x - Pixel, this.pos.y - Pixel);
        L_HUD.translate(-Pixel * 4, Pixel * 3.3);
        L_HUD.rotate(-50);
        L_HUD.image(img_valtikka, 0, 0, Pixel * 9, Pixel * 9);
        L_HUD.pop();
      }
      if (this.aliveRoyalty) {
        L_HUD.image(img_aliveRoyalty, this.pos.x - Pixel * 4, this.pos.y - Pixel * 4, Pixel * 10, Pixel * 10);
      }
      if (this.ghostRoyalty) {
        L_HUD.image(img_ghostRoyalty, this.pos.x - Pixel * 4, this.pos.y - Pixel * 4, Pixel * 10, Pixel * 10);
      }


      //FACE

      if (!this.underground) {
        L_HUD.push();
        L_HUD.translate(this.pos.x + Pixel, this.pos.y + Pixel);
        L_HUD.rotate(this.rotation);
        if (!this.ghostMode) {
          L_HUD.image(img_matoFace, -Pixel * 5, -Pixel * 5, Pixel * 10, Pixel * 10);
        } else {
          L_HUD.image(img_ghostFace, -Pixel * 5, -Pixel * 5, Pixel * 10, Pixel * 10);
        }
        L_HUD.pop();
      } else if (this.uGTimer.getRemainingTime() < this.alertTime * 0.5) {
        L_HUD.push();
        L_HUD.translate(this.pos.x + Pixel, this.pos.y + Pixel);
        L_HUD.rotate(this.rotation);
        L_HUD.image(img_matoFace, -Pixel * 5, -Pixel * 5, Pixel * 10, Pixel * 10);
        L_HUD.pop();

      } else if (this.uGTimer.getRemainingTime() < this.diveTime - this.alertTime * 0.5) {

      } else if (this.uGTimer.getRemainingTime() < this.diveTime) {
        L_HUD.push();
        L_HUD.translate(this.pos.x + Pixel, this.pos.y + Pixel);
        L_HUD.rotate(this.rotation);
        L_HUD.image(img_matoFace, -Pixel * 5, -Pixel * 5, Pixel * 10, Pixel * 10);
        L_HUD.pop();
      }

      if (this.takeOutsRoyalty) {
        //L_HUD.image(img_takeOutsRoyalty, this.pos.x - Pixel * 4, this.pos.y - Pixel * 4, Pixel * 10, Pixel * 10);
        L_HUD.push();
        L_HUD.translate(this.pos.x + Pixel, this.pos.y + Pixel);
        L_HUD.rotate(this.rotation - 180);
        L_HUD.image(img_takeOutsRoyalty, -Pixel * 5, -Pixel * 5, Pixel * 10, Pixel * 10);
        L_HUD.pop();
      }

      //DEBUG
      //L_HUD.image(img_align, round(this.pos.x / GD) * GD - Pixel * 4, round(this.pos.y / GD) * GD - Pixel * 4, Pixel * 10, Pixel * 10);

    }
  }

  showName() {
    if (this.showHudInfo) {
      if (!this.ghostMode) {
        L_HUD.fill(White);
        L_HUD.stroke(Black);
      } else {
        L_HUD.fill(DeepGrey);
        L_HUD.stroke(White);
      }
      L_HUD.strokeWeight(txtPixel * 0.3);
      L_HUD.textAlign(CENTER, CENTER);
      // HUD INDEX
      let gamepadInd = this.index + 1 - onScreenCount;
      if (gamepadInd >= 1) {
        L_HUD.textSize(TextSize * 0.9);
        L_HUD.text('P' + (gamepadInd), this.pos.x + Pixel, this.pos.y - TextSize * 1.9 - txtPixel);
      }
      // HUD NAME
      if (!this.ghostMode) {
        L_HUD.fill(White);
        L_HUD.stroke(Black);
      } else {
        L_HUD.fill(DeepGrey);
        L_HUD.stroke(White);
      }
      L_HUD.textSize(TextSize * 1.2);
      L_HUD.text(this.name, this.pos.x + Pixel, this.pos.y - TextSize - txtPixel);
      L_HUD.textAlign(LEFT, CENTER);
      // let MiniTextS = TextSize * 0.65;
      // L_HUD.textSize(MiniTextS);
      // L_HUD.fill(Black);
      // L_HUD.noStroke();
    }
  }

  show() {
    this.royaltiesText();

    if (this.ghostMode) {
      this.showGhost();

    } else {
      if (!this.stop) { // IF DIDNT HIT STONE... (in array2d -> false)



        if (!this.underground) {
          this.color.setAlpha(255);
          L_mato.fill(this.color);
          L_mato.noStroke();
          L_mato.rect(round(this.pos.x / GD) * GD, round(this.pos.y / GD) * GD, this.size * GD);
          if (this.invulnerable) {
            L_HUD.strokeWeight(Pixel * 0.8);
            L_HUD.stroke(120, 120, 255, 100);
            L_HUD.fill(120, 120, 255, 30);
            L_HUD.circle(this.pos.x + Pixel, this.pos.y + Pixel, Pixel * 4);
          }

          // ALIGN AND ROTATE EXAMPLE!

          // L_HUD.push();
          // L_HUD.translate(round(this.pos.x / GD) * GD + Pixel, round(this.pos.y / GD) * GD + Pixel);
          // L_HUD.stroke(10);
          // L_HUD.strokeWeight(5);
          // L_HUD.point(0, 0);
          // L_HUD.rotate(millis()/100);
          // L_HUD.image(img_align, -Pixel * 3, -Pixel * 3, Pixel * 6, Pixel * 6);
          // L_HUD.pop();


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
              this.uGSize = random(0.5, 1.2);
            } else {
              this.uGSize = random(0.7, 1.5);
              this.uGR = 0.36;
            }
            L_ground.noStroke();
            L_ground.rect(round(this.pos.x / GD) * GD + random(-this.r, this.r) + Pixel, round(this.pos.y / GD) * GD + random(-this.r, this.r) + Pixel, this.size / 4 + this.uGSize * GD * 0.8);
          }
        }




      } else { // DID HIT STONE (or otherwise) -> kill worm
        if (this.deathToggler) {

          this.SX = txtPixel * 2;
          this.SY = txtPixel * 3;

          // // SCORE TABLE 

          // L_top.strokeWeight(txtPixel * 0.15);
          // L_top.fill(this.color);
          // L_top.stroke(Black);
          // L_top.rectMode(CENTER);
          // L_top.rect(width - this.SX, this.SY * wormsCounter, this.SX + txtPixel * 0.5);

          // //NUMBER TEXT IN SCORE TABLE

          // L_top.textAlign(CENTER, CENTER);
          // L_top.textSize(txtPixel * 1.5);
          // L_top.fill(White);
          // L_top.stroke(Black);
          // L_top.strokeWeight(txtPixel * 0.3);
          // L_top.text(wormsCounter, width - this.SX, this.SY * wormsCounter);

          // //NAME IN SCORE TABLE

          // L_top.textAlign(RIGHT, CENTER);
          // L_top.textSize(txtPixel * 1.5);
          // L_top.fill(White);
          // L_top.text(this.name, width - this.SX * 1.9, this.SY * wormsCounter);

          //wormsCounter--;
          this.deathToggler = false;

        }
      }
    }
  }
}

class flameParticle {
  constructor(_x, _y, _rotation, _matoIND, matoVel) {
    this.pos = createVector(_x + Pixel, _y + Pixel);
    this.vel = createVector(0, -0.5 * speedMod / 8 * GD * 3.2 * random(1, 1.2));
    this.vel.rotate(_rotation);
    //this.vel.add(matoVel);
    this.vel.rotate(random(-33, 33));
    this.matoIND = _matoIND;
    this.color_ = color(random(200, 255), random(0, 170), 10);
    this.duration = random(34, 38);
    this.durationINIT = this.duration;
    this.activateTimer = 10;
    this.activate = true;
    this.hitStone = false;
  }

  update() {
    this.pos.add(this.vel);
    this.duration--;
    let x = round(this.pos.x / GD);
    let y = round(this.pos.y / GD);
    if (x > 0 && x < width / GD && y > 0 && y < height / GD) {
      if (!array2d[x][y][0]) {
        removeStone(x, y, false, undefined);
        this.hitStone = true;
      }
    }
    //OLD
    // if (this.duration < this.durationINIT - this.activateTimer && !this.activate) {
    //   this.activate = true;
    // }
  }

  updateFinal() {
    this.pos.add(this.vel);
    this.duration--;

    let x = round(this.pos.x / GD);
    let y = round(this.pos.y / GD);

    //WITHIN BOUNDS
    if (x > 0 && x < width / GD && y > 0 && y < height / GD) {

      if (!array2d[x][y][0]) {
        removeStone(x, y, false, undefined);
        this.hitStone = true;
      }

      if (this.activate) {
        //set board to onFire
        array2d[x][y][2] = true;
        setTimeout(extinguish, deltaTime, x, y);
        array2d[x][y][3] = this.matoIND;

        // //DEBUG
        // L_top.noStroke();
        // L_top.fill(Black);
        // L_top.rect(x * GD, y * GD, Pixel);
      }
    }
  }

  show() {
    L_action.noStroke();
    L_action.fill(this.color_);
    L_action.rect(round(this.pos.x / GD) * GD, round(this.pos.y / GD) * GD, Pixel);
  }

  border() {

    if (this.pos.x < Pixel * 0.3) {
      this.pos.x = width - (Pixel * 1);
    } else if (this.pos.x >= width - 1 * Pixel) {
      this.pos.x = Pixel * 0.3;
    }

    if (this.pos.y < Pixel * 0.2) {
      this.pos.y = height - (Pixel * 1);
    } else if (this.pos.y >= height - 1 * Pixel) {
      this.pos.y = Pixel * 0.2;
    }
  }

}