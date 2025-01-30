import control from "../control";
import { _uiBoxAppend, _uiBoxDelete, _uiBoxNumChildren, _uiNewHorizontalBox, _uiNewVerticalBox } from "../lib";

class box extends control {
    constructor() { super(); }

    get numChildren() { return _uiBoxNumChildren(this._handle) }
    get padded() { return uiBoxSetPadded(this._handle) }
    set padded(value) { return uiBoxSetPadded(this._handle, value) }

    append(child, stretchy) { _uiBoxAppend(this._handle, child._handle, stretchy) }
    delete(index) { _uiBoxDelete(this._handle, index) }
}

class vbox extends box {
    constructor() {
        super();
        this._handle = _uiNewVerticalBox();
    }
}

class hbox extends box {
    constructor() {
        super();
        this._handle = _uiNewHorizontalBox();
    }
}

export {
    vbox,
    hbox
}