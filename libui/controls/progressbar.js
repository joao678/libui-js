const control = require("../control");
const { lib, koffi } = require("../lib");

const uiProgressBar = koffi.pointer('uiProgressBar', koffi.opaque());

const uiProgressBarValue = lib.func('char* uiProgressBarValue (uiProgressBar *l)')
const uiProgressBarSetValue = lib.func('void uiProgressBarSetValue (uiProgressBar *l, int n)')
const uiNewProgressBar = lib.func('uiProgressBar* uiNewProgressBar(void)')

class progressbar extends control {
    constructor() {
        super();
        this._handle = uiNewProgressBar();
    }

    get value() { return uiProgressBarValue(this._handle) }
    set value(value) { uiProgressBarSetValue(this._handle, value) }
}

module.exports = progressbar;