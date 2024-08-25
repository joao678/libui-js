const control = require("../control");
const { lib, koffi } = require("../lib");

const uiBox = koffi.pointer('uiBox', koffi.opaque());

const uiNewHorizontalBox = lib.func('uiBox* uiNewHorizontalBox (void)');
const uiNewVerticalBox = lib.func('uiBox* uiNewVerticalBox (void)');

const uiBoxAppend = lib.func('void uiBoxAppend (uiBox *b, uiControl *child, int stretchy)');
const uiBoxNumChildren = lib.func('int uiBoxNumChildren (uiBox *b)');
const uiBoxDelete = lib.func('void uiBoxDelete (uiBox *b, int index)');
const uiBoxPadded = lib.func('int uiBoxPadded (uiBox *b)');
const uiBoxSetPadded = lib.func('void uiBoxSetPadded (uiBox *b, int padded)');

class box extends control {
    constructor() { super(); }

    get numChildren() { return uiBoxNumChildren(this._handle) }
    get padded() { return uiBoxPadded(this._handle) }
    set padded(value) { return uiBoxSetPadded(this._handle, value+0) }

    append(child, stretchy) { uiBoxAppend(this._handle, koffi.as(child._handle, 'void*'), stretchy+0) }
    delete(index) { uiBoxDelete(this._handle, index) }
}

class vbox extends box {
    constructor() {
        super();
        this._handle = uiNewVerticalBox();
    }
}

class hbox extends box {
    constructor() {
        super();
        this._handle = uiNewHorizontalBox();
    }
}

exports.vbox = vbox;
exports.hbox = hbox;