const control = require("../control");
const { lib, koffi } = require("../lib");

const uiEditableCombobox = koffi.pointer('uiEditableCombobox', koffi.opaque());

const uiNewEditableCombobox = lib.func('uiEditableCombobox* uiNewEditableCombobox()');
const uiEditableComboboxText = lib.func('char* uiEditableComboboxText (uiEditableCombobox *b)');
const uiEditableComboboxSetText = lib.func('void uiEditableComboboxSetText (uiEditableCombobox *b, const char *text)');
const uiEditableComboboxAppend = lib.func('void uiEditableComboboxAppend (uiEditableCombobox *c, const char *text)');

const editableComboboxOnChanged = koffi.proto('editableComboboxOnChanged', 'int', ['uiEditableCombobox*', 'void *']);
const uiEditableComboboxOnChanged = lib.func('void uiEditableComboboxOnChanged (uiEditableCombobox *w, editableComboboxOnChanged *cb, void *data)');

class editablecombobox extends control {
    constructor() {
        super();
        this._handle = uiNewEditableCombobox();
    }

    get text() { return uiEditableComboboxText(this._handle) }
    set text(value) { uiEditableComboboxSetText(this._handle, value) }

    append(text) { uiEditableComboboxAppend(this._handle, text) }
        
    onChanged(cb) {
        const _cb = function() {
            cb(...arguments);
            return 1;
        }
        uiEditableComboboxOnChanged(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(editableComboboxOnChanged));
    }
}

module.exports = editablecombobox;