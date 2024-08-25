const control = require("../control");
const { lib, koffi } = require("../lib");

const uiFontDescriptor = koffi.struct('uiFontDescriptor', {
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
const uiFontButtonOnChanged = lib.func('void uiFontButtonOnChanged (uiFontButton *w, fontButtonOnChanged *cb, void *data)');

class fontbutton extends control {
    constructor() {
        super();
        this._handle = uiNewFontButton();
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
        let _uiFontDescriptor = koffi.alloc('uiFontDescriptor', 1);
        uiFontButtonFont(this._handle, _uiFontDescriptor);
        _uiFontDescriptor = koffi.decode(_uiFontDescriptor, 'uiFontDescriptor');

        return _uiFontDescriptor;
    }

    onChanged(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiFontButtonOnChanged(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(fontButtonOnChanged));
    }
}

exports.fontbutton = fontbutton;