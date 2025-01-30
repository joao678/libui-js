import { CString, JSCallback } from "bun:ffi";
import control from "../control";
import { _uiButtonOnClicked, _uiButtonSetText, _uiButtonText, _uiComboboxAppend, _uiComboboxClear, _uiComboboxDelete, _uiComboboxInsertAt, _uiComboboxNumItems, _uiComboboxOnSelected, _uiComboboxSelected, _uiComboboxSetSelected, _uiNewButton, _uiNewCombobox } from "../lib";
import { str } from "../util/util";

class combobox extends control {
    constructor() {
        super();
        this._handle = _uiNewCombobox();
    }

    get numItems() { return _uiComboboxNumItems(this._handle) }
    get selected() { return _uiComboboxSelected(this._handle) }
    set selected(index) { _uiComboboxSetSelected(this._handle, index) }

    append(text) {
        _uiComboboxAppend(this._handle, str`${text}`);
    }

    insertAt(index, text) {
        _uiComboboxInsertAt(this._handle, index, str`${text}`);
    }

    delete(index) {
        _uiComboboxDelete(this._handle, index);
    }

    clear() {
        _uiComboboxClear(this._handle);
    }

    onSelected(cb) {
        _uiComboboxOnSelected(this._handle, new JSCallback(function (sender, senderData) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }
}

export default combobox;