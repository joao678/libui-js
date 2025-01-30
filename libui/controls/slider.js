import { CString, JSCallback } from "bun:ffi";
import control from "../control";
import { _uiMultilineEntryAppend, _uiMultilineEntryOnChanged, _uiMultilineEntryReadOnly, _uiMultilineEntrySetReadOnly, _uiMultilineEntrySetText, _uiMultilineEntryText, _uiNewMultilineEntry, _uiNewNonWrappingMultilineEntry, _uiNewRadioButtons, _uiNewSlider, _uiRadioButtonsAppend, _uiRadioButtonsOnSelected, _uiRadioButtonsSelected, _uiRadioButtonsSetSelected, _uiSliderHasToolTip, _uiSliderOnChanged, _uiSliderOnReleased, _uiSliderSetHasToolTip, _uiSliderSetRange, _uiSliderSetValue, _uiSliderValue } from "../lib";
import { str } from "../util/util";

class slider extends control {
    constructor(min, max) {
        super();
        this._handle = _uiNewSlider(min, max);
    }

    get value() { return _uiSliderValue(this._handle) }
    set value(value) { _uiSliderSetValue(this._handle, value) }

    get hasTooltip() { return _uiSliderHasToolTip(this._handle) }
    set hasTooltip(value) { _uiSliderSetHasToolTip(this._handle, value) }

    setRange(min, max) { _uiSliderSetRange(this._handle, min, max) }

    onChanged(cb) {
        _uiSliderOnChanged(this._handle, new JSCallback(function (sender, senderData) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }

    onReleased(cb) {
        _uiSliderOnReleased(this._handle, new JSCallback(function (sender, senderData) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }
}

export default slider;