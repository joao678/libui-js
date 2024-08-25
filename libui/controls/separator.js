const control = require("../control");
const { lib, koffi } = require("../lib");

const uiSeparator = koffi.pointer('uiSeparator', koffi.opaque());

const uiNewHorizontalSeparator = lib.func('uiSeparator* uiNewHorizontalSeparator (void)');
const uiNewVerticalSeparator = lib.func('uiSeparator* uiNewVerticalSeparator (void)');

class horizontalSeparator extends control {
    constructor() {
        super();
        this._handle = uiNewHorizontalSeparator();
    }
}

class verticalSeparator extends control {
    constructor() {
        super();
        this._handle = uiNewVerticalSeparator();
    }
}

exports.horizontalSeparator = horizontalSeparator;
exports.verticalSeparator = verticalSeparator;