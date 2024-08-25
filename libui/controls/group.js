const control = require("../control");
const { lib, koffi } = require("../lib");

const uiGroup = koffi.pointer('uiGroup', koffi.opaque());

const uiGroupTitle = lib.func('char* uiGroupTitle (uiGroup *g)')
const uiGroupSetTitle = lib.func('void uiGroupSetTitle (uiGroup *g, const char *title)')
const uiGroupSetChild = lib.func('void uiGroupSetChild (uiGroup *g, uiControl *c)')
const uiGroupMargined = lib.func('int uiGroupMargined (uiGroup *g)')
const uiGroupSetMargined = lib.func('void uiGroupSetMargined (uiGroup *g, int margined)')
const uiNewGroup = lib.func('uiGroup* uiNewGroup (const char *title)')

class group extends control {
    constructor(title) {
        super();
        this._handle = uiNewGroup(title);
    }

    get title() { return uiGroupTitle(this._handle) }
    set title(value) { return uiGroupSetTitle(this._handle, value) }

    get margined() { return uiGroupMargined(this._handle) }
    set margined(value) { return uiGroupSetMargined(this._handle, value + 0) }

    set child(ctrl) {
        uiGroupSetChild(this._handle, koffi.as(ctrl._handle, 'void*'));
    }
}

exports.group = group;