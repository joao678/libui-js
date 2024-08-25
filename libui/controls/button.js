const control = require("../control");
const { lib, koffi } = require("../lib");

const uiButton = koffi.pointer('uiButton', koffi.opaque());

const uiNewButton = lib.func('uiButton* uiNewButton(const char *text)');
const uiButtonText = lib.func('char* uiButtonText (uiButton *b)');
const uiButtonSetText = lib.func('void uiButtonSetText (uiButton *b, const char *text)');

const buttonClickedCb = koffi.proto('buttonClickedCb', 'int', ['uiButton*', 'void *']);
const uiButtonOnClicked = lib.func('void uiButtonOnClicked (uiButton *w, buttonClickedCb *cb, void *data)');

class button extends control {
    constructor(title) {
        super();
        this._handle = uiNewButton(title);
    }

    get text() { return uiButtonText(this._handle) }
    set text(value) { uiButtonSetText(this._handle, value) }
        
    onClicked(cb) {
        const _cb = function() {
            cb(...arguments);
            return 1;
        }
        uiButtonOnClicked(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(buttonClickedCb));
    }
}

module.exports = button;