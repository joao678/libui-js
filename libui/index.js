
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

const uiInitOptions = koffi.struct('uiInitOptions', {
    Size: 'size_t',
});

const uiInit = lib.func('const char *uiInit(uiInitOptions *o)');
const uiMain = lib.func('void uiMain(void)');
const uiQuit = lib.func('void uiQuit(void)');

class libui {
    static init() { uiInit({}) }
    static main() { uiMain() }
    static quit() { uiQuit() }
}

exports.libui = libui;
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