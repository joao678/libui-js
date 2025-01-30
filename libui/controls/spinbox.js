import { CString, JSCallback } from "bun:ffi";
import control from "../control";
import { _uiMultilineEntryAppend, _uiMultilineEntryOnChanged, _uiMultilineEntryReadOnly, _uiMultilineEntrySetReadOnly, _uiMultilineEntrySetText, _uiMultilineEntryText, _uiNewMultilineEntry, _uiNewNonWrappingMultilineEntry, _uiNewRadioButtons, _uiNewSlider, _uiNewSpinbox, _uiRadioButtonsAppend, _uiRadioButtonsOnSelected, _uiRadioButtonsSelected, _uiRadioButtonsSetSelected, _uiSliderHasToolTip, _uiSliderOnChanged, _uiSliderOnReleased, _uiSliderSetHasToolTip, _uiSliderSetRange, _uiSliderSetValue, _uiSliderValue, _uiSpinboxOnChanged, _uiSpinboxSetValue, _uiSpinboxValue } from "../lib";
import { str } from "../util/util";

class spinbox extends control {
    constructor(min, max) {
        super();
        this._handle = _uiNewSpinbox(min, max);
    }

    get value() { return _uiSpinboxValue(this._handle) }
    set value(value) { _uiSpinboxSetValue(this._handle, value) }

    onChanged(cb) {
        _uiSpinboxOnChanged(this._handle, new JSCallback(function (sender, senderData) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }
}

export default spinbox;