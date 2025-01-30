import control from "../control";
import { _uiNewProgressBar, _uiProgressBarSetValue, _uiProgressBarValue } from "../lib";

class progressbar extends control {
    constructor() {
        super();
        this._handle = _uiNewProgressBar();
    }

    get value() { return _uiProgressBarValue(this._handle) }
    set value(value) { _uiProgressBarSetValue(this._handle, value) }
}

export default progressbar;