const control = require("../control");
const { lib, koffi } = require("../lib");

const uiMultilineEntry = koffi.pointer('uiMultilineEntry', koffi.opaque());

const uiMultilineEntryText = lib.func('char * uiMultilineEntryText (uiMultilineEntry *e)')
const uiMultilineEntrySetText = lib.func('void uiMultilineEntrySetText (uiMultilineEntry *e, const char *text)')
const uiMultilineEntryAppend = lib.func('void uiMultilineEntryAppend (uiMultilineEntry *e, const char *text)')

const uiMultilineEntryReadOnly = lib.func('int uiMultilineEntryReadOnly (uiMultilineEntry *e)')
const uiMultilineEntrySetReadOnly = lib.func('void uiMultilineEntrySetReadOnly (uiMultilineEntry *e, int readonly)')
const uiNewMultilineEntry = lib.func('uiMultilineEntry * uiNewMultilineEntry (void)')
const uiNewNonWrappingMultilineEntry = lib.func('uiMultilineEntry * uiNewNonWrappingMultilineEntry (void)')

const multilineEntryOnChangedCb = koffi.proto('multilineEntryOnChangedCb', 'int', ['uiMultilineEntry*', 'void *']);
const uiMultilineEntryOnChanged = lib.func('void uiMultilineEntryOnChanged (uiMultilineEntry *e, multilineEntryOnChangedCb *cb, void *data)')

const multilineEntrySymbol = Symbol();

class multilineentry extends control {
    constructor() {
        super();
        this[multilineEntrySymbol]();
    }

    [multilineEntrySymbol]() {
        this._handle = uiNewMultilineEntry();
    }

    get text() { return uiMultilineEntryText(this._handle) }
    set text(value) { uiMultilineEntrySetText(this._handle, value) }

    get readonly() { return uiMultilineEntryReadOnly(this._handle) }
    set readonly(value) { uiMultilineEntrySetReadOnly(this._handle, value+0) }

    append(value) {
        uiMultilineEntryAppend(this._handle, value)
    }

    onChanged(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiMultilineEntryOnChanged(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(multilineEntryOnChangedCb));
    }
}

class nonWrappingMultilineentry extends multilineentry {
    constructor() {
        super();
        this[multilineEntrySymbol]();
    }

    [multilineEntrySymbol]() {
        this._handle = uiNewNonWrappingMultilineEntry();
    }
}

exports.multilineentry = multilineentry;
exports.nonWrappingMultilineentry = nonWrappingMultilineentry;
