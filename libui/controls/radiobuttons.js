const control = require("../control");
const { lib, koffi } = require("../lib");

const uiRadioButtons = koffi.pointer('uiRadioButtons', koffi.opaque());

const uiRadioButtonsAppend = lib.func('void uiRadioButtonsAppend (uiRadioButtons *r, const char *text)')
const uiRadioButtonsSelected = lib.func('int uiRadioButtonsSelected (uiRadioButtons *r)')
const uiRadioButtonsSetSelected = lib.func('void uiRadioButtonsSetSelected (uiRadioButtons *r, int index)')
const uiNewRadioButtons = lib.func('uiRadioButtons* uiNewRadioButtons (void)')

const radioButtonsSelectedCb = koffi.proto('radioButtonsSelectedCb', 'int', ['uiRadioButtons*', 'void *']);
const uiRadioButtonsOnSelected = lib.func('void uiRadioButtonsOnSelected (uiRadioButtons *r, radioButtonsSelectedCb *cb, void *data)')

class radiobuttons extends control {
    constructor() {
        super();
        this._handle = uiNewRadioButtons();
    }

    get selected() { return uiRadioButtonsSelected(this._handle) }
    set selected(value) { uiRadioButtonsSetSelected(this._handle, value) }

    append(text) { uiRadioButtonsAppend(this._handle, text) }
        
    onSelected(cb) {
        const _cb = function() {
            cb(...arguments);
            return 1;
        }
        uiRadioButtonsOnSelected(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(radioButtonsSelectedCb));
    }
}

module.exports = radiobuttons;