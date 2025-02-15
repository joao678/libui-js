import { ptr, CString, read } from "bun:ffi";
import control from "../control";
import { _uiAttributedStringAppendUnattributed, _uiAttributedStringDelete, _uiAttributedStringInsertAtUnattributed, _uiAttributedStringLen, _uiAttributedStringSetAttribute, _uiAttributedStringString, _uiDrawNewTextLayout, _uiLoadControlFont, _uiNewAttributedString, _uiNewBackgroundAttribute, _uiNewColorAttribute, _uiNewFamilyAttribute, _uiNewItalicAttribute, _uiNewSizeAttribute, _uiNewStretchAttribute, _uiNewUnderlineAttribute, _uiNewUnderlineColorAttribute, _uiNewWeightAttribute } from "../lib";
import { str } from "../util/util";

class attributedString extends control {
    constructor(string = "") {
        super();
        this._handle = _uiNewAttributedString(str`${string}`);
    }

    setAttribute(attribute, start, end) {
        _uiAttributedStringSetAttribute(this._handle, attribute, start, end);
    }

    familyAttribute(family) {
        return _uiNewFamilyAttribute(str`${family}`);
    }

    sizeAttribute(size) {
        return _uiNewSizeAttribute(Math.fround(size));
    }

    weightAttribute(weight) {
        return _uiNewWeightAttribute(weight);
    }

    italicAttribute(italic) {
        return _uiNewItalicAttribute(italic);
    }

    stretchAttribute(stretch) {
        return _uiNewStretchAttribute(stretch);
    }

    colorAttribute(r, g, b, a) {
        return _uiNewColorAttribute(Math.fround(r), Math.fround(g), Math.fround(b), Math.fround(a));
    }

    // This dosen't work on windows for some reason, even in the original examples
    backgroundAttribute(r, g, b, a) {
        return _uiNewBackgroundAttribute(Math.fround(r), Math.fround(g), Math.fround(b), Math.fround(a));
    }

    underlineAttribute(underline) {
        return _uiNewUnderlineAttribute(underline);
    }

    underlineColorAttribute(underline, r, g, b, a) {
        return _uiNewUnderlineColorAttribute(underline, Math.fround(r), Math.fround(g), Math.fround(b), Math.fround(a));
    }

    appendUnattributed(string) {
        _uiAttributedStringAppendUnattributed(this._handle, str`${string}`);
    }

    insertAtUnattributed(string, at) {
        _uiAttributedStringInsertAtUnattributed(this._handle, str`${string}`, typeof at === "undefined" ? this.length : at);
    }

    delete(start, end) {
        _uiAttributedStringDelete(this._handle, start, end);
    }

    get string() {
        return new CString(_uiAttributedStringString(this._handle));
    }

    get length() {
        return _uiAttributedStringLen(this._handle);
    }
    
}

export default attributedString;