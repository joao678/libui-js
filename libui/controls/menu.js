import { JSCallback } from "bun:ffi";
import control from "../control";
import { _uiMenuAppendAboutItem, _uiMenuAppendCheckItem, _uiMenuAppendItem, _uiMenuAppendPreferencesItem, _uiMenuAppendQuitItem, _uiMenuAppendSeparator, _uiMenuItemChecked, _uiMenuItemDisable, _uiMenuItemEnable, _uiMenuItemOnClicked, _uiMenuItemSetChecked, _uiNewMenu } from "../lib";
import { str } from "../util/util";

class menu extends control {
    constructor(name) {
        super();
        this._handle = _uiNewMenu(str`${name}`);
    }

    appendItem(name) {
        const handle = _uiMenuAppendItem(this._handle, str`${name}`);
        return new menuitem(handle);
    }

    appendCheckItem(name) {
        const handle = _uiMenuAppendCheckItem(this._handle, name);
        return new menuitem(handle);
    }

    appendQuitItem() {
        const handle = _uiMenuAppendQuitItem(this._handle);
        return new menuitem(handle);
    }

    appendAboutItem(name) {
        const handle = _uiMenuAppendAboutItem(this._handle, name);
        return new menuitem(handle);
    }    

    appendPreferencesItem(name) {
        const handle = _uiMenuAppendPreferencesItem(this._handle, name);
        return new menuitem(handle);
    }

    appendSeparator() {
        _uiMenuAppendSeparator(this._handle);
    }
}

class menuitem extends control {
    constructor(handle) {
        super();
        this._handle = handle;
    }

    enable() {
        _uiMenuItemEnable(this._handle);
    }

    disable() {
        _uiMenuItemDisable(this._handle);
    }

    get checked() {
        return _uiMenuItemChecked(this._handle);
    }

    set checked(value) {
        return _uiMenuItemSetChecked(this._handle, value+0);
    }

    onMenuItemClicked(cb) {
        _uiMenuItemOnClicked(this._handle, new JSCallback(function (sender, window, senderData) { return cb(...arguments) }, {
            returns: "int",
            args: ["ptr", "ptr", "ptr"]
        }).ptr, 0);
    }
}

export default menu;