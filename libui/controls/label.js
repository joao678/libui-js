const control = require("../control");
const { lib, koffi } = require("../lib");

const uiLabel = koffi.pointer('uiLabel', koffi.opaque());

const uiLabelText = lib.func('char* uiLabelText (uiLabel *l)')
const uiLabelSetText = lib.func('void uiLabelSetText (uiLabel *l, const char *text)')
const uiNewLabel = lib.func('uiLabel* uiNewLabel (const char *text)')

class label extends control {
    constructor(title) {
        super();
        this._handle = uiNewLabel(title);
    }

    get text() { return uiLabelText(this._handle) }
    set text(value) { uiLabelSetText(this._handle, value) }
}

module.exports = label;