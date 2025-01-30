import { CString, JSCallback } from "bun:ffi";
import control from "../control";
import { _uiMultilineEntryAppend, _uiMultilineEntryOnChanged, _uiMultilineEntryReadOnly, _uiMultilineEntrySetReadOnly, _uiMultilineEntrySetText, _uiMultilineEntryText, _uiNewMultilineEntry, _uiNewNonWrappingMultilineEntry, _uiNewRadioButtons, _uiNewSlider, _uiNewSpinbox, _uiNewTab, _uiRadioButtonsAppend, _uiRadioButtonsOnSelected, _uiRadioButtonsSelected, _uiRadioButtonsSetSelected, _uiSliderHasToolTip, _uiSliderOnChanged, _uiSliderOnReleased, _uiSliderSetHasToolTip, _uiSliderSetRange, _uiSliderSetValue, _uiSliderValue, _uiSpinboxOnChanged, _uiSpinboxSetValue, _uiSpinboxValue, _uiTabAppend, _uiTabDelete, _uiTabInsertAt, _uiTabMargined, _uiTabNumPages, _uiTabSetMargined } from "../lib";
import { str } from "../util/util";

class tab extends control {
    constructor() {
        super();
        this._handle = _uiNewTab();
    }

    get numPages() { return _uiTabNumPages(this._handle) }

    getMargined(index) { return _uiTabMargined(this._handle, index) }
    setMargined(index, value) { return _uiTabSetMargined(this._handle, index, value) }

    append(title, ctrl) {
        _uiTabAppend(this._handle, str`${title}`, ctrl._handle);
    }

    insertAt(title, index, ctrl) {
        _uiTabInsertAt(this._handle, str`${title}`, index, ctrl._handle);
    }

    delete(index) {
        _uiTabDelete(this._handle, index);
    }
}

export default tab;