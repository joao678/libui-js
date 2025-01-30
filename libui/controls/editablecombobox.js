import { CString, JSCallback } from "bun:ffi";
import control from "../control";
import { _uiEditableComboboxAppend, _uiEditableComboboxOnChanged, _uiEditableComboboxSetText, _uiEditableComboboxText, _uiNewEditableCombobox } from "../lib";
import { str } from "../util/util";

class editablecombobox extends control {
    constructor() {
        super();
        this._handle = _uiNewEditableCombobox();
    }

    get text() { return new CString(_uiEditableComboboxText(this._handle)); }
    set text(value) { _uiEditableComboboxSetText(this._handle, str`${value}`); }

    append(text) { _uiEditableComboboxAppend(this._handle, str`${text}`); }

    onChanged(cb) {
        _uiEditableComboboxOnChanged(this._handle, new JSCallback(function (sender, senderData) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }
}

export default editablecombobox;