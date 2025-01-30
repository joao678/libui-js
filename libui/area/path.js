import control from "../control";
import { _uiDrawFill, _uiDrawFreePath, _uiDrawNewPath, _uiDrawPathAddRectangle, _uiDrawPathEnd } from "../lib";

class areaPath extends control {
    constructor(mode) {
        super();
        this._handle = _uiDrawNewPath(mode);
    }

    end() {
        _uiDrawPathEnd(this._handle);
    }

    addRectangle(x, y, width, height) {
        _uiDrawPathAddRectangle(this._handle, Math.fround(x), Math.fround(y), Math.fround(width), Math.fround(height));
    }

    fill(context, brush) {
        _uiDrawFill(context, this._handle, brush._handle);
    }

    free() {
        _uiDrawFreePath(this._handle);
    }
}

export default areaPath;