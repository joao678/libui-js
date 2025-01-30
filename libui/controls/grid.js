import control from "../control";
import { _uiGridAppend, _uiGridInsertAt, _uiGridPadded, _uiGridSetPadded, _uiNewGrid } from "../lib";

class grid extends control {
    constructor() {
        super();
        this._handle = _uiNewGrid();
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

    get padded() { return _uiGridPadded(this._handle) }
    set padded(value) { return _uiGridSetPadded(this._handle, value) }

    append(child, left, top, xspan, yspan, hexpand, halign, vexpand, valign) {
        _uiGridAppend(this._handle, child._handle, left, top, xspan, yspan, hexpand, halign, vexpand, valign);
    }

    insertAt(child, existing, at, xspan, yspan, hexpand, halign, vexpand, valign) {
        _uiGridInsertAt(this._handle, child._handle, existing._handle, at, xspan, yspan, hexpand, halign, vexpand, valign);
    }
}

export default grid;