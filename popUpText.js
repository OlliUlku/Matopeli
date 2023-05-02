class popUpText {
    constructor(x, y, textInput, color__ = Black, duration_ = 50, strokeToggle = false) {
        this.pos = createVector(x + Pixel + random(-Pixel * 2, Pixel * 2), y + Pixel + random(-Pixel * 2, Pixel * 2));
        this.vel = createVector(0, -0.5 * speedMod / 8 * GD * 1);
        this.color = color(color__);
        this.colorStroke = color(Black);
        this.duration = duration_;
        this.durationINIT = this.duration;
        this.text = textInput;
        this.strokeToggle = strokeToggle;
    }

    show() {
        L_HUD.textSize(TextSize * 1.2);
        let alpha = map(this.duration, 0, this.durationINIT, 0, 400);
        this.color.setAlpha(alpha);
        if (!this.strokeToggle) {
            L_HUD.noStroke();
        } else {
            this.colorStroke.setAlpha(alpha);
            L_HUD.stroke(this.colorStroke);
            L_HUD.strokeWeight(txtPixel * 0.4);

        }
        L_HUD.fill(this.color);
        L_HUD.textAlign(CENTER, CENTER);
        L_HUD.text(this.text, this.pos.x, this.pos.y);
    }

    update() {
        this.pos.add(this.vel);
        this.duration--;
    }
}