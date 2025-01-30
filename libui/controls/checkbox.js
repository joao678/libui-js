import control from "../control";
import { _uiCheckboxChecked, _uiCheckboxOnToggled, _uiCheckboxSetChecked, _uiCheckboxSetText, _uiCheckboxText, _uiNewCheckbox } from "../lib";
import { str } from "../util/util";
import { cc, FFIType, JSCallback, CString } from "bun:ffi";

class checkbox extends control {
    constructor(title) {
        super();
        this._handle = _uiNewCheckbox(str`${title}`);
    }

    get text() { return _uiCheckboxText(this._handle) }
    set text(value) { _uiCheckboxSetText(this._handle, str`${value}`) }

    get checked() { return !!_uiCheckboxChecked(this._handle) }
    set checked(value) { _uiCheckboxSetChecked(this._handle, value) }

    onToggled(cb) {
        _uiCheckboxOnToggled(this._handle, new JSCallback(function (sender, senderData) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }
}

export default checkbox;