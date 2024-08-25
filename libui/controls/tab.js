const control = require("../control");
const { lib, koffi } = require("../lib");

const uiTab = koffi.pointer('uiTab', koffi.opaque());

const uiTabAppend = lib.func('void uiTabAppend (uiTab *t, const char *name, uiControl *c)');
const uiTabInsertAt = lib.func('void uiTabInsertAt (uiTab *t, const char *name, int index, uiControl *c)');
const uiTabDelete = lib.func('void uiTabDelete (uiTab *t, int index)');
const uiTabNumPages = lib.func('int uiTabNumPages (uiTab *t)');
const uiTabMargined = lib.func('int uiTabMargined (uiTab *t, int index)');
const uiTabSetMargined = lib.func('void uiTabSetMargined (uiTab *t, int index, int margined)');
const uiNewTab = lib.func('uiTab * uiNewTab (void)');

class tab extends control {
    constructor() {
        super();
        this._handle = uiNewTab();
    }

    get numPages() { return uiTabNumPages(this._handle) }

    get margined() { return uiTabMargined(this._handle) }
    set margined(value) { return uiTabSetMargined(this._handle, value + 0) }

    append(title, ctrl) {
        uiTabAppend(this._handle, title, koffi.as(ctrl._handle, 'void*'));
    }

    insertAt(title, index, ctrl) {
        uiTabInsertAt(this._handle, title, index, koffi.as(ctrl._handle, 'void*'));
    }

    delete(index) {
        uiTabDelete(this._handle, index);
    }
}

module.exports = tab;