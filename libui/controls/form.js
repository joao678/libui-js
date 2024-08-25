const control = require("../control");
const { lib, koffi } = require("../lib");

const uiForm = koffi.pointer('uiForm', koffi.opaque());

const uiNewForm = lib.func('uiForm* uiNewForm (void)');

const uiFormAppend = lib.func('void	uiFormAppend (uiForm *f, const char *label, uiControl *c, int stretchy)');
const uiFormNumChildren = lib.func('int uiFormNumChildren (uiForm *b)');
const uiFormDelete = lib.func('void uiFormDelete (uiForm *b, int index)');
const uiFormPadded = lib.func('int uiFormPadded (uiForm *b)');
const uiFormSetPadded = lib.func('void uiFormSetPadded (uiForm *b, int padded)');

class form extends control {
    constructor() {
        super();
        this._handle = uiNewForm();
    }

    get numChildren() { return uiFormNumChildren(this._handle) }
    get padded() { return uiFormPadded(this._handle) }
    set padded(value) { return uiFormSetPadded(this._handle, value + 0) }

    append(child, label, stretchy) { uiFormAppend(this._handle, label, koffi.as(child._handle, 'void*'), stretchy + 0) }
    delete(index) { uiFormDelete(this._handle, index) }
}

exports.form = form;