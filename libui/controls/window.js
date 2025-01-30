import control from "../control.js";
import {
    _uiNewWindow,
    _uiWindowBorderless,
    _uiWindowContentSize,
    _uiWindowFocused,
    _uiWindowFullscreen,
    _uiWindowMargined,
    _uiWindowOnClosing,
    _uiWindowOnContentSizeChanged,
    _uiWindowOnFocusChanged,
    _uiWindowOnPositionChanged,
    _uiWindowPosition,
    _uiWindowResizeable,
    _uiWindowSetBorderless,
    _uiWindowSetChild,
    _uiWindowSetContentSize,
    _uiWindowSetFullscreen,
    _uiWindowSetMargined,
    _uiWindowSetPosition,
    _uiWindowSetResizeable,
    _uiWindowSetTitle,
    _uiWindowTitle
} from "../lib";
import { str } from "../util/util.js";
import { cc, FFIType, JSCallback, CString, ptr, read } from "bun:ffi";

class window extends control {
    constructor(title, width, height, hasMenubar) {
        super();
        this._handle = _uiNewWindow(str`${title}`, width, height, hasMenubar);
    }

    get title() { return new CString(_uiWindowTitle(this._handle)) }
    set title(value) { _uiWindowSetTitle(this._handle, str`${value}`) }

    get position() {
        let x = ptr(new Int32Array(1), 0);
        let y = ptr(new Int32Array(1), 0);
        _uiWindowPosition(this._handle, x, y);
        return [read.i32(x, 0), read.i32(y, 0)];
    }
    set position({ x, y }) { _uiWindowSetPosition(this._handle, x, y) }

    get contentSize() {
        let width = ptr(new Int32Array(1), 0);
        let height = ptr(new Int32Array(1), 0);
        _uiWindowContentSize(this._handle, width, height);
        return [read.i32(width, 0), read.i32(height, 0)];
    }

    set contentSize({ width, height }) { _uiWindowSetContentSize(this._handle, width, height) }

    get fullscreen() { return _uiWindowFullscreen(this._handle) }
    set fullscreen(value) { _uiWindowSetFullscreen(this._handle, value); }

    get focused() { return _uiWindowFocused(this._handle) }

    get borderless() { return _uiWindowBorderless(this._handle) }
    set borderless(value) { _uiWindowSetBorderless(this._handle, value) }

    set child(ctrl) { _uiWindowSetChild(this._handle, ctrl._handle); }

    get margined() { return _uiWindowMargined(this._handle) }
    set margined(value) { _uiWindowSetMargined(this._handle, value + 0) }

    get resizeable() { return _uiWindowResizeable(this._handle) }
    set resizeable(value) { _uiWindowSetResizeable(this._handle, value + 0) }

    onPositionChanged(cb) {
        _uiWindowOnPositionChanged(this._handle, new JSCallback(function (sender, senderData) { return cb(...arguments) }, {
            returns: "void",
            args: ["ptr", "ptr"],
            threadsafe: false
        }).ptr, 0);
    }

    onContentSizeChanged(cb) {
        _uiWindowOnContentSizeChanged(this._handle, new JSCallback(function (sender, senderData) { return cb(...arguments) }, {
            returns: "void",
            args: ["ptr", "ptr"],
            threadsafe: false
        }).ptr, 0);
    }

    onClosing(cb) {
        _uiWindowOnClosing(this._handle, new JSCallback(function (window, sender) { return cb(...arguments) }, {
            returns: "int",
            args: ["ptr"],
            threadsafe: false
        }).ptr, 0);
    }

    onFocusChanged(cb) {
        _uiWindowOnFocusChanged(this._handle, new JSCallback(function (sender, senderData) { return cb(...arguments) }, {
            returns: "void",
            args: ["ptr", "ptr"],
            threadsafe: false
        }).ptr, 0);
    }
}

export default window;