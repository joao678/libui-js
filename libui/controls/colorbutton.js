import control from "../control";
import { _uiColorButtonColor, _uiColorButtonOnChanged, _uiColorButtonSetColor, _uiMenuItemOnClicked, _uiNewColorButton } from "../lib";
import { cc, FFIType, JSCallback, CString, ptr, read } from "bun:ffi";

class colorButton extends control {
    constructor() {
        super();
        this._handle = _uiNewColorButton();
    }

    get color() {
        let r = ptr(new Float64Array(1), 0);
        let g = ptr(new Float64Array(1), 0);
        let b = ptr(new Float64Array(1), 0);
        let a = ptr(new Float64Array(1), 0);
        _uiColorButtonColor(this._handle, r, g, b, a);
        return [read.f64(r, 0), read.f64(g, 0), read.f64(b, 0), read.f64(a, 0)]
    }

    set color({ r, g, b, a }) { _uiColorButtonSetColor(this._handle, Math.fround(r), Math.fround(g), Math.fround(b), Math.fround(a)) }

    onChanged(cb) {
        _uiColorButtonOnChanged(this._handle, new JSCallback(function (sender, senderData) { return cb(...arguments) }, {
            returns: "void",
            args: ["ptr", "ptr"]
        }).ptr, 0);
    }
}

export default colorButton;