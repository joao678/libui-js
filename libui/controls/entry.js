const control = require("../control");
const { lib, koffi } = require("../lib");

const uiEntry = koffi.pointer('uiEntry', koffi.opaque());

const uiNewEntry = lib.func('uiEntry* uiNewEntry()');
const uiNewPasswordEntry = lib.func('uiEntry* uiNewPasswordEntry (void)')
const uiNewSearchEntry = lib.func('uiEntry* uiNewSearchEntry (void)')
const uiEntryText = lib.func('char* uiEntryText (uiEntry *b)');
const uiEntrySetText = lib.func('void uiEntrySetText (uiEntry *b, const char *text)');
const uiEntryReadOnly = lib.func('int uiEntryReadOnly (uiEntry *e)');
const uiEntrySetReadOnly = lib.func('void uiEntrySetReadOnly (uiEntry *e, int readonly)');

const entryOnChanged = koffi.proto('entryOnChanged', 'int', ['uiEntry*', 'void *']);
const uiEntryOnChanged = lib.func('void uiEntryOnChanged (uiEntry *w, entryOnChanged *cb, void *data)');

const entrySymbol = Symbol();

class entry extends control {
    constructor() {
        super();
        this[entrySymbol]();
    }

    [entrySymbol]() {
        this._handle = uiNewEntry();
    }

    get text() { return uiEntryText(this._handle) }
    set text(value) { uiEntrySetText(this._handle, value) }

    get readonly() { return uiEntryReadOnly(this._handle) }
    set readonly(value) { uiEntrySetReadOnly(this._handle, value+0) }

    onChanged(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiEntryOnChanged(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(entryOnChanged));
    }
}

class passwordentry extends entry {
    constructor() {
        super();
        this[entrySymbol]();
    }

    [entrySymbol]() {
        this._handle = uiNewPasswordEntry();
    }
}

class searchEntry extends entry {
    constructor() {
        super();
        this[entrySymbol]();
    }

    [entrySymbol]() {
        this._handle = uiNewSearchEntry();
    }
}

exports.entry = entry;
exports.passwordentry = passwordentry;
exports.searchEntry = searchEntry;