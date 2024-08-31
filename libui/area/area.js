const control = require("../control");
const { lib, koffi } = require("../lib");

const uiArea = koffi.pointer('uiArea', koffi.opaque());
const uiDrawContext = koffi.pointer('uiDrawContext', koffi.opaque());

koffi.struct('uiAreaDrawParams', {
    /* Context: koffi.struct({
        cr: 'void*',
        style: 'void*',
    }), */
    Context: 'uiDrawContext*',

    AreaWidth: 'double',
    AreaHeight: 'double',
    ClipX: 'double',
    ClipY: 'double',
    ClipWidth: 'double',
    ClipHeight: 'double',
});

koffi.struct('uiAreaMouseEvent', {
    X: 'double',
    Y: 'double',
    AreaWidth: 'double',
    AreaHeight: 'double',
    Down: 'int',
    Up: 'int',
    Count: 'int',
    Modifiers: 'int',
    Held1To64: 'uint64_t'
});

koffi.struct('uiAreaKeyEvent', {
    Key: 'char',
    ExtKey: 'int',
    Modifier: 'int',
    Modifiers: 'int',
    Up: 'int',
});

const Draw = koffi.pointer(koffi.proto('void Draw(void*, uiArea*, uiAreaDrawParams*)'));
const MouseEvent = koffi.pointer(koffi.proto('void MouseEvent(void*, uiArea*, uiAreaMouseEvent*)'));
const MouseCrossed = koffi.pointer(koffi.proto('void MouseCrossed(void*, uiArea*, int left)'));
const DragBroken = koffi.pointer(koffi.proto('void DragBroken(void*, uiArea*)'));
const KeyEvent = koffi.pointer(koffi.proto('int KeyEvent(void*, uiArea*, uiAreaKeyEvent*)'));

const uiAreaHandler = koffi.struct('uiAreaHandler', {
    Draw: Draw,
    MouseEvent: MouseEvent,
    MouseCrossed: MouseCrossed,
    DragBroken: DragBroken,
    KeyEvent: KeyEvent
});

const uiNewArea = lib.func('uiArea *uiNewArea(uiAreaHandler *ah)');
const uiAreaQueueRedrawAll = lib.func('void uiAreaQueueRedrawAll(uiArea *a)');
const uiAreaSetSize = lib.func('void uiAreaSetSize(uiArea *a, int width, int height)');

/* const buttonClickedCb = koffi.proto('buttonClickedCb', 'int', ['uiButton*', 'void *']);
const uiButtonOnClicked = lib.func('void uiButtonOnClicked (uiButton *w, buttonClickedCb *cb, void *data)'); */

class area extends control {
    constructor(areaHandler) {
        super();

        const ah = {
            Draw: koffi.register(function (handler, a, dp) {
                areaHandler.Draw(a, koffi.decode(dp, 'uiAreaDrawParams'));
                return 0
            }, Draw),
            MouseEvent: koffi.register(function () {
                areaHandler.MouseEvent(...arguments);
            }, MouseEvent),
            MouseCrossed: koffi.register(function () {
                areaHandler.MouseCrossed(...arguments);
            }, MouseCrossed),
            DragBroken: koffi.register(function () {
                areaHandler.DragBroken(...arguments);
            }, DragBroken),
            KeyEvent: koffi.register(function () {
                return areaHandler.KeyEvent(...arguments);
            }, KeyEvent),
        };

        this._handle = uiNewArea(ah);
    }

    setSize(width, height) {
        uiAreaSetSize(this._handle, width, height);
    }

    redrawAll() {
        uiAreaQueueRedrawAll(this._handle);
    }

    /* get text() { return uiButtonText(this._handle) }
    set text(value) { uiButtonSetText(this._handle, value) }

    onClicked(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiButtonOnClicked(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(buttonClickedCb));
    } */
}

module.exports = area;