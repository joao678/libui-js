const control = require("../control");
const { lib, koffi } = require("../lib");

const uiWindow = koffi.pointer('uiWindow', koffi.opaque());

const uiNewWindow = lib.func('uiWindow* uiNewWindow(const char *title, int width, int height, int hasMenubar)');
const uiWindowTitle = lib.func('char *uiWindowTitle(uiWindow *w)');
const uiWindowSetTitle = lib.func('void uiWindowSetTitle(uiWindow *w, const char *title)');
const uiWindowPosition = lib.func('void uiWindowPosition (uiWindow *w, _Out_ int *x, _Out_ int *y)');
const uiWindowSetPosition = lib.func('void uiWindowSetPosition (uiWindow *w, int x, int y)');
const uiWindowContentSize = lib.func('void uiWindowContentSize (uiWindow *w, _Out_ int *width, _Out_ int *height)');
const uiWindowSetContentSize = lib.func('void uiWindowSetContentSize (uiWindow *w, int width, int height)');
const uiWindowFullscreen = lib.func('int uiWindowFullscreen (int *w)');
const uiWindowSetFullscreen = lib.func('void uiWindowSetFullscreen (uiWindow *w, int fullscreen)');
const uiWindowFocused = lib.func('int uiWindowFocused (int *w)');
const uiWindowBorderless = lib.func('int uiWindowBorderless (int *w)');
const uiWindowSetBorderless = lib.func('void uiWindowSetBorderless (uiWindow *w, int borderless)');
const uiWindowSetChild = lib.func('void uiWindowSetChild (uiWindow *w, int *child)');
const uiWindowMargined = lib.func('int uiWindowMargined (int *w)');
const uiWindowSetMargined = lib.func('void uiWindowSetMargined (uiWindow *w, int margined)');
const uiWindowResizeable = lib.func('int uiWindowResizeable (uiWindow *w)');
const uiWindowSetResizeable = lib.func('void uiWindowSetResizeable (uiWindow *w, int resizeable)');

const windowPositionChangedCb = koffi.proto('windowPositionChangedCb', 'int', ['uiWindow*', 'void *']);
const uiWindowOnPositionChanged = lib.func('void uiWindowOnPositionChanged (uiWindow *w, windowPositionChangedCb *cb, void *data)');
const windowContentSizeChangedCb = koffi.proto('windowContentSizeChangedCb', 'int', ['uiWindow*', 'void *']);
const uiWindowOnContentSizeChanged = lib.func('void uiWindowOnContentSizeChanged (uiWindow *w, windowContentSizeChangedCb *cb, void *data)');
const windowClosingCb = koffi.proto('windowClosingCb', 'int', ['uiWindow*', 'void *']);
const uiWindowOnClosing = lib.func('void uiWindowOnClosing (uiWindow *w, windowClosingCb *cb, void *data)');
const windowFocusChangedCb = koffi.proto('windowFocusChangedCb', 'int', ['uiWindow*', 'void *']);
const uiWindowOnFocusChanged = lib.func('void uiWindowOnFocusChanged (uiWindow *w, windowFocusChangedCb *cb, void *data)');

class window extends control {
    constructor(title, width, height, hasMenubar) {
        super();
        this._handle = uiNewWindow(title, width, height, hasMenubar);
    }

    get title() { return uiWindowTitle(this._handle) }
    set title(value) { uiWindowSetTitle(this._handle, value) }

    get position() {
        let x = koffi.alloc('int', 1);
        let y = koffi.alloc('int', 1);
        uiWindowPosition(this._handle, x, y);
        return [koffi.decode(x, 'int'), koffi.decode(y, 'int')]
    }
    set position({ x, y }) { uiWindowSetPosition(this._handle, x, y) }

    get contentSize() {
        let width = koffi.alloc('int', 1);
        let height = koffi.alloc('int', 1);
        uiWindowContentSize(this._handle, width, height);
        return [koffi.decode(width, 'int'), koffi.decode(height, 'int')];
    }

    set contentSize({ width, height }) { uiWindowSetContentSize(this._handle, width, height) }

    get fullscreen() { return uiWindowFullscreen(this._handle) }
    set fullscreen(value) {
        uiWindowSetFullscreen(this._handle, value + 0);
    }

    get focused() { return uiWindowFocused(this._handle) }

    get borderless() { return uiWindowBorderless(this._handle) }
    set borderless(value) { uiWindowSetBorderless(this._handle, value + 0) }

    set child(ctrl) { uiWindowSetChild(this._handle, koffi.as(ctrl._handle, 'void*')); }

    get margined() { return uiWindowMargined(this._handle) }
    set margined(value) { uiWindowSetMargined(this._handle, value + 0) }

    get resizeable() { return uiWindowResizeable(this._handle) }
    set resizeable(value) { uiWindowSetResizeable(this._handle, value + 0) }

    onPositionChanged(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiWindowOnPositionChanged(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(windowPositionChangedCb));
    }

    onContentSizeChanged(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiWindowOnContentSizeChanged(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(windowContentSizeChangedCb));
    }

    onClosing(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiWindowOnClosing(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(windowClosingCb));
    }

    onFocusChanged(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiWindowOnFocusChanged(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(windowFocusChangedCb));
    }
}

module.exports = window;