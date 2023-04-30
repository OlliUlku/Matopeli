class popUpText {
    constructor(x, y, textInput) {
        this.pos = createVector(x + Pixel + random(-30, 30), y + Pixel + random(-30, 30));
        this.vel = createVector(0, -0.5 * speedMod / 8 * GD * 1);
        this.color = color(Black);
        this.duration = 50;
        this.durationINIT = this.duration;
        this.text = textInput;

        //this.vel.rotate();
        //this.matoIND = _matoIND;
        print('popupt spawned');
    }

    show() {
        L_HUD.textSize(TextSize * 0.8);
        L_HUD.noStroke();
        L_HUD.fill(this.color);
        let alpha = map(this.duration, 0, this.durationINIT, 0, 400);
        this.color.setAlpha(alpha);
        L_HUD.textAlign(CENTER, CENTER);
        L_HUD.text(this.text, this.pos.x, this.pos.y);
    }

    update() {
        this.pos.add(this.vel);
        this.duration--;
    }
}