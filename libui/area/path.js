import control from "../control";
import { _uiDrawFill, _uiDrawFreePath, _uiDrawNewPath, _uiDrawPathAddRectangle, _uiDrawPathArcTo, _uiDrawPathBezierTo, _uiDrawPathCloseFigure, _uiDrawPathEnd, _uiDrawPathLineTo, _uiDrawPathNewFigure, _uiDrawPathNewFigureWithArc, _uiDrawStroke } from "../lib";
import { ptr } from "bun:ffi";

class areaPath extends control {
    constructor(mode) {
        super();
        this._handle = _uiDrawNewPath(mode);
    }

    end() {
        _uiDrawPathEnd(this._handle);
    }

    free() {
        _uiDrawFreePath(this._handle);
    }

    addRectangle(x, y, width, height) {
        _uiDrawPathAddRectangle(this._handle, Math.fround(x), Math.fround(y), Math.fround(width), Math.fround(height));
    }

    newFigure(x, y) {
        _uiDrawPathNewFigure(this._handle, Math.fround(x), Math.fround(y));
    }

    newFigureWithArc(xCenter, yCenter, radius, startAngle, sweep, negative) {
        _uiDrawPathNewFigureWithArc(this._handle, Math.fround(xCenter), Math.fround(yCenter), Math.fround(radius), Math.fround(startAngle), Math.fround(sweep), Math.fround(negative));
    }

    lineTo(x, y) {
        _uiDrawPathLineTo(this._handle, Math.fround(x), Math.fround(y));
    }

    arcTo(xCenter, yCenter, radius, startAngle, sweep, negative) {
        _uiDrawPathArcTo(this._handle, Math.fround(xCenter), Math.fround(yCenter), Math.fround(radius), Math.fround(startAngle), Math.fround(sweep), negative);
    }

    bezierTo(c1x, c1y, c2x, c2y, endX, endY) {
        _uiDrawPathBezierTo(this._handle, Math.fround(c1x), Math.fround(c1y), Math.fround(c2x), Math.fround(c2y), Math.fround(endX), Math.fround(endY));
    }

    closeFigure() {
        _uiDrawPathCloseFigure(this._handle);
    }

    fill(context, brush) {
        _uiDrawPathEnd(this._handle);
        _uiDrawFill(context, this._handle, brush._handle);
        _uiDrawFreePath(this._handle);
        Bun.gc();
    }

    stroke(context, brush, strokeParams) {
        _uiDrawPathEnd(this._handle);
        _uiDrawStroke(context, this._handle, brush._handle, strokeParams._handle);
        _uiDrawFreePath(this._handle);
        Bun.gc();
    }
}

export default areaPath;