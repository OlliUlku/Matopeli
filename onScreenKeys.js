class onScreenKeys {
  constructor(_x, _y, ind, _color, _rot) {
    this.index = ind;
    this.x = _x;
    this.y = _y;
    this.LEFT = false;
    this.RIGHT = false;
    this.size = width / 8;
    this.gap = width / 20;
    this.color = _color;
    this.rot = _rot;
    this.leftBtnx = this.x - this.size * 0.5 - this.gap * 0.5;
    this.rightBtnx = this.x +this.size * 0.5 + this.gap * 0.5;
  }

  show() {

    L_HUD.push();
    L_HUD.translate(this.x, this.y);
    L_HUD.rotate(this.rot);
    L_HUD.text('text', 0, 0);
    L_HUD.stroke(Grey);
    L_HUD.fill(this.color);
    L_HUD.circle(-this.size * 0.5 - this.gap * 0.5, 0, this.size);
    //R
    L_HUD.circle(this.size * 0.5 + this.gap * 0.5, 0, this.size);
    L_HUD.pop();
  }
}