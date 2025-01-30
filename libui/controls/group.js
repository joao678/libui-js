import { CString, JSCallback } from "bun:ffi";
import control from "../control";
import { _uiButtonOnClicked, _uiButtonSetText, _uiButtonText, _uiComboboxAppend, _uiComboboxClear, _uiComboboxDelete, _uiComboboxInsertAt, _uiComboboxNumItems, _uiComboboxOnSelected, _uiComboboxSelected, _uiComboboxSetSelected, _uiGroupMargined, _uiGroupSetChild, _uiGroupSetMargined, _uiGroupSetTitle, _uiGroupTitle, _uiNewButton, _uiNewCombobox, _uiNewGroup } from "../lib";
import { str } from "../util/util";

class group extends control {
    constructor(title) {
        super();
        this._handle = _uiNewGroup(str`${title}`);
    }

    get title() { return new CString(_uiGroupTitle(this._handle)) }
    set title(value) { return _uiGroupSetTitle(this._handle, str`${value}`) }

    get margined() { return _uiGroupMargined(this._handle) }
    set margined(value) { return _uiGroupSetMargined(this._handle, value) }

    set child(ctrl) {
        _uiGroupSetChild(this._handle, ctrl._handle);
    }
}

export default group;