const control = require("../control");
const { lib, koffi } = require("../lib");
const { tablemodel, NumColumns, ColumnType, NumRows, CellValue, SetCellValue } = require("../table/tablemodel");

const uiTableTextColumnOptionalParams = koffi.struct('uiTableTextColumnOptionalParams', {
    ColorModelColumn: 'int',
});

const uiTableParams = koffi.struct('uiTableParams', {
    Model: 'void*',
    RowBackgroundColorModelColumn: 'int',
});

const uiTableSelection = koffi.struct('uiTableSelection', {
    NumRows: 'int',
    Rows: 'int*',
});

const uiTable = koffi.pointer('uiTable', koffi.opaque());

const uiTableAppendTextColumn = lib.func('void uiTableAppendTextColumn (uiTable *t, const char *name, int textModelColumn, int textEditableModelColumn, uiTableTextColumnOptionalParams *textParams)');
const uiTableAppendImageColumn = lib.func('void uiTableAppendImageColumn (uiTable *t, const char *name, int imageModelColumn)');
const uiTableAppendImageTextColumn = lib.func('void uiTableAppendImageTextColumn (uiTable *t, const char *name, int imageModelColumn, int textModelColumn, int textEditableModelColumn, uiTableTextColumnOptionalParams *textParams)');
const uiTableAppendCheckboxColumn = lib.func('void uiTableAppendCheckboxColumn (uiTable *t, const char *name, int checkboxModelColumn, int checkboxEditableModelColumn)');
const uiTableAppendCheckboxTextColumn = lib.func('void uiTableAppendCheckboxTextColumn (uiTable *t, const char *name, int checkboxModelColumn, int checkboxEditableModelColumn, int textModelColumn, int textEditableModelColumn, uiTableTextColumnOptionalParams *textParams)');
const uiTableAppendProgressBarColumn = lib.func('void uiTableAppendProgressBarColumn (uiTable *t, const char *name, int progressModelColumn)');
const uiTableAppendButtonColumn = lib.func('void uiTableAppendButtonColumn (uiTable *t, const char *name, int buttonModelColumn, int buttonClickableModelColumn)');
const uiTableHeaderVisible = lib.func('int uiTableHeaderVisible (uiTable *t)');
const uiTableHeaderSetVisible = lib.func('void uiTableHeaderSetVisible (uiTable *t, int visible)');
const uiNewTable = lib.func('uiTable * uiNewTable (uiTableParams *params)');
const uiTableHeaderSetSortIndicator = lib.func('void uiTableHeaderSetSortIndicator (uiTable *t, int column, int indicator)');
const uiTableHeaderSortIndicator = lib.func('int uiTableHeaderSortIndicator (uiTable *t, int column)');
const uiTableColumnWidth = lib.func('int uiTableColumnWidth (uiTable *t, int column)');
const uiTableColumnSetWidth = lib.func('void uiTableColumnSetWidth (uiTable *t, int column, int width)');
const uiTableGetSelectionMode = lib.func('int uiTableGetSelectionMode (uiTable *t)');
const uiTableSetSelectionMode = lib.func('void uiTableSetSelectionMode (uiTable *t, int mode)');
const uiTableGetSelection = lib.func('uiTableSelection * uiTableGetSelection (uiTable *t)');
const uiTableSetSelection = lib.func('void uiTableSetSelection (uiTable *t, uiTableSelection *sel)');

const uiNewTableValueString = lib.func('uiTableValue* uiNewTableValueString (const char *str)');
const uiTableValueString = lib.func('char* uiTableValueString(const uiTableValue *v)');
const uiNewTableValueInt = lib.func('uiTableValue* uiNewTableValueInt (int i)');
const uiTableValueInt = lib.func('int uiTableValueInt(const uiTableValue *v)');
const uiNewTableValueImage = lib.func('uiTableValue *uiNewTableValueImage(void *img)');
const uiTableValueImage = lib.func('void uiTableValueInt(const uiTableValue *v)');
const uiNewTableValueColor = lib.func('uiTableValue* uiNewTableValueColor(double r, double g, double b, double a)');
const uiTableValueColor = lib.func('void uiTableValueColor(const uiTableValue *v, _Out_ double *r, _Out_ double *g, _Out_ double *b, _Out_ double *a)');

const tableOnRowClickedCb = koffi.proto('tableOnRowClickedCb', 'void', ['uiTable*', 'int', 'void *']);
const uiTableOnRowClicked = lib.func('void uiTableOnRowClicked (uiTable *t, tableOnRowClickedCb *cb, void *data)');

const tableOnRowDoubleClickedCb = koffi.proto('tableOnRowDoubleClickedCb', 'void', ['uiTable*', 'int', 'void *']);
const uiTableOnRowDoubleClicked = lib.func('void uiTableOnRowDoubleClicked (uiTable *t, tableOnRowDoubleClickedCb *cb, void *data)');

const tableHeaderOnClickedCb = koffi.proto('tableHeaderOnClickedCb', 'void', ['uiTable*', 'int', 'void *']);
const uiTableHeaderOnClicked = lib.func('void uiTableHeaderOnClicked (uiTable *t, tableHeaderOnClickedCb *cb, void *data)');

const tableOnSelectionChangedCb = koffi.proto('tableOnSelectionChangedCb', 'void', ['uiTable*', 'void *']);
const uiTableOnSelectionChanged = lib.func('void uiTableOnSelectionChanged (uiTable *t, tableOnSelectionChangedCb *cb, void *data)');

function getUniqueRandomInts(min, max, count) {
    const numbers = [];
    while (numbers.length < count) {
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(randomInt)) {
            numbers.push(randomInt);
        }
    }
    return numbers;
}

class table extends control {
    constructor(columns) {
        super();

        const ids = getUniqueRandomInts(1, 2147483647, columns.length * 5);

        this.columns = columns.map((col, index) => {
            return {
                type: col.type,
                name: col.name,
                textId: ids[index * 5],
                textEditableId: ids[(index * 5) + 1],
                controlId: ids[(index * 5) + 2],
                controlEditableId: ids[(index * 5) + 3],
                textColorId: ids[(index * 5) + 4],
            }
        });

        const me = this;
        this.tm = new tablemodel({
            NumColumns: koffi.register(() => {
                return 0;
            }, NumColumns),
            ColumnType: koffi.register(() => {
                return 0;
            }, ColumnType),
            NumRows: koffi.register(() => {
                return 0;
            }, NumRows),
            CellValue: koffi.register(function (m, mh, row, column) {
                if (column === 0) {
                    const [r, g, b, a] = me.rowColors[row] || [0, 0, 0, 0];
                    return uiNewTableValueColor(parseFloat(r), parseFloat(g), parseFloat(b), parseFloat(a));
                };
                const columnIndex = me.columns.findIndex(c => c.textId == column || c.textEditableId == column || c.controlId == column || c.controlEditableId == column || c.textColorId == column);

                switch (me.columns[columnIndex].type) {
                    case 'text':
                        if (me.columns[columnIndex].textId === column) return uiNewTableValueString(me._data[row][columnIndex].value);
                        if (me.columns[columnIndex].textEditableId === column) return uiNewTableValueInt(me._data[row][columnIndex].editable + 0);
                        if (me.columns[columnIndex].textColorId === column) return uiNewTableValueColor(...(me._data[row][columnIndex].textColor || [0, 0, 0, 1]));
                        break;
                    case 'image':
                        if (me.columns[columnIndex].controlId === column) return uiNewTableValueImage(me._data[row][columnIndex].value._handle);
                        break;
                    case 'checkbox':
                        if (me.columns[columnIndex].controlId === column) return uiNewTableValueInt(me._data[row][columnIndex].value);
                        if (me.columns[columnIndex].controlEditableId === column) return uiNewTableValueInt(me._data[row][columnIndex].editable + 0);
                        break;
                    case 'progressbar':
                        if (me.columns[columnIndex].controlId === column) return uiNewTableValueInt(me._data[row][columnIndex].value);
                        break;
                    case 'button':
                        if (me.columns[columnIndex].textId === column) return uiNewTableValueString(me._data[row][columnIndex].value);
                        if (me.columns[columnIndex].controlEditableId === column) return uiNewTableValueInt(me._data[row][columnIndex].editable + 0);
                        break;
                    case 'image_text':
                        if (me.columns[columnIndex].controlId === column) return uiNewTableValueImage(me._data[row][columnIndex].value._handle);
                        if (me.columns[columnIndex].textId === column) return uiNewTableValueString(me._data[row][columnIndex].text);
                        if (me.columns[columnIndex].textEditableId === column) return uiNewTableValueInt(me._data[row][columnIndex].editable + 0);
                        if (me.columns[columnIndex].textColorId === column) return uiNewTableValueColor(...(me._data[row][columnIndex].textColor || [0, 0, 0, 1]));
                        break;
                    case 'checkbox_text':
                        if (me.columns[columnIndex].controlId === column) return uiNewTableValueInt(me._data[row][columnIndex].value);
                        if (me.columns[columnIndex].controlEditableId === column) return uiNewTableValueInt(me._data[row][columnIndex].editable + 0);
                        if (me.columns[columnIndex].textId === column) return uiNewTableValueString(me._data[row][columnIndex].text);
                        if (me.columns[columnIndex].textEditableId === column) return uiNewTableValueInt(me._data[row][columnIndex].textEditable + 0);
                        if (me.columns[columnIndex].textColorId === column) return uiNewTableValueColor(...(me._data[row][columnIndex].textColor || [0, 0, 0, 1]));
                        break;
                }
            }, CellValue),
            SetCellValue: koffi.register(function (m, mh, row, column, value) {
                console.log('SetCellValue', mh, mh, row, column, value);
                const columnIndex = me.columns.findIndex(c => c.textId == column || c.textEditableId == column || c.controlId == column || c.controlEditableId == column);
                switch (me.columns[columnIndex].type) {
                    case 'text':
                        me._data[row][columnIndex].value = uiTableValueString(value);
                        return uiNewTableValueString(me._data[row][columnIndex].value);
                    case 'checkbox':
                        me._data[row][columnIndex].value = uiTableValueInt(value);
                        return uiNewTableValueInt(me._data[row][columnIndex].value);
                    case 'button':
                        me._data[row][columnIndex].onClicked(row, column);
                        break;
                    case 'image_text':
                        me._data[row][columnIndex].text = uiTableValueString(value);
                        return uiNewTableValueString(me._data[row][columnIndex].text);
                    case 'checkbox_text':
                        me._data[row][columnIndex].text = uiTableValueString(value);
                        return uiNewTableValueString(me._data[row][columnIndex].text);
                }

            }, SetCellValue)
        });

        this._handle = uiNewTable({
            Model: this.tm._handle,
            RowBackgroundColorModelColumn: 0
        });

        this.columns.forEach(column => {
            switch (column.type) {
                case 'text':
                    this.appendTextColumn(column.name, column.textId, column.textEditableId, column.textColorId);
                    break;
                case 'image':
                    this.appendImageColumn(column.name, column.controlId);
                    break;
                case 'checkbox':
                    this.appendCheckboxColumn(column.name, column.controlId, column.controlEditableId);
                    break;
                case 'progressbar':
                    this.appendProgressBarColumn(column.name, column.controlId);
                    break;
                case 'button':
                    this.appendButtonColumn(column.name, column.textId, column.controlEditableId);
                    break;
                case 'image_text':
                    this.appendImageTextColumn(column.name, column.controlId, column.textId, column.textEditableId, column.textColorId);
                    break;
                case 'checkbox_text':
                    this.appendCheckboxTextColumn(column.name, column.controlId, column.controlEditableId, column.textId, column.textEditableId, column.textColorId);
                    break;
                case 'color':
                    this.appendCheckboxTextColumn(column.name, column.controlId, column.controlEditableId, column.textId, column.textEditableId);
                    break;
            }
        });
    }

    appendTextColumn(name, columnId, editableId, colorId) {
        const colorColumnId = colorId || 0;
        uiTableAppendTextColumn(this._handle, name, columnId, editableId, colorColumnId ? koffi.as({ ColorModelColumn: colorId }, 'uiTableTextColumnOptionalParams*') : colorColumnId);
    }

    appendImageColumn(name, columnId) {
        uiTableAppendImageColumn(this._handle, name, columnId)
    }

    appendProgressBarColumn(name, columnId) {
        uiTableAppendProgressBarColumn(this._handle, name, columnId)
    }

    appendCheckboxColumn(name, columnId, editableId) {
        uiTableAppendCheckboxColumn(this._handle, name, columnId, editableId);
    }

    appendButtonColumn(name, columnId, editableId) {
        uiTableAppendButtonColumn(this._handle, name, columnId, editableId)
    }

    appendImageTextColumn(name, imageColumnId, textColumnId, textColumnEditableId, colorId) {
        const colorColumnId = colorId || 0;
        uiTableAppendImageTextColumn(this._handle, name, imageColumnId, textColumnId, textColumnEditableId, colorColumnId ? koffi.as({ ColorModelColumn: colorId }, 'uiTableTextColumnOptionalParams*') : colorColumnId)
    }

    appendCheckboxTextColumn(name, checkboxColumnId, checkboxEditableColumnId, textColumnId, textColumnEditableId, colorId) {
        const colorColumnId = colorId || 0;
        uiTableAppendCheckboxTextColumn(this._handle, name, checkboxColumnId, checkboxEditableColumnId, textColumnId, textColumnEditableId, colorColumnId ? koffi.as({ ColorModelColumn: colorId }, 'uiTableTextColumnOptionalParams*') : colorColumnId)
    }

    setSortIndicator(col, indicator) {
        uiTableHeaderSetSortIndicator(this._handle, col, indicator);
    }

    getSortIndicator(col, indicator) {
        return uiTableHeaderSortIndicator(this._handle, col);
    }

    setColumnWidth(col, width) {
        uiTableColumnSetWidth(this._handle, col, width);
    }

    getColumnWidth(col) {
        return uiTableColumnWidth(this._handle, col);
    }

    onRowClicked(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiTableOnRowClicked(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(tableOnRowClickedCb));
    }

    onRowDoubleClicked(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiTableOnRowDoubleClicked(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(tableOnRowDoubleClickedCb));
    }

    onHeaderClicked(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiTableHeaderOnClicked(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(tableHeaderOnClickedCb));
    }

    onSelectionChanged(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiTableOnSelectionChanged(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(tableOnSelectionChangedCb));
    }

    get selectionMode() {
        return uiTableGetSelectionMode(this._handle);
    }

    set selectionMode(mode) {
        uiTableSetSelectionMode(this._handle, mode);
    }

    get headerVisible() {
        return uiTableHeaderVisible(this._handle);
    }

    set headerVisible(value) {
        uiTableHeaderSetVisible(this._handle, value + 0);
    }

    get selection() {
        const sel = koffi.decode(uiTableGetSelection(this._handle), 'uiTableSelection');
        const rows = koffi.decode(sel.Rows, koffi.array('int', sel.NumRows));
        return { NumRows: sel.NumRows, Rows: Array.from(rows) };
    }

    set selection(sel) {
        uiTableSetSelection(this._handle, sel);
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
        for (let index = 0; index < value.length; index++) { this.tm.modelRowDeleted(0) };
        for (let index = 0; index < value.length; index++) { this.tm.modelRowInserted(index) };
    }

    rowColors = [];
    columns = null;
    _data = null;
    tm = null;
}

exports.table = table;