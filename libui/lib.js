const koffi = require('koffi');
const lib = koffi.load('libui.dll');

exports.koffi = koffi;
exports.lib = lib;