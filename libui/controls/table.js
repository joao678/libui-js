import { CString, JSCallback, ptr, read } from "bun:ffi";
import control from "../control";
import { _uiNewTable, _uiNewTableModel, _uiNewTableValueColor, _uiNewTableValueImage, _uiNewTableValueInt, _uiNewTableValueString, _uiTableAppendButtonColumn, _uiTableAppendCheckboxColumn, _uiTableAppendCheckboxTextColumn, _uiTableAppendImageColumn, _uiTableAppendImageTextColumn, _uiTableAppendProgressBarColumn, _uiTableAppendTextColumn, _uiTableColumnSetWidth, _uiTableGetSelection, _uiTableGetSelectionMode, _uiTableHeaderOnClicked, _uiTableHeaderSetSortIndicator, _uiTableHeaderSetVisible, _uiTableHeaderSortIndicator, _uiTableHeaderVisible, _uiTableModelRowDeleted, _uiTableModelRowInserted, _uiTableOnRowClicked, _uiTableOnRowDoubleClicked, _uiTableOnSelectionChanged, _uiTableSetSelection, _uiTableSetSelectionMode, _uiTableValueInt, _uiTableValueString } from "../lib";
import { str } from "../util/util";

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

        const me = this;
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

        this._tableModelHandler = BigUint64Array.from([
            //NumColumns
            BigInt(new JSCallback(function (tableModelHandler, tableModel) { return 0 }, {
                args: ["ptr", "ptr"],
                returns: "i32",
                threadsafe: false
            }).ptr),
            //ColumnType
            BigInt(new JSCallback(function (tableModelHandler, tableModel, column) { return 0 }, {
                args: ["ptr", "ptr", "i32"],
                returns: "i32",
                threadsafe: false
            }).ptr),
            //NumRows
            BigInt(new JSCallback(function (tableModelHandler, tableModel) { return 0 }, {
                args: ["ptr", "ptr"],
                returns: "i32",
                threadsafe: false
            }).ptr),
            //CellValue
            BigInt(new JSCallback(function (tableModelHandler, tableModel, row, column) {
                if (column === 0) {
                    const [r, g, b, a] = me.rowColors[row] || [0, 0, 0, 0];
                    return _uiNewTableValueColor(Math.fround(parseFloat(r)), Math.fround(parseFloat(g)), Math.fround(parseFloat(b)), Math.fround(parseFloat(a)));
                };
                const columnIndex = me.columns.findIndex(c => c.textId == column || c.textEditableId == column || c.controlId == column || c.controlEditableId == column || c.textColorId == column);

                switch (me.columns[columnIndex].type) {
                    case 'text':
                        if (me.columns[columnIndex].textId === column) return _uiNewTableValueString(str`${me._data[row][columnIndex].value}`);
                        if (me.columns[columnIndex].textEditableId === column) return _uiNewTableValueInt(me._data[row][columnIndex].editable + 0);
                        if (me.columns[columnIndex].textColorId === column) return _uiNewTableValueColor(...(me._data[row][columnIndex].textColor || [0, 0, 0, 1]).map(x => Math.fround(x)));
                        break;
                    case 'image':
                        if (me.columns[columnIndex].controlId === column) return _uiNewTableValueImage(me._data[row][columnIndex].value._handle);
                        break;
                    case 'checkbox':
                        if (me.columns[columnIndex].controlId === column) return _uiNewTableValueInt(me._data[row][columnIndex].value + 0);
                        if (me.columns[columnIndex].controlEditableId === column) return _uiNewTableValueInt(me._data[row][columnIndex].editable + 0);
                        break;
                    case 'progressbar':
                        if (me.columns[columnIndex].controlId === column) return _uiNewTableValueInt(me._data[row][columnIndex].value);
                        break;
                    case 'button':
                        if (me.columns[columnIndex].textId === column) return _uiNewTableValueString(str`${me._data[row][columnIndex].value}`);
                        if (me.columns[columnIndex].controlEditableId === column) return _uiNewTableValueInt(me._data[row][columnIndex].editable + 0);
                        break;
                    case 'image_text':
                        if (me.columns[columnIndex].controlId === column) return _uiNewTableValueImage(me._data[row][columnIndex].value._handle);
                        if (me.columns[columnIndex].textId === column) return _uiNewTableValueString(str`${me._data[row][columnIndex].text}`);
                        if (me.columns[columnIndex].textEditableId === column) return _uiNewTableValueInt(me._data[row][columnIndex].editable + 0);
                        if (me.columns[columnIndex].textColorId === column) return _uiNewTableValueColor(...(me._data[row][columnIndex].textColor || [0, 0, 0, 1]).map(x => Math.fround(x)));
                        break;
                    case 'checkbox_text':
                        if (me.columns[columnIndex].controlId === column) return _uiNewTableValueInt(me._data[row][columnIndex].value);
                        if (me.columns[columnIndex].controlEditableId === column) return _uiNewTableValueInt(me._data[row][columnIndex].editable + 0);
                        if (me.columns[columnIndex].textId === column) return _uiNewTableValueString(str`${me._data[row][columnIndex].text}`);
                        if (me.columns[columnIndex].textEditableId === column) return _uiNewTableValueInt(me._data[row][columnIndex].textEditable + 0);
                        if (me.columns[columnIndex].textColorId === column) return _uiNewTableValueColor(...(me._data[row][columnIndex].textColor || [0, 0, 0, 1]).map(x => Math.fround(x)));
                        break;
                }
            }, {
                args: ["ptr", "ptr", "i32", "i32"],
                returns: "ptr",
                threadsafe: false
            }).ptr),
            //SetCellValue
            BigInt(new JSCallback(function (m, mh, row, column, value) {
                const columnIndex = me.columns.findIndex(c => c.textId == column || c.textEditableId == column || c.controlId == column || c.controlEditableId == column);
                switch (me.columns[columnIndex].type) {
                    case 'text':
                        me._data[row][columnIndex].value = new CString(_uiTableValueString(value));
                        return _uiNewTableValueString(str`${me._data[row][columnIndex].value}`);
                    case 'checkbox':
                        me._data[row][columnIndex].onClicked(row, column);
                        me._data[row][columnIndex].value = _uiTableValueInt(value);
                        return _uiNewTableValueInt(me._data[row][columnIndex].value);
                    case 'button':
                        me._data[row][columnIndex].onClicked(row, column);
                        break;
                        //return _uiNewTableValueString(str`${me._data[row][columnIndex].value}`);
                    case 'image_text':
                        me._data[row][columnIndex].text = new CString(_uiTableValueString(value));
                        return _uiNewTableValueString(str`${me._data[row][columnIndex].text}`);
                    case 'checkbox_text':
                        me._data[row][columnIndex].text = new CString(_uiTableValueString(value));
                        return _uiNewTableValueString(str`${me._data[row][columnIndex].text}`);
                }
            }, {
                args: ["ptr", "ptr", "i32", "i32", "ptr"],
                returns: "void",
                threadsafe: false
            }).ptr)
        ]);

        this._tableModel = _uiNewTableModel(ptr(this._tableModelHandler));
        let tableParams = ptr(new BigUint64Array([BigInt(this._tableModel), BigInt(0)]));

        this._handle = _uiNewTable(tableParams);

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
        _uiTableAppendTextColumn(this._handle, str`${name}`, columnId, editableId, ptr(Int32Array.from([colorColumnId])));
    }

    appendImageColumn(name, columnId) {
        _uiTableAppendImageColumn(this._handle, str`${name}`, columnId)
    }

    appendProgressBarColumn(name, columnId) {
        _uiTableAppendProgressBarColumn(this._handle, str`${name}`, columnId)
    }

    appendCheckboxColumn(name, columnId, editableId) {
        _uiTableAppendCheckboxColumn(this._handle, str`${name}`, columnId, editableId);
    }

    appendButtonColumn(name, columnId, editableId) {
        _uiTableAppendButtonColumn(this._handle, str`${name}`, columnId, editableId)
    }

    appendImageTextColumn(name, imageColumnId, textColumnId, textColumnEditableId, colorId) {
        const colorColumnId = colorId || 0;
        _uiTableAppendImageTextColumn(this._handle, str`${name}`, imageColumnId, textColumnId, textColumnEditableId, ptr(Int32Array.from([colorColumnId])))
    }

    appendCheckboxTextColumn(name, checkboxColumnId, checkboxEditableColumnId, textColumnId, textColumnEditableId, colorId) {
        const colorColumnId = colorId || 0;
        _uiTableAppendCheckboxTextColumn(this._handle, str`${name}`, checkboxColumnId, checkboxEditableColumnId, textColumnId, textColumnEditableId, ptr(Int32Array.from([colorColumnId])))
    }

    setSortIndicator(col, indicator) {
        _uiTableHeaderSetSortIndicator(this._handle, col, indicator);
    }

    getSortIndicator(col, indicator) {
        return _uiTableHeaderSortIndicator(this._handle, col);
    }

    setColumnWidth(col, width) {
        _uiTableColumnSetWidth(this._handle, col, width);
    }

    getColumnWidth(col) {
        return uiTableColumnWidth(this._handle, col);
    }

    onRowClicked(cb) {
        _uiTableOnRowClicked(this._handle, new JSCallback(function (table, row, data) { cb(...arguments) }, {
            args: ["ptr", "i32", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }

     onRowDoubleClicked(cb) {
        _uiTableOnRowDoubleClicked(this._handle, new JSCallback(function (table, row, data) { cb(...arguments) }, {
            args: ["ptr", "i32", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }

    onHeaderClicked(cb) {
        _uiTableHeaderOnClicked(this._handle, new JSCallback(function (table, column, data) { cb(...arguments) }, {
            args: ["ptr", "i32", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }

    onSelectionChanged(cb) {
        _uiTableOnSelectionChanged(this._handle, new JSCallback(function (table, data) { cb(...arguments) }, {
            args: ["ptr", "ptr"],
            returns: "void",
            threadsafe: false
        }).ptr, null);
    }

    get headerVisible() {
        return _uiTableHeaderVisible(this._handle);
    }

    set headerVisible(value) {
        _uiTableHeaderSetVisible(this._handle, value);
    }

    get selection() {
        const tableSelection = _uiTableGetSelection(this._handle);
        const numRows = read.i32(tableSelection, 0);
        const rows = read.ptr(tableSelection, 8);
        if (rows) return new Array(numRows).fill().map((_, index) => read.i32(rows, index * 4));
        return null;
    }

    set selection(sel) {
        _uiTableSetSelection(this._handle, ptr(BigUint64Array.from([BigInt(sel.length), BigInt(ptr(Int32Array.from(sel)))])));
    }

    get selectionMode() {
        return _uiTableGetSelectionMode(this._handle);
    }

    set selectionMode(mode) {
        _uiTableSetSelectionMode(this._handle, mode);
    }

    get data() {
        return this._data;
    }

    set data(value) {
        for (let index = 0; index < this._data.length; index++) {
            _uiTableModelRowDeleted(this._tableModel, 0);
        };
        this._data = value;
        for (let index = 0; index < this._data.length; index++) {
            _uiTableModelRowInserted(this._tableModel, index);
        };
    }

    rowColors = [];
    columns = null;
    _data = [];
    _tableModel = null;
    _tableModelHandler = null;
}

export default table;