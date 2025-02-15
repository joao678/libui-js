import { area, areaPath, attributedString, brush, libui, matrix, strokeParams, textlayout, window } from './libui/index.js';

libui.init();

const win = new window("Area", 640, 480, 0);
win.onClosing(function () {
    libui.quit();
    return 1
});

const m = new matrix({
    M11: 0,
    M12: 0,
    M21: 0,
    M22: 0,
    M31: 0,
    M32: 0
});

const a = new area(function (params) {
    // Matrix transformations
    /* m.setIdentity();
    m.translate(10, 10);
    m.scale(0, 0, 1, 1);
    m.rotate(0, 0, 0.3);
    m.skew(0, 0, 0.2, 0.2);
    a.transform(params.context, m); */

    let p = new areaPath(0);
    let red = new brush({
        type: 2,
        r: 1.0, g: 0.4, b: 0.2, a: 1.0,
        x0: 100, y0: 100,
        x1: 100, y1: 100,
        outerRadius: 100.0,
        stops: [
            { pos: 0.0, r: 1.0, g: 0.0, b: 0.0, a: 1.0 },
            { pos: 0.5, r: 0.0, g: 1.0, b: 0.0, a: 1.0 },
            { pos: 1.0, r: 0.0, g: 0.0, b: 1.0, a: 1.0 }
        ]
    });

    p.addRectangle(0, 0, 200, 200);
    p.fill(params.context, red);

    let sp = new strokeParams({
        cap: 1,
        join: 1,
        thickness: 5,
        miterLimit: 10.0,
        dashes: [10.0, 10.0, 10.0],
        dashPhase: 1.0
    });

    red = new brush({
        type: 0,
        r: 1.0, g: 0.4, b: 0.2, a: 1.0,
        x0: 100, y0: 100,
        x1: 100, y1: 100,
        outerRadius: 100.0,
        stops: [
            { pos: 0.0, r: 1.0, g: 0.0, b: 0.0, a: 1.0 },
            { pos: 0.5, r: 0.0, g: 1.0, b: 0.0, a: 1.0 },
            { pos: 1.0, r: 0.0, g: 0.0, b: 1.0, a: 1.0 }
        ]
    });

    p = new areaPath(0);
    p.newFigure(0, 300);
    p.lineTo(200, 300);
    p.newFigure(0, 200);
    p.bezierTo(50, 300, 50, 280, 200, 250);
    p.newFigure(0, 0);
    p.closeFigure();
    p.stroke(params.context, red, sp);

    const aString = new attributedString("Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur esse quos recusandae asperiores officiis eum modi aliquid veritatis delectus soluta at nulla vitae illo, quasi dolor libero alias animi quia.");
    aString.setAttribute(aString.colorAttribute(1,0,0,1), 0, 5);
    aString.setAttribute(aString.backgroundAttribute(1, 0, 0, 1), 0, 5);
    aString.setAttribute(aString.weightAttribute(700), 0, 5);
    aString.setAttribute(aString.italicAttribute(1), 0, 5);
    aString.setAttribute(aString.stretchAttribute(2), 0, 5);
    aString.setAttribute(aString.underlineAttribute(3), 0, 5);
    aString.setAttribute(aString.underlineColorAttribute(0, 0, 1, 0, 1), 0, 5);
    aString.setAttribute(aString.familyAttribute("Arial"), 0, 5);
    aString.setAttribute(aString.sizeAttribute(36.0), 0, 5);

    aString.appendUnattributed("\nappended");
    aString.insertAtUnattributed("\nappended again");

    //aString.delete(0, 5);

    a.drawText(params.context, new textlayout({
        string: aString,
        width: params.areaWidth,
        /* defaultFont: new fontDescriptor({
            family: "Arial",
            weight: 900
        }) */
    }), 0, 315);
}, function (params) {
    console.log(params);
}, function (params) {
    //console.log(params);
}, function () { },
function (params) {
    console.log(params);
    return 1
});

win.child = a;

win.show();

libui.main();
libui.uninit();