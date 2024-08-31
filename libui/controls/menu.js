const control = require("../control");
const { lib, koffi } = require("../lib");

const uiMenuItem = koffi.pointer('uiMenuItem', koffi.opaque());
const uiMenu = koffi.pointer('uiMenu', koffi.opaque());

const uiNewMenu = lib.func('uiMenu* uiNewMenu(const char *name)');
const uiMenuAppendItem = lib.func('uiMenuItem* uiMenuAppendItem (uiMenu *m, const char *name)');
const uiMenuAppendCheckItem = lib.func('uiMenuItem* uiMenuAppendCheckItem (uiMenu *m, const char *name)');
const uiMenuAppendQuitItem = lib.func('uiMenuItem* uiMenuAppendQuitItem (uiMenu *m)');
const uiMenuAppendPreferencesItem = lib.func('uiMenuItem* uiMenuAppendPreferencesItem (uiMenu *m)');
const uiMenuAppendAboutItem = lib.func('uiMenuItem* uiMenuAppendAboutItem (uiMenu *m)');
const uiMenuAppendSeparator = lib.func('void uiMenuAppendSeparator (uiMenu *m)');

const uiMenuItemEnable = lib.func('void uiMenuItemEnable (uiMenuItem *m)')
const uiMenuItemDisable = lib.func('void uiMenuItemDisable (uiMenuItem *m)')
const uiMenuItemChecked = lib.func('int uiMenuItemChecked (uiMenuItem *m)')
const uiMenuItemSetChecked = lib.func('void uiMenuItemSetChecked (uiMenuItem *m, int checked)')

const menuItemClickedCb = koffi.proto('menuItemClickedCb', 'int', ['uiMenu*', 'uiWindow*', 'void *']);
const uiMenuItemOnClicked = lib.func('void uiMenuItemOnClicked (uiMenuItem *m, menuItemClickedCb* cb, void *data)');

class menu extends control {
    constructor(name) {
        super();
        this._handle = uiNewMenu(name);
    }

    appendItem(name) {
        const handle = uiMenuAppendItem(this._handle, name);
        return new menuitem(handle);
    }

    appendCheckItem(name) {
        const handle = uiMenuAppendCheckItem(this._handle, name);
        return new menuitem(handle);
    }

    appendQuitItem() {
        const handle = uiMenuAppendQuitItem(this._handle);
        return new menuitem(handle);
    }

    appendAboutItem(name) {
        const handle = uiMenuAppendAboutItem(this._handle, name);
        return new menuitem(handle);
    }    

    appendPreferencesItem(name) {
        const handle = uiMenuAppendPreferencesItem(this._handle, name);
        return new menuitem(handle);
    }

    appendSeparator() {
        uiMenuAppendSeparator(this._handle);
    }
}

class menuitem extends control {
    constructor(handle) {
        super();
        this._handle = handle;
    }

    enable() {
        uiMenuItemEnable(this._handle);
    }

    disable() {
        uiMenuItemDisable(this._handle);
    }

    get checked() {
        return uiMenuItemChecked(this._handle);
    }

    set checked(value) {
        return uiMenuItemSetChecked(this._handle, value+0);
    }

    onMenuItemClicked(cb) {
        const _cb = function () {
            cb(...arguments);
            return 1;
        }
        uiMenuItemOnClicked(this._handle, _cb, 0);
        koffi.register(_cb, koffi.pointer(menuItemClickedCb));
    }
}

module.exports = menu;