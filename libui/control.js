import {
    _uiControlDestroy,
    _uiControlDisable,
    _uiControlEnable,
    _uiControlEnabled,
    _uiControlEnabledToUser,
    _uiControlHandle,
    _uiControlHide,
    _uiControlParent,
    _uiControlSetParent,
    _uiControlShow,
    _uiControlToplevel,
    _uiControlVerifySetParent,
    _uiControlVisible,
    _uiFreeControl
} from "./lib.js";

class control {
    _handle = null;

    get nativeHandle() { return _uiControlHandle(this._handle) }
    get parent() { _uiControlParent(this._handle) }
    set parent(ctrl) { _uiControlSetParent(ctrl._handle, this._handle) }
    get toplevel() { _uiControlToplevel(this._handle) }
    get visible() { _uiControlVisible(this._handle) }
    get enabled() { _uiControlEnabled(this._handle) }
    get enabledToUser() { _uiControlEnabledToUser(this._handle) }
    destroy() { _uiControlDestroy(this._handle) }
    show() { _uiControlShow(this._handle) }
    hide() { _uiControlHide(this._handle) }
    enable() { _uiControlEnable(this._handle) }
    disable() { _uiControlDisable(this._handle) }
    free() { _uiFreeControl(this._handle) }
    verifySetParent() { _uiControlVerifySetParent(ctrl._handle, this._handle) }
}

export default control;