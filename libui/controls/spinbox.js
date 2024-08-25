const control = require("../control");
const { lib, koffi } = require("../lib");

const uiSpinbox = koffi.pointer('uiSpinbox', koffi.opaque());

const uiSpinboxValue = lib.func('int uiSpinboxValue (uiSpinbox *s)')
const uiSpinboxSetValue = lib.func('void uiSpinboxSetValue (uiSpinbox *s, int value)')
const uiNewSpinbox = lib.func('uiSpinbox* uiNewSpinbox (int min, int max)')

const spinboxOnChangedCb = koffi.proto('spinboxOnChangedCb', 'int', ['uiSpinbox*', 'void *']);
const uiSpinboxOnChanged = lib.func('void uiSpinboxOnChanged (uiSpinbox *w, spinboxOnChangedCb *cb, void *data)');

class spinbox extends control {
    constructor(min, max) {
        super();
        this._handle = uiNewSpinbox(min, max);
    }

    get value() { return uiSpinboxValue(this._handle) }
    set value(value) { uiSpinboxSetValue(this._handle, value) }

    onChanged(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiSpinboxOnChanged(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(spinboxOnChangedCb));
    }
}

module.exports = spinbox;