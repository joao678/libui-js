const {
    libui,
    window,
    vbox,
    area,
    path
} = require('./libui/index.js');

libui.init();

const win = new window("Teste 123", 640, 480, 0);

libui.timer(16, function () {
    //a.redrawAll();
});

win.onClosing(function () {
    libui.quit();
    return 1
});

const vbox1 = new vbox();

const a = new area({
    Draw: function () {
        let p = new path(0);
        p.pathAddRectangle(0, 0, 30, 30);
        p.pathEnd();
        let brush = {
            Type: 0,
            R: 1.0,
            G: 0.0,
            B: 0.0,
            A: 1.0,
            /* X0: 0.0,
            Y0: 0.0,
            X1: 0.0,
            Y1: 0.0,
            OuterRadius: 0.0,
            Stops: [{
                Pos: 0.0,
                R: 0.0,
                G: 0.0,
                B: 0.0,
                A: 0.0,
            }],
            NumStops: 1 */
        }
        p.fill(arguments[1].Context, brush);
        p.freePath();
        libui.mainStep(1);
    },
    MouseEvent: function () {
        //console.log(...arguments);
    },
    MouseCrossed: function () { },
    DragBroken: function () { },
    KeyEvent: function () {
        //console.log(...arguments);
        return 0
    },
});
//a.setSize(300, 300);

vbox1.append(a, 1);

win.child = vbox1;
win.margined = 5;

win.show();

libui.main();
libui.uninit();