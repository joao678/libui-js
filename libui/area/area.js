import { CString, JSCallback, ptr, read } from "bun:ffi";
import control from "../control";
import { _uiNewArea, _uiNewTable, _uiNewTableModel, _uiNewTableValueColor, _uiNewTableValueImage, _uiNewTableValueInt, _uiNewTableValueString, _uiTableAppendButtonColumn, _uiTableAppendCheckboxColumn, _uiTableAppendCheckboxTextColumn, _uiTableAppendImageColumn, _uiTableAppendImageTextColumn, _uiTableAppendProgressBarColumn, _uiTableAppendTextColumn, _uiTableColumnSetWidth, _uiTableGetSelection, _uiTableGetSelectionMode, _uiTableHeaderOnClicked, _uiTableHeaderSetSortIndicator, _uiTableHeaderSetVisible, _uiTableHeaderSortIndicator, _uiTableHeaderVisible, _uiTableModelRowDeleted, _uiTableModelRowInserted, _uiTableOnRowClicked, _uiTableOnRowDoubleClicked, _uiTableOnSelectionChanged, _uiTableSetSelection, _uiTableSetSelectionMode, _uiTableValueInt, _uiTableValueString } from "../lib";
import { str } from "../util/util";

class area extends control {
    constructor(draw, mouseEvent, mouseCrossed, dragBroken, keyEvent) {
        super();

        this._areaHandler = BigUint64Array.from([
            //Draw
            BigInt(new JSCallback(function (handler, area, params) {
                /* let drawParams = {
                    context: read.ptr(params, 0*8),
                    areaWidth: read.f64(params, 1*8),
                    areaHeight: read.f64(params, 2*8),
                    clipWidth: read.f64(params, 3*8),
                    clipHeight: read.f64(params, 4*8),
                }
                draw(drawParams); */
                draw(params);
                console.log("draw");
            }, {
                args: ["ptr", "ptr", "ptr"],
                returns: "void",
                threadsafe: false
            }).ptr),
            //MouseEvent
            BigInt(new JSCallback(function (tableModelHandler, tableModel, column) {
                //console.log("mouseEvent");
            }, {
                args: ["ptr", "ptr", "ptr"],
                returns: "void",
                threadsafe: false
            }).ptr),
            //MouseCrossed
            BigInt(new JSCallback(function (tableModelHandler, tableModel) {
                //console.log("MouseCrossed");
            }, {
                args: ["ptr", "ptr", "i32"],
                returns: "void",
                threadsafe: false
            }).ptr),
            //DragBroken
            BigInt(new JSCallback(function (tableModelHandler, tableModel, row, column) {
                //console.log("DragBroken");
            }, {
                args: ["ptr", "ptr"],
                returns: "i32",
                threadsafe: false
            }).ptr),
            //KeyEvent
            BigInt(new JSCallback(function (m, mh, row, column, value) {
                return keyEvent(...arguments);
            }, {
                args: ["ptr", "ptr", "ptr"],
                returns: "i32",
                threadsafe: false
            }).ptr)
        ]);

        /* this._tableModel = _uiNewTableModel(ptr(this._areaHandler));
        let tableParams = ptr(new BigUint64Array([BigInt(this._tableModel), BigInt(0)])); */

        this._handle = _uiNewArea(ptr(this._areaHandler));
    }

    setSize(width, height) {
        uiAreaSetSize(this._handle, width, height);
    }

    redrawAll() {
        uiAreaQueueRedrawAll(this._handle);
    }

    /* get text() { return uiButtonText(this._handle) }
    set text(value) { uiButtonSetText(this._handle, value) }

    onClicked(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiButtonOnClicked(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(buttonClickedCb));
    } */
}

export default area;