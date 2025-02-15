import { ptr, CString, read } from "bun:ffi";
import control from "../control";
import { _uiAttributedStringAppendUnattributed, _uiAttributedStringDelete, _uiAttributedStringInsertAtUnattributed, _uiAttributedStringLen, _uiAttributedStringSetAttribute, _uiAttributedStringString, _uiDrawNewTextLayout, _uiLoadControlFont, _uiNewAttributedString, _uiNewBackgroundAttribute, _uiNewColorAttribute, _uiNewFamilyAttribute, _uiNewItalicAttribute, _uiNewSizeAttribute, _uiNewStretchAttribute, _uiNewUnderlineAttribute, _uiNewUnderlineColorAttribute, _uiNewWeightAttribute } from "../lib";
import { str } from "../util/util";

class fontDescriptor extends control {
    constructor({
        family = "",
        size = 8,
        weight = 100,
        italic = 0,
        stretch = 0
    } = {}) {
        super();

        const buffer = new ArrayBuffer(8 * 5);
        const view = new DataView(buffer);

        let offset = 0;
        view.setBigUint64(offset, BigInt(ptr(str`${family}`)), true);
        offset += 8;
        view.setFloat64(offset, size, true);
        offset += 8;
        view.setInt32(offset, weight, true);
        offset += 8;
        view.setInt32(offset, italic, true);
        offset += 8;
        view.setInt32(offset, stretch, true);

        this._handle = ptr(view);
    }
}

export default fontDescriptor;