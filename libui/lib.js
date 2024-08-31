const koffi = require('koffi');
const path = require('path');
const fs = require('fs');
const os = require('os');

let libui_lib = './libs/libui.dll';

if (process.pkg) {
    fs.copyFileSync(path.resolve(__dirname, '../libs/libui.dll'), path.join(os.tmpdir(), '/libui.dll'));
    libui_lib = path.join(os.tmpdir(), '/libui.dll');
}

const lib = koffi.load(libui_lib);

exports.koffi = koffi;
exports.lib = lib;