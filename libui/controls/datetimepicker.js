const control = require("../control");
const { lib, koffi } = require("../lib");

const tm = koffi.struct('tm', {
    tm_sec: 'int',   // seconds after the minute - [0, 60] including leap second
    tm_min: 'int',   // minutes after the hour - [0, 59]
    tm_hour: 'int',  // hours since midnight - [0, 23]
    tm_mday: 'int',  // day of the month - [1, 31]
    tm_mon: 'int',   // months since January - [0, 11]
    tm_year: 'int',  // years since 1900
    tm_wday: 'int',  // days since Sunday - [0, 6]
    tm_yday: 'int',  // days since January 1 - [0, 365]
    tm_isdst: 'int', // daylight savings time flag
});

const uiDateTimePicker = koffi.pointer('uiDateTimePicker', koffi.opaque());

const uiNewDateTimePicker = lib.func('uiDateTimePicker* uiNewDateTimePicker(void)');
const uiNewDatePicker = lib.func('uiDateTimePicker* uiNewDatePicker(void)');
const uiNewTimePicker = lib.func('uiDateTimePicker* uiNewTimePicker(void)');
const uiDateTimePickerTime = lib.func('void uiDateTimePickerTime (uiDateTimePicker *d, tm *time)');
const uiDateTimePickerSetTime = lib.func('void uiDateTimePickerSetTime (uiDateTimePicker *d, const tm *time)');

const dateTimePickerOnChangedCb = koffi.proto('dateTimePickerOnChangedCb', 'int', ['uiDateTimePicker*', 'void *']);
const uiDateTimePickerOnChanged = lib.func('void uiDateTimePickerOnChanged (uiDateTimePicker *w, dateTimePickerOnChangedCb *cb, void *data)');

const dateTimePickerSymbol = Symbol();

class dateTimePicker extends control {
    constructor() {
        super();
        this[dateTimePickerSymbol]();
    }

    [dateTimePickerSymbol]() {
        this._handle = uiNewDateTimePicker();
    }

    get time() {
        let _tm = koffi.alloc('tm', 1);
        uiDateTimePickerTime(this._handle, _tm);
        _tm = koffi.decode(_tm, 'tm');

        const tempDate = new Date();
        tempDate.setSeconds(_tm.tm_sec);
        tempDate.setMinutes(_tm.tm_min);
        tempDate.setHours(_tm.tm_hour);
        tempDate.setDate(_tm.tm_mday);
        tempDate.setMonth(_tm.tm_mon);
        tempDate.setFullYear(1900 + _tm.tm_year);

        return tempDate;
    }

    set time(newDate) {
        const _tm = {
            tm_sec: newDate.getSeconds(),
            tm_min: newDate.getMinutes(),
            tm_hour: newDate.getHours(),
            tm_mday: newDate.getDate(),
            tm_mon: newDate.getMonth(),
            tm_year: newDate.getFullYear() - 1900,
            tm_isdst: -1,
        }
        uiDateTimePickerSetTime(this._handle, _tm)
    }

    onChanged(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiDateTimePickerOnChanged(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(dateTimePickerOnChangedCb));
    }
}

class datePicker extends dateTimePicker {
    [dateTimePickerSymbol]() {
        this._handle = uiNewDatePicker();
    }
}

class timePicker extends dateTimePicker {
    [dateTimePickerSymbol]() {
        this._handle = uiNewTimePicker();
    }
}

exports.dateTimePicker = dateTimePicker;
exports.datePicker = datePicker;
exports.timePicker = timePicker;