const control = require("../control");
const { lib, koffi } = require("../lib");

const uiCheckbox = koffi.pointer('uiCheckbox', koffi.opaque());

const uiNewCheckbox = lib.func('uiCheckbox* uiNewCheckbox(const char *text)');
const uiCheckboxText = lib.func('char* uiCheckboxText (uiCheckbox *b)');
const uiCheckboxSetText = lib.func('void uiCheckboxSetText (uiCheckbox *b, const char *text)');
const uiCheckboxChecked = lib.func('int uiCheckboxChecked (uiCheckbox *c)');
const uiCheckboxSetChecked = lib.func('void uiCheckboxSetChecked (uiCheckbox *c, int checked)');

const CheckboxClickedCb = koffi.proto('CheckboxClickedCb', 'int', ['uiCheckbox*', 'void *']);
const uiCheckboxOnToggled = lib.func('void uiCheckboxOnToggled (uiCheckbox *w, CheckboxClickedCb *cb, void *data)');

class checkbox extends control {
    constructor(title) {
        super();
        this._handle = uiNewCheckbox(title);
    }

    get text() { return uiCheckboxText(this._handle) }
    set text(value) { uiCheckboxSetText(this._handle, value) }

    get checked() { return !!uiCheckboxChecked(this._handle) }
    set checked(value) { uiCheckboxSetChecked(this._handle, value+0) }
        
    onToggled(cb) {
        const _cb = function() {
            cb(...arguments);
            return 1;
        }
        uiCheckboxOnToggled(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(CheckboxClickedCb));
    }
}

module.exports = checkbox;