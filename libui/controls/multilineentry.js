import { CString, JSCallback } from "bun:ffi";
import control from "../control";
import { _uiMultilineEntryAppend, _uiMultilineEntryOnChanged, _uiMultilineEntryReadOnly, _uiMultilineEntrySetReadOnly, _uiMultilineEntrySetText, _uiMultilineEntryText, _uiNewMultilineEntry, _uiNewNonWrappingMultilineEntry } from "../lib";
import { str } from "../util/util";

const multilineEntrySymbol = Symbol();

class multilineentry extends control {
    constructor() {
        super();
        this[multilineEntrySymbol]();
    }

    [multilineEntrySymbol]() {
        this._handle = _uiNewMultilineEntry();
    }

    get text() { return new CString(_uiMultilineEntryText(this._handle)) }
    set text(value) { _uiMultilineEntrySetText(this._handle, str`${value}`) }

    get readonly() { return _uiMultilineEntryReadOnly(this._handle) }
    set readonly(value) { _uiMultilineEntrySetReadOnly(this._handle, value) }

    append(value) {
        _uiMultilineEntryAppend(this._handle, str`${value}`)
    }

    onChanged(cb) {
        _uiMultilineEntryOnChanged(this._handle, new JSCallback(function (sender, senderData) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }
}

class nonWrappingMultilineentry extends multilineentry {
    constructor() {
        super();
        this[multilineEntrySymbol]();
    }

    [multilineEntrySymbol]() {
        this._handle = _uiNewNonWrappingMultilineEntry();
    }
}

export {
    multilineentry,
    nonWrappingMultilineentry
};

