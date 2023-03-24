class onScreenKeys {
  constructor(_x, _y, ind, _color, _rot) {
    this.index = ind;
    this.x = _x;
    this.y = _y;
    this.LEFT = false;
    this.RIGHT = false;
    this.size = 10;
    this.gap = 3;
    this.color = _color;
    this.rot = _rot;
  }

  show() {
    //LEFT BUTTON
    rect(this.x - this.size - this.gap * 0.5, this.y, this.size);
    //R
    rect(this.x + this.size + this.gap * 0.5, this.y, this.size);
  }
}