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
                        print(controller, "button pressed =", btn);

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
                        //print(controller, 'Left pressed');
                        leftPressed = true;
                    } else {
                        leftPressed = false;
                    }
                    if (val > 0.5) { // <- HOX
                        //print(controller, 'Right pressed');
                        rightPressed = true;
                    } else {
                        rightPressed = false;
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
                    //OLDIE
                    //players[controller.index].setYlosAlas(val);
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
