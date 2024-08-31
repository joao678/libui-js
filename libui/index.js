
const { hbox, vbox } = require('./controls/box');
const button = require('./controls/button');
const window = require('./controls/window');
const checkbox = require('./controls/checkbox.js');
const { lib, koffi } = require('./lib');
const colorButton = require('./controls/colorbutton.js');
const combobox = require('./controls/combobox.js');
const { dateTimePicker, datePicker, timePicker } = require('./controls/datetimepicker.js');
const editablecombobox = require('./controls/editablecombobox.js');
const { entry, passwordentry, searchEntry } = require('./controls/entry.js');
const { fontbutton } = require('./controls/fontbutton.js');
const { form } = require('./controls/form.js');
const { grid } = require('./controls/grid.js');
const { group } = require('./controls/group.js');
const slider = require('./controls/slider.js');
const label = require('./controls/label.js');
const { multilineentry, nonWrappingMultilineentry } = require('./controls/multilineentry.js');
const progressbar = require('./controls/progressbar.js');
const radiobuttons = require('./controls/radiobuttons.js');
const { horizontalSeparator, verticalSeparator } = require('./controls/separator.js');
const spinbox = require('./controls/spinbox.js');
const tab = require('./controls/tab.js');
const { table } = require('./controls/table.js');
const { tablemodel } = require('./table/tablemodel.js');
const image = require('./image/image.js');
const menu = require('./controls/menu.js');
const area = require('./area/area.js');
const path = require('./area/path.js');

const uiInitOptions = koffi.struct('uiInitOptions', {
    Size: 'size_t',
});

const uiInit = lib.func('const char *uiInit(uiInitOptions *o)');
const uiMain = lib.func('void uiMain(void)');
const uiQuit = lib.func('void uiQuit(void)');
const uiUninit = lib.func('void uiUninit(void)');
const uiMsgBox = lib.func('void uiMsgBox(uiWindow *parent, const char *title, const char *description)');
const uiMsgBoxError = lib.func('void uiMsgBoxError(uiWindow *parent, const char *title, const char *description)');
const uiOpenFile = lib.func('char* uiOpenFile(uiWindow *parent)');
const uiOpenFolder = lib.func('char* uiOpenFolder(uiWindow *parent)');
const uiSaveFile = lib.func('char* uiSaveFile(uiWindow *parent)');
const uiMainSteps = lib.func('void uiMainSteps(void)');
const uiMainStep = lib.func('int uiMainStep(int wait)');

const uiTimerCb = koffi.proto('uiTimerCb', 'int', ['void *']);
const uiTimer = lib.func('void uiTimer(int milliseconds, uiTimerCb* cb, void *data)');

const uiOnShouldQuitCb = koffi.proto('uiOnShouldQuitCb', 'int', ['void *']);
const uiOnShouldQuit = lib.func('void uiOnShouldQuit(uiOnShouldQuitCb *cb, void *data)');

class libui {
    static init() { uiInit({}) }
    static main() { uiMain() }
    static quit() { uiQuit() }
    static mainSteps() { uiMainSteps() }
    static uninit() { uiUninit() }
    static mainStep(wait) { return uiMainStep(wait) }

    static onShouldQuit(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiOnShouldQuit(_cb, 0);
        koffi.register(_cb, koffi.pointer(uiOnShouldQuitCb));
    }

    static timer(milliseconds, cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiTimer(milliseconds, _cb, 0);
        koffi.register(_cb, koffi.pointer(uiTimerCb));
    }
    static msgbox(title, description) {
        uiMsgBox(null, title, description);
    }
    static msgboxError(title, description) {
        uiMsgBoxError(null, title, description);
    }
    static openFile(parent) {
        return uiOpenFile(null);
    }
    static openFolder(parent) {
        return uiOpenFolder(null);
    }
    static saveFile(parent) {
        return uiSaveFile(null);
    }
}

exports.libui = libui;

exports.image = image;
exports.window = window;
exports.button = button;
exports.checkbox = checkbox;
exports.colorButton = colorButton;
exports.combobox = combobox;
exports.hbox = hbox;
exports.vbox = vbox;
exports.dateTimePicker = dateTimePicker;
exports.datePicker = datePicker;
exports.timePicker = timePicker;
exports.editablecombobox = editablecombobox;
exports.entry = entry;
exports.passwordentry = passwordentry;
exports.searchEntry = searchEntry;
exports.fontbutton = fontbutton;
exports.form = form;
exports.grid = grid;
exports.group = group;
exports.label = label;
exports.multilineentry = multilineentry;
exports.nonWrappingMultilineentry = nonWrappingMultilineentry;
exports.progressbar = progressbar;
exports.radiobuttons = radiobuttons;
exports.horizontalSeparator = horizontalSeparator;
exports.verticalSeparator = verticalSeparator;
exports.slider = slider;
exports.spinbox = spinbox;
exports.tab = tab;
exports.table = table;
exports.tablemodel = tablemodel;
exports.menu = menu;
exports.area = area;
exports.path = path;