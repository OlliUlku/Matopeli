class pickup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = 2;
        this.timerPickupSpawn = new Timer(4000, true);
        this.Red = color(Red);
        this.RedA = color(Red);
        this.RedA.setAlpha(120);

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
            }
        }
    }

    grab(matoIND) {
        if (this.type === 0) {
            madot[matoIND].appleEaten();
        }
    }
}