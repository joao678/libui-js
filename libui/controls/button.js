import { CString, JSCallback } from "bun:ffi";
import control from "../control";
import { _uiButtonOnClicked, _uiButtonSetText, _uiButtonText, _uiNewButton } from "../lib";
import { str } from "../util/util";

class button extends control {
    constructor(title) {
        super();
        this._handle = _uiNewButton(str`${title}`);
    }

    get text() { return _uiButtonText(this._handle); }
    set text(value) { _uiButtonSetText(this._handle, str`${value}`) }
        
    onClicked(cb) {
        _uiButtonOnClicked(this._handle, new JSCallback(function (sender, senderData) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, 0);
    }
}

export default button;