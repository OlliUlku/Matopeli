class pickup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = 2;
        this.timerPickupSpawn = new Timer(3000, true);
        this.Red = color(Red);
        this.RedA = color(SlateGrey);
        this.RedA.setAlpha(90);

    }

    show() {
        if (!this.timerPickupSpawn.expired()) {
            L_pickup.noStroke();
            L_pickup.fill(this.RedA);
            L_pickup.rect(round(this.x / GD) * GD, round(this.y / GD) * GD, this.size * GD);

            L_pickup.noFill();
            L_pickup.stroke(this.RedA);
            L_pickup.strokeWeight(Pixel * .2);
            L_pickup.circle(round(this.x / GD) * GD + Pixel, round(this.y / GD) * GD + Pixel, map(this.timerPickupSpawn.getPercentageRemaining(), 0, 1, 0, Pixel * 8));
        }
        if (this.type === 0) {
            if (this.timerPickupSpawn.expired()) {
                L_pickup.noStroke();
                L_pickup.fill(Green);
                L_pickup.rect(round(this.x / GD) * GD, round(this.y / GD) * GD, this.size * GD);
            }
        }
        if (this.type === 1) {
            if (this.timerPickupSpawn.expired()) {
                L_pickup.noStroke();
                L_pickup.fill(this.Red);
                L_pickup.rect(round(this.x / GD) * GD, round(this.y / GD) * GD, this.size * GD);
            }
        }
        if (this.type === 2) {
            if (this.timerPickupSpawn.expired()) {
                L_pickup.noStroke();
                L_pickup.fill(CacaoBrown);
                L_pickup.rect(round(this.x / GD) * GD, round(this.y / GD) * GD, this.size * GD);
            }
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
    }
}