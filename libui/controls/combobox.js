const control = require("../control");
const { lib, koffi } = require("../lib");

const uiCombobox = koffi.pointer('uiCombobox', koffi.opaque());

const uiNewCombobox = lib.func('uiCombobox* uiNewCombobox()');
const uiComboboxAppend = lib.func('void uiComboboxAppend (uiCombobox *c, const char *text)');
const uiComboboxInsertAt = lib.func('void uiComboboxInsertAt (uiCombobox *c, int index, const char *text)');
const uiComboboxDelete = lib.func('void uiComboboxDelete (uiCombobox *c, int index)');
const uiComboboxClear = lib.func('void uiComboboxClear (uiCombobox *c)');

const uiComboboxNumItems = lib.func('int uiComboboxNumItems(uiCombobox *c)');
const uiComboboxSelected = lib.func('int uiComboboxSelected(uiCombobox *c)');
const uiComboboxSetSelected = lib.func('void uiComboboxSetSelected(uiCombobox *c, int index);');

const comboboxOnSelectedCb = koffi.proto('comboboxOnSelectedCb', 'int', ['uiCombobox*', 'void *']);
const uiComboboxOnSelected = lib.func('void uiComboboxOnSelected (uiCombobox *w, comboboxOnSelectedCb *cb, void *data)');

class combobox extends control {
    constructor() {
        super();
        this._handle = uiNewCombobox();
    }

    get numItems() { return uiComboboxNumItems(this._handle) }
    get selected() { return uiComboboxSelected(this._handle) }
    set selected(index) { return uiComboboxSetSelected(this._handle, index) }

    append(text) {
        uiComboboxAppend(this._handle, text);
    }

    insertAt(index, text) {
        uiComboboxInsertAt(this._handle, index, text);
    }

    delete(index) {
        uiComboboxDelete(this._handle, index);
    }

    clear() {
        uiComboboxClear(this._handle);
    }

    onSelected(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiComboboxOnSelected(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(comboboxOnSelectedCb));
    }
}

module.exports = combobox;