const fs = require('fs');
const { PNG } = require('pngjs');

function parsePng(filePath) {
    const data = fs.readFileSync(filePath);
    const pngImage = PNG.sync.read(data);
    return {
        width: pngImage.width,
        height: pngImage.height,
        pixels: pngImage.data,
        stride: pngImage.width * 4
    }
}

module.exports = parsePng;