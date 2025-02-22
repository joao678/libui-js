import { dlopen, suffix } from "bun:ffi";

const {
    symbols: {
        uiInit,
        uiUninit,
        uiFreeInitError,
        uiMain,
        uiMainSteps,
        uiMainStep,
        uiQuit,
        uiQueueMain,
        uiTimer,
        uiOnShouldQuit,
        uiFreeText,
        uiControlDestroy,
        uiControlHandle,
        uiControlParent,
        uiControlSetParent,
        uiControlToplevel,
        uiControlVisible,
        uiControlShow,
        uiControlHide,
        uiControlEnabled,
        uiControlEnable,
        uiControlDisable,
        uiAllocControl,
        uiFreeControl,
        uiControlVerifySetParent,
        uiControlEnabledToUser,
        uiUserBugCannotSetParentOnToplevel,
        uiWindowTitle,
        uiWindowSetTitle,
        uiWindowPosition,
        uiWindowSetPosition,
        uiWindowOnPositionChanged,
        uiWindowContentSize,
        uiWindowSetContentSize,
        uiWindowFullscreen,
        uiWindowSetFullscreen,
        uiWindowOnContentSizeChanged,
        uiWindowOnClosing,
        uiWindowOnFocusChanged,
        uiWindowFocused,
        uiWindowBorderless,
        uiWindowSetBorderless,
        uiWindowSetChild,
        uiWindowMargined,
        uiWindowSetMargined,
        uiWindowResizeable,
        uiWindowSetResizeable,
        uiNewWindow,
        uiButtonText,
        uiButtonSetText,
        uiButtonOnClicked,
        uiNewButton,
        uiBoxAppend,
        uiBoxNumChildren,
        uiBoxDelete,
        uiBoxPadded,
        uiBoxSetPadded,
        uiNewHorizontalBox,
        uiNewVerticalBox,
        uiCheckboxText,
        uiCheckboxSetText,
        uiCheckboxOnToggled,
        uiCheckboxChecked,
        uiCheckboxSetChecked,
        uiNewCheckbox,
        uiEntryText,
        uiEntrySetText,
        uiEntryOnChanged,
        uiEntryReadOnly,
        uiEntrySetReadOnly,
        uiNewEntry,
        uiNewPasswordEntry,
        uiNewSearchEntry,
        uiLabelText,
        uiLabelSetText,
        uiNewLabel,
        uiTabAppend,
        uiTabInsertAt,
        uiTabDelete,
        uiTabNumPages,
        uiTabMargined,
        uiTabSetMargined,
        uiNewTab,
        uiGroupTitle,
        uiGroupSetTitle,
        uiGroupSetChild,
        uiGroupMargined,
        uiGroupSetMargined,
        uiNewGroup,
        uiSpinboxValue,
        uiSpinboxSetValue,
        uiSpinboxOnChanged,
        uiNewSpinbox,
        uiSliderValue,
        uiSliderSetValue,
        uiSliderHasToolTip,
        uiSliderSetHasToolTip,
        uiSliderOnChanged,
        uiSliderOnReleased,
        uiSliderSetRange,
        uiNewSlider,
        uiProgressBarValue,
        uiProgressBarSetValue,
        uiNewProgressBar,
        uiNewHorizontalSeparator,
        uiNewVerticalSeparator,
        uiComboboxAppend,
        uiComboboxInsertAt,
        uiComboboxDelete,
        uiComboboxClear,
        uiComboboxNumItems,
        uiComboboxSelected,
        uiComboboxSetSelected,
        uiComboboxOnSelected,
        uiNewCombobox,
        uiEditableComboboxAppend,
        uiEditableComboboxText,
        uiEditableComboboxSetText,
        uiEditableComboboxOnChanged,
        uiNewEditableCombobox,
        uiRadioButtonsAppend,
        uiRadioButtonsSelected,
        uiRadioButtonsSetSelected,
        uiRadioButtonsOnSelected,
        uiNewRadioButtons,
        uiDateTimePickerTime,
        uiDateTimePickerSetTime,
        uiDateTimePickerOnChanged,
        uiNewDateTimePicker,
        uiNewDatePicker,
        uiNewTimePicker,
        uiMultilineEntryText,
        uiMultilineEntrySetText,
        uiMultilineEntryAppend,
        uiMultilineEntryOnChanged,
        uiMultilineEntryReadOnly,
        uiMultilineEntrySetReadOnly,
        uiNewMultilineEntry,
        uiNewNonWrappingMultilineEntry,
        uiMenuItemEnable,
        uiMenuItemDisable,
        uiMenuItemOnClicked,
        uiMenuItemChecked,
        uiMenuItemSetChecked,
        uiMenuAppendItem,
        uiMenuAppendCheckItem,
        uiMenuAppendQuitItem,
        uiMenuAppendPreferencesItem,
        uiMenuAppendAboutItem,
        uiMenuAppendSeparator,
        uiNewMenu,
        uiOpenFile,
        uiOpenFolder,
        uiSaveFile,
        uiMsgBox,
        uiMsgBoxError,
        uiAreaSetSize,
        uiAreaQueueRedrawAll,
        uiAreaScrollTo,
        uiAreaBeginUserWindowMove,
        uiAreaBeginUserWindowResize,
        uiNewArea,
        uiNewScrollingArea,
        uiDrawNewPath,
        uiDrawFreePath,
        uiDrawPathNewFigure,
        uiDrawPathNewFigureWithArc,
        uiDrawPathLineTo,
        uiDrawPathArcTo,
        uiDrawPathBezierTo,
        uiDrawPathCloseFigure,
        uiDrawPathAddRectangle,
        uiDrawPathEnded,
        uiDrawPathEnd,
        uiDrawStroke,
        uiDrawFill,
        uiDrawMatrixSetIdentity,
        uiDrawMatrixTranslate,
        uiDrawMatrixScale,
        uiDrawMatrixRotate,
        uiDrawMatrixSkew,
        uiDrawMatrixMultiply,
        uiDrawMatrixInvertible,
        uiDrawMatrixInvert,
        uiDrawMatrixTransformPoint,
        uiDrawMatrixTransformSize,
        uiDrawTransform,
        uiDrawClip,
        uiDrawSave,
        uiDrawRestore,
        uiFreeAttribute,
        uiAttributeGetType,
        uiNewFamilyAttribute,
        uiAttributeFamily,
        uiNewSizeAttribute,
        uiAttributeSize,
        uiNewWeightAttribute,
        uiAttributeWeight,
        uiNewItalicAttribute,
        uiAttributeItalic,
        uiNewStretchAttribute,
        uiAttributeStretch,
        uiNewColorAttribute,
        uiAttributeColor,
        uiNewBackgroundAttribute,
        uiNewUnderlineAttribute,
        uiAttributeUnderline,
        uiNewUnderlineColorAttribute,
        uiAttributeUnderlineColor,
        uiNewOpenTypeFeatures,
        uiFreeOpenTypeFeatures,
        uiOpenTypeFeaturesClone,
        uiOpenTypeFeaturesAdd,
        uiOpenTypeFeaturesRemove,
        uiOpenTypeFeaturesGet,
        uiOpenTypeFeaturesForEach,
        uiNewFeaturesAttribute,
        uiAttributeFeatures,
        uiNewAttributedString,
        uiFreeAttributedString,
        uiAttributedStringString,
        uiAttributedStringLen,
        uiAttributedStringAppendUnattributed,
        uiAttributedStringInsertAtUnattributed,
        uiAttributedStringDelete,
        uiAttributedStringSetAttribute,
        uiAttributedStringForEachAttribute,
        uiAttributedStringNumGraphemes,
        uiAttributedStringByteIndexToGrapheme,
        uiAttributedStringGraphemeToByteIndex,
        uiLoadControlFont,
        uiFreeFontDescriptor,
        uiDrawNewTextLayout,
        uiDrawFreeTextLayout,
        uiDrawText,
        uiDrawTextLayoutExtents,
        uiFontButtonFont,
        uiFontButtonOnChanged,
        uiNewFontButton,
        uiFreeFontButtonFont,
        uiColorButtonColor,
        uiColorButtonSetColor,
        uiColorButtonOnChanged,
        uiNewColorButton,
        uiFormAppend,
        uiFormNumChildren,
        uiFormDelete,
        uiFormPadded,
        uiFormSetPadded,
        uiNewForm,
        uiGridAppend,
        uiGridInsertAt,
        uiGridPadded,
        uiGridSetPadded,
        uiNewGrid,
        uiNewImage,
        uiFreeImage,
        uiImageAppend,
        uiFreeTableValue,
        uiTableValueGetType,
        uiNewTableValueString,
        uiTableValueString,
        uiNewTableValueImage,
        uiTableValueImage,
        uiNewTableValueInt,
        uiTableValueInt,
        uiNewTableValueColor,
        uiTableValueColor,
        uiNewTableModel,
        uiFreeTableModel,
        uiTableModelRowInserted,
        uiTableModelRowChanged,
        uiTableModelRowDeleted,
        uiTableAppendTextColumn,
        uiTableAppendImageColumn,
        uiTableAppendCheckboxColumn,
        uiTableAppendCheckboxTextColumn,
        uiTableAppendProgressBarColumn,
        uiTableAppendButtonColumn,
        uiTableAppendImageTextColumn,
        uiTableHeaderVisible,
        uiTableHeaderSetVisible,
        uiNewTable,
        uiTableOnRowClicked,
        uiTableOnRowDoubleClicked,
        uiTableHeaderSetSortIndicator,
        uiTableHeaderSortIndicator,
        uiTableHeaderOnClicked,
        uiTableColumnWidth,
        uiTableColumnSetWidth,
        uiTableGetSelectionMode,
        uiTableSetSelectionMode,
        uiTableOnSelectionChanged,
        uiTableGetSelection,
        uiTableSetSelection,
        uiFreeTableSelection
    },
} = dlopen(`./libs/libui.${suffix}`, {
        uiInit: {
            args: [],
            returns: 'cstring',
        },
        uiUninit: {
            args: [],
            returns: 'ptr',
        },
        uiFreeInitError: {
            args: ['cstring'],
            returns: 'ptr',
        },
        uiMain: {
            args: [],
            returns: 'ptr',
        },
        uiMainSteps: {
            args: [],
            returns: 'ptr',
        },
        uiMainStep: {
            args: ['i32'],
            returns: 'ptr',
        },
        uiQuit: {
            args: [],
            returns: 'ptr',
        },
        uiQueueMain: {
            args: [],
            returns: 'ptr',
        },
        uiTimer: {
            args: ['i32', 'callback', 'ptr'],
            returns: 'void',
        },
        uiOnShouldQuit: {
            args: ['ptr', 'callback'],
            returns: 'void',
        },
        uiFreeText: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiControlDestroy: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiControlHandle: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiControlParent: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiControlSetParent: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiControlToplevel: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiControlVisible: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiControlShow: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiControlHide: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiControlEnabled: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiControlEnable: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiControlDisable: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiAllocControl: {
            args: ['ptr', 'i32', 'i32', 'cstring'],
            returns: 'ptr',
        },
        uiFreeControl: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiControlVerifySetParent: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiControlEnabledToUser: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiUserBugCannotSetParentOnToplevel: {
            args: ['cstring'],
            returns: 'ptr',
        },
        uiWindowTitle: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiWindowSetTitle: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiWindowPosition: {
            args: ['ptr', 'ptr', 'ptr'],
            returns: 'void',
        },
        uiWindowSetPosition: {
            args: ['ptr', 'i32', 'i32'],
            returns: 'ptr',
        },
        uiWindowOnPositionChanged: {
            args: ['ptr', 'ptr', 'ptr'],
            returns: 'void',
        },
        uiWindowContentSize: {
            args: ['ptr', 'ptr', 'ptr'],
            returns: 'void',
        },
        uiWindowSetContentSize: {
            args: ['ptr', 'i32', 'i32'],
            returns: 'void',
        },
        uiWindowFullscreen: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiWindowSetFullscreen: {
            args: ['ptr', 'bool'],
            returns: 'ptr',
        },
        uiWindowOnContentSizeChanged: {
            args: ['ptr', 'ptr', 'ptr'],
            returns: 'void',
        },
        uiWindowOnClosing: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'void',
        },
        uiWindowOnFocusChanged: {
            args: ['ptr', 'ptr', 'ptr'],
            returns: 'void',
        },
        uiWindowFocused: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiWindowBorderless: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiWindowSetBorderless: {
            args: ['ptr', 'bool'],
            returns: 'ptr',
        },
        uiWindowSetChild: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiWindowMargined: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiWindowSetMargined: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiWindowResizeable: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiWindowSetResizeable: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiNewWindow: {
            args: ['cstring', 'i32', 'i32', 'i32'],
            returns: 'ptr',
        },
        uiButtonText: {
            args: ['ptr'],
            returns: 'cstring',
        },
        uiButtonSetText: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiButtonOnClicked: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'void',
        },
        uiNewButton: {
            args: ['cstring'],
            returns: 'ptr',
        },
        uiBoxAppend: {
            args: ['ptr', 'ptr', 'bool'],
            returns: 'ptr',
        },
        uiBoxNumChildren: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiBoxDelete: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiBoxPadded: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiBoxSetPadded: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiNewHorizontalBox: {
            args: [],
            returns: 'ptr',
        },
        uiNewVerticalBox: {
            args: [],
            returns: 'ptr',
        },
        uiCheckboxText: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiCheckboxSetText: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiCheckboxOnToggled: {
            args: ['ptr', 'callback'],
            returns: 'ptr',
        },
        uiCheckboxChecked: {
            args: ['ptr'],
            returns: 'i32',
        },
        uiCheckboxSetChecked: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiNewCheckbox: {
            args: ['cstring'],
            returns: 'ptr',
        },
        uiEntryText: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiEntrySetText: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiEntryOnChanged: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'ptr',
        },
        uiEntryReadOnly: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiEntrySetReadOnly: {
            args: ['ptr', 'bool'],
            returns: 'ptr',
        },
        uiNewEntry: {
            args: [],
            returns: 'ptr',
        },
        uiNewPasswordEntry: {
            args: [],
            returns: 'ptr',
        },
        uiNewSearchEntry: {
            args: [],
            returns: 'ptr',
        },
        uiLabelText: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiLabelSetText: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiNewLabel: {
            args: ['cstring'],
            returns: 'ptr',
        },
        uiTabAppend: {
            args: ['ptr', 'cstring', 'ptr'],
            returns: 'ptr',
        },
        uiTabInsertAt: {
            args: ['ptr', 'cstring', 'i32', 'ptr'],
            returns: 'ptr',
        },
        uiTabDelete: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiTabNumPages: {
            args: ['ptr'],
            returns: 'i32',
        },
        uiTabMargined: {
            args: ['ptr', 'i32'],
            returns: 'i32',
        },
        uiTabSetMargined: {
            args: ['ptr', 'i32', 'bool'],
            returns: 'ptr',
        },
        uiNewTab: {
            args: [],
            returns: 'ptr',
        },
        uiGroupTitle: {
            args: ['ptr'],
            returns: 'cstring',
        },
        uiGroupSetTitle: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiGroupSetChild: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiGroupMargined: {
            args: ['ptr'],
            returns: 'i32',
        },
        uiGroupSetMargined: {
            args: ['ptr', 'bool'],
            returns: 'void',
        },
        uiNewGroup: {
            args: ['cstring'],
            returns: 'ptr',
        },
        uiSpinboxValue: {
            args: ['ptr'],
            returns: 'i32',
        },
        uiSpinboxSetValue: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiSpinboxOnChanged: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'void',
        },
        uiNewSpinbox: {
            args: ['i32', 'i32'],
            returns: 'ptr',
        },
        uiSliderValue: {
            args: ['ptr'],
            returns: 'i32',
        },
        uiSliderSetValue: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiSliderHasToolTip: {
            args: ['ptr'],
            returns: 'bool',
        },
        uiSliderSetHasToolTip: {
            args: ['ptr', 'bool'],
            returns: 'ptr',
        },
        uiSliderOnChanged: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'ptr',
        },
        uiSliderOnReleased: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'ptr',
        },
        uiSliderSetRange: {
            args: ['ptr', 'i32', 'i32'],
            returns: 'ptr',
        },
        uiNewSlider: {
            args: ['i32', 'i32'],
            returns: 'ptr',
        },
        uiProgressBarValue: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiProgressBarSetValue: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiNewProgressBar: {
            args: [],
            returns: 'ptr',
        },
        uiNewHorizontalSeparator: {
            args: [],
            returns: 'ptr',
        },
        uiNewVerticalSeparator: {
            args: [],
            returns: 'ptr',
        },
        uiComboboxAppend: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiComboboxInsertAt: {
            args: ['ptr', 'i32', 'cstring'],
            returns: 'ptr',
        },
        uiComboboxDelete: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiComboboxClear: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiComboboxNumItems: {
            args: ['ptr'],
            returns: 'i32',
        },
        uiComboboxSelected: {
            args: ['ptr'],
            returns: 'i32',
        },
        uiComboboxSetSelected: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiComboboxOnSelected: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'void',
        },
        uiNewCombobox: {
            args: [],
            returns: 'ptr',
        },
        uiEditableComboboxAppend: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiEditableComboboxText: {
            args: ['ptr'],
            returns: 'cstring',
        },
        uiEditableComboboxSetText: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiEditableComboboxOnChanged: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'void',
        },
        uiNewEditableCombobox: {
            args: [],
            returns: 'ptr',
        },
        uiRadioButtonsAppend: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiRadioButtonsSelected: {
            args: ['ptr'],
            returns: 'i32',
        },
        uiRadioButtonsSetSelected: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiRadioButtonsOnSelected: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'void',
        },
        uiNewRadioButtons: {
            args: [],
            returns: 'ptr',
        },
        uiDateTimePickerTime: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiDateTimePickerSetTime: {
            args: ['ptr', 'ptr'],
            returns: 'void',
        },
        uiDateTimePickerOnChanged: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'void',
        },
        uiNewDateTimePicker: {
            args: [],
            returns: 'ptr',
        },
        uiNewDatePicker: {
            args: [],
            returns: 'ptr',
        },
        uiNewTimePicker: {
            args: [],
            returns: 'ptr',
        },
        uiMultilineEntryText: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiMultilineEntrySetText: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiMultilineEntryAppend: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiMultilineEntryOnChanged: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'void',
        },
        uiMultilineEntryReadOnly: {
            args: ['ptr'],
            returns: 'i32',
        },
        uiMultilineEntrySetReadOnly: {
            args: ['ptr', 'bool'],
            returns: 'void',
        },
        uiNewMultilineEntry: {
            args: [],
            returns: 'ptr',
        },
        uiNewNonWrappingMultilineEntry: {
            args: [],
            returns: 'ptr',
        },
        uiMenuItemEnable: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiMenuItemDisable: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiMenuItemOnClicked: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'void',
        },
        uiMenuItemChecked: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiMenuItemSetChecked: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiMenuAppendItem: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiMenuAppendCheckItem: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiMenuAppendQuitItem: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiMenuAppendPreferencesItem: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiMenuAppendAboutItem: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiMenuAppendSeparator: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewMenu: {
            args: ['cstring'],
            returns: 'ptr',
        },
        uiOpenFile: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiOpenFolder: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiSaveFile: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiMsgBox: {
            args: ['ptr', 'cstring', 'cstring'],
            returns: 'ptr',
        },
        uiMsgBoxError: {
            args: ['ptr', 'cstring', 'cstring'],
            returns: 'ptr',
        },
        uiAreaSetSize: {
            args: ['ptr', 'i32', 'i32'],
            returns: 'ptr',
        },
        uiAreaQueueRedrawAll: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiAreaScrollTo: {
            args: ['ptr', 'f64', 'f64', 'f64', 'f64'],
            returns: 'ptr',
        },
        uiAreaBeginUserWindowMove: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiAreaBeginUserWindowResize: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiNewArea: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewScrollingArea: {
            args: ['ptr', 'i32', 'i32'],
            returns: 'ptr',
        },
        uiDrawNewPath: {
            args: ['int'],
            returns: 'ptr',
        },
        uiDrawFreePath: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiDrawPathNewFigure: {
            args: ['ptr', 'f64', 'f64'],
            returns: 'void',
        },
        uiDrawPathNewFigureWithArc: {
            args: ['ptr', 'f64', 'f64', 'f64', 'f64', 'f64', 'i32'],
            returns: 'void',
        },
        uiDrawPathLineTo: {
            args: ['ptr', 'f64', 'f64'],
            returns: 'ptr',
        },
        uiDrawPathArcTo: {
            args: ['ptr', 'f64', 'f64', 'f64', 'f64', 'f64', 'i32'],
            returns: 'void',
        },
        uiDrawPathBezierTo: {
            args: ['ptr', 'f64', 'f64', 'f64', 'f64', 'f64', 'f64'],
            returns: 'void',
        },
        uiDrawPathCloseFigure: {
            args: ['ptr'],
            returns: 'void',
        },
        uiDrawPathAddRectangle: {
            args: ['ptr', 'f64', 'f64', 'f64', 'f64'],
            returns: 'void',
        },
        uiDrawPathEnded: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiDrawPathEnd: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiDrawStroke: {
            args: ['ptr', 'ptr', 'ptr', 'ptr'],
            returns: 'void',
        },
        uiDrawFill: {
            args: ['ptr', 'ptr', 'ptr'],
            returns: 'void',
        },
        uiDrawMatrixSetIdentity: {
            args: ['ptr'],
            returns: 'void',
        },
        uiDrawMatrixTranslate: {
            args: ['ptr', 'f64', 'f64'],
            returns: 'void',
        },
        uiDrawMatrixScale: {
            args: ['ptr', 'f64', 'f64', 'f64', 'f64'],
            returns: 'void',
        },
        uiDrawMatrixRotate: {
            args: ['ptr', 'f64', 'f64', 'f64'],
            returns: 'void',
        },
        uiDrawMatrixSkew: {
            args: ['ptr', 'f64', 'f64', 'f64', 'f64'],
            returns: 'ptr',
        },
        uiDrawMatrixMultiply: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiDrawMatrixInvertible: {
            args: ['ptr'],
            returns: 'bool',
        },
        uiDrawMatrixInvert: {
            args: ['ptr'],
            returns: 'bool',
        },
        uiDrawMatrixTransformPoint: {
            args: ['ptr', 'f64', 'f64'],
            returns: 'ptr',
        },
        uiDrawMatrixTransformSize: {
            args: ['ptr', 'f64', 'f64'],
            returns: 'ptr',
        },
        uiDrawTransform: {
            args: ['ptr', 'ptr'],
            returns: 'void',
        },
        uiDrawClip: {
            args: ['ptr', 'ptr'],
            returns: 'void',
        },
        uiDrawSave: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiDrawRestore: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiFreeAttribute: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiAttributeGetType: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewFamilyAttribute: {
            args: ['cstring'],
            returns: 'ptr',
        },
        uiAttributeFamily: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewSizeAttribute: {
            args: ['f64'],
            returns: 'ptr',
        },
        uiAttributeSize: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewWeightAttribute: {
            args: ['i32'],
            returns: 'ptr',
        },
        uiAttributeWeight: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewItalicAttribute: {
            args: ['i32'],
            returns: 'ptr',
        },
        uiAttributeItalic: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewStretchAttribute: {
            args: ['i32'],
            returns: 'ptr',
        },
        uiAttributeStretch: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewColorAttribute: {
            args: ['f64', 'f64', 'f64', 'f64'],
            returns: 'ptr',
        },
        uiAttributeColor: {
            args: ['ptr', 'ptr', 'ptr', 'ptr', 'ptr'],
            returns: 'ptr',
        },
        uiNewBackgroundAttribute: {
            args: ['f64', 'f64', 'f64', 'f64'],
            returns: 'ptr',
        },
        uiNewUnderlineAttribute: {
            args: ['i32'],
            returns: 'ptr',
        },
        uiAttributeUnderline: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewUnderlineColorAttribute: {
            args: ['i32', 'f64', 'f64', 'f64', 'f64'],
            returns: 'ptr',
        },
        uiAttributeUnderlineColor: {
            args: ['ptr', 'ptr', 'ptr', 'ptr', 'ptr', 'ptr'],
            returns: 'ptr',
        },
        uiNewOpenTypeFeatures: {
            args: [],
            returns: 'ptr',
        },
        uiFreeOpenTypeFeatures: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiOpenTypeFeaturesClone: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiOpenTypeFeaturesAdd: {
            args: ['ptr', 'ptr', 'ptr', 'ptr', 'ptr', 'i32'],
            returns: 'ptr',
        },
        uiOpenTypeFeaturesRemove: {
            args: ['ptr', 'ptr', 'ptr', 'ptr', 'ptr'],
            returns: 'ptr',
        },
        uiOpenTypeFeaturesGet: {
            args: ['ptr', 'ptr', 'ptr', 'ptr', 'ptr', 'i32'],
            returns: 'ptr',
        },
        uiOpenTypeFeaturesForEach: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiNewFeaturesAttribute: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiAttributeFeatures: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewAttributedString: {
            args: ['cstring'],
            returns: 'ptr',
        },
        uiFreeAttributedString: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiAttributedStringString: {
            args: ['ptr'],
            returns: 'cstring',
        },
        uiAttributedStringLen: {
            args: ['ptr'],
            returns: 'i32',
        },
        uiAttributedStringAppendUnattributed: {
            args: ['ptr', 'cstring'],
            returns: 'ptr',
        },
        uiAttributedStringInsertAtUnattributed: {
            args: ['ptr', 'cstring', 'i32'],
            returns: 'ptr',
        },
        uiAttributedStringDelete: {
            args: ['ptr', 'i32', 'i32'],
            returns: 'ptr',
        },
        uiAttributedStringSetAttribute: {
            args: ['ptr', 'ptr', 'i32', 'i32'],
            returns: 'ptr',
        },
        uiAttributedStringForEachAttribute: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiAttributedStringNumGraphemes: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiAttributedStringByteIndexToGrapheme: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiAttributedStringGraphemeToByteIndex: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiLoadControlFont: {
            args: ['ptr'],
            returns: 'void',
        },
        uiFreeFontDescriptor: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiDrawNewTextLayout: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiDrawFreeTextLayout: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiDrawText: {
            args: ['ptr', 'ptr', 'f64', 'f64'],
            returns: 'void',
        },
        uiDrawTextLayoutExtents: {
            args: ['ptr', 'ptr', 'ptr'],
            returns: 'ptr',
        },
        uiFontButtonFont: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiFontButtonOnChanged: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'void',
        },
        uiNewFontButton: {
            args: [],
            returns: 'ptr',
        },
        uiFreeFontButtonFont: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiColorButtonColor: {
            args: ['ptr', 'ptr', 'ptr', 'ptr', 'ptr'],
            returns: 'ptr',
        },
        uiColorButtonSetColor: {
            args: ['ptr', 'f64', 'f64', 'f64', 'f64'],
            returns: 'void',
        },
        uiColorButtonOnChanged: {
            args: ['ptr', 'callback', 'ptr'],
            returns: 'void',
        },
        uiNewColorButton: {
            args: [],
            returns: 'ptr',
        },
        uiFormAppend: {
            args: ['ptr', 'cstring', 'ptr', 'i32'],
            returns: 'ptr',
        },
        uiFormNumChildren: {
            args: ['ptr'],
            returns: 'int',
        },
        uiFormDelete: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiFormPadded: {
            args: ['ptr'],
            returns: 'bool',
        },
        uiFormSetPadded: {
            args: ['ptr', 'bool'],
            returns: 'ptr',
        },
        uiNewForm: {
            args: [],
            returns: 'ptr',
        },
        uiGridAppend: {
            args: ['ptr', 'ptr', 'i32', 'i32', 'i32', 'i32', 'i32', 'i32', 'i32', 'i32'],
            returns: 'void',
        },
        uiGridInsertAt: {
            args: ['ptr', 'ptr', 'ptr', 'i32', 'i32', 'i32', 'i32', 'i32', 'i32', 'i32'],
            returns: 'void',
        },
        uiGridPadded: {
            args: ['ptr'],
            returns: 'bool',
        },
        uiGridSetPadded: {
            args: ['ptr', 'bool'],
            returns: 'void',
        },
        uiNewGrid: {
            args: [],
            returns: 'ptr',
        },
        uiNewImage: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiFreeImage: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiImageAppend: {
            args: ['ptr', 'i32', 'i32', 'i32'],
            returns: 'ptr',
        },
        uiFreeTableValue: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiTableValueGetType: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewTableValueString: {
            args: ['cstring'],
            returns: 'ptr',
        },
        uiTableValueString: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewTableValueImage: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiTableValueImage: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiNewTableValueInt: {
            args: ['i32'],
            returns: 'ptr',
        },
        uiTableValueInt: {
            args: ['ptr'],
            returns: 'i32',
        },
        uiNewTableValueColor: {
            args: ['f64', 'f64', 'f64', 'f64'],
            returns: 'ptr',
        },
        uiTableValueColor: {
            args: ['ptr', 'f64', 'f64', 'f64', 'f64'],
            returns: 'ptr',
        },
        uiNewTableModel: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiFreeTableModel: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiTableModelRowInserted: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiTableModelRowChanged: {
            args: ['ptr', 'i32'],
            returns: 'ptr',
        },
        uiTableModelRowDeleted: {
            args: ['ptr', 'i32'],
            returns: 'void',
        },
        uiTableAppendTextColumn: {
            args: ['ptr', 'cstring', 'i32', 'i32', 'ptr'],
            returns: 'ptr',
        },
        uiTableAppendImageColumn: {
            args: ['ptr', 'cstring', 'i32'],
            returns: 'ptr',
        },
        uiTableAppendCheckboxColumn: {
            args: ['ptr', 'cstring', 'i32', 'i32'],
            returns: 'ptr',
        },
        uiTableAppendCheckboxTextColumn: {
            args: ['ptr', 'cstring', 'i32', 'i32', 'i32', 'i32', 'ptr'],
            returns: 'ptr',
        },
        uiTableAppendProgressBarColumn: {
            args: ['ptr', 'cstring', 'i32'],
            returns: 'ptr',
        },
        uiTableAppendButtonColumn: {
            args: ['ptr', 'cstring', 'i32', 'i32'],
            returns: 'ptr',
        },
        uiTableAppendImageTextColumn: {
            args: ['ptr', 'cstring', 'i32', 'i32', 'i32', 'ptr'],
            returns: 'ptr',
        },
        uiTableHeaderVisible: {
            args: ['ptr'],
            returns: 'bool',
        },
        uiTableHeaderSetVisible: {
            args: ['ptr', 'bool'],
            returns: 'ptr',
        },
        uiNewTable: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiTableOnRowClicked: {
            args: ['ptr', 'callback'],
            returns: 'void',
        },
        uiTableOnRowDoubleClicked: {
            args: ['ptr', 'callback'],
            returns: 'void',
        },
        uiTableHeaderSetSortIndicator: {
            args: ['ptr', 'i32', 'i32'],
            returns: 'ptr',
        },
        uiTableHeaderSortIndicator: {
            args: ['ptr', 'i32'],
            returns: 'i32',
        },
        uiTableHeaderOnClicked: {
            args: ['ptr', 'callback'],
            returns: 'void',
        },
        uiTableColumnWidth: {
            args: ['ptr', 'i32'],
            returns: 'i32',
        },
        uiTableColumnSetWidth: {
            args: ['ptr', 'i32', 'i32'],
            returns: 'ptr',
        },
        uiTableGetSelectionMode: {
            args: ['ptr'],
            returns: 'i32',
        },
        uiTableSetSelectionMode: {
            args: ['ptr', 'i32'],
            returns: 'void',
        },
        uiTableOnSelectionChanged: {
            args: ['ptr', 'callback'],
            returns: 'void',
        },
        uiTableGetSelection: {
            args: ['ptr'],
            returns: 'ptr',
        },
        uiTableSetSelection: {
            args: ['ptr', 'ptr'],
            returns: 'ptr',
        },
        uiFreeTableSelection: {
            args: ['ptr'],
            returns: 'ptr',
        }
    //},
});

export {
    uiAllocControl as _uiAllocControl, uiAreaBeginUserWindowMove as _uiAreaBeginUserWindowMove,
    uiAreaBeginUserWindowResize as _uiAreaBeginUserWindowResize, uiAreaQueueRedrawAll as _uiAreaQueueRedrawAll,
    uiAreaScrollTo as _uiAreaScrollTo, uiAreaSetSize as _uiAreaSetSize, uiAttributeColor as _uiAttributeColor, uiAttributedStringAppendUnattributed as _uiAttributedStringAppendUnattributed, uiAttributedStringByteIndexToGrapheme as _uiAttributedStringByteIndexToGrapheme, uiAttributedStringDelete as _uiAttributedStringDelete, uiAttributedStringForEachAttribute as _uiAttributedStringForEachAttribute, uiAttributedStringGraphemeToByteIndex as _uiAttributedStringGraphemeToByteIndex, uiAttributedStringInsertAtUnattributed as _uiAttributedStringInsertAtUnattributed, uiAttributedStringLen as _uiAttributedStringLen, uiAttributedStringNumGraphemes as _uiAttributedStringNumGraphemes, uiAttributedStringSetAttribute as _uiAttributedStringSetAttribute, uiAttributedStringString as _uiAttributedStringString, uiAttributeFamily as _uiAttributeFamily, uiAttributeFeatures as _uiAttributeFeatures, uiAttributeGetType as _uiAttributeGetType, uiAttributeItalic as _uiAttributeItalic, uiAttributeSize as _uiAttributeSize, uiAttributeStretch as _uiAttributeStretch, uiAttributeUnderline as _uiAttributeUnderline, uiAttributeUnderlineColor as _uiAttributeUnderlineColor, uiAttributeWeight as _uiAttributeWeight, uiBoxAppend as _uiBoxAppend, uiBoxDelete as _uiBoxDelete, uiBoxNumChildren as _uiBoxNumChildren, uiBoxPadded as _uiBoxPadded,
    uiBoxSetPadded as _uiBoxSetPadded, uiButtonOnClicked as _uiButtonOnClicked, uiButtonSetText as _uiButtonSetText, uiButtonText as _uiButtonText, uiCheckboxChecked as _uiCheckboxChecked, uiCheckboxOnToggled as _uiCheckboxOnToggled, uiCheckboxSetChecked as _uiCheckboxSetChecked, uiCheckboxSetText as _uiCheckboxSetText, uiCheckboxText as _uiCheckboxText, uiColorButtonColor as _uiColorButtonColor, uiColorButtonOnChanged as _uiColorButtonOnChanged, uiColorButtonSetColor as _uiColorButtonSetColor, uiComboboxAppend as _uiComboboxAppend, uiComboboxClear as _uiComboboxClear, uiComboboxDelete as _uiComboboxDelete, uiComboboxInsertAt as _uiComboboxInsertAt, uiComboboxNumItems as _uiComboboxNumItems, uiComboboxOnSelected as _uiComboboxOnSelected, uiComboboxSelected as _uiComboboxSelected,
    uiComboboxSetSelected as _uiComboboxSetSelected, uiControlDestroy as _uiControlDestroy, uiControlDisable as _uiControlDisable, uiControlEnable as _uiControlEnable, uiControlEnabled as _uiControlEnabled, uiControlEnabledToUser as _uiControlEnabledToUser, uiControlHandle as _uiControlHandle, uiControlHide as _uiControlHide, uiControlParent as _uiControlParent,
    uiControlSetParent as _uiControlSetParent, uiControlShow as _uiControlShow, uiControlToplevel as _uiControlToplevel, uiControlVerifySetParent as _uiControlVerifySetParent, uiControlVisible as _uiControlVisible, uiDateTimePickerOnChanged as _uiDateTimePickerOnChanged, uiDateTimePickerSetTime as _uiDateTimePickerSetTime, uiDateTimePickerTime as _uiDateTimePickerTime, uiDrawClip as _uiDrawClip, uiDrawFill as _uiDrawFill, uiDrawFreePath as _uiDrawFreePath, uiDrawFreeTextLayout as _uiDrawFreeTextLayout, uiDrawMatrixInvert as _uiDrawMatrixInvert, uiDrawMatrixInvertible as _uiDrawMatrixInvertible, uiDrawMatrixMultiply as _uiDrawMatrixMultiply, uiDrawMatrixRotate as _uiDrawMatrixRotate, uiDrawMatrixScale as _uiDrawMatrixScale, uiDrawMatrixSetIdentity as _uiDrawMatrixSetIdentity, uiDrawMatrixSkew as _uiDrawMatrixSkew, uiDrawMatrixTransformPoint as _uiDrawMatrixTransformPoint,
    uiDrawMatrixTransformSize as _uiDrawMatrixTransformSize, uiDrawMatrixTranslate as _uiDrawMatrixTranslate, uiDrawNewPath as _uiDrawNewPath, uiDrawNewTextLayout as _uiDrawNewTextLayout, uiDrawPathAddRectangle as _uiDrawPathAddRectangle, uiDrawPathArcTo as _uiDrawPathArcTo,
    uiDrawPathBezierTo as _uiDrawPathBezierTo,
    uiDrawPathCloseFigure as _uiDrawPathCloseFigure, uiDrawPathEnd as _uiDrawPathEnd, uiDrawPathEnded as _uiDrawPathEnded, uiDrawPathLineTo as _uiDrawPathLineTo, uiDrawPathNewFigure as _uiDrawPathNewFigure,
    uiDrawPathNewFigureWithArc as _uiDrawPathNewFigureWithArc, uiDrawRestore as _uiDrawRestore, uiDrawSave as _uiDrawSave, uiDrawStroke as _uiDrawStroke, uiDrawText as _uiDrawText,
    uiDrawTextLayoutExtents as _uiDrawTextLayoutExtents, uiDrawTransform as _uiDrawTransform, uiEditableComboboxAppend as _uiEditableComboboxAppend, uiEditableComboboxOnChanged as _uiEditableComboboxOnChanged, uiEditableComboboxSetText as _uiEditableComboboxSetText, uiEditableComboboxText as _uiEditableComboboxText, uiEntryOnChanged as _uiEntryOnChanged,
    uiEntryReadOnly as _uiEntryReadOnly,
    uiEntrySetReadOnly as _uiEntrySetReadOnly, uiEntrySetText as _uiEntrySetText, uiEntryText as _uiEntryText, uiFontButtonFont as _uiFontButtonFont,
    uiFontButtonOnChanged as _uiFontButtonOnChanged, uiFormAppend as _uiFormAppend, uiFormDelete as _uiFormDelete, uiFormNumChildren as _uiFormNumChildren, uiFormPadded as _uiFormPadded,
    uiFormSetPadded as _uiFormSetPadded, uiFreeAttribute as _uiFreeAttribute, uiFreeAttributedString as _uiFreeAttributedString, uiFreeControl as _uiFreeControl, uiFreeFontButtonFont as _uiFreeFontButtonFont, uiFreeFontDescriptor as _uiFreeFontDescriptor, uiFreeImage as _uiFreeImage, uiFreeInitError as _uiFreeInitError, uiFreeOpenTypeFeatures as _uiFreeOpenTypeFeatures, uiFreeTableModel as _uiFreeTableModel, uiFreeTableSelection as _uiFreeTableSelection, uiFreeTableValue as _uiFreeTableValue, uiFreeText as _uiFreeText, uiGridAppend as _uiGridAppend,
    uiGridInsertAt as _uiGridInsertAt,
    uiGridPadded as _uiGridPadded,
    uiGridSetPadded as _uiGridSetPadded, uiGroupMargined as _uiGroupMargined, uiGroupSetChild as _uiGroupSetChild, uiGroupSetMargined as _uiGroupSetMargined, uiGroupSetTitle as _uiGroupSetTitle, uiGroupTitle as _uiGroupTitle, uiImageAppend as _uiImageAppend, uiInit as _uiInit, uiLabelSetText as _uiLabelSetText, uiLabelText as _uiLabelText, uiLoadControlFont as _uiLoadControlFont, uiMain as _uiMain, uiMainStep as _uiMainStep, uiMainSteps as _uiMainSteps, uiMenuAppendAboutItem as _uiMenuAppendAboutItem, uiMenuAppendCheckItem as _uiMenuAppendCheckItem, uiMenuAppendItem as _uiMenuAppendItem, uiMenuAppendPreferencesItem as _uiMenuAppendPreferencesItem, uiMenuAppendQuitItem as _uiMenuAppendQuitItem, uiMenuAppendSeparator as _uiMenuAppendSeparator, uiMenuItemChecked as _uiMenuItemChecked, uiMenuItemDisable as _uiMenuItemDisable, uiMenuItemEnable as _uiMenuItemEnable, uiMenuItemOnClicked as _uiMenuItemOnClicked, uiMenuItemSetChecked as _uiMenuItemSetChecked, uiMsgBox as _uiMsgBox,
    uiMsgBoxError as _uiMsgBoxError, uiMultilineEntryAppend as _uiMultilineEntryAppend,
    uiMultilineEntryOnChanged as _uiMultilineEntryOnChanged,
    uiMultilineEntryReadOnly as _uiMultilineEntryReadOnly,
    uiMultilineEntrySetReadOnly as _uiMultilineEntrySetReadOnly, uiMultilineEntrySetText as _uiMultilineEntrySetText, uiMultilineEntryText as _uiMultilineEntryText, uiNewArea as _uiNewArea, uiNewAttributedString as _uiNewAttributedString, uiNewBackgroundAttribute as _uiNewBackgroundAttribute, uiNewButton as _uiNewButton, uiNewCheckbox as _uiNewCheckbox, uiNewColorAttribute as _uiNewColorAttribute, uiNewColorButton as _uiNewColorButton, uiNewCombobox as _uiNewCombobox, uiNewDatePicker as _uiNewDatePicker, uiNewDateTimePicker as _uiNewDateTimePicker, uiNewEditableCombobox as _uiNewEditableCombobox, uiNewEntry as _uiNewEntry, uiNewFamilyAttribute as _uiNewFamilyAttribute, uiNewFeaturesAttribute as _uiNewFeaturesAttribute, uiNewFontButton as _uiNewFontButton, uiNewForm as _uiNewForm, uiNewGrid as _uiNewGrid, uiNewGroup as _uiNewGroup, uiNewHorizontalBox as _uiNewHorizontalBox, uiNewHorizontalSeparator as _uiNewHorizontalSeparator, uiNewImage as _uiNewImage, uiNewItalicAttribute as _uiNewItalicAttribute, uiNewLabel as _uiNewLabel, uiNewMenu as _uiNewMenu, uiNewMultilineEntry as _uiNewMultilineEntry,
    uiNewNonWrappingMultilineEntry as _uiNewNonWrappingMultilineEntry, uiNewOpenTypeFeatures as _uiNewOpenTypeFeatures, uiNewPasswordEntry as _uiNewPasswordEntry, uiNewProgressBar as _uiNewProgressBar, uiNewRadioButtons as _uiNewRadioButtons, uiNewScrollingArea as _uiNewScrollingArea, uiNewSearchEntry as _uiNewSearchEntry, uiNewSizeAttribute as _uiNewSizeAttribute, uiNewSlider as _uiNewSlider, uiNewSpinbox as _uiNewSpinbox, uiNewStretchAttribute as _uiNewStretchAttribute, uiNewTab as _uiNewTab, uiNewTable as _uiNewTable, uiNewTableModel as _uiNewTableModel, uiNewTableValueColor as _uiNewTableValueColor, uiNewTableValueImage as _uiNewTableValueImage, uiNewTableValueInt as _uiNewTableValueInt, uiNewTableValueString as _uiNewTableValueString, uiNewTimePicker as _uiNewTimePicker, uiNewUnderlineAttribute as _uiNewUnderlineAttribute, uiNewUnderlineColorAttribute as _uiNewUnderlineColorAttribute, uiNewVerticalBox as _uiNewVerticalBox, uiNewVerticalSeparator as _uiNewVerticalSeparator, uiNewWeightAttribute as _uiNewWeightAttribute, uiNewWindow as _uiNewWindow, uiOnShouldQuit as _uiOnShouldQuit, uiOpenFile as _uiOpenFile,
    uiOpenFolder as _uiOpenFolder, uiOpenTypeFeaturesAdd as _uiOpenTypeFeaturesAdd, uiOpenTypeFeaturesClone as _uiOpenTypeFeaturesClone, uiOpenTypeFeaturesForEach as _uiOpenTypeFeaturesForEach, uiOpenTypeFeaturesGet as _uiOpenTypeFeaturesGet, uiOpenTypeFeaturesRemove as _uiOpenTypeFeaturesRemove, uiProgressBarSetValue as _uiProgressBarSetValue, uiProgressBarValue as _uiProgressBarValue, uiQueueMain as _uiQueueMain, uiQuit as _uiQuit, uiRadioButtonsAppend as _uiRadioButtonsAppend, uiRadioButtonsOnSelected as _uiRadioButtonsOnSelected, uiRadioButtonsSelected as _uiRadioButtonsSelected,
    uiRadioButtonsSetSelected as _uiRadioButtonsSetSelected, uiSaveFile as _uiSaveFile, uiSliderHasToolTip as _uiSliderHasToolTip, uiSliderOnChanged as _uiSliderOnChanged,
    uiSliderOnReleased as _uiSliderOnReleased, uiSliderSetHasToolTip as _uiSliderSetHasToolTip, uiSliderSetRange as _uiSliderSetRange, uiSliderSetValue as _uiSliderSetValue, uiSliderValue as _uiSliderValue, uiSpinboxOnChanged as _uiSpinboxOnChanged, uiSpinboxSetValue as _uiSpinboxSetValue, uiSpinboxValue as _uiSpinboxValue, uiTabAppend as _uiTabAppend, uiTabDelete as _uiTabDelete, uiTabInsertAt as _uiTabInsertAt, uiTableAppendButtonColumn as _uiTableAppendButtonColumn, uiTableAppendCheckboxColumn as _uiTableAppendCheckboxColumn,
    uiTableAppendCheckboxTextColumn as _uiTableAppendCheckboxTextColumn, uiTableAppendImageColumn as _uiTableAppendImageColumn, uiTableAppendImageTextColumn as _uiTableAppendImageTextColumn, uiTableAppendProgressBarColumn as _uiTableAppendProgressBarColumn, uiTableAppendTextColumn as _uiTableAppendTextColumn, uiTableColumnSetWidth as _uiTableColumnSetWidth, uiTableColumnWidth as _uiTableColumnWidth, uiTableGetSelection as _uiTableGetSelection, uiTableGetSelectionMode as _uiTableGetSelectionMode, uiTableHeaderOnClicked as _uiTableHeaderOnClicked, uiTableHeaderSetSortIndicator as _uiTableHeaderSetSortIndicator, uiTableHeaderSetVisible as _uiTableHeaderSetVisible, uiTableHeaderSortIndicator as _uiTableHeaderSortIndicator, uiTableHeaderVisible as _uiTableHeaderVisible, uiTableModelRowChanged as _uiTableModelRowChanged,
    uiTableModelRowDeleted as _uiTableModelRowDeleted, uiTableModelRowInserted as _uiTableModelRowInserted, uiTableOnRowClicked as _uiTableOnRowClicked,
    uiTableOnRowDoubleClicked as _uiTableOnRowDoubleClicked, uiTableOnSelectionChanged as _uiTableOnSelectionChanged, uiTableSetSelection as _uiTableSetSelection, uiTableSetSelectionMode as _uiTableSetSelectionMode, uiTableValueColor as _uiTableValueColor, uiTableValueGetType as _uiTableValueGetType, uiTableValueImage as _uiTableValueImage, uiTableValueInt as _uiTableValueInt, uiTableValueString as _uiTableValueString, uiTabMargined as _uiTabMargined, uiTabNumPages as _uiTabNumPages, uiTabSetMargined as _uiTabSetMargined, uiTimer as _uiTimer, uiUninit as _uiUninit, uiUserBugCannotSetParentOnToplevel as _uiUserBugCannotSetParentOnToplevel, uiWindowBorderless as _uiWindowBorderless, uiWindowContentSize as _uiWindowContentSize, uiWindowFocused as _uiWindowFocused, uiWindowFullscreen as _uiWindowFullscreen, uiWindowMargined as _uiWindowMargined, uiWindowOnClosing as _uiWindowOnClosing, uiWindowOnContentSizeChanged as _uiWindowOnContentSizeChanged, uiWindowOnFocusChanged as _uiWindowOnFocusChanged, uiWindowOnPositionChanged as _uiWindowOnPositionChanged, uiWindowPosition as _uiWindowPosition, uiWindowResizeable as _uiWindowResizeable, uiWindowSetBorderless as _uiWindowSetBorderless,
    uiWindowSetChild as _uiWindowSetChild, uiWindowSetContentSize as _uiWindowSetContentSize, uiWindowSetFullscreen as _uiWindowSetFullscreen, uiWindowSetMargined as _uiWindowSetMargined, uiWindowSetPosition as _uiWindowSetPosition, uiWindowSetResizeable as _uiWindowSetResizeable, uiWindowSetTitle as _uiWindowSetTitle, uiWindowTitle as _uiWindowTitle
};
