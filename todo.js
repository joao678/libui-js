import { libui, window, vbox, table, hbox, entry, button } from './libui/index.js';

libui.init();

const win = new window("Todo app", 640, 480, 0);
win.onClosing(function () {
    libui.quit();
    return 1
});

function removeFromList(index) {
    todoList.data = todoList.data.toSpliced(index, 1);
}

const vbox1 = new vbox();

const todoList = new table([{
    name: 'Done',
    type: 'checkbox'
}, {
    name: 'Description',
    type: 'text'
}, {
    name: '',
    type: 'button'
}]);

todoList.selectionMode = 1;

const h = new hbox();
const textEntry = new entry();
const addButton = new button("+");

addButton.onClicked(function () {
    todoList.data = [
        ...todoList.data,
        [
            {
                value: false,
                editable: true,
                onClicked: function () {
                    console.log("checked");
                }
            },
            {
                value: textEntry.text,
                editable: true
            },
            {
                value: '-',
                editable: true,
                onClicked: function (index) {
                    removeFromList(index)
                }
            }
        ]
    ];
    textEntry.text = '';
});

h.append(textEntry, true);
h.append(addButton, false);

vbox1.append(h, false);
vbox1.append(todoList, true);

win.child = vbox1;
win.margined = 5;

win.show();

libui.main();
libui.uninit();