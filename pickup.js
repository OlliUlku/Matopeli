class pickup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = 2;
    }
    show() {
        L_pickup.noStroke();
        L_pickup.fill(Red);
        // huom nelinkertominen
        L_pickup.rect(round(this.x / GD / 4) * GD * 4, round(this.y / GD / 4) * GD * 4, this.size * GD);
    }
    grab(matoIND) {
        if (this.type === 0) {
            madot[matoIND].dollars += omenaVal;
            madot[matoIND].tail += 10000;
            print(madot[matoIND].name + ' ate a fruit! New tail size: ' + madot[matoIND].tail)
        }
    }
}