import { ptr, toArrayBuffer } from "bun:ffi";
import control from "../control";
import { _uiDrawMatrixInvert, _uiDrawMatrixInvertible, _uiDrawMatrixMultiply, _uiDrawMatrixRotate, _uiDrawMatrixScale, _uiDrawMatrixSetIdentity, _uiDrawMatrixSkew, _uiDrawMatrixTransformPoint, _uiDrawMatrixTransformSize, _uiDrawMatrixTranslate } from "../lib";

class matrix extends control {
    constructor({
        M11 = 0,
        M12 = 0,
        M21 = 0,
        M22 = 0,
        M31 = 0,
        M32 = 0
    } = {}) {
        super();
        const buffer = new ArrayBuffer(8 * 6);
        const view = new DataView(buffer);

        let offset = 0;
        view.setFloat64(offset, M11, true);
        offset += 8;
        view.setFloat64(offset, M12, true);
        offset += 8;
        view.setFloat64(offset, M21, true);
        offset += 8;
        view.setFloat64(offset, M22, true);
        offset += 8;
        view.setFloat64(offset, M31, true);
        offset += 8;
        view.setFloat64(offset, M32, true);

        this._handle = ptr(view);
    }

    setIdentity() {
        _uiDrawMatrixSetIdentity(this._handle);
    }

    translate(x, y) {
        _uiDrawMatrixTranslate(this._handle, Math.fround(x), Math.fround(y));
    }

    scale(xCenter, yCenter, x, y) {
        _uiDrawMatrixScale(this._handle, Math.fround(xCenter), Math.fround(yCenter), Math.fround(x), Math.fround(y));
    }

    rotate(x, y, amount) {
        _uiDrawMatrixRotate(this._handle, Math.fround(x), Math.fround(y), Math.fround(amount));
    }

    skew(x, y, xamount, yamount) {
        _uiDrawMatrixSkew(this._handle, Math.fround(x), Math.fround(y), Math.fround(xamount), Math.fround(yamount));
    }

    multiply(dest) {
        _uiDrawMatrixMultiply(dest._handle, this._handle);
    }

    invertible() {
        return _uiDrawMatrixInvertible(this._handle);
    }

    invert() {
        return _uiDrawMatrixInvert(this._handle);
    }

    transformPoint(x, y) {
        _uiDrawMatrixTransformPoint(this._handle, Math.fround(x), Math.fround(y));
    }

    transformSize(x, y) {
        _uiDrawMatrixTransformSize(this._handle, Math.fround(x), Math.fround(y));
    }
}

export default matrix;