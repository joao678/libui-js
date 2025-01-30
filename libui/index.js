import { CString, JSCallback } from "bun:ffi";
import area from "./area/area.js";
import brush from "./area/brush.js";
import areaPath from "./area/path.js";
import { hbox, vbox } from "./controls/box.js";
import button from "./controls/button.js";
import checkbox from "./controls/checkbox.js";
import colorButton from "./controls/colorbutton.js";
import combobox from "./controls/combobox.js";
import { datePicker, dateTimePicker, timePicker } from "./controls/datetimepicker.js";
import editablecombobox from "./controls/editablecombobox.js";
import { entry, passwordentry, searchEntry } from "./controls/entry.js";
import fontbutton from "./controls/fontbutton.js";
import form from "./controls/form.js";
import grid from "./controls/grid.js";
import group from "./controls/group.js";
import label from "./controls/label.js";
import menu from "./controls/menu.js";
import { multilineentry, nonWrappingMultilineentry } from "./controls/multilineentry.js";
import progressbar from "./controls/progressbar.js";
import radiobuttons from "./controls/radiobuttons.js";
import { horizontalSeparator, verticalSeparator } from "./controls/separator.js";
import slider from "./controls/slider.js";
import spinbox from "./controls/spinbox.js";
import tab from "./controls/tab.js";
import table from "./controls/table.js";
import window from "./controls/window.js";
import { _uiInit, _uiMain, _uiMainStep, _uiMainSteps, _uiMsgBox, _uiMsgBoxError, _uiOnShouldQuit, _uiOpenFile, _uiOpenFolder, _uiQuit, _uiSaveFile, _uiTimer, _uiUninit } from "./lib.js";
import { str } from "./util/util.js";

class libui {
    static init() { _uiInit({}) }
    static main() { _uiMain() }
    static quit() { _uiQuit() }
    static mainSteps() { _uiMainSteps() }
    static uninit() { _uiUninit() }
    static mainStep(wait) { return _uiMainStep(wait) }

    static onShouldQuit(cb) {
        _uiOnShouldQuit(new JSCallback(function (data) { return cb(...arguments) }, {
            returns: "int",
            args: ["ptr"],
            threadsafe: false
        }).ptr, null);
    }

    static timer(milliseconds, cb) {
        _uiTimer(milliseconds, new JSCallback(function (data) { return cb(...arguments) }, {
            returns: "int",
            args: ["ptr"],
            threadsafe: false
        }).ptr, 0);
    }
    static msgbox(title, description) {
        _uiMsgBox(null, str`${title}`, str`${description}`);
    }
    static msgboxError(title, description) {
        _uiMsgBoxError(null, str`${title}`, str`${description}`);
    }
    static openFile(parent) {
        return new CString(_uiOpenFile(null));
    }
    static openFolder(parent) {
        return new CString(_uiOpenFolder(null));
    }
    static saveFile(parent) {
        return new CString(_uiSaveFile(null));
    }
}

export {
    area, areaPath, brush, button, checkbox,
    colorButton, combobox, datePicker, dateTimePicker, editablecombobox,
    entry, fontbutton,
    form,
    grid,
    group, hbox, horizontalSeparator, label, libui, menu, multilineentry,
    nonWrappingMultilineentry, passwordentry, progressbar,
    radiobuttons, searchEntry, slider,
    spinbox,
    tab,
    table, timePicker, vbox, verticalSeparator, window
};

