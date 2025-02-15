import { JSCallback, ptr, read } from "bun:ffi";
import control from "../control";
import { _uiAreaQueueRedrawAll, _uiAreaScrollTo, _uiDrawClip, _uiDrawRestore, _uiDrawSave, _uiDrawText, _uiDrawTransform, _uiNewArea, _uiNewScrollingArea } from "../lib";

const areaSymbol = Symbol();

class area extends control {
    constructor(draw, mouseEvent, mouseCrossed, dragBroken, keyEvent) {
        super();

        this.setAreaHandler(draw, mouseEvent, mouseCrossed, dragBroken, keyEvent);
        this[areaSymbol]();
    }

    setAreaHandler(draw, mouseEvent, mouseCrossed, dragBroken, keyEvent) {
        this._areaHandler = BigUint64Array.from([
            //Draw
            BigInt(new JSCallback(function (handler, area, params) {
                let drawParams = {
                    context: read.ptr(params, 0 * 8),
                    areaWidth: read.f64(params, 1 * 8),
                    areaHeight: read.f64(params, 2 * 8),
                    clipWidth: read.f64(params, 3 * 8),
                    clipHeight: read.f64(params, 4 * 8),
                }
                draw(drawParams);
            }, {
                args: ["ptr", "ptr", "ptr"],
                returns: "void",
                threadsafe: false
            }).ptr),
            //MouseEvent
            BigInt(new JSCallback(function (handler, area, event) {
                let mouseParams = {
                    x: read.f64(event, 0 * 8),
                    y: read.f64(event, 1 * 8),
                    areawidth: read.f64(event, 2 * 8),
                    areaHeight: read.f64(event, 3 * 8),
                    down: read.i32(event, 4 * 8),
                    //up: read.i32(event, 5 * 8),
                    up: read.i32(event, (4 * 8) + (4 * 1)),
                    count: read.i32(event, (4 * 8) + (4 * 2)),
                    modifiers: read.ptr(event, 7 * 8),
                    held1To64: read.u64(event, 8 * 8),
                }
                mouseEvent(mouseParams);
            }, {
                args: ["ptr", "ptr", "ptr"],
                returns: "void",
                threadsafe: false
            }).ptr),
            //MouseCrossed
            BigInt(new JSCallback(function (handler, area, left) {
                mouseCrossed(left)
            }, {
                args: ["ptr", "ptr", "i32"],
                returns: "void",
                threadsafe: false
            }).ptr),
            //DragBroken
            BigInt(new JSCallback(function (tableModelHandler, tableModel, row, column) {
                //console.log("DragBroken");
            }, {
                args: ["ptr", "ptr"],
                returns: "i32",
                threadsafe: false
            }).ptr),
            //KeyEvent
            BigInt(new JSCallback(function (handler, area, areaKeyEvent) {
                let keyParams = {
                    key: read.i8(areaKeyEvent, 0 * 4),
                    extKey: read.i32(areaKeyEvent, 1 * 4),
                    modifier: read.i32(areaKeyEvent, 2 * 4),
                    modifiers: read.i32(areaKeyEvent, 3 * 4),
                    up: read.i32(areaKeyEvent, 4 * 4),
                }
                return keyEvent(keyParams);
            }, {
                args: ["ptr", "ptr", "ptr"],
                returns: "i32",
                threadsafe: false
            }).ptr)
        ]);
    }

    [areaSymbol]() {
        this._handle = _uiNewArea(ptr(this._areaHandler));
    }

    setSize(width, height) {
        _uiAreaSetSizeSetSize(this._handle, width, height);
    }

    redrawAll() {
        _uiAreaQueueRedrawAll(this._handle);
    }

    transform(context, matrix) {
        _uiDrawTransform(context, matrix._handle);
    }

    clip(context, path) {
        _uiDrawClip(context, path._handle);
    }

    save(context) {
        _uiDrawSave(context);
    }

    restore(context) {
        _uiDrawRestore(context);
    }

    drawText(context, textlayout, x, y) {
        _uiDrawText(context, textlayout._handle, Math.fround(x), Math.fround(y));
    }
}

class scrollingArea extends area {
    constructor(draw, mouseEvent, mouseCrossed, dragBroken, keyEvent, width, height) {
        super();
        this.setAreaHandler(draw, mouseEvent, mouseCrossed, dragBroken, keyEvent);
        this[areaSymbol](width, height);
    }

    [areaSymbol](width, height) {
        this._handle = _uiNewScrollingArea(ptr(this._areaHandler), width, height);
    }

    scrollTo(x, y, width, height) {
        _uiAreaScrollTo(this._handle, Math.fround(x), Math.fround(y), Math.fround(width), Math.fround(height));
    }
}

export {
    scrollingArea,
    area
};