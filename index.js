const {
    libui,
    window,
    button,
    vbox,
    checkbox,
    colorButton,
    combobox,
    dateTimePicker,
    datePicker,
    timePicker,
    editablecombobox,
    entry,
    passwordentry,
    searchEntry,
    fontbutton,
    form,
    grid,
    group,
    label,
    multilineentry,
    nonWrappingMultilineentry,
    progressbar,
    radiobuttons,
    verticalSeparator,
    horizontalSeparator,
    hbox,
    slider,
    spinbox,
    tab,
    table,
    tablemodel,
    image,
    menu
} = require('./libui/index.js');

libui.init();

const mnu = new menu('teste');
const item1 = mnu.appendItem('abc');
mnu.appendQuitItem();
item1.onMenuItemClicked(function () {
    console.log('menu teste');
});

const win = new window("Teste 123", 640, 480, 1);
win.show();

libui.timer(1000, function () {
    console.log('1 second timer');
});

win.onClosing(function () {
    libui.quit();
    return 1
});

libui.onShouldQuit(function () {
    console.log('should quit');
});

const vbox1 = new vbox();

const a = new checkbox('checkbox');
a.onToggled(function () {
    console.log('checkbox toggled', a.checked);
});

const b = new colorButton();
b.onChanged(function () {
    console.log('colorbutton changed', b.color);
});

const c = new button('button');
c.onClicked(function () {
    console.log('button clicked');
});

const d = new combobox();
d.onSelected(function () {
    console.log('combobox', d.selected, d.numItems);
    d.selected = 0;
});

['first', 'b', 'c', 'd'].forEach(e => d.append(e));
d.insertAt(2, 'xyz')
d.delete(4);

const e = new dateTimePicker();
const f = new datePicker();
const g = new timePicker();

let tempTime = e.time;
tempTime.setFullYear(1800);
e.time = tempTime;

e.onChanged(function () {
    console.log(e.time);
});

f.onChanged(function () {
    console.log('changed');
});

const h = new editablecombobox();
h.append('a');
h.onChanged(function () {
    console.log(h.text)
});

const i = new entry();
i.onChanged(function () {
    console.log(i.text)
});

const j = new passwordentry();
j.onChanged(function () {
    console.log(j.text)
});

const k = new searchEntry();
k.onChanged(function () {
    console.log(k.text)
});

const l = new fontbutton();
l.onChanged(function () {
    console.log(l.font)
});

const m = new form();
m.append(new button('button form'), 'form label', true);

const n = new grid();
n.append(new button('a'), 0, 0, 1, 1, 1, n.uiAlign.uiAlignFill, 1, n.uiAlign.uiAlignFill);
n.append(new button('b'), 1, 0, 1, 1, 1, n.uiAlign.uiAlignFill, 1, n.uiAlign.uiAlignFill);
n.append(new button('c'), 0, 1, 1, 1, 1, n.uiAlign.uiAlignFill, 1, n.uiAlign.uiAlignFill);
n.append(new button('d'), 1, 1, 1, 1, 1, n.uiAlign.uiAlignFill, 1, n.uiAlign.uiAlignFill);

const o = new group('group');
o.child = new button('a');

const p = new label('label');

const q = new multilineentry();
q.append('test');

const r = new nonWrappingMultilineentry();
r.append('test');

const s = new progressbar();
s.value = 50;

const t = new radiobuttons();
t.append('a');
t.append('b');
t.append('c');

t.onSelected(function () {
    console.log('radiobuttons selected', t.selected);
})

t.selected = 1;

const u = new verticalSeparator();

const v = new grid();
v.append(new button('a'), 0, 0, 1, 1, 1, v.uiAlign.uiAlignFill, 1, v.uiAlign.uiAlignFill);
v.append(new horizontalSeparator(), 1, 0, 1, 1, 0, v.uiAlign.uiAlignFill, 1, v.uiAlign.uiAlignFill);
v.append(new button('b'), 2, 0, 1, 1, 1, v.uiAlign.uiAlignFill, 1, v.uiAlign.uiAlignFill);

const w = new slider(0, 1000);
w.onChanged(function () {
    console.log('slider changed', w.value);
});

w.onReleased(function () {
    console.log('slider released', w.value);
});

const x = new spinbox(0, 1000);
x.value = 50;
x.onChanged(function () {
    console.log('spinbox changed', x.value);
});

const y = new tab();
const b1 = new button('a')
b1.onClicked(function () {
    libui.msgbox('teste 1', 'teste 2');
    libui.msgboxError('teste 1', 'teste 2');
    console.log(libui.openFile(win));
    console.log(libui.openFolder(win));
    console.log(libui.saveFile(win));
});

y.append('a', b1);
y.append('b', new button('b'));

if (process.platform != 'linux') {
    const z = new table([{
        name: 'a',
        type: 'text'
    }]);

    z.data = [
        [
            { value: 'teste1', editable: true, textColor: [0.0, 0.0, 1.0, 1.0] },
        ],
        [
            { value: 'teste2', editable: true, textColor: [0.0, 1.0, 0.0, 1.0] },
        ],
        [
            { value: 'teste3', editable: true },
        ],
    ];

    z.rowColors = [
        [1.0, 0.0, 0.0, 0.4],
    ];

    z.selectionMode = 3;

    z.onRowClicked(function () {
        z.data = [
            ...z.data,
            [{ value: 'new', editable: true }]
        ]
        z.selection = {
            NumRows: 1,
            Rows: [z.data.length - 1]
        }
        console.log(z.selection)
    });
}

vbox1.append(a, 0);
vbox1.append(b, 0);
vbox1.append(c, 0);
vbox1.append(d, 0);
vbox1.append(e, 0);
vbox1.append(f, 0);
vbox1.append(g, 0);
vbox1.append(h, 0);
vbox1.append(i, 0);
vbox1.append(j, 0);
vbox1.append(l, 0);
vbox1.append(m, 0);
vbox1.append(n, 0);
vbox1.append(o, 0);
vbox1.append(p, 0);
vbox1.append(q, 1);
vbox1.append(r, 1);
vbox1.append(s, 0);
vbox1.append(t, 0);
vbox1.append(u, 0);
vbox1.append(v, 0);
vbox1.append(w, 0);
vbox1.append(x, 0);
vbox1.append(y, 0);
if (process.platform != 'linux') vbox1.append(z, 1);

win.child = vbox1;
win.margined = 5;

libui.main();