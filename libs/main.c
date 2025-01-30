#include <stdlib.h>
#include <stdio.h>
#include <malloc.h>
#include "ui.h"

//
uiDrawTextLayoutParams* _uiDrawTextLayoutParams(const char *String, double Width, uiDrawTextAlign Align)
{
    uiDrawTextLayoutParams *layoutParams = (uiDrawTextLayoutParams*)malloc(sizeof(uiDrawTextLayoutParams));
    uiFontDescriptor *defaultFont = (uiFontDescriptor*)malloc(sizeof(uiFontDescriptor));
    uiLoadControlFont(defaultFont);
    uiAttributedString* attributedString = uiNewAttributedString(String);
    uiAttributedStringSetAttribute(attributedString, uiNewColorAttribute(1, 0, 0, 1), 0, uiAttributedStringLen(attributedString));
    layoutParams->Align = Align;
    layoutParams->DefaultFont = defaultFont;
    layoutParams->String = attributedString;
    layoutParams->Width = Width;

    return layoutParams;
}

uiDrawBrush *_uiDrawBrush(uiDrawBrushType Type, double R, double G, double B, double A)
{
    uiDrawBrush *drawBrush = (uiDrawBrush *)malloc(sizeof(uiDrawBrush));
    drawBrush->Type = Type;
    drawBrush->R = R;
    drawBrush->G = G;
    drawBrush->B = B;
    drawBrush->A = A;
    // drawBrush->Y0 = 0;
    // drawBrush->Y1 = 0;
    // drawBrush->X0 = 0;
    // drawBrush->X1 = 0;
    // drawBrush->OuterRadius = 0;
    // drawBrush->NumStops = 0;

    // uiDrawBrushGradientStop * stops = (uiDrawBrushGradientStop*)malloc(sizeof(uiDrawBrushGradientStop));
    // stops->Pos = 0;
    // stops->R = 0;
    // stops->G = 0;
    // stops->B = 0;
    // stops->A = 0;

    // drawBrush->Stops = stops;

    return drawBrush;
}

uiAreaHandler *_uiAreaHandler(
    void (*Draw)(uiAreaHandler *, uiArea *, uiAreaDrawParams *),
    void (*MouseEvent)(uiAreaHandler *, uiArea *, uiAreaMouseEvent *),
    void (*MouseCrossed)(uiAreaHandler *, uiArea *, int left),
    void (*DragBroken)(uiAreaHandler *, uiArea *),
    int (*KeyEvent)(uiAreaHandler *, uiArea *, uiAreaKeyEvent *))
{
    uiAreaHandler *areaHandler = (uiAreaHandler *)malloc(sizeof(uiAreaHandler));
    areaHandler->Draw = Draw;
    areaHandler->MouseEvent = MouseEvent;
    areaHandler->MouseCrossed = MouseCrossed;
    areaHandler->DragBroken = DragBroken;
    areaHandler->KeyEvent = KeyEvent;

    return areaHandler;
}

uiTableModelHandler *_uiTableModelHandler(
    int (*NumColumns)(uiTableModelHandler *, uiTableModel *),
    uiTableValueType (*ColumnType)(uiTableModelHandler *, uiTableModel *, int column),
    int (*NumRows)(uiTableModelHandler *, uiTableModel *),
    uiTableValue *(*CellValue)(uiTableModelHandler *mh, uiTableModel *m, int row, int column),
    void (*SetCellValue)(uiTableModelHandler *, uiTableModel *, int, int, const uiTableValue *))
{
    uiTableModelHandler *tableModelHandler = (uiTableModelHandler *)malloc(sizeof(uiTableModelHandler));
    tableModelHandler->CellValue = CellValue;
    tableModelHandler->ColumnType = ColumnType;
    tableModelHandler->NumColumns = NumColumns;
    tableModelHandler->NumRows = NumRows;
    tableModelHandler->SetCellValue = SetCellValue;

    return tableModelHandler;
}

uiTableParams *_uiTableParams(uiTableModel *model, int RowBackgroundColorModelColumn)
{
    uiTableParams *tableParams = (uiTableParams *)malloc(sizeof(uiTableParams));
    tableParams->Model = model;
    tableParams->RowBackgroundColorModelColumn = RowBackgroundColorModelColumn;

    return tableParams;
}
//

const char *_uiInit(uiInitOptions *options)
{
    return uiInit(options);
}
void _uiUninit(void)
{
    uiUninit();
}
void _uiFreeInitError(const char *err)
{
    uiFreeInitError(err);
}
void _uiMain(void)
{
    uiMain();
}
void _uiMainSteps(void)
{
    uiMainSteps();
}
int _uiMainStep(int wait)
{
    return uiMainStep(wait);
}
void _uiQuit(void)
{
    uiQuit();
}
void _uiQueueMain(void (*f)(void *data), void *data)
{
    uiQueueMain(f, data);
}
void _uiTimer(int milliseconds, int (*f)(void *data), void *data)
{
    uiTimer(milliseconds, f, data);
}
void _uiOnShouldQuit(int (*f)(void *data), void *data)
{
    uiOnShouldQuit(f, data);
}
void _uiFreeText(char *text)
{
    uiFreeText(text);
}
void _uiControlDestroy(uiControl *c)
{
    uiControlDestroy(c);
}
uintptr_t _uiControlHandle(uiControl *c)
{
    return uiControlHandle(c);
}
uiControl *_uiControlParent(uiControl *c)
{
    return uiControlParent(c);
}
void _uiControlSetParent(uiControl *c, uiControl *parent)
{
    uiControlSetParent(c, parent);
}
int _uiControlToplevel(uiControl *c)
{
    return uiControlToplevel(c);
}
int _uiControlVisible(uiControl *c)
{
    return uiControlVisible(c);
}
void _uiControlShow(uiControl *c)
{
    uiControlShow(c);
}
void _uiControlHide(uiControl *c)
{
    uiControlHide(c);
}
int _uiControlEnabled(uiControl *c)
{
    return uiControlEnabled(c);
}
void _uiControlEnable(uiControl *c)
{
    uiControlEnable(c);
}
void _uiControlDisable(uiControl *c)
{
    uiControlDisable(c);
}
uiControl *_uiAllocControl(size_t n, uint32_t OSsig, uint32_t typesig, const char *typenamestr)
{
    return uiAllocControl(n, OSsig, typesig, typenamestr);
}
void _uiFreeControl(uiControl *c)
{
    uiFreeControl(c);
}
void _uiControlVerifySetParent(uiControl *c, uiControl *parent)
{
    uiControlVerifySetParent(c, parent);
}
int _uiControlEnabledToUser(uiControl *c)
{
    return uiControlEnabledToUser(c);
}
void _uiUserBugCannotSetParentOnToplevel(const char *type)
{
    uiUserBugCannotSetParentOnToplevel(type);
}
char *_uiWindowTitle(uiWindow *w)
{
    return uiWindowTitle(w);
}
void _uiWindowSetTitle(uiWindow *w, const char *title)
{
    uiWindowSetTitle(w, title);
}
void _uiWindowPosition(uiWindow *w, int *x, int *y)
{
    uiWindowPosition(w, x, y);
}
void _uiWindowSetPosition(uiWindow *w, int x, int y)
{
    uiWindowSetPosition(w, x, y);
}
void _uiWindowOnPositionChanged(uiWindow *w, void (*f)(uiWindow *sender, void *senderData), void *data)
{
    uiWindowOnPositionChanged(w, f, data);
}
void _uiWindowContentSize(uiWindow *w, int *width, int *height)
{
    uiWindowContentSize(w, width, height);
}
void _uiWindowSetContentSize(uiWindow *w, int width, int height)
{
    uiWindowSetContentSize(w, width, height);
}
int _uiWindowFullscreen(uiWindow *w)
{
    return uiWindowFullscreen(w);
}
void _uiWindowSetFullscreen(uiWindow *w, int fullscreen)
{
    uiWindowSetFullscreen(w, fullscreen);
}
void _uiWindowOnContentSizeChanged(uiWindow *w, void (*f)(uiWindow *sender, void *senderData), void *data)
{
    uiWindowOnContentSizeChanged(w, f, data);
}
void _uiWindowOnClosing(uiWindow *w, int (*f)(uiWindow *sender, void *senderData), void *data)
{
    uiWindowOnClosing(w, f, data);
}
void _uiWindowOnFocusChanged(uiWindow *w, void (*f)(uiWindow *sender, void *senderData), void *data)
{
    uiWindowOnFocusChanged(w, f, data);
}
int _uiWindowFocused(uiWindow *w)
{
    return uiWindowFocused(w);
}
int _uiWindowBorderless(uiWindow *w)
{
    return uiWindowBorderless(w);
}
void _uiWindowSetBorderless(uiWindow *w, int borderless)
{
    uiWindowSetBorderless(w, borderless);
}
void _uiWindowSetChild(uiWindow *w, uiControl *child)
{
    uiWindowSetChild(w, child);
}
int _uiWindowMargined(uiWindow *w)
{
    return uiWindowMargined(w);
}
void _uiWindowSetMargined(uiWindow *w, int margined)
{
    uiWindowSetMargined(w, margined);
}
int _uiWindowResizeable(uiWindow *w)
{
    return uiWindowResizeable(w);
}
void _uiWindowSetResizeable(uiWindow *w, int resizeable)
{
    uiWindowSetResizeable(w, resizeable);
}
uiWindow *_uiNewWindow(const char *title, int width, int height, int hasMenubar)
{
    return uiNewWindow(title, width, height, hasMenubar);
}
char *_uiButtonText(uiButton *b)
{
    return uiButtonText(b);
}
void _uiButtonSetText(uiButton *b, const char *text)
{
    uiButtonSetText(b, text);
}
void _uiButtonOnClicked(uiButton *b, void (*f)(uiButton *sender, void *senderData), void *data)
{
    uiButtonOnClicked(b, f, data);
}
uiButton *_uiNewButton(const char *text)
{
    return uiNewButton(text);
}
void _uiBoxAppend(uiBox *b, uiControl *child, int stretchy)
{
    uiBoxAppend(b, child, stretchy);
}
int _uiBoxNumChildren(uiBox *b)
{
    return uiBoxNumChildren(b);
}
void _uiBoxDelete(uiBox *b, int index)
{
    uiBoxDelete(b, index);
}
int _uiBoxPadded(uiBox *b)
{
    return uiBoxPadded(b);
}
void _uiBoxSetPadded(uiBox *b, int padded)
{
    uiBoxSetPadded(b, padded);
}
uiBox *_uiNewHorizontalBox(void)
{
    return uiNewHorizontalBox();
}
uiBox *_uiNewVerticalBox(void)
{
    return uiNewVerticalBox();
}
char *_uiCheckboxText(uiCheckbox *c)
{
    return uiCheckboxText(c);
}
void _uiCheckboxSetText(uiCheckbox *c, const char *text)
{
    uiCheckboxSetText(c, text);
}
void _uiCheckboxOnToggled(uiCheckbox *c, void (*f)(uiCheckbox *sender, void *senderData), void *data)
{
    uiCheckboxOnToggled(c, f, data);
}
int _uiCheckboxChecked(uiCheckbox *c)
{
    return uiCheckboxChecked(c);
}
void _uiCheckboxSetChecked(uiCheckbox *c, int checked)
{
    uiCheckboxSetChecked(c, checked);
}
uiCheckbox *_uiNewCheckbox(const char *text)
{
    return uiNewCheckbox(text);
}
char *_uiEntryText(uiEntry *e)
{
    return uiEntryText(e);
}
void _uiEntrySetText(uiEntry *e, const char *text)
{
    uiEntrySetText(e, text);
}
void _uiEntryOnChanged(uiEntry *e, void (*f)(uiEntry *sender, void *senderData), void *data)
{
    uiEntryOnChanged(e, f, data);
}
int _uiEntryReadOnly(uiEntry *e)
{
    return uiEntryReadOnly(e);
}
void _uiEntrySetReadOnly(uiEntry *e, int readonly)
{
    uiEntrySetReadOnly(e, readonly);
}
uiEntry *_uiNewEntry(void)
{
    return uiNewEntry();
}
uiEntry *_uiNewPasswordEntry(void)
{
    return uiNewPasswordEntry();
}
uiEntry *_uiNewSearchEntry(void)
{
    return uiNewSearchEntry();
}
char *_uiLabelText(uiLabel *l)
{
    return uiLabelText(l);
}
void _uiLabelSetText(uiLabel *l, const char *text)
{
    uiLabelSetText(l, text);
}
uiLabel *_uiNewLabel(const char *text)
{
    return uiNewLabel(text);
}
void _uiTabAppend(uiTab *t, const char *name, uiControl *c)
{
    uiTabAppend(t, name, c);
}
void _uiTabInsertAt(uiTab *t, const char *name, int index, uiControl *c)
{
    uiTabInsertAt(t, name, index, c);
}
void _uiTabDelete(uiTab *t, int index)
{
    uiTabDelete(t, index);
}
int _uiTabNumPages(uiTab *t)
{
    return uiTabNumPages(t);
}
int _uiTabMargined(uiTab *t, int index)
{
    return uiTabMargined(t, index);
}
void _uiTabSetMargined(uiTab *t, int index, int margined)
{
    uiTabSetMargined(t, index, margined);
}
uiTab *_uiNewTab(void)
{
    return uiNewTab();
}
char *_uiGroupTitle(uiGroup *g)
{
    return uiGroupTitle(g);
}
void _uiGroupSetTitle(uiGroup *g, const char *title)
{
    uiGroupSetTitle(g, title);
}
void _uiGroupSetChild(uiGroup *g, uiControl *c)
{
    uiGroupSetChild(g, c);
}
int _uiGroupMargined(uiGroup *g)
{
    return uiGroupMargined(g);
}
void _uiGroupSetMargined(uiGroup *g, int margined)
{
    uiGroupSetMargined(g, margined);
}
uiGroup *_uiNewGroup(const char *title)
{
    return uiNewGroup(title);
}
int _uiSpinboxValue(uiSpinbox *s)
{
    return uiSpinboxValue(s);
}
void _uiSpinboxSetValue(uiSpinbox *s, int value)
{
    uiSpinboxSetValue(s, value);
}
void _uiSpinboxOnChanged(uiSpinbox *s, void (*f)(uiSpinbox *sender, void *senderData), void *data)
{
    uiSpinboxOnChanged(s, f, data);
}
uiSpinbox *_uiNewSpinbox(int min, int max)
{
    return uiNewSpinbox(min, max);
}
int _uiSliderValue(uiSlider *s)
{
    return uiSliderValue(s);
}
void _uiSliderSetValue(uiSlider *s, int value)
{
    uiSliderSetValue(s, value);
}
int _uiSliderHasToolTip(uiSlider *s)
{
    return uiSliderHasToolTip(s);
}
void _uiSliderSetHasToolTip(uiSlider *s, int hasToolTip)
{
    uiSliderSetHasToolTip(s, hasToolTip);
}
void _uiSliderOnChanged(uiSlider *s, void (*f)(uiSlider *sender, void *senderData), void *data)
{
    uiSliderOnChanged(s, f, data);
}
void _uiSliderOnReleased(uiSlider *s, void (*f)(uiSlider *sender, void *senderData), void *data)
{
    uiSliderOnReleased(s, f, data);
}
void _uiSliderSetRange(uiSlider *s, int min, int max)
{
    uiSliderSetRange(s, min, max);
}
uiSlider *_uiNewSlider(int min, int max)
{
    return uiNewSlider(min, max);
}
int _uiProgressBarValue(uiProgressBar *p)
{
    return uiProgressBarValue(p);
}
void _uiProgressBarSetValue(uiProgressBar *p, int n)
{
    uiProgressBarSetValue(p, n);
}
uiProgressBar *_uiNewProgressBar(void)
{
    return uiNewProgressBar();
}
uiSeparator *_uiNewHorizontalSeparator(void)
{
    return uiNewHorizontalSeparator();
}
uiSeparator *_uiNewVerticalSeparator(void)
{
    return uiNewVerticalSeparator();
}
void _uiComboboxAppend(uiCombobox *c, const char *text)
{
    uiComboboxAppend(c, text);
}
void _uiComboboxInsertAt(uiCombobox *c, int index, const char *text)
{
    uiComboboxInsertAt(c, index, text);
}
void _uiComboboxDelete(uiCombobox *c, int index)
{
    uiComboboxDelete(c, index);
}
void _uiComboboxClear(uiCombobox *c)
{
    uiComboboxClear(c);
}
int _uiComboboxNumItems(uiCombobox *c)
{
    return uiComboboxNumItems(c);
}
int _uiComboboxSelected(uiCombobox *c)
{
    return uiComboboxSelected(c);
}
void _uiComboboxSetSelected(uiCombobox *c, int index)
{
    uiComboboxSetSelected(c, index);
}
void _uiComboboxOnSelected(uiCombobox *c, void (*f)(uiCombobox *sender, void *senderData), void *data)
{
    uiComboboxOnSelected(c, f, data);
}
uiCombobox *_uiNewCombobox(void)
{
    return uiNewCombobox();
}
void _uiEditableComboboxAppend(uiEditableCombobox *c, const char *text)
{
    uiEditableComboboxAppend(c, text);
}
char *_uiEditableComboboxText(uiEditableCombobox *c)
{
    return uiEditableComboboxText(c);
}
void _uiEditableComboboxSetText(uiEditableCombobox *c, const char *text)
{
    uiEditableComboboxSetText(c, text);
}
void _uiEditableComboboxOnChanged(uiEditableCombobox *c, void (*f)(uiEditableCombobox *sender, void *senderData), void *data)
{
    uiEditableComboboxOnChanged(c, f, data);
}
uiEditableCombobox *_uiNewEditableCombobox(void)
{
    return uiNewEditableCombobox();
}
void _uiRadioButtonsAppend(uiRadioButtons *r, const char *text)
{
    uiRadioButtonsAppend(r, text);
}
int _uiRadioButtonsSelected(uiRadioButtons *r)
{
    return uiRadioButtonsSelected(r);
}
void _uiRadioButtonsSetSelected(uiRadioButtons *r, int index)
{
    uiRadioButtonsSetSelected(r, index);
}
void _uiRadioButtonsOnSelected(uiRadioButtons *r, void (*f)(uiRadioButtons *sender, void *senderData), void *data)
{
    uiRadioButtonsOnSelected(r, f, data);
}
uiRadioButtons *_uiNewRadioButtons(void)
{
    return uiNewRadioButtons();
}
void _uiDateTimePickerTime(uiDateTimePicker *d, struct tm *time)
{
    uiDateTimePickerTime(d, time);
}
void _uiDateTimePickerSetTime(uiDateTimePicker *d, const struct tm *time)
{
    uiDateTimePickerSetTime(d, time);
}
void _uiDateTimePickerOnChanged(uiDateTimePicker *d, void (*f)(uiDateTimePicker *sender, void *senderData), void *data)
{
    uiDateTimePickerOnChanged(d, f, data);
}
uiDateTimePicker *_uiNewDateTimePicker(void)
{
    return uiNewDateTimePicker();
}
uiDateTimePicker *_uiNewDatePicker(void)
{
    return uiNewDatePicker();
}
uiDateTimePicker *_uiNewTimePicker(void)
{
    return uiNewTimePicker();
}
char *_uiMultilineEntryText(uiMultilineEntry *e)
{
    return uiMultilineEntryText(e);
}
void _uiMultilineEntrySetText(uiMultilineEntry *e, const char *text)
{
    uiMultilineEntrySetText(e, text);
}
void _uiMultilineEntryAppend(uiMultilineEntry *e, const char *text)
{
    uiMultilineEntryAppend(e, text);
}
void _uiMultilineEntryOnChanged(uiMultilineEntry *e, void (*f)(uiMultilineEntry *sender, void *senderData), void *data)
{
    uiMultilineEntryOnChanged(e, f, data);
}
int _uiMultilineEntryReadOnly(uiMultilineEntry *e)
{
    return uiMultilineEntryReadOnly(e);
}
void _uiMultilineEntrySetReadOnly(uiMultilineEntry *e, int readonly)
{
    uiMultilineEntrySetReadOnly(e, readonly);
}
uiMultilineEntry *_uiNewMultilineEntry(void)
{
    return uiNewMultilineEntry();
}
uiMultilineEntry *_uiNewNonWrappingMultilineEntry(void)
{
    return uiNewNonWrappingMultilineEntry();
}
void _uiMenuItemEnable(uiMenuItem *m)
{
    uiMenuItemEnable(m);
}
void _uiMenuItemDisable(uiMenuItem *m)
{
    uiMenuItemDisable(m);
}
void _uiMenuItemOnClicked(uiMenuItem *m, void (*f)(uiMenuItem *sender, uiWindow *window, void *senderData), void *data)
{
    uiMenuItemOnClicked(m, f, data);
}
int _uiMenuItemChecked(uiMenuItem *m)
{
    return uiMenuItemChecked(m);
}
void _uiMenuItemSetChecked(uiMenuItem *m, int checked)
{
    uiMenuItemSetChecked(m, checked);
}
uiMenuItem *_uiMenuAppendItem(uiMenu *m, const char *name)
{
    return uiMenuAppendItem(m, name);
}
uiMenuItem *_uiMenuAppendCheckItem(uiMenu *m, const char *name)
{
    return uiMenuAppendCheckItem(m, name);
}
uiMenuItem *_uiMenuAppendQuitItem(uiMenu *m)
{
    return uiMenuAppendQuitItem(m);
}
uiMenuItem *_uiMenuAppendPreferencesItem(uiMenu *m)
{
    return uiMenuAppendPreferencesItem(m);
}
uiMenuItem *_uiMenuAppendAboutItem(uiMenu *m)
{
    return uiMenuAppendAboutItem(m);
}
void _uiMenuAppendSeparator(uiMenu *m)
{
    uiMenuAppendSeparator(m);
}
uiMenu *_uiNewMenu(const char *name)
{
    return uiNewMenu(name);
}
char *_uiOpenFile(uiWindow *parent)
{
    return uiOpenFile(parent);
}
char *_uiOpenFolder(uiWindow *parent)
{
    return uiOpenFolder(parent);
}
char *_uiSaveFile(uiWindow *parent)
{
    return uiSaveFile(parent);
}
void _uiMsgBox(uiWindow *parent, const char *title, const char *description)
{
    uiMsgBox(parent, title, description);
}
void _uiMsgBoxError(uiWindow *parent, const char *title, const char *description)
{
    uiMsgBoxError(parent, title, description);
}
void _uiAreaSetSize(uiArea *a, int width, int height)
{
    uiAreaSetSize(a, width, height);
}
void _uiAreaQueueRedrawAll(uiArea *a)
{
    uiAreaQueueRedrawAll(a);
}
void _uiAreaScrollTo(uiArea *a, double x, double y, double width, double height)
{
    uiAreaScrollTo(a, x, y, width, height);
}
void _uiAreaBeginUserWindowMove(uiArea *a)
{
    uiAreaBeginUserWindowMove(a);
}
void _uiAreaBeginUserWindowResize(uiArea *a, uiWindowResizeEdge edge)
{
    uiAreaBeginUserWindowResize(a, edge);
}
uiArea *_uiNewArea(uiAreaHandler *ah)
{
    return uiNewArea(ah);
}
uiArea *_uiNewScrollingArea(uiAreaHandler *ah, int width, int height)
{
    return uiNewScrollingArea(ah, width, height);
}
uiDrawPath *_uiDrawNewPath(uiDrawFillMode fillMode)
{
    return uiDrawNewPath(fillMode);
}
void _uiDrawFreePath(uiDrawPath *p)
{
    uiDrawFreePath(p);
}
void _uiDrawPathNewFigure(uiDrawPath *p, double x, double y)
{
    uiDrawPathNewFigure(p, x, y);
}
void _uiDrawPathNewFigureWithArc(uiDrawPath *p, double xCenter, double yCenter, double radius, double startAngle, double sweep, int negative)
{
    uiDrawPathNewFigureWithArc(p, xCenter, yCenter, radius, startAngle, sweep, negative);
}
void _uiDrawPathLineTo(uiDrawPath *p, double x, double y)
{
    uiDrawPathLineTo(p, x, y);
}
void _uiDrawPathArcTo(uiDrawPath *p, double xCenter, double yCenter, double radius, double startAngle, double sweep, int negative)
{
    uiDrawPathArcTo(p, xCenter, yCenter, radius, startAngle, sweep, negative);
}
void _uiDrawPathBezierTo(uiDrawPath *p, double c1x, double c1y, double c2x, double c2y, double endX, double endY)
{
    uiDrawPathBezierTo(p, c1x, c1y, c2x, c2y, endX, endY);
}
void _uiDrawPathCloseFigure(uiDrawPath *p)
{
    uiDrawPathCloseFigure(p);
}
void _uiDrawPathAddRectangle(uiDrawPath *p, double x, double y, double width, double height)
{
    uiDrawPathAddRectangle(p, x, y, width, height);
}
int _uiDrawPathEnded(uiDrawPath *p)
{
    return uiDrawPathEnded(p);
}
void _uiDrawPathEnd(uiDrawPath *p)
{
    uiDrawPathEnd(p);
}
void _uiDrawStroke(uiAreaDrawParams *p, uiDrawPath *path, uiDrawBrush *b, uiDrawStrokeParams *strokeParams)
{
    uiDrawStroke(p->Context, path, b, strokeParams);
}
void _uiDrawFill(uiAreaDrawParams *p, uiDrawPath *path, uiDrawBrush *b)
{
    uiDrawFill(p->Context, path, b);
}
void _uiDrawMatrixSetIdentity(uiDrawMatrix *m)
{
    uiDrawMatrixSetIdentity(m);
}
void _uiDrawMatrixTranslate(uiDrawMatrix *m, double x, double y)
{
    uiDrawMatrixTranslate(m, x, y);
}
void _uiDrawMatrixScale(uiDrawMatrix *m, double xCenter, double yCenter, double x, double y)
{
    uiDrawMatrixScale(m, xCenter, yCenter, x, y);
}
void _uiDrawMatrixRotate(uiDrawMatrix *m, double x, double y, double amount)
{
    uiDrawMatrixRotate(m, x, y, amount);
}
void _uiDrawMatrixSkew(uiDrawMatrix *m, double x, double y, double xamount, double yamount)
{
    uiDrawMatrixSkew(m, x, y, xamount, yamount);
}
void _uiDrawMatrixMultiply(uiDrawMatrix *dest, uiDrawMatrix *src)
{
    uiDrawMatrixMultiply(dest, src);
}
int _uiDrawMatrixInvertible(uiDrawMatrix *m)
{
    return uiDrawMatrixInvertible(m);
}
int _uiDrawMatrixInvert(uiDrawMatrix *m)
{
    return uiDrawMatrixInvert(m);
}
void _uiDrawMatrixTransformPoint(uiDrawMatrix *m, double *x, double *y)
{
    uiDrawMatrixTransformPoint(m, x, y);
}
void _uiDrawMatrixTransformSize(uiDrawMatrix *m, double *x, double *y)
{
    uiDrawMatrixTransformSize(m, x, y);
}
void _uiDrawTransform(uiDrawContext *c, uiDrawMatrix *m)
{
    uiDrawTransform(c, m);
}
void _uiDrawClip(uiDrawContext *c, uiDrawPath *path)
{
    uiDrawClip(c, path);
}
void _uiDrawSave(uiDrawContext *c)
{
    uiDrawSave(c);
}
void _uiDrawRestore(uiDrawContext *c)
{
    uiDrawRestore(c);
}
void _uiFreeAttribute(uiAttribute *a)
{
    uiFreeAttribute(a);
}
uiAttributeType _uiAttributeGetType(const uiAttribute *a)
{
    return uiAttributeGetType(a);
}
uiAttribute *_uiNewFamilyAttribute(const char *family)
{
    return uiNewFamilyAttribute(family);
}
const char *_uiAttributeFamily(const uiAttribute *a)
{
    return uiAttributeFamily(a);
}
uiAttribute *_uiNewSizeAttribute(double size)
{
    return uiNewSizeAttribute(size);
}
double _uiAttributeSize(const uiAttribute *a)
{
    return uiAttributeSize(a);
}
uiAttribute *_uiNewWeightAttribute(uiTextWeight weight)
{
    return uiNewWeightAttribute(weight);
}
uiTextWeight _uiAttributeWeight(const uiAttribute *a)
{
    return uiAttributeWeight(a);
}
uiAttribute *_uiNewItalicAttribute(uiTextItalic italic)
{
    return uiNewItalicAttribute(italic);
}
uiTextItalic _uiAttributeItalic(const uiAttribute *a)
{
    return uiAttributeItalic(a);
}
uiAttribute *_uiNewStretchAttribute(uiTextStretch stretch)
{
    return uiNewStretchAttribute(stretch);
}
uiTextStretch _uiAttributeStretch(const uiAttribute *a)
{
    return uiAttributeStretch(a);
}
uiAttribute *_uiNewColorAttribute(double r, double g, double b, double a)
{
    return uiNewColorAttribute(r, g, b, a);
}
void _uiAttributeColor(const uiAttribute *a, double *r, double *g, double *b, double *alpha)
{
    uiAttributeColor(a, r, g, b, alpha);
}
uiAttribute *_uiNewBackgroundAttribute(double r, double g, double b, double a)
{
    return uiNewBackgroundAttribute(r, g, b, a);
}
uiAttribute *_uiNewUnderlineAttribute(uiUnderline u)
{
    return uiNewUnderlineAttribute(u);
}
uiUnderline _uiAttributeUnderline(const uiAttribute *a)
{
    return uiAttributeUnderline(a);
}
uiAttribute *_uiNewUnderlineColorAttribute(uiUnderlineColor u, double r, double g, double b, double a)
{
    return uiNewUnderlineColorAttribute(u, r, g, b, a);
}
void _uiAttributeUnderlineColor(const uiAttribute *a, uiUnderlineColor *u, double *r, double *g, double *b, double *alpha)
{
    uiAttributeUnderlineColor(a, u, r, g, b, alpha);
}
uiOpenTypeFeatures *_uiNewOpenTypeFeatures(void)
{
    return uiNewOpenTypeFeatures();
}
void _uiFreeOpenTypeFeatures(uiOpenTypeFeatures *otf)
{
    uiFreeOpenTypeFeatures(otf);
}
uiOpenTypeFeatures *_uiOpenTypeFeaturesClone(const uiOpenTypeFeatures *otf)
{
    return uiOpenTypeFeaturesClone(otf);
}
void _uiOpenTypeFeaturesAdd(uiOpenTypeFeatures *otf, char a, char b, char c, char d, uint32_t value)
{
    uiOpenTypeFeaturesAdd(otf, a, b, c, d, value);
}
void _uiOpenTypeFeaturesRemove(uiOpenTypeFeatures *otf, char a, char b, char c, char d)
{
    uiOpenTypeFeaturesRemove(otf, a, b, c, d);
}
int _uiOpenTypeFeaturesGet(const uiOpenTypeFeatures *otf, char a, char b, char c, char d, uint32_t *value)
{
    return uiOpenTypeFeaturesGet(otf, a, b, c, d, value);
}
void _uiOpenTypeFeaturesForEach(const uiOpenTypeFeatures *otf, uiOpenTypeFeaturesForEachFunc f, void *data)
{
    uiOpenTypeFeaturesForEach(otf, f, data);
}
uiAttribute *_uiNewFeaturesAttribute(const uiOpenTypeFeatures *otf)
{
    return uiNewFeaturesAttribute(otf);
}
const uiOpenTypeFeatures *_uiAttributeFeatures(const uiAttribute *a)
{
    return uiAttributeFeatures(a);
}
uiAttributedString *_uiNewAttributedString(const char *initialString)
{
    return uiNewAttributedString(initialString);
}
void _uiFreeAttributedString(uiAttributedString *s)
{
    uiFreeAttributedString(s);
}
const char *_uiAttributedStringString(const uiAttributedString *s)
{
    return uiAttributedStringString(s);
}
size_t _uiAttributedStringLen(const uiAttributedString *s)
{
    return uiAttributedStringLen(s);
}
void _uiAttributedStringAppendUnattributed(uiAttributedString *s, const char *str)
{
    uiAttributedStringAppendUnattributed(s, str);
}
void _uiAttributedStringInsertAtUnattributed(uiAttributedString *s, const char *str, size_t at)
{
    uiAttributedStringInsertAtUnattributed(s, str, at);
}
void _uiAttributedStringDelete(uiAttributedString *s, size_t start, size_t end)
{
    uiAttributedStringDelete(s, start, end);
}
void _uiAttributedStringSetAttribute(uiAttributedString *s, uiAttribute *a, size_t start, size_t end)
{
    uiAttributedStringSetAttribute(s, a, start, end);
}
void _uiAttributedStringForEachAttribute(const uiAttributedString *s, uiAttributedStringForEachAttributeFunc f, void *data)
{
    uiAttributedStringForEachAttribute(s, f, data);
}
size_t _uiAttributedStringNumGraphemes(uiAttributedString *s)
{
    return uiAttributedStringNumGraphemes(s);
}
size_t _uiAttributedStringByteIndexToGrapheme(uiAttributedString *s, size_t pos)
{
    return uiAttributedStringByteIndexToGrapheme(s, pos);
}
size_t _uiAttributedStringGraphemeToByteIndex(uiAttributedString *s, size_t pos)
{
    return uiAttributedStringGraphemeToByteIndex(s, pos);
}
void _uiLoadControlFont(uiFontDescriptor *f)
{
    uiLoadControlFont(f);
}
void _uiFreeFontDescriptor(uiFontDescriptor *desc)
{
    uiFreeFontDescriptor(desc);
}
uiDrawTextLayout* _uiDrawNewTextLayout(uiDrawTextLayoutParams *params)
{
    return uiDrawNewTextLayout(params);
}
void _uiDrawFreeTextLayout(uiDrawTextLayout *tl)
{
    uiDrawFreeTextLayout(tl);
}
void _uiDrawText(uiAreaDrawParams *c, uiDrawTextLayout *tl, double x, double y)
{
    uiDrawText(c->Context, tl, x, y);
}
void _uiDrawTextLayoutExtents(uiDrawTextLayout *tl, double *width, double *height)
{
    uiDrawTextLayoutExtents(tl, width, height);
}
void _uiFontButtonFont(uiFontButton *b, uiFontDescriptor *desc)
{
    uiFontButtonFont(b, desc);
}
void _uiFontButtonOnChanged(uiFontButton *b, void (*f)(uiFontButton *sender, void *senderData), void *data)
{
    uiFontButtonOnChanged(b, f, data);
}
uiFontButton *_uiNewFontButton(void)
{
    return uiNewFontButton();
}
void _uiFreeFontButtonFont(uiFontDescriptor *desc)
{
    uiFreeFontButtonFont(desc);
}
void _uiColorButtonColor(uiColorButton *b, double *r, double *g, double *bl, double *a)
{
    uiColorButtonColor(b, r, g, bl, a);
}
void _uiColorButtonSetColor(uiColorButton *b, double r, double g, double bl, double a)
{
    uiColorButtonSetColor(b, r, g, bl, a);
}
void _uiColorButtonOnChanged(uiColorButton *b, void (*f)(uiColorButton *sender, void *senderData), void *data)
{
    uiColorButtonOnChanged(b, f, data);
}
uiColorButton *_uiNewColorButton(void)
{
    return uiNewColorButton();
}
void _uiFormAppend(uiForm *f, const char *label, uiControl *c, int stretchy)
{
    uiFormAppend(f, label, c, stretchy);
}
int _uiFormNumChildren(uiForm *f)
{
    return uiFormNumChildren(f);
}
void _uiFormDelete(uiForm *f, int index)
{
    uiFormDelete(f, index);
}
int _uiFormPadded(uiForm *f)
{
    return uiFormPadded(f);
}
void _uiFormSetPadded(uiForm *f, int padded)
{
    uiFormSetPadded(f, padded);
}
uiForm *_uiNewForm(void)
{
    return uiNewForm();
}
void _uiGridAppend(uiGrid *g, uiControl *c, int left, int top, int xspan, int yspan, int hexpand, uiAlign halign, int vexpand, uiAlign valign)
{
    uiGridAppend(g, c, left, top, xspan, yspan, hexpand, halign, vexpand, valign);
}
void _uiGridInsertAt(uiGrid *g, uiControl *c, uiControl *existing, uiAt at, int xspan, int yspan, int hexpand, uiAlign halign, int vexpand, uiAlign valign)
{
    uiGridInsertAt(g, c, existing, at, xspan, yspan, hexpand, halign, vexpand, valign);
}
int _uiGridPadded(uiGrid *g)
{
    return uiGridPadded(g);
}
void _uiGridSetPadded(uiGrid *g, int padded)
{
    uiGridSetPadded(g, padded);
}
uiGrid *_uiNewGrid(void)
{
    return uiNewGrid();
}
uiImage *_uiNewImage(double width, double height)
{
    return uiNewImage(width, height);
}
void _uiFreeImage(uiImage *i)
{
    uiFreeImage(i);
}
void _uiImageAppend(uiImage *i, void *pixels, int pixelWidth, int pixelHeight, int byteStride)
{
    uiImageAppend(i, pixels, pixelWidth, pixelHeight, byteStride);
}
void _uiFreeTableValue(uiTableValue *v)
{
    uiFreeTableValue(v);
}
uiTableValueType _uiTableValueGetType(const uiTableValue *v)
{
    return uiTableValueGetType(v);
}
uiTableValue *_uiNewTableValueString(const char *str)
{
    return uiNewTableValueString(str);
}
const char *_uiTableValueString(const uiTableValue *v)
{
    return uiTableValueString(v);
}
uiTableValue *_uiNewTableValueImage(uiImage *img)
{
    return uiNewTableValueImage(img);
}
uiImage *_uiTableValueImage(const uiTableValue *v)
{
    return uiTableValueImage(v);
}
uiTableValue *_uiNewTableValueInt(int i)
{
    return uiNewTableValueInt(i);
}
int _uiTableValueInt(const uiTableValue *v)
{
    return uiTableValueInt(v);
}
uiTableValue *_uiNewTableValueColor(double r, double g, double b, double a)
{
    return uiNewTableValueColor(r, g, b, a);
}
void _uiTableValueColor(const uiTableValue *v, double *r, double *g, double *b, double *a)
{
    uiTableValueColor(v, r, g, b, a);
}
uiTableModel *_uiNewTableModel(uiTableModelHandler *mh)
{
    return uiNewTableModel(mh);
}
void _uiFreeTableModel(uiTableModel *m)
{
    uiFreeTableModel(m);
}
void _uiTableModelRowInserted(uiTableModel *m, int newIndex)
{
    uiTableModelRowInserted(m, newIndex);
}
void _uiTableModelRowChanged(uiTableModel *m, int index)
{
    uiTableModelRowChanged(m, index);
}
void _uiTableModelRowDeleted(uiTableModel *m, int oldIndex)
{
    uiTableModelRowDeleted(m, oldIndex);
}
void _uiTableAppendTextColumn(uiTable *t, const char *name, int textModelColumn, int textEditableModelColumn, uiTableTextColumnOptionalParams *textParams)
{
    uiTableAppendTextColumn(t, name, textModelColumn, textEditableModelColumn, textParams);
}
void _uiTableAppendImageColumn(uiTable *t, const char *name, int imageModelColumn)
{
    uiTableAppendImageColumn(t, name, imageModelColumn);
}
void _uiTableAppendCheckboxColumn(uiTable *t, const char *name, int checkboxModelColumn, int checkboxEditableModelColumn)
{
    uiTableAppendCheckboxColumn(t, name, checkboxModelColumn, checkboxEditableModelColumn);
}
void _uiTableAppendCheckboxTextColumn(uiTable *t, const char *name, int checkboxModelColumn, int checkboxEditableModelColumn, int textModelColumn, int textEditableModelColumn, uiTableTextColumnOptionalParams *textParams)
{
    uiTableAppendCheckboxTextColumn(t, name, checkboxModelColumn, checkboxEditableModelColumn, textModelColumn, textEditableModelColumn, textParams);
}
void _uiTableAppendProgressBarColumn(uiTable *t, const char *name, int progressModelColumn)
{
    uiTableAppendProgressBarColumn(t, name, progressModelColumn);
}
void _uiTableAppendButtonColumn(uiTable *t, const char *name, int buttonModelColumn, int buttonClickableModelColumn)
{
    uiTableAppendButtonColumn(t, name, buttonModelColumn, buttonClickableModelColumn);
}
void _uiTableAppendImageTextColumn(uiTable *t, const char *name, int imageModelColumn, int textModelColumn, int textEditableModelColumn, uiTableTextColumnOptionalParams *textParams)
{
    uiTableAppendImageTextColumn(t, name, imageModelColumn, textModelColumn, textEditableModelColumn, textParams);
}
int _uiTableHeaderVisible(uiTable *t)
{
    return uiTableHeaderVisible(t);
}
void _uiTableHeaderSetVisible(uiTable *t, int visible)
{
    uiTableHeaderSetVisible(t, visible);
}
uiTable *_uiNewTable(uiTableParams *params)
{
    return uiNewTable(params);
}
void _uiTableOnRowClicked(uiTable *t, void (*f)(uiTable *t, int row, void *data), void *data)
{
    uiTableOnRowClicked(t, f, data);
}
void _uiTableOnRowDoubleClicked(uiTable *t, void (*f)(uiTable *t, int row, void *data), void *data)
{
    uiTableOnRowDoubleClicked(t, f, data);
}
void _uiTableHeaderSetSortIndicator(uiTable *t, int column, uiSortIndicator indicator)
{
    uiTableHeaderSetSortIndicator(t, column, indicator);
}
uiSortIndicator _uiTableHeaderSortIndicator(uiTable *t, int column)
{
    return uiTableHeaderSortIndicator(t, column);
}
void _uiTableHeaderOnClicked(uiTable *t, void (*f)(uiTable *sender, int column, void *senderData), void *data)
{
    uiTableHeaderOnClicked(t, f, data);
}
int _uiTableColumnWidth(uiTable *t, int column)
{
    return uiTableColumnWidth(t, column);
}
void _uiTableColumnSetWidth(uiTable *t, int column, int width)
{
    uiTableColumnSetWidth(t, column, width);
}
uiTableSelectionMode _uiTableGetSelectionMode(uiTable *t)
{
    return uiTableGetSelectionMode(t);
}
void _uiTableSetSelectionMode(uiTable *t, uiTableSelectionMode mode)
{
    uiTableSetSelectionMode(t, mode);
}
void _uiTableOnSelectionChanged(uiTable *t, void (*f)(uiTable *t, void *data), void *data)
{
    uiTableOnSelectionChanged(t, f, data);
}
uiTableSelection *_uiTableGetSelection(uiTable *t)
{
    return uiTableGetSelection(t);
}
void _uiTableSetSelection(uiTable *t, uiTableSelection *sel)
{
    uiTableSetSelection(t, sel);
}
void _uiFreeTableSelection(uiTableSelection *s)
{
    uiFreeTableSelection(s);
}