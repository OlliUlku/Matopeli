class top_generic_score {
    constructor(_itemToTrack, _color, _gap) {
        this.sizeX = txtPixel * 18;
        this.sizeY = txtPixel * 20;
        this.gapX = _gap;
        this.scoreGap = this.sizeX + Pixel;
        this.x = width - this.sizeX - this.gapX - this.scoreGap;
        this.y = height - this.sizeY;
        this.textSize = txtPixel * 1.4;
        this.arr = [];
        this.color = color(_color);
        this.color.setAlpha(110);
        this.itemToTrack = _itemToTrack;
    }
    update() {
        for (let i = 0; i < madot.length; i++) {
            this.arr[i] = { name: madot[i].name, scoreItem: madot[i].aliveDuration, color: madot[i].colorINIT, Index: i };
        }
        this.arr.sort((firstItem, secondItem) => firstItem.scoreItem - secondItem.scoreItem);
        reverse(this.arr);
        this.sizeY = txtPixel * this.arr.length * 1.5 + 1.6 * txtPixel;
        this.y = height - this.sizeY;

        for (let i = 0; i < madot.length; i++) {
            madot[i].aliveRoyalty = false;
        }
        if (MATOJA > 1) {
            if (this.arr[0].scoreItem != this.arr[1].scoreItem) {
                madot[this.arr[0].Index].aliveRoyalty = true;
            }
        } else {
            madot[this.arr[0].Index].aliveRoyalty = true;
        }
    }

    show() {
        L_HUD.rectMode(CORNER);

        L_HUD.noStroke();
        L_HUD.fill(this.color);
        L_HUD.rect(this.x, this.y - txtPixel * 3, this.sizeX, this.sizeY + txtPixel * 3);
        L_HUD.textSize(this.textSize * 1.5);
        L_HUD.fill(Black);
        L_HUD.textAlign(LEFT, CENTER);
        L_HUD.text('Time alive:', this.x + txtPixel, this.y - txtPixel);
        L_HUD.push();
        L_HUD.translate(this.x - txtPixel * 20/2 + this.sizeX - txtPixel * 3, this.y - txtPixel * 20/2 - txtPixel * 5.5);
        //L_HUD.rotate(-50);
        L_HUD.image(img_aliveRoyalty, 0, 0, txtPixel * 20, txtPixel * 20);
        L_HUD.pop();
        L_HUD.textSize(this.textSize);
        for (let i = 0; i < this.arr.length; i++) {
            L_HUD.fill(this.arr[i].color);
            L_HUD.textAlign(LEFT, TOP);
            L_HUD.text(this.arr[i].name, this.x + txtPixel, this.y + txtPixel + this.textSize * 1.5 * i);
            L_HUD.textAlign(RIGHT, TOP);
            L_HUD.fill(Black);
            L_HUD.text(floor(this.arr[i].scoreItem), this.x + this.sizeX - 1 * txtPixel, this.y + txtPixel + this.textSize * 1.5 * i);
        }
    }
}

class top_ghost_score {
    constructor(_itemToTrack, _color, _gap) {
        this.sizeX = txtPixel * 18;
        this.sizeY = txtPixel * 20;
        this.gapX = _gap;
        this.scoreGap = this.sizeX + Pixel;
        this.x = width - this.sizeX - this.gapX - this.scoreGap;
        this.y = height - this.sizeY;
        this.textSize = txtPixel * 1.4;
        this.arr = [];
        this.color = color(_color);
        this.color.setAlpha(110);
        this.itemToTrack = _itemToTrack;
    }
    update() {
        for (let i = 0; i < madot.length; i++) {
            this.arr[i] = { name: madot[i].name, scoreItem: madot[i].ghostDurationScore, color: madot[i].colorINIT, Index: i };
        }
        this.arr.sort((firstItem, secondItem) => firstItem.scoreItem - secondItem.scoreItem);
        reverse(this.arr);
        this.sizeY = txtPixel * this.arr.length * 1.5 + 1.6 * txtPixel;
        this.y = height - this.sizeY;

        for (let i = 0; i < madot.length; i++) {
            madot[i].ghostRoyalty = false;
        }
        if (MATOJA > 1) {
            if (this.arr[0].scoreItem != this.arr[1].scoreItem) {
                madot[this.arr[0].Index].ghostRoyalty = true;
            }
        } else {
            madot[this.arr[0].Index].ghostRoyalty = true;
        }
    }

    show() {
        L_HUD.rectMode(CORNER);

        L_HUD.noStroke();
        L_HUD.fill(this.color);
        L_HUD.rect(this.x, this.y - txtPixel * 3, this.sizeX, this.sizeY + txtPixel * 3);
        L_HUD.textSize(this.textSize * 1.5);
        L_HUD.fill(Black);
        L_HUD.textAlign(LEFT, CENTER);
        L_HUD.text('Ghost time:', this.x + txtPixel, this.y - txtPixel);
        L_HUD.push();
        L_HUD.translate(this.x - txtPixel * 20/2 + this.sizeX - txtPixel * 1, this.y - txtPixel * 20/2 - txtPixel * 6.7);
        L_HUD.rotate(8);
        L_HUD.image(img_ghostRoyalty, 0, 0, txtPixel * 20, txtPixel * 20);
        L_HUD.pop();
        L_HUD.textSize(this.textSize);
        for (let i = 0; i < this.arr.length; i++) {
            L_HUD.fill(this.arr[i].color);
            L_HUD.textAlign(LEFT, TOP);
            L_HUD.text(this.arr[i].name, this.x + txtPixel, this.y + txtPixel + this.textSize * 1.5 * i);
            L_HUD.textAlign(RIGHT, TOP);
            L_HUD.fill(Black);
            L_HUD.text(floor(this.arr[i].scoreItem), this.x + this.sizeX - 1 * txtPixel, this.y + txtPixel + this.textSize * 1.5 * i);
        }
    }
}