const control = require("../control");
const { lib, koffi } = require("../lib");

// Define the union inside `uiTableValue`
const UiTableValueUnion = koffi.union('UiTableValueUnion', {
    str: 'char*',
    img: 'void*',
    i: 'int',
    color: koffi.struct({
        r: 'double',
        g: 'double',
        b: 'double',
        a: 'double'
    })
});

// Define the `uiTableValue` struct
const UiTableValue = koffi.struct('uiTableValue', {
    type: 'int',
    u: UiTableValueUnion  // Union as a field
});

const NumColumns = koffi.pointer(koffi.proto('int NumColumns(void *, void *)'));
const ColumnType = koffi.pointer(koffi.proto('int ColumnType(void *, void *, int column)'));
const NumRows = koffi.pointer(koffi.proto('int NumRows(void *, void *)'));
const CellValue = koffi.pointer(koffi.proto('uiTableValue* CellValue(void *mh, void *m, int row, int column)'));
const SetCellValue = koffi.pointer(koffi.proto('void SetCellValue(void *, void *, int, int, const void *)'));

const uiTableModelHandler = koffi.struct('uiTableModelHandler', {
    NumColumns: NumColumns,
    ColumnType: ColumnType,
    NumRows: NumRows,
    CellValue: CellValue,
    SetCellValue: SetCellValue
});


const uiTableModel = koffi.pointer('uiTableModel', koffi.opaque());

const uiNewTableModel = lib.func('uiTableModel * uiNewTableModel(uiTableModelHandler *mh)');
const uiFreeTableModel = lib.func('void uiFreeTableModel(uiTableModel * m)');
const uiTableModelRowInserted = lib.func('void uiTableModelRowInserted(uiTableModel * m, int newIndex)');
const uiTableModelRowChanged = lib.func('void uiTableModelRowChanged(uiTableModel * m, int index)');
const uiTableModelRowDeleted = lib.func('void uiTableModelRowDeleted(uiTableModel * m, int oldIndex)');

class tablemodel extends control {
    constructor(handler) {
        super();
        this._handle = uiNewTableModel(handler);
    }

    modelRowInserted(value) {
        uiTableModelRowInserted(this._handle, value)
    }

    modelRowChanged(index) {
        uiTableModelRowChanged(this._handle, index)
    }

    modelRowDeleted(index) {
        uiTableModelRowDeleted(this._handle, index)
    }
}

exports.tablemodel = tablemodel;
exports.NumColumns = NumColumns;
exports.ColumnType = ColumnType;
exports.NumRows = NumRows;
exports.CellValue = CellValue;
exports.SetCellValue = SetCellValue;