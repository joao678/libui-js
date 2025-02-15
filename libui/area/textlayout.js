import { ptr, CString, read } from "bun:ffi";
import control from "../control";
import { _uiDrawNewTextLayout, _uiLoadControlFont, _uiNewAttributedString } from "../lib";
import { str } from "../util/util";
import attributedString from "./attributedString";

class textlayout extends control {
    constructor({
        string = "",
        defaultFont = null,
        width = 100,
        align = 0
    } = {}) {
        super();

        const defaultFontBuffer = new ArrayBuffer(8 * 5);
        const defaultFontView = new DataView(defaultFontBuffer);

        if (defaultFont === null) {
            defaultFont = ptr(defaultFontView);
            _uiLoadControlFont(ptr(defaultFontView));
        } else {
            defaultFont = defaultFont._handle
        };

        const buffer = new ArrayBuffer(8 * 4);
        const view = new DataView(buffer);

        if (typeof string === "string") string = new attributedString(string)

        let offset = 0;
        view.setBigUint64(offset, BigInt(string._handle), true);
        offset += 8;
        view.setBigUint64(offset, BigInt(defaultFont), true);
        offset += 8;
        view.setFloat64(offset, Math.fround(width), true);
        offset += 8;
        view.setBigUint64(offset, BigInt(align), true);

        this._handle = _uiDrawNewTextLayout(ptr(view));
    }
}

export default textlayout;