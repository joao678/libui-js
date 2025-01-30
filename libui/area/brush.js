import { ptr } from "bun:ffi";
import control from "../control";

class brush extends control {
    constructor(type, r, g, b, a, x0, y0, x1, y1, outerRadius, stops, numStops) {
        super();

        this._handle = ptr(
            new Float64Array([
                type || 0,
                Math.fround(r) || 0,
                Math.fround(g) || 0,
                Math.fround(b) || 0,
                Math.fround(a) || 0,
                Math.fround(x0) || 0,
                Math.fround(y0) || 0,
                Math.fround(x1) || 0,
                Math.fround(y1) || 0,
                Math.fround(outerRadius) || 0,
                ptr(stops) || null,
                numStops || 0
            ])
        );
    }
}

export default brush;