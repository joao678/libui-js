import { CString } from "bun:ffi";
import control from "../control";
import { _uiLabelSetText, _uiLabelText, _uiNewLabel } from "../lib";
import { str } from "../util/util";

class label extends control {
    constructor(title) {
        super();
        this._handle = _uiNewLabel(str`${title}`);
    }

    get text() { return new CString(_uiLabelText(this._handle)) }
    set text(value) { _uiLabelSetText(this._handle, str`${value}`) }
}

export default label;