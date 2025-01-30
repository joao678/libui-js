import { CString, JSCallback, read, ptr } from "bun:ffi";
import control from "../control";
import { _uiButtonOnClicked, _uiButtonSetText, _uiButtonText, _uiComboboxAppend, _uiComboboxClear, _uiComboboxDelete, _uiComboboxInsertAt, _uiComboboxNumItems, _uiComboboxOnSelected, _uiComboboxSelected, _uiComboboxSetSelected, _uiFontButtonFont, _uiFontButtonOnChanged, _uiNewButton, _uiNewCombobox, _uiNewFontButton } from "../lib";
import { str } from "../util/util";

/* const uiFontDescriptor = koffi.struct('uiFontDescriptor', {
    Family: 'char *',
    Size: 'double',
    Weight: 'int',
    Italic: 'int',
    Stretch: 'int',
});

const uiFontButton = koffi.pointer('uiFontButton', koffi.opaque());

const uiNewFontButton = lib.func('uiFontButton* uiNewFontButton()');
const uiFontButtonFont = lib.func('void uiFontButtonFont (uiFontButton *b, uiFontDescriptor *desc)');

const fontButtonOnChanged = koffi.proto('fontButtonOnChanged', 'int', ['uiFontButton*', 'void *']);
const uiFontButtonOnChanged = lib.func('void uiFontButtonOnChanged (uiFontButton *w, fontButtonOnChanged *cb, void *data)'); */

class fontbutton extends control {
    constructor() {
        super();
        this._handle = _uiNewFontButton();
    }

    uiTextWeight = {
        uiTextWeightMinimum: 0,
        uiTextWeightThin: 100,
        uiTextWeightUltraLight: 200,
        uiTextWeightLight: 300,
        uiTextWeightBook: 350,
        uiTextWeightNormal: 400,
        uiTextWeightMedium: 500,
        uiTextWeightSemiBold: 600,
        uiTextWeightBold: 700,
        uiTextWeightUltraBold: 800,
        uiTextWeightHeavy: 900,
        uiTextWeightUltraHeavy: 950,
        uiTextWeightMaximum: 1000,
    }

    uiTextItalic = {
        uiTextItalicNormal: 0,
        uiTextItalicOblique: 1,
        uiTextItalicItalic: 2,
    }

    uiTextStretch = {
        uiTextStretchUltraCondensed: 0,
        uiTextStretchExtraCondensed: 1,
        uiTextStretchCondensed: 2,
        uiTextStretchSemiCondensed: 3,
        uiTextStretchNormal: 4,
        uiTextStretchSemiExpanded: 5,
        uiTextStretchExpanded: 6,
        uiTextStretchExtraExpanded: 7,
        uiTextStretchUltraExpanded: 8,
    }

    get font() {
        let tm = ptr(new Float64Array(32), 0);
        _uiFontButtonFont(this._handle, tm);

        let fontInfo = {
            name: new CString(read.ptr(tm, 0*8)),
            size: read.f64(tm, 1*8),
            weight: read.i32(tm, 2*8),
            italic: read.i32(tm, 3*8),
            stretch: read.i32(tm, 4*8),
        }
        
        return fontInfo;
    }

    onChanged(cb) {
        _uiFontButtonOnChanged(this._handle, new JSCallback(function (sender, senderData) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }
}

export default fontbutton;