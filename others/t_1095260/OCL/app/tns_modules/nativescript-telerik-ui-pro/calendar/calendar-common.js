var dependencyObservable = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var view_1 = require("ui/core/view");
var bindable_1 = require("ui/core/bindable");
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var weakEvents = require("ui/core/weak-event-listener");
var CalendarViewMode;
(function (CalendarViewMode) {
    CalendarViewMode.Week = "Week";
    CalendarViewMode.Month = "Month";
    CalendarViewMode.MonthNames = "MonthNames";
    CalendarViewMode.Year = "Year";
})(CalendarViewMode = exports.CalendarViewMode || (exports.CalendarViewMode = {}));
var CalendarEventsViewMode;
(function (CalendarEventsViewMode) {
    CalendarEventsViewMode.None = "None";
    CalendarEventsViewMode.Inline = "Inline";
    CalendarEventsViewMode.Popover = "Popover";
})(CalendarEventsViewMode = exports.CalendarEventsViewMode || (exports.CalendarEventsViewMode = {}));
var CalendarSelectionMode;
(function (CalendarSelectionMode) {
    CalendarSelectionMode.None = "None";
    CalendarSelectionMode.Single = "Single";
    CalendarSelectionMode.Multiple = "Multiple";
    CalendarSelectionMode.Range = "Range";
})(CalendarSelectionMode = exports.CalendarSelectionMode || (exports.CalendarSelectionMode = {}));
var CalendarTransitionMode;
(function (CalendarTransitionMode) {
    CalendarTransitionMode.None = "None";
    CalendarTransitionMode.Slide = "Slide";
    CalendarTransitionMode.Stack = "Stack";
    CalendarTransitionMode.Flip = "Flip";
    CalendarTransitionMode.Fold = "Fold";
    CalendarTransitionMode.Float = "Float";
    CalendarTransitionMode.Rotate = "Rotate";
    CalendarTransitionMode.Plain = "Plain";
    CalendarTransitionMode.Free = "Free";
    CalendarTransitionMode.Combo = "Combo";
    CalendarTransitionMode.Overlap = "Overlap";
})(CalendarTransitionMode = exports.CalendarTransitionMode || (exports.CalendarTransitionMode = {}));
/**
 * Font styles
 */
var FontStyles;
(function (FontStyles) {
    /**
    * Regular font style
    */
    FontStyles.Normal = "Normal";
    /**
    * Bold font style
    */
    FontStyles.Bold = "Bold";
    /**
     * Italic font style
     */
    FontStyles.Italic = "Italic";
    /**
     * Combine Bold and Italic styles
     */
    FontStyles.BoldItalic = "BoldItalic";
})(FontStyles = exports.FontStyles || (exports.FontStyles = {}));
/**
* Defines the alignment options for cells in Calendar component.
*/
var CalendarCellAlignment;
(function (CalendarCellAlignment) {
    /**
     The cell content is aligned to left.
     */
    CalendarCellAlignment.Left = "Left";
    /**
     The cell content is aligned to right.
     */
    CalendarCellAlignment.Right = "Right";
    /**
     The cell content is aligned to top.
     */
    CalendarCellAlignment.Top = "Top";
    /**
     The cell content is aligned to bottom.
     */
    CalendarCellAlignment.Bottom = "Bottom";
    /**
     The cell content is aligned horizontally.
     */
    CalendarCellAlignment.HorizontalCenter = "HorizontalCenter";
    /**
     The cell content is aligned vertically.
     */
    CalendarCellAlignment.VerticalCenter = "VerticalCenter";
})(CalendarCellAlignment = exports.CalendarCellAlignment || (exports.CalendarCellAlignment = {}));
;
var DateRange = (function () {
    //constructor();
    function DateRange(startDate, endDate) {
        this._startDate = startDate;
        this._endDate = endDate;
        this.normalize();
    }
    Object.defineProperty(DateRange.prototype, "startDate", {
        get: function () {
            return this._startDate;
        },
        set: function (value) {
            this._startDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRange.prototype, "endDate", {
        get: function () {
            return this._endDate;
        },
        set: function (value) {
            this._endDate = value;
        },
        enumerable: true,
        configurable: true
    });
    DateRange.prototype.normalize = function () {
        var comparisonStartDate = this._startDate;
        if (!(comparisonStartDate instanceof Date)) {
            comparisonStartDate = new Date(this._startDate);
        }
        var comparisonEndDate = this._endDate;
        if (!(comparisonEndDate instanceof Date)) {
            comparisonEndDate = new Date(this._endDate);
        }
        if (comparisonEndDate < comparisonStartDate) {
            var temp = this._endDate;
            this._endDate = this._startDate;
            this._startDate = temp;
        }
    };
    return DateRange;
}());
exports.DateRange = DateRange;
var CalendarEvent = (function () {
    function CalendarEvent(title, startDate, endDate, isAllDay, eventColor) {
        this.title = title;
        this.endDate = endDate;
        this.startDate = startDate;
        if (isAllDay) {
            this.isAllDay = isAllDay;
        }
        if (eventColor) {
            this.eventColor = eventColor;
        }
    }
    Object.defineProperty(CalendarEvent.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "title", {
        get: function () {
            return this._getTitle();
        },
        set: function (value) {
            this._setTitle(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "startDate", {
        get: function () {
            return this._getStartDate();
        },
        set: function (value) {
            this._setStartDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "endDate", {
        get: function () {
            return this._getEndDate();
        },
        set: function (value) {
            this._setEndDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "isAllDay", {
        get: function () {
            return this._getIsAllDay();
        },
        set: function (value) {
            this._setIsAllDay(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarEvent.prototype, "eventColor", {
        get: function () {
            return this._getEventColor();
        },
        set: function (value) {
            this._setEventColor(value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarEvent.prototype._setIsAllDay = function (value) { };
    CalendarEvent.prototype._getIsAllDay = function () {
        return false;
    };
    CalendarEvent.prototype._setEndDate = function (date) { };
    CalendarEvent.prototype._getEndDate = function () {
        return undefined;
    };
    CalendarEvent.prototype._setStartDate = function (date) { };
    CalendarEvent.prototype._getStartDate = function () {
        return undefined;
    };
    CalendarEvent.prototype._setTitle = function (value) { };
    CalendarEvent.prototype._getTitle = function () {
        return undefined;
    };
    CalendarEvent.prototype._setEventColor = function (value) { };
    CalendarEvent.prototype._getEventColor = function () {
        return undefined;
    };
    return CalendarEvent;
}());
exports.CalendarEvent = CalendarEvent;
//////////////////////////////////////////////////////////////////////////////////////////
// <EventDataDefinitions>
var CalendarViewModeChangedEventData = (function () {
    function CalendarViewModeChangedEventData() {
    }
    return CalendarViewModeChangedEventData;
}());
exports.CalendarViewModeChangedEventData = CalendarViewModeChangedEventData;
var CalendarSelectionEventData = (function () {
    function CalendarSelectionEventData() {
    }
    return CalendarSelectionEventData;
}());
exports.CalendarSelectionEventData = CalendarSelectionEventData;
var CalendarInlineEventSelectedData = (function () {
    function CalendarInlineEventSelectedData() {
    }
    return CalendarInlineEventSelectedData;
}());
exports.CalendarInlineEventSelectedData = CalendarInlineEventSelectedData;
var CalendarNavigationEventData = (function () {
    function CalendarNavigationEventData() {
    }
    return CalendarNavigationEventData;
}());
exports.CalendarNavigationEventData = CalendarNavigationEventData;
var CalendarMonthViewStyle = (function (_super) {
    __extends(CalendarMonthViewStyle, _super);
    function CalendarMonthViewStyle() {
        _super.call(this);
    }
    CalendarMonthViewStyle.prototype.updateViewStyles = function (forceUpdate) {
    };
    CalendarMonthViewStyle.onShowWeekNumbersPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onShowWeekNumbersChanged(data);
    };
    Object.defineProperty(CalendarMonthViewStyle.prototype, "showWeekNumbers", {
        get: function () {
            return this._getValue(CalendarMonthViewStyle.showWeekNumbersProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthViewStyle.showWeekNumbersProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.onShowWeekNumbersChanged = function (data) { };
    CalendarMonthViewStyle.onShowTitlePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onShowTitleChanged(data);
    };
    Object.defineProperty(CalendarMonthViewStyle.prototype, "showTitle", {
        get: function () {
            return this._getValue(CalendarMonthViewStyle.showTitleProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthViewStyle.showTitleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.onShowTitleChanged = function (data) { };
    CalendarMonthViewStyle.onShowDayNamesPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onShowDayNamesChanged(data);
    };
    Object.defineProperty(CalendarMonthViewStyle.prototype, "showDayNames", {
        get: function () {
            return this._getValue(CalendarMonthViewStyle.showDayNamesProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthViewStyle.showDayNamesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.onShowDayNamesChanged = function (data) { };
    CalendarMonthViewStyle.onCellBackgroundColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onBackgroundColorChanged(data);
    };
    Object.defineProperty(CalendarMonthViewStyle.prototype, "backgroundColor", {
        get: function () {
            return this._getValue(CalendarMonthViewStyle.backgroundColorProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthViewStyle.backgroundColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.onBackgroundColorChanged = function (data) { };
    CalendarMonthViewStyle.onDayCellStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onDayCellStyleChanged(data);
    };
    Object.defineProperty(CalendarMonthViewStyle.prototype, "dayCellStyle", {
        get: function () {
            return this._getValue(CalendarMonthViewStyle.dayCellStyleProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthViewStyle.dayCellStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.onDayCellStyleChanged = function (data) { };
    ;
    CalendarMonthViewStyle.onSelectedDayCellStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onSelectedDayCellStyleChanged(data);
    };
    Object.defineProperty(CalendarMonthViewStyle.prototype, "selectedDayCellStyle", {
        get: function () {
            return this._getValue(CalendarMonthViewStyle.selectedDayCellStyleProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthViewStyle.selectedDayCellStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.onSelectedDayCellStyleChanged = function (data) { };
    ;
    CalendarMonthViewStyle.onTodayCellStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onTodayCellStyleChanged(data);
    };
    Object.defineProperty(CalendarMonthViewStyle.prototype, "todayCellStyle", {
        get: function () {
            return this._getValue(CalendarMonthViewStyle.todayCellStyleProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthViewStyle.todayCellStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.onTodayCellStyleChanged = function (data) { };
    ;
    CalendarMonthViewStyle.onDayNameCellStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onDayNameCellStyleChanged(data);
    };
    Object.defineProperty(CalendarMonthViewStyle.prototype, "dayNameCellStyle", {
        get: function () {
            return this._getValue(CalendarMonthViewStyle.dayNameCellStyleProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthViewStyle.dayNameCellStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.onDayNameCellStyleChanged = function (data) { };
    ;
    CalendarMonthViewStyle.onWeekNumberCellStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onWeekNumberCellStyleChanged(data);
    };
    Object.defineProperty(CalendarMonthViewStyle.prototype, "weekNumberCellStyle", {
        get: function () {
            return this._getValue(CalendarMonthViewStyle.weekNumberCellStyleProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthViewStyle.weekNumberCellStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.onWeekNumberCellStyleChanged = function (data) { };
    ;
    CalendarMonthViewStyle.onWeekendCellStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onWeekendCellStyleChanged(data);
    };
    Object.defineProperty(CalendarMonthViewStyle.prototype, "weekendCellStyle", {
        get: function () {
            return this._getValue(CalendarMonthViewStyle.weekendCellStyleProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthViewStyle.weekendCellStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.onWeekendCellStyleChanged = function (data) { };
    ;
    CalendarMonthViewStyle.onTitleCellStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onTitleCellStyleChanged(data);
    };
    Object.defineProperty(CalendarMonthViewStyle.prototype, "titleCellStyle", {
        get: function () {
            return this._getValue(CalendarMonthViewStyle.titleCellStyleProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthViewStyle.titleCellStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.onTitleCellStyleChanged = function (data) { };
    ;
    CalendarMonthViewStyle.onInlineEventCellStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onInlineEventCellStyleChanged(data);
    };
    Object.defineProperty(CalendarMonthViewStyle.prototype, "inlineEventCellStyle", {
        get: function () {
            return this._getValue(CalendarMonthViewStyle.inlineEventCellStyleProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthViewStyle.inlineEventCellStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.onInlineEventCellStyleChanged = function (data) { };
    ;
    CalendarMonthViewStyle.showWeekNumbersProperty = new dependencyObservable.Property("showWeekNumbers", "CalendarMonthViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthViewStyle.onShowWeekNumbersPropertyChanged));
    CalendarMonthViewStyle.showTitleProperty = new dependencyObservable.Property("showTitle", "CalendarMonthViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthViewStyle.onShowTitlePropertyChanged));
    CalendarMonthViewStyle.showDayNamesProperty = new dependencyObservable.Property("showDayNames", "CalendarMonthViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthViewStyle.onShowDayNamesPropertyChanged));
    CalendarMonthViewStyle.backgroundColorProperty = new dependencyObservable.Property("backgroundColor", "CalendarMonthViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthViewStyle.onCellBackgroundColorPropertyChanged));
    CalendarMonthViewStyle.dayCellStyleProperty = new dependencyObservable.Property("dayCellStyle", "CalendarMonthViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthViewStyle.onDayCellStylePropertyChanged));
    CalendarMonthViewStyle.selectedDayCellStyleProperty = new dependencyObservable.Property("selectedDayCellStyle", "CalendarMonthViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthViewStyle.onSelectedDayCellStylePropertyChanged));
    CalendarMonthViewStyle.todayCellStyleProperty = new dependencyObservable.Property("todayCellStyle", "CalendarMonthViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthViewStyle.onTodayCellStylePropertyChanged));
    CalendarMonthViewStyle.dayNameCellStyleProperty = new dependencyObservable.Property("dayNameCellStyle", "CalendarMonthViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthViewStyle.onDayNameCellStylePropertyChanged));
    CalendarMonthViewStyle.weekNumberCellStyleProperty = new dependencyObservable.Property("weekNumberCellStyle", "CalendarMonthViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthViewStyle.onWeekNumberCellStylePropertyChanged));
    CalendarMonthViewStyle.weekendCellStyleProperty = new dependencyObservable.Property("weekendCellStyle", "CalendarMonthViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthViewStyle.onWeekendCellStylePropertyChanged));
    CalendarMonthViewStyle.titleCellStyleProperty = new dependencyObservable.Property("titleCellStyle", "CalendarMonthViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthViewStyle.onTitleCellStylePropertyChanged));
    CalendarMonthViewStyle.inlineEventCellStyleProperty = new dependencyObservable.Property("inlineEventCellStyle", "CalendarMonthViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthViewStyle.onInlineEventCellStylePropertyChanged));
    return CalendarMonthViewStyle;
}(bindable_1.Bindable));
exports.CalendarMonthViewStyle = CalendarMonthViewStyle;
//////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Style class for Week view mode
 */
var CalendarWeekViewStyle = (function (_super) {
    __extends(CalendarWeekViewStyle, _super);
    function CalendarWeekViewStyle() {
        _super.apply(this, arguments);
    }
    return CalendarWeekViewStyle;
}(CalendarMonthViewStyle));
exports.CalendarWeekViewStyle = CalendarWeekViewStyle;
//////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Style class for Year view mode
 */
var CalendarYearViewStyle = (function (_super) {
    __extends(CalendarYearViewStyle, _super);
    function CalendarYearViewStyle() {
        _super.call(this);
    }
    CalendarYearViewStyle.onTitleCellStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onTitleCellStyleChanged(data);
    };
    Object.defineProperty(CalendarYearViewStyle.prototype, "titleCellStyle", {
        get: function () {
            return this._getValue(CalendarYearViewStyle.titleCellStyleProperty);
        },
        set: function (value) {
            this._setValue(CalendarYearViewStyle.titleCellStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarYearViewStyle.prototype.onTitleCellStyleChanged = function (data) {
    };
    ;
    CalendarYearViewStyle.onMonthCellStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onMonthCellStyleChanged(data);
    };
    Object.defineProperty(CalendarYearViewStyle.prototype, "monthCellStyle", {
        get: function () {
            return this._getValue(CalendarYearViewStyle.monthCellStyleProperty);
        },
        set: function (value) {
            this._setValue(CalendarYearViewStyle.monthCellStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarYearViewStyle.prototype.onMonthCellStyleChanged = function (data) {
    };
    ;
    CalendarYearViewStyle.titleCellStyleProperty = new dependencyObservable.Property("titleCellStyle", "CalendarYearViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarYearViewStyle.onTitleCellStylePropertyChanged));
    CalendarYearViewStyle.monthCellStyleProperty = new dependencyObservable.Property("monthCellStyle", "CalendarYearViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarYearViewStyle.onMonthCellStylePropertyChanged));
    return CalendarYearViewStyle;
}(bindable_1.Bindable));
exports.CalendarYearViewStyle = CalendarYearViewStyle;
//////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Style class for year view with month names only view mode
 */
var CalendarMonthNamesViewStyle = (function (_super) {
    __extends(CalendarMonthNamesViewStyle, _super);
    function CalendarMonthNamesViewStyle() {
        _super.call(this);
    }
    CalendarMonthNamesViewStyle.onTitleCellStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onTitleCellStyleChanged(data);
    };
    Object.defineProperty(CalendarMonthNamesViewStyle.prototype, "titleCellStyle", {
        get: function () {
            return this._getValue(CalendarMonthNamesViewStyle.titleCellStyleProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthNamesViewStyle.titleCellStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthNamesViewStyle.prototype.onTitleCellStyleChanged = function (data) {
    };
    ;
    CalendarMonthNamesViewStyle.onMonthNameCellStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onMonthNameCellStyleChanged(data);
    };
    Object.defineProperty(CalendarMonthNamesViewStyle.prototype, "monthNameCellStyle", {
        get: function () {
            return this._getValue(CalendarMonthNamesViewStyle.monthNameCellStyleProperty);
        },
        set: function (value) {
            this._setValue(CalendarMonthNamesViewStyle.monthNameCellStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthNamesViewStyle.prototype.onMonthNameCellStyleChanged = function (data) {
    };
    ;
    CalendarMonthNamesViewStyle.titleCellStyleProperty = new dependencyObservable.Property("titleCellStyle", "CalendarMonthNamesViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthNamesViewStyle.onTitleCellStylePropertyChanged));
    CalendarMonthNamesViewStyle.monthNameCellStyleProperty = new dependencyObservable.Property("monthNameCellStyle", "CalendarMonthNamesViewStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CalendarMonthNamesViewStyle.onMonthNameCellStylePropertyChanged));
    return CalendarMonthNamesViewStyle;
}(bindable_1.Bindable));
exports.CalendarMonthNamesViewStyle = CalendarMonthNamesViewStyle;
/**
 * The style class with customization properties for months in year view
 * Note: this class is not inherited from CellStyle
 */
var MonthCellStyle = (function (_super) {
    __extends(MonthCellStyle, _super);
    function MonthCellStyle() {
        _super.apply(this, arguments);
    }
    MonthCellStyle.onWeekendТextColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onWeekendTextColorChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "weekendTextColor", {
        get: function () {
            return this._getValue(MonthCellStyle.weekendTextColorProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.weekendTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onWeekendTextColorChanged = function (data) {
    };
    MonthCellStyle.onTodayТextColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onTodayTextColorChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "todayTextColor", {
        get: function () {
            return this._getValue(MonthCellStyle.todayTextColorProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.todayTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onTodayTextColorChanged = function (data) {
    };
    MonthCellStyle.onDayТextColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onDayTextColorChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "dayTextColor", {
        get: function () {
            return this._getValue(MonthCellStyle.dayTextColorProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.dayTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onDayTextColorChanged = function (data) {
    };
    MonthCellStyle.onDayFontNamePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onDayFontNameChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "dayFontName", {
        get: function () {
            return this._getValue(MonthCellStyle.dayFontNameProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.dayFontNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onDayFontNameChanged = function (data) {
    };
    MonthCellStyle.onDayFontStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onDayFontStyleChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "dayFontStyle", {
        get: function () {
            return this._getValue(MonthCellStyle.dayFontStyleProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.dayFontStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onDayFontStyleChanged = function (data) {
    };
    MonthCellStyle.onDayTextSizePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onDayTextSizeChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "dayTextSize", {
        get: function () {
            return this._getValue(MonthCellStyle.dayTextSizeProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.dayTextSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onDayTextSizeChanged = function (data) {
    };
    MonthCellStyle.onDayNameТextColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onDayNameTextColorChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "dayNameTextColor", {
        get: function () {
            return this._getValue(MonthCellStyle.dayNameTextColorProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.dayNameTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onDayNameTextColorChanged = function (data) {
    };
    MonthCellStyle.onDayNameFontNamePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onDayNameFontNameChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "dayNameFontName", {
        get: function () {
            return this._getValue(MonthCellStyle.dayNameFontNameProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.dayNameFontNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onDayNameFontNameChanged = function (data) {
    };
    MonthCellStyle.onDayNameFontStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onDayNameFontStyleChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "dayNameFontStyle", {
        get: function () {
            return this._getValue(MonthCellStyle.dayNameFontStyleProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.dayNameFontStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onDayNameFontStyleChanged = function (data) {
    };
    MonthCellStyle.onDayNameTextSizePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onDayNameTextSizeChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "dayNameTextSize", {
        get: function () {
            return this._getValue(MonthCellStyle.dayNameTextSizeProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.dayNameTextSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onDayNameTextSizeChanged = function (data) {
    };
    MonthCellStyle.onMonthNameТextColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onMonthNameTextColorChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "monthNameTextColor", {
        get: function () {
            return this._getValue(MonthCellStyle.monthNameTextColorProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.monthNameTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onMonthNameTextColorChanged = function (data) {
    };
    MonthCellStyle.onMonthNameFontNamePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onMonthNameFontNameChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "monthNameFontName", {
        get: function () {
            return this._getValue(MonthCellStyle.monthNameFontNameProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.monthNameFontNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onMonthNameFontNameChanged = function (data) {
    };
    MonthCellStyle.onMonthNameFontStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onMonthNameFontStyleChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "monthNameFontStyle", {
        get: function () {
            return this._getValue(MonthCellStyle.monthNameFontStyleProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.monthNameFontStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onMonthNameFontStyleChanged = function (data) {
    };
    MonthCellStyle.onMonthNameTextSizePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onMonthNameTextSizeChanged(data);
    };
    Object.defineProperty(MonthCellStyle.prototype, "monthNameTextSize", {
        get: function () {
            return this._getValue(MonthCellStyle.monthNameTextSizeProperty);
        },
        set: function (value) {
            this._setValue(MonthCellStyle.monthNameTextSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onMonthNameTextSizeChanged = function (data) {
    };
    MonthCellStyle.weekendTextColorProperty = new dependencyObservable.Property("weekendTextColor", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onWeekendТextColorPropertyChanged));
    MonthCellStyle.todayTextColorProperty = new dependencyObservable.Property("todayTextColor", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onTodayТextColorPropertyChanged));
    MonthCellStyle.dayTextColorProperty = new dependencyObservable.Property("dayTextColor", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onDayТextColorPropertyChanged));
    MonthCellStyle.dayFontNameProperty = new dependencyObservable.Property("dayFontName", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onDayFontNamePropertyChanged));
    MonthCellStyle.dayFontStyleProperty = new dependencyObservable.Property("dayFontStyle", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onDayFontStylePropertyChanged));
    MonthCellStyle.dayTextSizeProperty = new dependencyObservable.Property("dayTextSize", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onDayTextSizePropertyChanged));
    // Day name properties
    MonthCellStyle.dayNameTextColorProperty = new dependencyObservable.Property("dayNameTextColor", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onDayNameТextColorPropertyChanged));
    MonthCellStyle.dayNameFontNameProperty = new dependencyObservable.Property("dayNameFontName", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onDayNameFontNamePropertyChanged));
    MonthCellStyle.dayNameFontStyleProperty = new dependencyObservable.Property("dayNameFontStyle", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onDayNameFontStylePropertyChanged));
    MonthCellStyle.dayNameTextSizeProperty = new dependencyObservable.Property("dayNameTextSize", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onDayNameTextSizePropertyChanged));
    /// Month name properties  
    MonthCellStyle.monthNameTextColorProperty = new dependencyObservable.Property("monthNameTextColor", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onMonthNameТextColorPropertyChanged));
    MonthCellStyle.monthNameFontNameProperty = new dependencyObservable.Property("monthNameFontName", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onMonthNameFontNamePropertyChanged));
    MonthCellStyle.monthNameFontStyleProperty = new dependencyObservable.Property("monthNameFontStyle", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onMonthNameFontStylePropertyChanged));
    MonthCellStyle.monthNameTextSizeProperty = new dependencyObservable.Property("monthNameTextSize", "MonthCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, MonthCellStyle.onMonthNameTextSizePropertyChanged));
    return MonthCellStyle;
}(bindable_1.Bindable));
exports.MonthCellStyle = MonthCellStyle;
//////////////////////////////////////////////// 
/// Cell styles
// properties left to implement but available only in iOS :  shapeStroke , shapeFill, shape 
var CellStyle = (function (_super) {
    __extends(CellStyle, _super);
    function CellStyle() {
        _super.call(this);
    }
    Object.defineProperty(CellStyle.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellStyle.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.onCellBorderWidthPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onCellBorderWidthChanged(data);
    };
    Object.defineProperty(CellStyle.prototype, "cellBorderWidth", {
        get: function () {
            return this._getValue(CellStyle.cellBorderWidthProperty);
        },
        set: function (value) {
            this._setValue(CellStyle.cellBorderWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellBorderWidthChanged = function (data) { };
    CellStyle.onCellBorderColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onCellBorderColorChanged(data);
    };
    Object.defineProperty(CellStyle.prototype, "cellBorderColor", {
        get: function () {
            return this._getValue(CellStyle.cellBorderColorProperty);
        },
        set: function (value) {
            this._setValue(CellStyle.cellBorderColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellBorderColorChanged = function (data) { };
    CellStyle.onCellBackgroundColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onCellBackgroundColorChanged(data);
    };
    Object.defineProperty(CellStyle.prototype, "cellBackgroundColor", {
        get: function () {
            return this._getValue(CellStyle.cellBackgroundColorProperty);
        },
        set: function (value) {
            this._setValue(CellStyle.cellBackgroundColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellBackgroundColorChanged = function (data) { };
    CellStyle.onCellAlignmentPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onCellAlignmentChanged(data);
    };
    Object.defineProperty(CellStyle.prototype, "cellAlignment", {
        get: function () {
            return this._getValue(CellStyle.cellAlignmentProperty);
        },
        set: function (value) {
            this._setValue(CellStyle.cellAlignmentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellAlignmentChanged = function (data) { };
    CellStyle.onCellТextColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onCellTextColorChanged(data);
    };
    Object.defineProperty(CellStyle.prototype, "cellTextColor", {
        get: function () {
            return this._getValue(CellStyle.cellTextColorProperty);
        },
        set: function (value) {
            this._setValue(CellStyle.cellTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellTextColorChanged = function (data) {
    };
    CellStyle.onCellTextFontNamePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onCellTextFontNameChanged(data);
    };
    Object.defineProperty(CellStyle.prototype, "cellTextFontName", {
        get: function () {
            return this._getValue(CellStyle.cellTextFontNameProperty);
        },
        set: function (value) {
            this._setValue(CellStyle.cellTextFontNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellTextFontNameChanged = function (data) {
        console.log("common: onCellTextFontNameChanged");
    };
    CellStyle.onCellTextFontStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onCellTextFontStyleChanged(data);
    };
    Object.defineProperty(CellStyle.prototype, "cellTextFontStyle", {
        get: function () {
            return this._getValue(CellStyle.cellTextFontStyleProperty);
        },
        set: function (value) {
            this._setValue(CellStyle.cellTextFontStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellTextFontStyleChanged = function (data) {
    };
    CellStyle.onCellTextSizePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onCellTextSizeChanged(data);
    };
    Object.defineProperty(CellStyle.prototype, "cellTextSize", {
        get: function () {
            return this._getValue(CellStyle.cellTextSizeProperty);
        },
        set: function (value) {
            this._setValue(CellStyle.cellTextSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellTextSizeChanged = function (data) {
    };
    CellStyle.onCellPaddingHorizontalPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onCellPaddingHorizontalChanged(data);
    };
    Object.defineProperty(CellStyle.prototype, "cellPaddingHorizontal", {
        get: function () {
            return this._getValue(CellStyle.cellPaddingHorizontalProperty);
        },
        set: function (value) {
            this._setValue(CellStyle.cellPaddingHorizontalProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellPaddingHorizontalChanged = function (data) {
    };
    CellStyle.onCellPaddingVerticalPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onCellPaddingVerticalChanged(data);
    };
    Object.defineProperty(CellStyle.prototype, "cellPaddingVertical", {
        get: function () {
            return this._getValue(CellStyle.cellPaddingVerticalProperty);
        },
        set: function (value) {
            this._setValue(CellStyle.cellPaddingVerticalProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.onCellPaddingVerticalChanged = function (data) {
    };
    CellStyle.cellBorderWidthProperty = new dependencyObservable.Property("cellBorderWidth", "CellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CellStyle.onCellBorderWidthPropertyChanged));
    CellStyle.cellBorderColorProperty = new dependencyObservable.Property("cellBorderColor", "CellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, CellStyle.onCellBorderColorPropertyChanged));
    CellStyle.cellBackgroundColorProperty = new dependencyObservable.Property("cellBackgroundColor", "CellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, CellStyle.onCellBackgroundColorPropertyChanged));
    CellStyle.cellAlignmentProperty = new dependencyObservable.Property("cellAlignment", "CellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CellStyle.onCellAlignmentPropertyChanged));
    CellStyle.cellTextColorProperty = new dependencyObservable.Property("cellTextColor", "CellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, CellStyle.onCellТextColorPropertyChanged));
    CellStyle.cellTextFontNameProperty = new dependencyObservable.Property("cellTextFontName", "CellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, CellStyle.onCellTextFontNamePropertyChanged));
    CellStyle.cellTextFontStyleProperty = new dependencyObservable.Property("cellTextFontStyle", "CellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, CellStyle.onCellTextFontStylePropertyChanged));
    CellStyle.cellTextSizeProperty = new dependencyObservable.Property("cellTextSize", "CellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, CellStyle.onCellTextSizePropertyChanged));
    CellStyle.cellPaddingHorizontalProperty = new dependencyObservable.Property("cellPaddingHorizontal", "CellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, CellStyle.onCellPaddingHorizontalPropertyChanged));
    CellStyle.cellPaddingVerticalProperty = new dependencyObservable.Property("cellPaddingVertical", "CellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, CellStyle.onCellPaddingVerticalPropertyChanged));
    return CellStyle;
}(bindable_1.Bindable));
exports.CellStyle = CellStyle;
////////////////////////////////////////////////////////////////////////////////////////////////////
//  DayCellStyle
////////////////////////////////////////////////////////////////////////////////////////////////////
// properties available in ios only: allDayEventTextColor, eventAlignment, eventSpacing, eventShape, eventOrientation, stretchEvents, maxEventsCount, wrapEventText
var DayCellStyle = (function (_super) {
    __extends(DayCellStyle, _super);
    function DayCellStyle() {
        _super.apply(this, arguments);
    }
    DayCellStyle.onShowEventsTextPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onShowEventsTextChanged(data);
    };
    Object.defineProperty(DayCellStyle.prototype, "showEventsText", {
        get: function () {
            return this._getValue(DayCellStyle.showEventsTextProperty);
        },
        set: function (value) {
            this._setValue(DayCellStyle.showEventsTextProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DayCellStyle.prototype.onShowEventsTextChanged = function (data) { };
    DayCellStyle.onEventTextColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onEventTextColorChanged(data);
    };
    Object.defineProperty(DayCellStyle.prototype, "eventTextColor", {
        get: function () {
            return this._getValue(DayCellStyle.eventTextColorProperty);
        },
        set: function (value) {
            this._setValue(DayCellStyle.eventTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DayCellStyle.prototype.onEventTextColorChanged = function (data) { };
    DayCellStyle.onEventFontNamePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onEventFontNameChanged(data);
    };
    Object.defineProperty(DayCellStyle.prototype, "eventFontName", {
        get: function () {
            return this._getValue(DayCellStyle.eventFontNameProperty);
        },
        set: function (value) {
            this._setValue(DayCellStyle.eventFontNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DayCellStyle.prototype.onEventFontNameChanged = function (data) { };
    DayCellStyle.onEventFontStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onEventFontStyleChanged(data);
    };
    Object.defineProperty(DayCellStyle.prototype, "eventFontStyle", {
        get: function () {
            return this._getValue(DayCellStyle.eventFontStyleProperty);
        },
        set: function (value) {
            this._setValue(DayCellStyle.eventFontStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DayCellStyle.prototype.onEventFontStyleChanged = function (data) { };
    DayCellStyle.onEventTextSizePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onEventTextSizeChanged(data);
    };
    Object.defineProperty(DayCellStyle.prototype, "eventTextSize", {
        get: function () {
            return this._getValue(DayCellStyle.eventTextSizeProperty);
        },
        set: function (value) {
            this._setValue(DayCellStyle.eventTextSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DayCellStyle.prototype.onEventTextSizeChanged = function (data) {
    };
    DayCellStyle.showEventsTextProperty = new dependencyObservable.Property("showEventsText", "DayCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, DayCellStyle.onShowEventsTextPropertyChanged));
    DayCellStyle.eventTextColorProperty = new dependencyObservable.Property("eventTextColor", "DayCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, DayCellStyle.onEventTextColorPropertyChanged));
    DayCellStyle.eventFontNameProperty = new dependencyObservable.Property("eventFontName", "DayCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, DayCellStyle.onEventFontNamePropertyChanged));
    DayCellStyle.eventFontStyleProperty = new dependencyObservable.Property("eventFontStyle", "DayCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, DayCellStyle.onEventFontStylePropertyChanged));
    DayCellStyle.eventTextSizeProperty = new dependencyObservable.Property("eventTextSize", "DayCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, DayCellStyle.onEventTextSizePropertyChanged));
    return DayCellStyle;
}(CellStyle));
exports.DayCellStyle = DayCellStyle;
/**
 * Cell style class for inline events cells in month view
 */
//missing for ios: separatorColor & shape size
var InlineEventCellStyle = (function (_super) {
    __extends(InlineEventCellStyle, _super);
    function InlineEventCellStyle() {
        _super.apply(this, arguments);
    }
    InlineEventCellStyle.onCellBackgroundColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onCellBackgroundColorChanged(data);
    };
    Object.defineProperty(InlineEventCellStyle.prototype, "cellBackgroundColor", {
        get: function () {
            return this._getValue(InlineEventCellStyle.cellBackgroundColorProperty);
        },
        set: function (value) {
            this._setValue(InlineEventCellStyle.cellBackgroundColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    InlineEventCellStyle.prototype.onCellBackgroundColorChanged = function (data) { };
    InlineEventCellStyle.onEventTextColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onEventTextColorChanged(data);
    };
    Object.defineProperty(InlineEventCellStyle.prototype, "eventTextColor", {
        get: function () {
            return this._getValue(InlineEventCellStyle.eventTextColorProperty);
        },
        set: function (value) {
            this._setValue(InlineEventCellStyle.eventTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    InlineEventCellStyle.prototype.onEventTextColorChanged = function (data) { };
    InlineEventCellStyle.onEventFontNamePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onEventFontNameChanged(data);
    };
    Object.defineProperty(InlineEventCellStyle.prototype, "eventFontName", {
        get: function () {
            return this._getValue(InlineEventCellStyle.eventFontNameProperty);
        },
        set: function (value) {
            this._setValue(InlineEventCellStyle.eventFontNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    InlineEventCellStyle.prototype.onEventFontNameChanged = function (data) { };
    InlineEventCellStyle.onEventFontStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onEventFontStyleChanged(data);
    };
    Object.defineProperty(InlineEventCellStyle.prototype, "eventFontStyle", {
        get: function () {
            return this._getValue(InlineEventCellStyle.eventFontStyleProperty);
        },
        set: function (value) {
            this._setValue(InlineEventCellStyle.eventFontStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    InlineEventCellStyle.prototype.onEventFontStyleChanged = function (data) { };
    InlineEventCellStyle.onEventTextSizePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onEventTextSizeChanged(data);
    };
    Object.defineProperty(InlineEventCellStyle.prototype, "eventTextSize", {
        get: function () {
            return this._getValue(InlineEventCellStyle.eventTextSizeProperty);
        },
        set: function (value) {
            this._setValue(InlineEventCellStyle.eventTextSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    InlineEventCellStyle.prototype.onEventTextSizeChanged = function (data) {
    };
    InlineEventCellStyle.onTimeTextColorPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onTimeTextColorChanged(data);
    };
    Object.defineProperty(InlineEventCellStyle.prototype, "timeTextColor", {
        get: function () {
            return this._getValue(InlineEventCellStyle.timeTextColorProperty);
        },
        set: function (value) {
            this._setValue(InlineEventCellStyle.timeTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    InlineEventCellStyle.prototype.onTimeTextColorChanged = function (data) { };
    InlineEventCellStyle.onTimeFontNamePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onTimeFontNameChanged(data);
    };
    Object.defineProperty(InlineEventCellStyle.prototype, "timeFontName", {
        get: function () {
            return this._getValue(InlineEventCellStyle.timeFontNameProperty);
        },
        set: function (value) {
            this._setValue(InlineEventCellStyle.timeFontNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    InlineEventCellStyle.prototype.onTimeFontNameChanged = function (data) { };
    InlineEventCellStyle.onTimeFontStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onTimeFontStyleChanged(data);
    };
    Object.defineProperty(InlineEventCellStyle.prototype, "timeFontStyle", {
        get: function () {
            return this._getValue(InlineEventCellStyle.timeFontStyleProperty);
        },
        set: function (value) {
            this._setValue(InlineEventCellStyle.timeFontStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    InlineEventCellStyle.prototype.onTimeFontStyleChanged = function (data) { };
    InlineEventCellStyle.onTimeTextSizePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onTimeTextSizeChanged(data);
    };
    Object.defineProperty(InlineEventCellStyle.prototype, "timeTextSize", {
        get: function () {
            return this._getValue(InlineEventCellStyle.timeTextSizeProperty);
        },
        set: function (value) {
            this._setValue(InlineEventCellStyle.timeTextSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    InlineEventCellStyle.prototype.onTimeTextSizeChanged = function (data) { };
    InlineEventCellStyle.cellBackgroundColorProperty = new dependencyObservable.Property("cellBackgroundColor", "InlineEventCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, InlineEventCellStyle.onCellBackgroundColorPropertyChanged));
    InlineEventCellStyle.eventTextColorProperty = new dependencyObservable.Property("eventTextColor", "InlineEventCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, InlineEventCellStyle.onEventTextColorPropertyChanged));
    InlineEventCellStyle.eventFontNameProperty = new dependencyObservable.Property("eventFontName", "InlineEventCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, InlineEventCellStyle.onEventFontNamePropertyChanged));
    InlineEventCellStyle.eventFontStyleProperty = new dependencyObservable.Property("eventFontStyle", "InlineEventCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, InlineEventCellStyle.onEventFontStylePropertyChanged));
    InlineEventCellStyle.eventTextSizeProperty = new dependencyObservable.Property("eventTextSize", "InlineEventCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, InlineEventCellStyle.onEventTextSizePropertyChanged));
    InlineEventCellStyle.timeTextColorProperty = new dependencyObservable.Property("timeTextColor", "InlineEventCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, InlineEventCellStyle.onTimeTextColorPropertyChanged));
    InlineEventCellStyle.timeFontNameProperty = new dependencyObservable.Property("timeFontName", "InlineEventCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, InlineEventCellStyle.onTimeFontNamePropertyChanged));
    InlineEventCellStyle.timeFontStyleProperty = new dependencyObservable.Property("timeFontStyle", "InlineEventCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, InlineEventCellStyle.onTimeFontStylePropertyChanged));
    InlineEventCellStyle.timeTextSizeProperty = new dependencyObservable.Property("timeTextSize", "InlineEventCellStyle", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, InlineEventCellStyle.onTimeTextSizePropertyChanged));
    return InlineEventCellStyle;
}(bindable_1.Bindable));
exports.InlineEventCellStyle = InlineEventCellStyle;
////////////////////////////////////////////////////////////////////////////////////////////////////
var RadCalendar = (function (_super) {
    __extends(RadCalendar, _super);
    function RadCalendar() {
        _super.call(this);
    }
    Object.defineProperty(RadCalendar.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCalendar.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onMinDatePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onMinDateChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "minDate", {
        get: function () {
            return this._getValue(RadCalendar.minDateProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.minDateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onMaxDatePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onMaxDateChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "maxDate", {
        get: function () {
            return this._getValue(RadCalendar.maxDateProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.maxDateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onSelectedDatePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onSelectedDateChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "selectedDate", {
        get: function () {
            return this._getValue(RadCalendar.selectedDateProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.selectedDateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onSelectedDatesPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onSelectedDatesChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "selectedDates", {
        get: function () {
            return this._getValue(RadCalendar.selectedDatesProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.selectedDatesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onSelectedDateRangePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onSelectedDateRangeChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "selectedDateRange", {
        get: function () {
            return this._getValue(RadCalendar.selectedDateRangeProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.selectedDateRangeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onViewModePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onViewModeChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "viewMode", {
        get: function () {
            return this._getValue(RadCalendar.viewModeProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.viewModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onEventsViewModePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onEventsViewModeChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "eventsViewMode", {
        get: function () {
            return this._getValue(RadCalendar.eventsViewModeProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.eventsViewModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onSelectionModePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onSelectionModeChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "selectionMode", {
        get: function () {
            return this._getValue(RadCalendar.selectionModeProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.selectionModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onTransitionModePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onTransitionModeChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "transitionMode", {
        get: function () {
            return this._getValue(RadCalendar.transitionModeProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.transitionModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onDisplayedDatePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onDisplayedDateChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "displayedDate", {
        get: function () {
            return this._getValue(RadCalendar.displayedDateProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.displayedDateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onEventSourcePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onEventSourceChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "eventSource", {
        get: function () {
            return this._getValue(RadCalendar.eventSourceProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.eventSourceProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onHorizontalTransitionPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onHorizontalTransitionChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "horizontalTransition", {
        get: function () {
            return this._getValue(RadCalendar.horizontalTransitionProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.horizontalTransitionProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onMonthViewStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onMonthViewStyleChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "monthViewStyle", {
        get: function () {
            return this._getValue(RadCalendar.monthViewStyleProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.monthViewStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onWeekViewStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onWeekViewStyleChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "weekViewStyle", {
        get: function () {
            return this._getValue(RadCalendar.weekViewStyleProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.weekViewStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onYearViewStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onYearViewStyleChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "yearViewStyle", {
        get: function () {
            return this._getValue(RadCalendar.yearViewStyleProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.yearViewStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.onMonthNamesViewStylePropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onMonthNamesViewStyleChanged(data);
    };
    Object.defineProperty(RadCalendar.prototype, "monthNamesViewStyle", {
        get: function () {
            return this._getValue(RadCalendar.monthNamesViewStyleProperty);
        },
        set: function (value) {
            this._setValue(RadCalendar.monthNamesViewStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.prototype.reload = function () { };
    RadCalendar.prototype.navigateForward = function () { };
    RadCalendar.prototype.navigateBack = function () { };
    RadCalendar.prototype.goToDate = function (date) { };
    RadCalendar.prototype.getEventsForDate = function (date) {
        return undefined;
    };
    RadCalendar.prototype.parseDate = function (value) {
        var date;
        if (value instanceof Date) {
            date = value;
        }
        else {
            date = new Date(value);
        }
        var time = date.getTime();
        if (isNaN(time)) {
            throw new TypeError("Incorrect date format!");
        }
        return date;
    };
    RadCalendar.prototype.getSelectedDatesList = function () {
        var current = this.selectedDates;
        if (typeof (this.selectedDates) === "string") {
            current = this.selectedDates.split(",");
        }
        return current;
    };
    RadCalendar.prototype._addSelectedDate = function (date) {
        // debugger;
        var newSelection = new Array();
        if (this.selectedDates) {
            var currentSelection = this.getSelectedDatesList();
            for (var i = 0; i < currentSelection.length; i++) {
                var selectedDate = this.parseDate(currentSelection[i]);
                newSelection.push(selectedDate);
                if (selectedDate.getTime() === date.getTime()) {
                    return;
                }
            }
        }
        newSelection.push(date);
        this.selectedDates = newSelection;
    };
    RadCalendar.prototype._removeSelectedDate = function (date) {
        var newSelection = new Array();
        var currentSelection = this.getSelectedDatesList();
        for (var i = 0; i < currentSelection.length; i++) {
            var selectedDate = this.parseDate(currentSelection[i]);
            if (selectedDate.getTime() !== date.getTime()) {
                newSelection.push(selectedDate);
            }
        }
        this.selectedDates = newSelection;
        if (newSelection.length > 0) {
            this.selectedDate = newSelection[newSelection.length - 1];
        }
        else {
            this.selectedDate = undefined;
        }
    };
    RadCalendar.prototype.onEventSourceChanged = function (data) {
        this.updateEventSource();
        if (data.oldValue instanceof observable_1.Observable) {
            weakEvents.removeWeakEventListener(data.oldValue, observable_array_1.ObservableArray.changeEvent, this.EventSourceChangedInternal, this);
        }
        if (data.newValue instanceof observable_1.Observable) {
            weakEvents.addWeakEventListener(data.newValue, observable_array_1.ObservableArray.changeEvent, this.EventSourceChangedInternal, this);
        }
    };
    ;
    RadCalendar.prototype.EventSourceChangedInternal = function (data) {
        this.updateEventSource();
    };
    RadCalendar.prototype.updateEventSource = function () { };
    ;
    RadCalendar.prototype.onDisplayedDateChanged = function (data) { };
    ;
    RadCalendar.prototype.onSelectionModeChanged = function (data) { };
    ;
    RadCalendar.prototype.onTransitionModeChanged = function (data) { };
    ;
    RadCalendar.prototype.onViewModeChanged = function (data) { };
    ;
    RadCalendar.prototype.onEventsViewModeChanged = function (data) { };
    ;
    RadCalendar.prototype.onSelectedDateRangeChanged = function (data) { };
    ;
    RadCalendar.prototype.onSelectedDatesChanged = function (data) { };
    ;
    RadCalendar.prototype.onSelectedDateChanged = function (data) { };
    ;
    RadCalendar.prototype.onMaxDateChanged = function (data) { };
    ;
    RadCalendar.prototype.onMinDateChanged = function (data) { };
    ;
    RadCalendar.prototype.onHorizontalTransitionChanged = function (data) { };
    ;
    RadCalendar.prototype.onMonthViewStyleChanged = function (data) { };
    ;
    RadCalendar.prototype.onWeekViewStyleChanged = function (data) { };
    ;
    RadCalendar.prototype.onYearViewStyleChanged = function (data) { };
    ;
    RadCalendar.prototype.onMonthNamesViewStyleChanged = function (data) { };
    ;
    // public static dateSelectingEvent : string = "dateSelecting";
    RadCalendar.dateSelectedEvent = "dateSelected";
    RadCalendar.dateDeselectedEvent = "dateDeselected";
    RadCalendar.inlineEventSelectedEvent = "inlineEventSelected";
    RadCalendar.navigatedToDateEvent = "navigatedToDate";
    RadCalendar.navigatingToDateStartedEvent = "navigatingToDateStarted";
    RadCalendar.viewModeChangedEvent = "viewModeChanged";
    RadCalendar.minDateProperty = new dependencyObservable.Property("minDate", "RadCalendar", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadCalendar.onMinDatePropertyChanged));
    RadCalendar.maxDateProperty = new dependencyObservable.Property("maxDate", "RadCalendar", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadCalendar.onMaxDatePropertyChanged));
    RadCalendar.selectedDateProperty = new dependencyObservable.Property("selectedDate", "RadCalendar", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadCalendar.onSelectedDatePropertyChanged));
    RadCalendar.selectedDatesProperty = new dependencyObservable.Property("selectedDates", "RadCalendar", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadCalendar.onSelectedDatesPropertyChanged));
    RadCalendar.selectedDateRangeProperty = new dependencyObservable.Property("selectedDateRange", "RadCalendar", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadCalendar.onSelectedDateRangePropertyChanged));
    RadCalendar.viewModeProperty = new dependencyObservable.Property("viewMode", "RadCalendar", new proxy_1.PropertyMetadata("Month", dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onViewModePropertyChanged));
    RadCalendar.eventsViewModeProperty = new dependencyObservable.Property("eventsViewMode", "RadCalendar", new proxy_1.PropertyMetadata("None", dependencyObservable.PropertyMetadataSettings.None, RadCalendar.onEventsViewModePropertyChanged));
    RadCalendar.selectionModeProperty = new dependencyObservable.Property("selectionMode", "RadCalendar", new proxy_1.PropertyMetadata("Single", dependencyObservable.PropertyMetadataSettings.None, RadCalendar.onSelectionModePropertyChanged));
    RadCalendar.transitionModeProperty = new dependencyObservable.Property("transitionMode", "RadCalendar", new proxy_1.PropertyMetadata("Slide", dependencyObservable.PropertyMetadataSettings.None, RadCalendar.onTransitionModePropertyChanged));
    // Perhaps currentDate would be a better name for this :/
    RadCalendar.displayedDateProperty = new dependencyObservable.Property("displayedDate", "RadCalendar", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadCalendar.onDisplayedDatePropertyChanged));
    RadCalendar.eventSourceProperty = new dependencyObservable.Property("eventSource", "RadCalendar", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onEventSourcePropertyChanged));
    RadCalendar.horizontalTransitionProperty = new dependencyObservable.Property("horizontalTransition", "RadCalendar", new proxy_1.PropertyMetadata(true, dependencyObservable.PropertyMetadataSettings.None, RadCalendar.onHorizontalTransitionPropertyChanged));
    RadCalendar.monthViewStyleProperty = new dependencyObservable.Property("monthViewStyle", "RadCalendar", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onMonthViewStylePropertyChanged));
    RadCalendar.weekViewStyleProperty = new dependencyObservable.Property("weekViewStyle", "RadCalendar", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onWeekViewStylePropertyChanged));
    RadCalendar.yearViewStyleProperty = new dependencyObservable.Property("yearViewStyle", "RadCalendar", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onYearViewStylePropertyChanged));
    RadCalendar.monthNamesViewStyleProperty = new dependencyObservable.Property("monthNamesViewStyle", "RadCalendar", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCalendar.onMonthNamesViewStylePropertyChanged));
    return RadCalendar;
}(view_1.View));
exports.RadCalendar = RadCalendar;
//# sourceMappingURL=calendar-common.js.map