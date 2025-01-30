import control from "../control";
import { _uiDateTimePickerOnChanged, _uiDateTimePickerSetTime, _uiDateTimePickerTime, _uiFormAppend, _uiFormDelete, _uiFormNumChildren, _uiFormPadded, _uiFormSetPadded, _uiNewDatePicker, _uiNewDateTimePicker, _uiNewForm, _uiNewTimePicker } from "../lib";
import { CString, JSCallback, read, ptr, FFIType } from "bun:ffi";
import { str } from "../util/util";

class form extends control {
    constructor() {
        super();
        this._handle = _uiNewForm();
    }

    get numChildren() { return _uiFormNumChildren(this._handle) }
    get padded() { return _uiFormPadded(this._handle) }
    set padded(value) { return _uiFormSetPadded(this._handle, value) }

    append(child, label, stretchy) { _uiFormAppend(this._handle, str`${label}`, child._handle, stretchy); }
    delete(index) { _uiFormDelete(this._handle, index) }
}

export default form;