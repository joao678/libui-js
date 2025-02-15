import { ptr } from "bun:ffi";
import control from "../control";

class strokeParams extends control {
    constructor({ cap = 0, join = 0, thickness = 1.0, miterLimit = 10.0, dashes = [], dashPhase = 0.0 } = {}) {
        super();
        const buffer = new ArrayBuffer(48);
        dashes = Float64Array.from(dashes);

        const view = new DataView(buffer);

        view.setUint32(0, cap, true);
        view.setUint32(4, join, true);
        view.setFloat64(8, thickness, true);
        view.setFloat64(16, miterLimit, true);
        view.setBigUint64(24, BigInt(ptr(dashes)), true);
        view.setUint32(32, dashes.length, true);
        view.setFloat64(40, dashPhase, true);

        this._handle = ptr(view);
    }
}

export default strokeParams;

