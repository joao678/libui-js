import { area, areaPath, brush, libui, vbox, window } from './libui/index.js';

libui.init();

const win = new window("Teste 123", 640, 480, 0);
win.onClosing(function () {
    libui.quit();
    return 1
});

const vbox1 = new vbox();

const a = new area(function (params) {
    let p = new areaPath(0);
    p.addRectangle(0, 0, 15, 15);
    p.end();
    let red = new brush(0, 1, 0, 0, 1);
    p.fill(params, red);
    p.free();
}, function () { }, function () { }, function () { }, function () {
    return 1
});

vbox1.append(a, true);

win.child = vbox1;
win.margined = 5;

win.show();

libui.main();
libui.uninit();