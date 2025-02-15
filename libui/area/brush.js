import { ptr, toArrayBuffer } from "bun:ffi";
import control from "../control";

class brush extends control {
    constructor({
        type = 0,
        r = 0.0,
        g = 0.0,
        b = 0.0,
        a = 0.0,
        x0 = 0.0,
        y0 = 0.0,
        x1 = 0.0,
        y1 = 0.0,
        outerRadius = 0.0,
        stops = []
    } = {}) {
        super();
        const buffer = new ArrayBuffer(96);
        const view = new DataView(buffer);

        const stopsBuffer = new ArrayBuffer(40 * stops.length);
        const stopsView = new DataView(stopsBuffer);

        if (stops.length) {
            stops.forEach((stop, index) => {
                let offset = 40 * index;
                stopsView.setFloat64(offset, (stop.pos), true);
                offset += 8;
                stopsView.setFloat64(offset, (stop.r), true);
                offset += 8;
                stopsView.setFloat64(offset, (stop.g), true);
                offset += 8;
                stopsView.setFloat64(offset, (stop.b), true);
                offset += 8;
                stopsView.setFloat64(offset, (stop.a), true);
                offset += 8;
            });
        }

        let offset = 0;
        view.setUint32(offset, type, true);
        offset += 8;
        view.setFloat64(offset, r, true);
        offset += 8;
        view.setFloat64(offset, g, true);
        offset += 8;
        view.setFloat64(offset, b, true);
        offset += 8;
        view.setFloat64(offset, a, true);
        offset += 8;

        view.setFloat64(offset, x0, true);
        offset += 8;
        view.setFloat64(offset, y0, true);
        offset += 8;
        view.setFloat64(offset, x1, true);
        offset += 8;
        view.setFloat64(offset, y1, true);
        offset += 8;
        view.setFloat64(offset, outerRadius, true);
        offset += 8;

        if (stops.length) {
            view.setBigUint64(offset, BigInt(stops.length ? ptr(stopsView) : 0n), true);
            offset += 8;
            view.setBigUint64(offset, BigInt(stops.length), true);
        }

        this._handle = ptr(view);
    }
}

export default brush;