function addConnection() {
    window.addEventListener("gamepadconnected", function (e) {
        gamepadHandler(e, true);
        console.log(
            "Gamepad connected at index %d: %s. %d buttons, %d axes.",
            e.gamepad.index,
            e.gamepad.id,
            e.gamepad.buttons.length,
            e.gamepad.axes.length
        );
    });
    window.addEventListener("gamepaddisconnected", function (e) {
        console.log(
            "Gamepad disconnected from index %d: %s",
            e.gamepad.index,
            e.gamepad.id
        );
        colour = color(120, 0, 0);
        gamepadHandler(e, false);
    });
}

function gamepadHandler(event, connecting) {
    let gamepad = event.gamepad;
    if (connecting) {
        print("Connecting to controller " + gamepad.index);
        controllers[gamepad.index] = gamepad;
    } else {
        delete controllers[gamepad.index];
    }
}

function controllerUsed() {
    var gamepads = navigator.getGamepads();

    for (let i in controllers) {
        let controller = gamepads[i]; //controllers[i]
        if (controller.buttons) {
            for (
                let btn = 0;
                btn < controller.buttons.length;
                btn++ //controller.buttons.length
            ) {
                let val = controller.buttons[btn];
                if (controller.buttons[btn])
                    if (buttonPressed(controller.buttons[btn])) {
                        //print(controller, "button pressed =", btn);
                        if (btn === 0) {
                            ohjaimet[controller.index].B = true;
                        }
                        if (btn === 1) {
                            ohjaimet[controller.index].A = true;
                        }
                        if (btn === 14) { // NOT ON ZERO 2
                            ohjaimet[controller.index].LEFT2 = true;
                        }
                        if (btn === 15) { // NOT ON ZERO 2
                            ohjaimet[controller.index].RIGHT2 = true;
                        }

                        if (btn === 4) {
                            ohjaimet[controller.index].L = true;
                        }

                        if (btn === 5) {
                            ohjaimet[controller.index].R = true;
                        }

                        //OLDIE
                        //players[controller.index].buttonPainettu(btn);
                    }
                if (buttonPressed(val)) {
                } else {
                }

            }
        }
        if (controller.axes) {
            let axes = controller.axes;
            for (let axis = 0; axis < axes.length; axis++) {
                let val = controller.axes[axis];
                if (axis === 0) {
                    if (val < -0.5) { // <- HOX
                        ohjaimet[controller.index].LEFT = true;

                    } else {
                        ohjaimet[controller.index].LEFT = false;

                    }
                    if (val > 0.5) { // <- HOX
                        ohjaimet[controller.index].RIGHT = true;

                        //print(controller, 'Right pressed');
                    } else {
                        ohjaimet[controller.index].RIGHT = false;
                    }
                }
                //OLDIE
                //players[controller.index].setVasenOikea(val);
                if (axis === 1) {
                    if (val < -0.5) { // <- HOX
                        //print(controller, 'Up pressed');
                    }
                    if (val > 0.5) { // <- HOX
                        //print(controller, 'Down pressed');
                    }
                }
            }

        }
    }
}

function buttonPressed(b) {
    if (typeof b == "object") {
        return b.pressed; // binary
    }
    return b > 0.9; // analog value
}

// Controlled by ohjaimet[] array in sketch.js
class Controller_8BitDoZero2 {
    constructor() {
        this.A = false;
        this.B = false;
        this.Bonce = true;
        this.Y = false;
        this.X = false;
        this.L = false;
        this.Lonce = true;
        this.R = false;
        this.Ronce = true;
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SELECT = false;
        this.START = false;

        // NON ZERO 2 === COMPABILITY /W OTHER GAMEPADS
        this.LEFT2 = false;
        this.RIGHT2 = false;
    }
}