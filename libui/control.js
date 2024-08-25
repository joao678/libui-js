const { lib, koffi } = require("./lib");

const uiControl = koffi.opaque('uiControl');
const uiControlDestroy = lib.func('void uiControlDestroy (uiControl *c)');
const uiControlHandle = lib.func('uintptr_t uiControlHandle (uiControl *c)');
const uiControlParent = lib.func('uiControl* uiControlParent (uiControl *c)');
const uiControlSetParent = lib.func('void uiControlSetParent (uiControl *c, uiControl *parent)');
const uiControlToplevel = lib.func('int uiControlToplevel (uiControl *c)');
const uiControlVisible = lib.func('int uiControlVisible (uiControl *c)');
const uiControlShow = lib.func('void uiControlShow(uiControl *c)');
const uiControlHide = lib.func('void uiControlHide (uiControl *c)');
const uiControlEnabled = lib.func('int uiControlEnabled (uiControl *c)');
const uiControlEnable = lib.func('void uiControlEnable (uiControl *c)');
const uiControlDisable = lib.func('void uiControlDisable (uiControl *c)');
const uiFreeControl = lib.func('void uiFreeControl (uiControl *c)');
const uiControlVerifySetParent = lib.func('void uiControlVerifySetParent (uiControl *c, uiControl *parent)');
const uiControlEnabledToUser = lib.func('int uiControlEnabledToUser (uiControl *c)');

class control {
    _handle = null;

    get nativeHandle() { return uiControlHandle(koffi.as(this._handle, 'void*')) }
    get parent() { uiControlParent(koffi.as(this._handle, 'void*')) }
    set parent(ctrl) { uiControlSetParent(koffi.as(ctrl._handle, 'void*'), koffi.as(this._handle, 'void*')) }
    get toplevel() { uiControlToplevel(koffi.as(this._handle, 'void*')) }
    get visible() { uiControlVisible(koffi.as(this._handle, 'void*')) }
    get enabled() { uiControlEnabled(koffi.as(this._handle, 'void*')) }
    get enabledToUser() { uiControlEnabledToUser(koffi.as(this._handle, 'void*')) }
    destroy() { uiControlDestroy(koffi.as(this._handle, 'void*')) }
    show() { uiControlShow(koffi.as(this._handle, 'void*')) }
    hide() { uiControlHide(koffi.as(this._handle, 'void*')) }
    enable() { uiControlEnable(koffi.as(this._handle, 'void*')) }
    disable() { uiControlDisable(koffi.as(this._handle, 'void*')) }
    free() { uiFreeControl(koffi.as(this._handle, 'void*')) }
    verifySetParent() { uiControlVerifySetParent(koffi.as(ctrl._handle, 'void*'), koffi.as(this._handle, 'void*')) }
}

module.exports = control;