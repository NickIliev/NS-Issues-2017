import { Property } from "ui/core/dependency-observable";
import { View } from "ui/core/view";
import { EventData } from "data/observable";
import { Bindable } from "ui/core/bindable";
import { Color } from "color";

/**
 * Font styles
 */
export module FontStyles {
    /**
     * Regular font style
     */
    export var Normal;
    /**
     * Bold font style
     */
    export var Bold;
    /**
     * Italic font style
     */
    export var Italic;
    /**
     * Combine Bold and Italic styles
     */
    export var BoldItalic;
}

/**
 * Defines the possible values for the {@link viewMode} property 
 * for the relevant {@link RadCalendar} instance.
 */
export module CalendarViewMode {
    /**
     * {@link RadCalendar} will display a single week.
     */
    export var Week;

    /**
     * RadCalendar will display one month.
     */
    export var Month;

    /**
     * RadCalendar will display a list of month names.
     */
    export var MonthNames;

    /**
     * RadCalendar will display a whole year.
     */
    export var Year;
}

/**
 * Defines the possible values for the {@link selectionMode} property
 * for the relevant {@link RadCalendar} instance.
 */
export module CalendarSelectionMode {
    /**
     * When {@link RadCalendar} is in None selection mode, 
     * no date can be selected.
     */
    export var None;

    /**
     * When {@link RadCalendar} is in Single selection mode, 
     * only one date can be selected at a time.
     */
    export var Single;

    /**
     * When {@link RadCalendar} is in Multiple selection mode, 
     * the selected dates can be more than one at the same time.
     */
    export var Multiple;

    /**
     * When {@link RadCalendar} is in Range selection mode, 
     * the selected dates can be more than one as long as they form a range of consecutive dates.
     */
    export var Range;
}

/**
 * Defines the possible values for the {@link transitionMode} property
 * for the relevant {@link RadCalendar} instance.
 */
export module CalendarTransitionMode {
    /**
     * Transitions with gestures are disabled and no animation is applied when transitioning programatically.
     * Available in iOS and Android.
     */
    export var None;

    /**
     * Slide animation is applied when transitioning between views in {@link RadCalendar}.
     * Available in iOS and Android.
     */
    export var Slide;

    /**
     * Stack animation is applied when transitioning between views in {@link RadCalendar}.
     * Available in iOS and Android.
     */
    export var Stack;

    /**
     * Flip animation is applied when transitioning between views in {@link RadCalendar}.
     * Available only in iOS.
     */
    export var Flip;

    /**
     * Fold animation is applied when transitioning between views in {@link RadCalendar}.
     * Available only in iOS.
     */
    export var Fold;

    /**
     * Float animation is applied when transitioning between views in {@link RadCalendar}.
     * Available only in iOS.
     */
    export var Float;

    /**
     * Rotate animation is applied when transitioning between views in {@link RadCalendar}.
     * Available only in iOS.
     */
    export var Rotate;

    /**
     * Allows non inertial scrolling between views in {@link RadCalendar}.
     * Available only in Android.
     */
    export var Plain;

    /**
     * Allows inertial scrolling between views in {@link RadCalendar}.
     * Available only in Android.
     */
    export var Free;

    /**
     * Applies intertial slide animation when transitioning between views in {@link RadCalendar}.
     * Available only in Android.
     */
    export var Combo;

    /**
     * Views overlap when transitioning in {@link RadCalendar}.
     * Available only in Android.
     */
    export var Overlap;
}

/**
 * Defines the possible view modes for day events view which appears when 
 * day cell is tapped in month view mode.
 */
export module CalendarEventsViewMode {
    /**
     * Do not show day events list when a day cell is tapped. 
     * This is the default value.
     */
    export var None;

    /**
     * Show day events list in an inline view.
     */
    export var Inline;

    /**
     * Show day events in a popover view.
     * In iOS this is available only for iPad user interface idiom.
     */
    export var Popover;
}

/**
* Defines the alignment options for cells in Calendar component.
*/
export module CalendarCellAlignment {
    /**
     The cell content is aligned to left.
     */
    export var Left;
    /**
     The cell content is aligned to right.
     */
    export var Right;
    /**
     The cell content is aligned to top.
     */
    export var Top;
    /**
     The cell content is aligned to bottom.
     */
    export var Bottom;
    /**
     The cell content is aligned horizontally.
     */
    export var HorizontalCenter;
    /**
     The cell content is aligned vertically.
     */
    export var VerticalCenter;
}

/**
 * Instance of this class is exposed by the {@link selectedDateRange} property
 * of {@link RadCalendar}.
 */
export class DateRange {
    /***
     * Indicates the first date of the range.
     */
    startDate: any;

    /**
     * Indicates the last date of the range.
     */
    endDate: any;

    /**
     * Normalizes the range if endDate is earlier than startDate.
     */
    normalize();
}

/** 
 * Represents the event used by the {@link eventSource} property 
 * of {@link RadCalendar}.
 */
export class CalendarEvent {
    /**
     * Constructs an event with given parameters
     */
    constructor(title: string, startDate: Date, endDate: Date, isAllDay?: boolean, eventColor?: Color);
    /**
     * Indicates the title of the event. 
     */
    title: string;

    /**
     * Indicates the start date of the event.
     */
    startDate: Date;

    /**
     * Indicates the end date of the event.
     */
    endDate: Date;

    /**
     * Indicates whether the event is an all day event.
     */
    isAllDay: boolean;

    /**
     * Indicates the color that will be used for representation of this event.
     */
    eventColor: Color;
}

/**
 * Instances of this class are provided to the handlers of the {@link viewModeChangedEvent}.
 */
export class CalendarViewModeChangedEventData implements EventData {
    /**
    *Returns the name of the event that has been fired.
    */
    eventName: string;

    /**
    * The object that fires the event.
    */
    object: any;

    /**
    * The old value of the ViewMode property.
    */
    oldValue: string;

    /**
    * The new value of the ViewMode property.
    */
    newValue: string;
}

/**
 * Instances of this class are provided to the handlers of the {@link dateSelectedEvent} and {@link dateDeselectedEvent}.
 */
export class CalendarSelectionEventData implements EventData {
    /**
    *Returns the name of the event that has been fired.
    */
    eventName: string;

    /**
    * The object that fires the event.
    */
    object: any;

    /**
    * The relative Date.
    */
    date: Date;
}

/**
 * Instances of this class are provided to the handlers of the {@link inlineEventSelectedEvent}.
 */
export class CalendarInlineEventSelectedData implements EventData {
    /**
    * Returns the name of the event that has been fired.
    */
    eventName: string;

    /**
    * The object that fires the event.
    */
    object: any;

    /**
     * The data for inline event selected in calendar.
     */
    eventData: CalendarEvent;

}

/**
 * Instances of this class are provided to the handlers of the {@link navigatedToDateEvent} and {@link navigatingToDateStartedEvent}.
 */
export class CalendarNavigationEventData implements EventData {
    /**
    *Returns the name of the event that has been fired.
    */
    eventName: string;

    /**
    * The object that fires the event.
    */
    object: any;

    /**
    * The relative Date.
    */
    date: Date;
}

/**
 * Clas that encapsulates all the styling options applicable for Month view.
 */
export class CalendarMonthViewStyle extends Bindable {

    /**
     * Identifies the {@link showWeekNumbers} dependency property.
     */
    static showWeekNumbersProperty: Property;
    /**
     * Gets or sets if weekend numbers should be shown in month view of calendar. 
     */
    showWeekNumbers: boolean;

    /**
     * Identifies the {@link showTitle} dependency property.
     */
    static showTitleProperty: Property;
    /**
     * Gets or sets if title of calendar should be shown in month view. 
     */
    showTitle: boolean;

    /**
     * Identifies the {@link showDayNames} dependency property.
     */
    static showDayNamesProperty: Property;
    /**
     * Gets or sets if day names should be shown in month view. 
     */
    showDayNames: boolean;

    /**
     * Identifies the {@link backgroundColor} dependency property.
     */
    static backgroundColorProperty: Property;
    /**
     * Gets or sets the background color of calendar in month view.  
     */
    backgroundColor: string;

    /**
     * Identifies the {@link dayCellStyle} dependency property.
     */
    static dayCellStyleProperty: Property;
    /**
     * Gets or sets the instance of {@link DayCellStyle} class with properties used for styling of day cells.
     */
    dayCellStyle: DayCellStyle;

    /**
     * Identifies the {@link selectedDayCellStyle} dependency property.
     */
    static selectedDayCellStyleProperty: Property;
    /**
     * Gets or sets the instance of {@link DayCellStyle} with properties used for styling of selected day cells.
     */
    selectedDayCellStyle: DayCellStyle;

    /**
     * Identifies the {@link todayCellStyle} dependency property.
     */
    static todayCellStyleProperty: Property;
    /**
     * Gets or sets the instance of {@link DayCellStyle} with properties used for styling of the cell for today date.
     */
    todayCellStyle: DayCellStyle;

    /**
     * Identifies the {@link dayNameCellStyle} dependency property.
     */
    static dayNameCellStyleProperty: Property;
    /**
     * Gets or sets the instance of {@link CellStyle} with properties used for styling of the cells with day names.
     */
    dayNameCellStyle: CellStyle;

    /**
     * Identifies the {@link weekNumberCellStyle} dependency property.
     */
    static weekNumberCellStyleProperty: Property;
    /**
     * Gets or sets the instance of {@link CellStyle} with properties used for styling of the cells with week numers.
     */
    weekNumberCellStyle: CellStyle;

    /**
     * Identifies the {@link weekendCellStyle} dependency property.
     */
    static weekendCellStyleProperty: Property;
    /**
     * Gets or sets the instance of {@link CellStyle} with properties used for styling of the cells for weekend days.
     */
    weekendCellStyle: CellStyle;

    /**
    * Identifies the {@link titleCellStyle} dependency property.
    */
    static titleCellStyleProperty: Property;
    /**
     * Gets or sets the instance of {@link DayCellStyle} with properties used for styling of the month title cell in month view.
     */
    titleCellStyle: DayCellStyle;

}

/**
 * Style class for Week view mode. This class is for convinience and doesn't add any additional properties to its parent.
 */
export class CalendarWeekViewStyle extends CalendarMonthViewStyle {

}

/**
 * Style class for Year view mode
 */
export class CalendarYearViewStyle extends Bindable {

    /**
    * Identifies the {@link titleCellStyle} dependency property.
    */
    static titleCellStyleProperty: Property;

    /**
     * Gets or sets the style properies for title cell in year view mode. See {@link CellStyle} properties.
     */
    titleCellStyle: CellStyle;

    /**
    * Identifies the {@link monthCellStyle} dependency property.
    */
    static monthCellStyleProperty: Property;
    /**
     * Gets or sets the style properies for month cell in year view mode. See {@link MonthCellStyle} properties.
     */
    monthCellStyle: MonthCellStyle;
}

/**
 * Style class for Month names view mode. 
 */
export class CalendarMonthNamesViewStyle extends Bindable {

    /**
    * Identifies the {@link titleCellStyle} dependency property.
    */
    static titleCellStyleProperty: Property;

    /**
     * Gets or sets the style properies for title cell in month names view mode. See {@link CellStyle} properties.
     */
    titleCellStyle: CellStyle;

    /**
    * Identifies the {@link monthNameCellStyle} dependency property.
    */
    static monthNameCellStyleProperty: Property;
    /**
     * Gets or sets the style properies for month cell in month names view mode. See {@link CalendarMonthNamesViewStyle} properties.
     */
    monthNameCellStyle: CellStyle;
}

/**
 * The class with base properties for regular date cells in calendar view.
 */
export class CellStyle extends Bindable {

    /**
    * Identifies the {@link cellBorderWidth} dependency property.
    */
    static cellBorderWidthProperty: Property;
    /**
     * Gets or sets the width of cell border
     */
    cellBorderWidth: number;

    /**
    * Identifies the {@link cellBorderColor} dependency property.
    */
    static cellBorderColorProperty: Property;
    /**
     * Gets or sets the color of cell border
     */
    cellBorderColor: string;

    /**
    * Identifies the {@link cellBackgroundColor} dependency property.
    */
    static cellBackgroundColorProperty: Property;
    /**
    * Gets or sets the background of cell
    */
    cellBackgroundColor: string;

    /**
    * Identifies the {@link cellAlignment} dependency property.
    */
    static cellAlignmentProperty: Property;
    /**
    * Gets or sets the content alignment of cell. Use {@link CalendarCellAlignment} enumeration values as possible alignment styles. 
    */
    cellAlignment: string;

    /**
    * Identifies the {@link cellTextColor} dependency property.
    */
    static cellTextColorProperty: Property;
    /**
     * Gets or sets the text color of the cell. Use predefined colors from Color module or hex value in format "#RGBA"
     */
    cellTextColor: string;

    /**
    * Identifies the {@link cellTextFontName} dependency property.
    */
    static cellTextFontNameProperty: Property;
    /**
     * Gets or sets the name of the font used for text. 
     * If font with this name is not available the standart font is used instead.
     * You can specify different font names for ios and android using attribute specifiers. 
     */
    cellTextFontName: string;

    /**
    * Identifies the {@link cellTextFontStyle} dependency property.
    */
    static cellTextFontStyleProperty: Property;
    /**
     * Gets or sets the style of the font used for text in cell. Use values from {@link FontStyles} module.
     */
    cellTextFontStyle: string;

    /**
    * Identifies the {@link cellTextSize} dependency property.
    */
    static cellTextSizeProperty: Property;
    /**
     * Gets or sets the size of text in cell. 
     */
    cellTextSize: number;

    /**
    * Identifies the {@link cellPaddingHorizontal} dependency property.
    */
    static cellPaddingHorizontalProperty: Property;
    /**
     * Gets or sets the horizontal padding amount. 
     */
    cellPaddingHorizontal: number;

    /**
    * Identifies the {@link cellPaddingVertical} dependency property.
    */
    static cellPaddingVerticalProperty: Property;
    /**
    * Gets or sets the vertical padding amount. 
    */
    cellPaddingVertical: number;
}

/**
 * Inherited from {@link CellStyle}, this class provides some additional properties specific for days in calendar.
 */
export class DayCellStyle extends CellStyle {

    /**
    * Identifies the {@link showEventsText} dependency property.
    */
    static showEventsTextProperty: Property;
    /**
     * Gets or sets if events should be shown in cell with text allongside the shape or not.
     */
    showEventsText: boolean;

    /**
    * Identifies the {@link eventTextColor} dependency property.
    */
    static eventTextColorProperty: Property;
    /**
     * Gets or sets the color of the text for event in cell
     */
    eventTextColor: string;

    /**
    * Identifies the {@link eventFontName} dependency property.
    */
    static eventFontNameProperty: Property;
    /**
     * Gets or sets the name of the font used for event text in cell. 
     * If font with this name is not available the standart font is used instead.
     * You can specify different font names for ios and android using attribute specifiers. 
     */
    eventFontName: string;

    /**
    * Identifies the {@link eventFontStyle} dependency property.
    */
    static eventFontStyleProperty: Property;
    /**
     * Gets or sets the style of the font used for event text in cell. Use values from {@link FontStyles} enumeration.
     */
    eventFontStyle: string;

    /**
    * Identifies the {@link eventTextSize} dependency property.
    */
    static eventTextSizeProperty: Property;
    /**
    * Gets or sets the size of event text in cell. 
    */
    eventTextSize: number;
}
/**
 * The style class with customization properties for month sells in year view
 * Note: this class is not inherited from CellStyle and doesn't include its properties  
 */
export class MonthCellStyle extends Bindable {

    /**
    * Identifies the {@link weekendTextColor} dependency property.
    */
    static weekendTextColorProperty: Property;

    /**
     * Gets or sets the text color for weekend days.
     */
    weekendTextColor: string;

    /**
    * Identifies the {@link todayTextColor} dependency property.
    */
    static todayTextColorProperty: Property;
    /**
     * Gets or sets the text color for today date in month.
     */
    todayTextColor: string;

    /**
    * Identifies the {@link dayTextColor} dependency property.
    */
    static dayTextColorProperty: Property;
    /**
     * Gets or sets the text color for regular days in month.
     */
    dayTextColor: string;

    /**
    * Identifies the {@link dayFontName} dependency property.
    */
    static dayFontNameProperty: Property;
    /**
     * Gets or sets the font name for days in month.
     */
    dayFontName: string;

    /**
    * Identifies the {@link dayFontStyle} dependency property.
    */
    static dayFontStyleProperty: Property;
    /**
     * Gets or sets the font style for days in month. Use values from {@link FontStyles} module.
     */
    dayFontStyle: string;

    /**
    * Identifies the {@link dayTextSize} dependency property.
    */
    static dayTextSizeProperty: Property;
    /**
     * Gets or sets the size of text for days in month cell. 
     */
    dayTextSize: number;

    /**
    * Identifies the {@link dayNameTextColor} dependency property.
    */
    static dayNameTextColorProperty: Property;
    /**
     * Gets or sets the text color for day names in month cell.
     */
    dayNameTextColor: string;

    /**
    * Identifies the {@link dayNameFontName} dependency property.
    */
    static dayNameFontNameProperty: Property;
    /**
     * Gets or sets the font for day names in month cell.
     */
    dayNameFontName: string;

    /**
    * Identifies the {@link dayNameFontStyle} dependency property.
    */
    static dayNameFontStyleProperty: Property;
    /**
     * Gets or sets the font style for day names in month cell. Use values from {@link FontStyles} module.
     */
    dayNameFontStyle: string;

    /**
    * Identifies the {@link dayNameTextSize} dependency property.
    */
    static dayNameTextSizeProperty: Property;
    /**
     * Gets or sets the text size of day names in month cell.
     */
    dayNameTextSize: number;

    /**
    * Identifies the {@link monthNameTextColor} dependency property.
    */
    static monthNameTextColorProperty: Property;
    /**
     * Gets or sets the text color for title of month in cell.
     */
    monthNameTextColor: string;

    /**
    * Identifies the {@link monthNameFontName} dependency property.
    */
    static monthNameFontNameProperty: Property;
    /**
     * Gets or sets the font name for month title in cell.
     */
    monthNameFontName: string;

    /**
    * Identifies the {@link monthNameFontStyle} dependency property.
    */
    static monthNameFontStyleProperty: Property;
    /**
     * Gets or sets the font style for month title in cell. Use values from {@link FontStyles} module.
     */
    monthNameFontStyle: string;

    /**
    * Identifies the {@link monthNameTextSize} dependency property.
    */
    static monthNameTextSizeProperty: Property;
    /**
     * Gets or sets the text size for month title in cell.
     */
    monthNameTextSize: number;
}

/**
 * Cell style class for inline events cells in month view mode.
 */
export class InlineEventCellStyle extends Bindable {

    /**
    * Identifies the {@link cellBackgroundColor} dependency property.
    */
    static cellBackgroundColorProperty: Property;

    /**
    * Gets or sets the background color of inline events cell.
    */
    cellBackgroundColor: string;

    /**
    * Identifies the {@link eventTextColor} dependency property.
    */
    static eventTextColorProperty: Property;

    /**
    * Gets or sets the color for inline event text.
    */
    eventTextColor: string;

    /**
    * Identifies the {@link eventFontName} dependency property.
    */
    static eventFontNameProperty: Property;

    /**
    * Gets or sets the font name for inline event text.
    */
    eventFontName: string;

    /**
    * Identifies the {@link eventFontStyle} dependency property. Use values from {@link FontStyles} module.
    */
    static eventFontStyleProperty: Property;

    /**
    * Gets or sets the font style for inline event text.
    */
    eventFontStyle: string;

    /**
    * Identifies the {@link eventTextSize} dependency property.
    */
    static eventTextSizeProperty: Property;

    /**
    * Gets or sets the text size for inline event text.
    */
    eventTextSize: number;

    /**
    * Identifies the {@link timeTextColor} dependency property.
    */
    static timeTextColorProperty: Property;

    /**
    * Gets or sets the color for time shown for inline event.
    */
    timeTextColor: string;

    /**
    * Identifies the {@link timeFontName} dependency property.
    */
    static timeFontNameProperty: Property;

    /**
    * Gets or sets the font name for time shown for inline event.
    */
    timeFontName: string;

    /**
    * Identifies the {@link timeFontStyle} dependency property. 
    */
    static timeFontStyleProperty: Property;
    
    /**
    * Gets or sets the font style for time shown for inline event. Use values from {@link FontStyles} module.
    */
    timeFontStyle: string;

    /**
    * Identifies the {@link timeTextSize} dependency property.
    */
    static timeTextSizeProperty: Property;
    /**
    * Gets or sets the text size for time shown for inline event.
    */
    timeTextSize: number;
}

/**
 * This class represents the RadCalendar component. RadCalendar is based on the 
 * already familiar native Android and iOS components from Telerik UI for Android 
 * and Telerik UI for iOS. The component exposes all major features supported
 * by the native controls through a unified API suitable for NativeScript developers.
 */
export class RadCalendar extends View {
    /**
     * This event is fired when a date is selected.
     * The event exposes an instance of the {@link CalendarSelectionEventData} class.
     */
    public static dateSelectedEvent: string;

    /**
     * This event is fired when a date is deselected.
     * The event exposes an instance of the {@link CalendarSelectionEventData} class.
     */
    public static dateDeselectedEvent: string;

    /**
     * This event is fired when {@link RadCalendar} an inline event has been tapped.
     * The event exposes an instance of the {@link CalendarInlineEventSelectedData} class.
     */
    public static inlineEventSelectedEvent: string;

    /**
     * This event is fired when {@link RadCalendar} has navigated to a certain date.
     * The event exposes an instance of the {@link CalendarNavigationEventData} class.
     */
    public static navigatedToDateEvent: string;

    /**
     * This event is fired when {@link RadCalendar} is about to navigate to a certain date.
     * The event exposes an instance of the {@link CalendarNavigationEventData} class.
     */
    public static navigatingToDateStartedEvent: string;

    /**
     * This event is fired when {@link RadCalendar}'s {@link viewMode} has been changed.
     * The event exposes an instance of the {@link CalendarViewModeChangedEventData} class.
     */
    public static viewModeChangedEvent: string;

    /**
     * Represents the native RadCalendarView form Telerik UI for Android.
     */
    android: any;

    /**
     * Represents the native TKCalendar from Telerik UI for iOS.
     */
    ios: any

    /**
     * Identifies the {@link minDate} dependency property.
     */
    static minDateProperty: Property;

    /**
     * Gets or sets the min date accessible by the (@link RadCalendar) instance.
     */
    minDate: any;

    /**
     * Identifies the {@link maxDate} dependency property.
     */
    static maxDateProperty: Property;

    /**
     * Gets or sets the max date accessible by the (@link RadCalendar) instance.
     */
    maxDate: any;

    /**
     * Identifies the {@link selectedDate} dependency property.
     */
    static selectedDateProperty: Property;

    /**
     * Gets or sets the current selected date in the {@link RadCalendar} instance.
     */
    selectedDate: any;

    /**
     * Identifies the {@link selectedDates} dependency property.
     */
    static selectedDatesProperty: Property;

    /**
     * Gets or sets the current selected dates in the {@link RadCalendar} instance.
     */
    selectedDates: any;

    /**
     * Identifies the {@link selectedDateRange} dependency property.
     */
    static selectedDateRangeProperty: Property;

    /**
     * Gets or sets the current selected date range in the {@link RadCalendar} instance.
     */
    selectedDateRange: DateRange;

    /**
     * Identifies the {@link viewMode} dependency property.
     */
    static viewModeProperty: Property;

    /**
     * Gets or sets the current view mode in the {@link RadCalendar} instance.
     * Use values from {@link CalendarViewMode} enumeration.
     */
    viewMode: string;

    /**
     * Identifies the {@link eventsViewMode} dependency property.
     */
    static eventsViewModeProperty: Property;

    /**
     * Gets or sets the events view mode in {@link RadCalendar} instance.
     * Use values from {@link CalendarEventsViewMode} enumeration.
     */
    eventsViewMode: string;

    /**
     * Identifies the {@link selectionMode} dependency property.
     */
    static selectionModeProperty: Property;

    /**
     * Gets or sets the current selection mode in the {@link RadCalendar} instance.
     * use values from {@link CalendarSelectionMode} enumeration.
     */
    selectionMode: string;

    /**
     * Identifies the {@link transitionMode} dependency property.
     */
    static transitionModeProperty: Property;

    /**
     * Gets or sets the current transition mode in the {@link RadCalendar} instance.
     * Use values from {@link CalendarTransitionMode} enumeration.
     */
    transitionMode: string;

    /**
     * Gets the {@link displayedDate} dependency property.
     */
    static displayedDateProperty: Property;

    /**
     * Gets or sets the current displayed date in the {@link RadCalendar} instance.
     */
    displayedDate: Date;

    /**
     * Identifies the {@link eventSource} dependency property.
     */
    static eventSourceProperty: Property;

    /**
     * Gets or sets the current event source in the {@link RadCalendar} instance.
     */
    eventSource: Array<CalendarEvent>;

    /**
     * Identifies the {@link horizontalTransition} dependency property.
     */
    static horizontalTransitionProperty: Property;

    /**
     * Gets or sets if the transition of the {@link RadCalendar} instance is horizontal.
     */
    horizontalTransition: boolean;

    /**
     * Identifies the {@link monthViewStyle} dependency property.
     */
    static monthViewStyleProperty: Property;

    /**
    * Gets or sets the style properties for Month view mode. 
    * See {@link CalendarMonthViewStyle} for available styling properties.
    */
    monthViewStyle: CalendarMonthViewStyle;

    /**
     * Identifies the {@link monthViewStyle} dependency property.
     */
    static weekViewStyleProperty: Property;

    /**
    * Gets or sets the style properties for Week view mode. 
    * See {@link CalendarWeekViewStyle} for available styling properties.
    */
    weekViewStyle: CalendarWeekViewStyle;

    /**
     * Identifies the {@link monthViewStyle} dependency property.
     */
    static yearViewStyleProperty: Property;

    /**
    * Gets or sets the style properties for Year view mode. 
    * See {@link CalendarYearViewStyle} for available styling properties.
    */
    yearViewStyle: CalendarYearViewStyle;

    /**
     * Identifies the {@link monthViewStyle} dependency property.
     */
    static monthNamesViewStyleProperty: Property;

    /**
    * Gets or sets the style properties for MonthNames view mode. 
    * See {@link CalendarMonthNamesViewStyle} for available styling properties.
    */
    monthNamesViewStyle: CalendarMonthNamesViewStyle;

    /**
     * Identifies the {@link inlineEventCellStyle} dependency property.
     */
    static inlineEventCellStyleProperty: Property;

    /**
    * Gets or sets the style properties for inline event cells in Month view mode. 
    * See {@link InlineEventCellStyle} for available styling properties.
    */
    inlineEventCellStyle: InlineEventCellStyle;

    /**
     * Reloads all events in the {@link RadCalendar} instance and resets the selection.
     */
    reload();

    /**
     * Navigates to the next screen in current view mode context.
     */
    navigateForward();

    /**
     * Navigates to the previous screen in the current view mode context.
     */
    navigateBack();

    /**
     * Navigates to the specified date.
     */
    goToDate(date: Date);

    /**
     * Gets an array with the events for a specific date.
     */
    getEventsForDate(date: Date): Array<CalendarEvent>;
}


