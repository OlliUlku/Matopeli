class pickup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = 2;
        this.timerPickupSpawn = new Timer(30000, true);
        this.Red = color(Red);
        this.RedA = color(Red);
        this.RedA.setAlpha(90);

    }

    show() {
        if (this.type === 0) {
            if (this.timerPickupSpawn.expired()) {
                L_pickup.noStroke();
                L_pickup.fill(this.Red);
                L_pickup.rect(round(this.x / GD / 4) * GD * 4, round(this.y / GD / 4) * GD * 4, this.size * GD);
            } else {
                L_pickup.noStroke();
                L_pickup.fill(this.RedA);
                L_pickup.rect(round(this.x / GD / 4) * GD * 4, round(this.y / GD / 4) * GD * 4, this.size * GD);
                L_pickup.noFill();
                L_pickup.stroke(this.RedA);
                L_pickup.strokeWeight(Pixel * .2);
                L_pickup.circle(round(this.x / GD / 4) * GD * 4 + Pixel, round(this.y / GD / 4) * GD * 4 + Pixel, map(this.timerPickupSpawn.getPercentageRemaining(), 0, 1, 0, Pixel * 8));
            }
        }
    }

    grab(matoIND) {
        if (this.type === 0) {
            madot[matoIND].appleEaten();
        }
    }
}