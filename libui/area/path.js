const control = require("../control");
const { lib, koffi } = require("../lib");

koffi.struct('uiDrawBrushGradientStop', {
	Pos: 'double',
	R: 'double',
	G: 'double',
	B: 'double',
	A: 'double',
})

koffi.struct('uiDrawBrush', {
	Type: 'int',

	R: 'double',
	G: 'double',
	B: 'double',
	A: 'double',

	X0: 'double',
	Y0: 'double',
	X1: 'double',
	Y1: 'double',
	OuterRadius: 'double',
	// Stops: koffi.struct({
    //     Pos: 'double',
    //     R: 'double',
    //     G: 'double',
    //     B: 'double',
    //     A: 'double',
    // }),
    Stops: 'uiDrawBrushGradientStop*',
    //Stops: 'void*',
	NumStops: 'size_t'
})

const uiDrawPath = koffi.pointer('uiDrawPath', koffi.opaque());
//const uiDrawContext = koffi.pointer('uiDrawContext', koffi.opaque());

const uiDrawNewPath = lib.func('uiDrawPath* uiDrawNewPath(int mode)');
const uiDrawPathEnd = lib.func('void uiDrawPathEnd(uiDrawPath *p)');
const uiDrawPathAddRectangle = lib.func('void uiDrawPathAddRectangle(uiDrawPath *p, double x, double y, double width, double height)');
const uiDrawFill = lib.func('void uiDrawFill(void *c, uiDrawPath *path, uiDrawBrush *b)');
const uiDrawFreePath = lib.func('void uiDrawFreePath(uiDrawPath *p)');

/* const buttonClickedCb = koffi.proto('buttonClickedCb', 'int', ['uiButton*', 'void *']);
const uiButtonOnClicked = lib.func('void uiButtonOnClicked (uiButton *w, buttonClickedCb *cb, void *data)'); */

class path extends control {
    constructor(mode) {
        super();
        this._handle = uiDrawNewPath(mode);
    }

    pathEnd() {
        uiDrawPathEnd(this._handle);
    }

    pathAddRectangle(x, y, width, height) {
        uiDrawPathAddRectangle(this._handle, x, y, width, height);
    }

    fill(context, brush) {
        uiDrawFill(context, this._handle, brush);
    }

    freePath() {
        uiDrawFreePath(this._handle);
    }
}

module.exports = path;