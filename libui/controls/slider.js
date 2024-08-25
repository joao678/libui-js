const control = require("../control");
const { lib, koffi } = require("../lib");

const uiSlider = koffi.pointer('uiSlider', koffi.opaque());

const uiSliderValue = lib.func('int uiSliderValue (uiSlider *s)');
const uiSliderSetValue = lib.func('void uiSliderSetValue (uiSlider *s, int value)');
const uiSliderHasToolTip = lib.func('int uiSliderHasToolTip (uiSlider *s)');
const uiSliderSetHasToolTip = lib.func('void uiSliderSetHasToolTip (uiSlider *s, int hasToolTip)');
const uiSliderSetRange = lib.func('void uiSliderSetRange (uiSlider *s, int min, int max)');
const uiNewSlider = lib.func('uiSlider * uiNewSlider (int min, int max)');

const sliderOnChangedCb = koffi.proto('sliderOnChangedCb', 'int', ['uiEntry*', 'void *']);
const uiSliderOnChanged = lib.func('void uiSliderOnChanged (uiSlider *s, sliderOnChangedCb *cb, void *data)');

const sliderOnReleasedCb = koffi.proto('sliderOnReleasedCb', 'int', ['uiEntry*', 'void *']);
const uiSliderOnReleased = lib.func('void uiSliderOnReleased (uiSlider *s, sliderOnReleasedCb *cb, void *data)');

class slider extends control {
    constructor(min, max) {
        super();
        this._handle = uiNewSlider(min, max);
    }

    get value() { return uiSliderValue(this._handle) }
    set value(value) { uiSliderSetValue(this._handle, value) }

    get hasTooltip() { return !!uiSliderHasToolTip(this._handle) }
    set hasTooltip(value) { uiSliderSetHasToolTip(this._handle, value + 0) }

    setRange(min, max) { uiSliderSetRange(this._handle, min, max) }

    onChanged(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiSliderOnChanged(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(sliderOnChangedCb));
    }

    onReleased(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiSliderOnReleased(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(sliderOnReleasedCb));
    }
}

module.exports = slider;