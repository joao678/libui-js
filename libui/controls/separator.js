import control from "../control";
import { _uiNewHorizontalSeparator, _uiNewVerticalSeparator } from "../lib";

class horizontalSeparator extends control {
    constructor() {
        super();
        this._handle = _uiNewHorizontalSeparator();
    }
}

class verticalSeparator extends control {
    constructor() {
        super();
        this._handle = _uiNewVerticalSeparator();
    }
}

export {
    horizontalSeparator,
    verticalSeparator
};

