const control = require("../control");
const { lib, koffi } = require("../lib");

const uiColorButton = koffi.pointer('uiColorButton', koffi.opaque());

const uiNewColorButton = lib.func('uiColorButton* uiNewColorButton(void)');
const uiColorButtonColor = lib.func('void uiColorButtonColor (uiColorButton *b, double *r, double *g, double *bl, double *a)');
const uiColorButtonSetColor = lib.func('void uiColorButtonSetColor (uiColorButton *b, double r, double g, double bl, double a)');

const colorButtonOnChangedCb = koffi.proto('colorButtonOnChangedCb', 'int', ['uiColorButton*', 'void *']);
const uiColorButtonOnChanged = lib.func('void uiColorButtonOnChanged (uiColorButton *w, colorButtonOnChangedCb *cb, void *data)');

class colorButton extends control {
    constructor() {
        super();
        this._handle = uiNewColorButton();
    }

    get color() {
        let r = koffi.alloc('double', 1);
        let g = koffi.alloc('double', 1);
        let b = koffi.alloc('double', 1);
        let a = koffi.alloc('double', 1);
        uiColorButtonColor(this._handle, r, g, b, a);
        return [koffi.decode(r, 'double'), koffi.decode(g, 'double'), koffi.decode(b, 'double'), koffi.decode(a, 'double')]
    }
    set color({ r, g, b, a }) { uiColorButtonSetColor(this._handle, r, g, b, a) }

    onChanged(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiColorButtonOnChanged(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(colorButtonOnChangedCb));
    }
}

module.exports = colorButton;