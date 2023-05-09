class pickup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.div = 2;
        this.rx = round(this.x / GD / this.div); //divided because of this.size!
        this.ry = round(this.y / GD / this.div); //divided because of this.size!
        this.type = type;
        this.size = 2;

        this.rotDir = round(random());
        if (this.rotDir === 0) {
            this.rotDir = 1;
        } else {
            this.rotDir = -1;
        }


        if (type === 0) {
            this.spawningColor = color(Green);
            this.timerPickupSpawn = new Timer(PickupSpawnTime, true);

        } else if (type === 1) {
            this.spawningColor = color(Red);
            this.timerPickupSpawn = new Timer(PickupSpawnTime, true);

        } else if (type === 2) {
            this.spawningColor = color(Brown);
            this.timerPickupSpawn = new Timer(PickupSpawnTime, true);

        } else if (type === 3) {
            this.spawningColor = color(Black);
            this.timerPickupSpawn = new Timer(PickupSpawnTimeBlack, true);
        }



        this.spawningColor.setAlpha(120);
        this.bgCol = color(White);
        this.bgCol.setAlpha(85);
        this.rotation = random(360);
        this.movement = true;
        this.dir = floor(random(4));
        this.debugColor = [random(255), random(255), random(255)];
    }

    show() {
        this.rotation += this.rotDir;

        // this.x = round(this.x / GD) * GD;
        // this.y = round(this.y / GD) * GD;

        let x = round(this.x / GD);
        let y = round(this.y / GD);

        this.rx = round(this.x / GD / 4);
        this.ry = round(this.y / GD / 4);

        this.border();

        // testaa ettei 4x4 alueella ole 2x2 ruudulle tilaa
        if (this.x < width - Pixel * 3 && this.y < height - Pixel * 3 && this.x > Pixel && this.y > Pixel) {
            if (this.movement) {
                try {
                    if (!array2d[x - 1][y - 1][0]
                        || !array2d[x + 1][y - 1][0]
                        || !array2d[x + 2][y - 1][0]
                        || !array2d[x][y][0]
                        || !array2d[x][y + 1][0]
                        || !array2d[x][y - 1][0]
                        || !array2d[x + 1][y][0]
                        || !array2d[x - 1][y][0]
                        || !array2d[x - 1][y + 1][0]
                        || !array2d[x + 2][y + 1][0]
                        || !array2d[x - 1][y + 2][0]
                        || !array2d[x + 1][y + 2][0]
                        || !array2d[x + 2][y + 2][0]) {
                        this.move();
                    } else {
                        this.movement = false;
                    }
                } catch (err) {
                    print('error caught');
                    this.move;
                }

                //checks if something is directly on top
            } else if (!array2d[x][y][0]
                || !array2d[x + 1][y][0]
                || !array2d[x][y + 1][0]
                || !array2d[x + 1][y + 1][0]) {
                this.movement = true;
            }
        }


        if (!this.timerPickupSpawn.expired()) {
            L_pickup.noStroke();
            L_pickup.fill(this.spawningColor);
            L_pickup.rect(round(this.x / GD) * GD, round(this.y / GD) * GD, this.size * GD);

            L_pickup.noFill();
            L_pickup.stroke(this.spawningColor);
            L_pickup.strokeWeight(Pixel * .2);
            L_pickup.circle(round(this.x / GD) * GD + Pixel, round(this.y / GD) * GD + Pixel, map(this.timerPickupSpawn.getPercentageRemaining(), 0, 1, 0, Pixel * 8));
        }
        if (this.type === 0) {
            if (this.timerPickupSpawn.expired()) {
                L_pickup.noStroke();
                L_pickup.fill(this.bgCol);
                L_pickup.rect(round(this.x / GD) * GD, round(this.y / GD) * GD, this.size * GD);

                L_fruits.push();
                L_fruits.translate(x * GD + Pixel, y * GD + Pixel);
                L_fruits.rotate(this.rotation);
                L_fruits.image(img_applePickup, -Pixel * 5, -Pixel * 5, Pixel * 10, Pixel * 10);
                L_fruits.pop();
            }
        }
        if (this.type === 1) {
            if (this.timerPickupSpawn.expired()) {
                L_pickup.noStroke();
                L_pickup.fill(this.bgCol);
                L_pickup.rect(round(this.x / GD) * GD, round(this.y / GD) * GD, this.size * GD);

                L_fruits.push();
                L_fruits.translate(x * GD + Pixel, y * GD + Pixel);
                L_fruits.rotate(this.rotation);
                L_fruits.image(img_chiliPickup, -Pixel * 5, -Pixel * 5, Pixel * 10, Pixel * 10);
                L_fruits.pop();


                //L_pickup.image(img_chiliPickup, round(this.x / GD) * GD + Pixel - Pixel * 5, round(this.y / GD) * GD + Pixel - Pixel * 5, Pixel * 10, Pixel * 10);
            }
        }
        if (this.type === 2) {
            if (this.timerPickupSpawn.expired()) {
                L_pickup.noStroke();
                L_pickup.fill(this.bgCol);
                L_pickup.rect(round(this.x / GD) * GD, round(this.y / GD) * GD, this.size * GD);

                L_fruits.push();
                L_fruits.translate(x * GD + Pixel, y * GD + Pixel);
                L_fruits.rotate(this.rotation);
                L_fruits.image(img_spadePickup, -Pixel * 5, -Pixel * 5, Pixel * 10, Pixel * 10);
                L_fruits.pop();
            }
        }
        if (this.type === 3) {
            if (this.timerPickupSpawn.expired()) {
                L_pickup.noStroke();
                L_pickup.fill(this.bgCol);
                L_pickup.rect(round(this.x / GD) * GD, round(this.y / GD) * GD, this.size * GD);

                L_fruits.push();
                L_fruits.translate(x * GD + Pixel, y * GD + Pixel);
                L_fruits.rotate(this.rotation);
                L_fruits.image(img_pointPickup, -Pixel * 5, -Pixel * 5, Pixel * 10, Pixel * 10);
                L_fruits.pop();
            }
        }

        // DEBUG
        //         L_HUD.fill(this.debugColor);
        //         L_HUD.noStroke();
        //         L_HUD.rect(this.rx * GD, this.ry * GD, this.size * Pixel / this.div);
    }

    move() {
        if (frameCount % FRAMERATE === 0) {
            this.dir = floor(random(4));
        }

        if (this.dir === 0) {
            this.x += Pixel;
        }
        if (this.dir === 1) {
            this.x -= Pixel;
        }
        if (this.dir === 2) {
            this.y += Pixel;
        }
        if (this.dir === 3) {
            this.y -= Pixel;
        }
        this.border();
    }

    border() {

        if (this.x < Pixel * 4) {
            this.x = width - (Pixel * 8);
        } else if (this.x > width - 4 * Pixel) {
            this.x = Pixel * 8;
        }

        if (this.y < Pixel * 4) {
            this.y = height - (Pixel * 8);
        } else if (this.y > height - 4 * Pixel) {
            this.y = Pixel * 8;
        }

    }

    grab(matoIND) {
        if (this.type === 0) {
            madot[matoIND].appleEaten();
        }
        if (this.type === 1) {
            madot[matoIND].chiliEaten();
        }
        if (this.type === 2) {
            madot[matoIND].spadeFruitEaten();
        }
        if (this.type === 3) {
            madot[matoIND].pointFruitEaten();
        }
    }
}