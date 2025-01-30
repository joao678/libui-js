import control from "../control";
import { _uiDateTimePickerOnChanged, _uiDateTimePickerSetTime, _uiDateTimePickerTime, _uiNewDatePicker, _uiNewDateTimePicker, _uiNewTimePicker } from "../lib";
import { CString, JSCallback, read, ptr, FFIType } from "bun:ffi";

/*tm = {
    tm_sec: 'int',   // seconds after the minute - [0, 60] including leap second
    tm_min: 'int',   // minutes after the hour - [0, 59]
    tm_hour: 'int',  // hours since midnight - [0, 23]
    tm_mday: 'int',  // day of the month - [1, 31]
    tm_mon: 'int',   // months since January - [0, 11]
    tm_year: 'int',  // years since 1900
    tm_wday: 'int',  // days since Sunday - [0, 6]
    tm_yday: 'int',  // days since January 1 - [0, 365]
    tm_isdst: 'int', // daylight savings time flag
}
*/

const dateTimePickerSymbol = Symbol();

class dateTimePicker extends control {
    constructor() {
        super();
        this[dateTimePickerSymbol]();
    }

    [dateTimePickerSymbol]() {
        this._handle = _uiNewDateTimePicker();
    }

     get time() {
        let tm = ptr(new Int32Array(9), 0);
        _uiDateTimePickerTime(this._handle, tm);

        const tempDate = new Date();
        
        tempDate.setSeconds(read.i32(tm, 0*4));
        tempDate.setMinutes(read.i32(tm, 1*4));
        tempDate.setHours(read.i32(tm, 2*4));
        tempDate.setDate(read.i32(tm, 3*4));
        tempDate.setMonth(read.i32(tm, 4*4));
        tempDate.setFullYear(1900 + read.i32(tm, 5*4));

        return tempDate;
    }

    set time(newDate) {
        let tm = ptr(Int32Array.from([newDate.getSeconds(), newDate.getMinutes(), newDate.getHours(), newDate.getDate(), newDate.getMonth(), newDate.getFullYear() - 1900]), 0);
        _uiDateTimePickerSetTime(this._handle, tm);
    }

    onChanged(cb) {
        _uiDateTimePickerOnChanged(this._handle, new JSCallback(function (sender, senderData) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }
}

class datePicker extends dateTimePicker {
    [dateTimePickerSymbol]() {
        this._handle = _uiNewDatePicker();
    }
}

class timePicker extends dateTimePicker {
    [dateTimePickerSymbol]() {
        this._handle = _uiNewTimePicker();
    }
}

export {
    dateTimePicker,
    datePicker,
    timePicker
}