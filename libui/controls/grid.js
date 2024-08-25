const control = require("../control");
const { lib, koffi } = require("../lib");

const uiGrid = koffi.pointer('uiGrid', koffi.opaque());

const uiGridAppend = lib.func('void uiGridAppend (uiGrid *g, uiControl *c, int left, int top, int xspan, int yspan, int hexpand, int halign, int vexpand, int valign)')
const uiGridInsertAt = lib.func('void uiGridInsertAt (uiGrid *g, uiControl *c, uiControl *existing, int at, int xspan, int yspan, int hexpand, int halign, int vexpand, int valign)')
const uiGridPadded = lib.func('int uiGridPadded (uiGrid *g)')
const uiGridSetPadded = lib.func('void uiGridSetPadded (uiGrid *g, int padded)')
const uiNewGrid = lib.func('uiGrid* uiNewGrid (void)')

class grid extends control {
    constructor() {
        super();
        this._handle = uiNewGrid();
    }

    uiAlign = {
        uiAlignFill: 0,
        uiAlignStart: 1,
        uiAlignCenter: 2,
        uiAlignEnd: 3
    }

    uiAt = {
        uiAtLeading: 0,
        uiAtTop: 1,
        uiAtTrailing: 2,
        uiAtBottom: 3,
    }

    get padded() { return uiGridPadded(this._handle) }
    set padded(value) { return uiGridSetPadded(this._handle, value + 0) }

    append(child, left, top, xspan, yspan, hexpand, halign, vexpand, valign) {
        uiGridAppend(this._handle, koffi.as(child._handle, 'void*'), left, top, xspan, yspan, hexpand, halign, vexpand, valign);
    }

    insertAt(child, existing, at, xspan, yspan, hexpand, halign, vexpand, valign) {
        uiGridInsertAt(this._handle, koffi.as(child._handle, 'void*'), koffi.as(existing._handle, 'void*'), at, xspan, yspan, hexpand, halign, vexpand, valign);
    }
}

exports.grid = grid;