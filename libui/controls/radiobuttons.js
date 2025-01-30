import { CString, JSCallback } from "bun:ffi";
import control from "../control";
import { _uiMultilineEntryAppend, _uiMultilineEntryOnChanged, _uiMultilineEntryReadOnly, _uiMultilineEntrySetReadOnly, _uiMultilineEntrySetText, _uiMultilineEntryText, _uiNewMultilineEntry, _uiNewNonWrappingMultilineEntry, _uiNewRadioButtons, _uiRadioButtonsAppend, _uiRadioButtonsOnSelected, _uiRadioButtonsSelected, _uiRadioButtonsSetSelected } from "../lib";
import { str } from "../util/util";

class radiobuttons extends control {
    constructor() {
        super();
        this._handle = _uiNewRadioButtons();
    }

    get selected() { return _uiRadioButtonsSelected(this._handle) }
    set selected(value) { _uiRadioButtonsSetSelected(this._handle, value) }

    append(text) { _uiRadioButtonsAppend(this._handle, str`${text}`) }
        
    onSelected(cb) {
        _uiRadioButtonsOnSelected(this._handle, new JSCallback(function (sender, senderData) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }
}

export default radiobuttons;