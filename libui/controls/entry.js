import { CString, JSCallback } from "bun:ffi";
import control from "../control";
import { _uiEntryOnChanged, _uiEntryReadOnly, _uiEntrySetReadOnly, _uiEntrySetText, _uiEntryText, _uiNewEntry, _uiNewPasswordEntry, _uiNewSearchEntry } from "../lib";
import { str } from "../util/util";

const entrySymbol = Symbol();

class entry extends control {
    constructor() {
        super();
        this[entrySymbol]();
    }

    [entrySymbol]() {
        this._handle = _uiNewEntry();
    }

    get text() { return new CString(_uiEntryText(this._handle)); }
    set text(value) { _uiEntrySetText(this._handle, str`${value}`); }

    get readonly() { return _uiEntryReadOnly(this._handle) }
    set readonly(value) { _uiEntrySetReadOnly(this._handle, value) }

    onChanged(cb) {
        _uiEntryOnChanged(this._handle, new JSCallback(function (sender, senderData) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }
}

class passwordentry extends entry {
    constructor() {
        super();
        this[entrySymbol]();
    }

    [entrySymbol]() {
        this._handle = _uiNewPasswordEntry();
    }
}

class searchEntry extends entry {
    constructor() {
        super();
        this[entrySymbol]();
    }

    [entrySymbol]() {
        this._handle = _uiNewSearchEntry();
    }
}

export {
    entry,
    passwordentry,
    searchEntry
};

