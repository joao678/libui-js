const control = require("../control");
const { lib, koffi } = require("../lib");
const parsePng = require("./png");

const uiImage = koffi.pointer('uiImage', koffi.opaque());

const uiNewImage = lib.func('uiImage* uiNewImage(double width, double height)')
const uiFreeImage = lib.func('void uiFreeImage(uiImage *i)')
const uiImageAppend = lib.func('void uiImageAppend (uiImage *i, void *pixels, int pixelWidth, int pixelHeight, int byteStride)')

class image extends control {
    constructor(path) {
        super();
        const image = parsePng(path);
        this._handle = uiNewImage(image.width, image.height);
        uiImageAppend(this._handle, koffi.as(image.pixels, 'uint8_t*'), image.width, image.height, image.stride);

    }
}



module.exports = image;