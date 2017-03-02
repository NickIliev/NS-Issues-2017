import * as dependencyObservable from "ui/core/dependency-observable";
import { View } from "ui/core/view";
import { Bindable } from "ui/core/bindable";
import observable = require("data/observable");

/**
 * RadDataForm is a component that automatically generates UI for editing the properties of a supplied object.
 * Each property of the object will have an assigned editor based on its type. This editor can be changed
 * or customized. Editors can be shown in groups which can optionally be collapsible.
 */
export class RadDataForm extends View {

    /**
     * An event fired when an editor gets focussed /iOS only/.
     * The event is fired with an instance of type {@link DataFormEventData}.
     */
    static editorSelectedEvent: string;

    /**
     * An event fired when an editor loses focus /iOS only/.
     * The event is fired with an instance of type {@link DataFormEventData}.
     */
    static editorDeselectedEvent: string;

    /**
     * An event fired when the value of an editor changes /iOS only/.
     * The event is fired with an instance of type {@link DataFormEventData}.
     */
    static propertyEditedEvent: string;

    /**
     * An event fired when the current value of an editor starts validation /iOS only/.
     * The event is fired with an instance of type {@link DataFormEventData}.
     */
    static propertyValidateEvent: string;

    /**
     * An event fired when the current value of an editor is validated /iOS only/.
     * The event is fired with an instance of type {@link DataFormEventData}.
     */
    static propertyValidatedEvent: string;

    /**
     * An event fired when an editor is created and allows for its customization /iOS only/.
     * The event is fired with an instance of type {@link DataFormEventData}.
     */
    static editorSetupEvent: string;

    /**
     * An event fired when an editor is updated and allows for its customization.
     * The event is fired with an instance of type {@link DataFormEventData}.
     */
    static editorUpdateEvent: string;

    /**
     * An event fired when a group of editors is updated and allows for its customization.
     * The event is fired with an instance of type {@link DataFormEventData}.
     */
    static groupUpdateEvent: string;

    /**
     * An event fired when the value of an editor is about to be committed.
     * The event is fired with an instance of type {@link DataFormEventData}.
     */
    static propertyCommitEvent: string;

    /**
    * An event fired when the value of an editor has been committed.
    * The event is fired with an instance of type {@link DataFormEventData}.
    */
    static propertyCommittedEvent: string;

    /**
     * An event fired when a group of editors is expanded so the editors are visible.
     * The event is fired with an instance of type {@link DataFormEventData}.
     */
    static groupExpandedEvent: string;

    /**
     * An event fired when a group of editors is collapsed so the editors are not visible.
     * The event is fired with an instance of type {@link DataFormEventData}.
     */
    static groupCollapsedEvent: string;

    /**
     * Identifies the {@link isReadOnly} dependency property.
     */
    static isReadOnlyProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link commitMode} dependency property.
     */
    static commitModeProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link validationMode} dependency property.
     */
    static validationModeProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link source} dependency property.
     */
    static sourceProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link metadata} dependency property.
     */
    static metadataProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link groups} dependency property.
     */
    static groupsProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link properties} dependency property.
     */
    static propertiesProperty: dependencyObservable.Property;

    /**
     * Gets or sets a value indicating whether the editors'
     * values can be edited or are in read only mode.
     */
    isReadOnly: boolean;

    /**
     * Gets or sets a value indicating when the changes in editors will be committed.
     * Must be one of the {@link CommitMode} enumeration.
     */
    commitMode: string;

    /**
     * Gets or sets a value indicating when the changes in editors will be validated.
     * Must be one of the {@link ValidationMode} enumeration.
     */
    validationMode: string;

    /**
     * Sets the source object that will be used to load
     * the editors in data form.
     */
    source: any;

    /**
     * Sets the metadata object that will be used to load
     * proper editors in data form for the specified {@link source}.
     */
    metadata: any;

    /**
     * Gets or sets an array with groups. This array is used to
     * define how the editors are laid out in groups through xml.
     */
    groups: Array<PropertyGroup>;

    /**
     * Gets or sets an array with properties. This array is used to
     * change the default editors and/or their styles through xml.
     */
    properties: Array<EntityProperty>;

    /**
     * Gets the source object with all property
     * modifications that are currently committed.
     */
    editedObject: any;

    /**
     * Represents the native RadDataForm from Telerik UI for Android.
     */
    android: any;

    /**
     * Represents the native RadDataForm from Telerik UI for iOS.
     */
    ios: any;

    /**
     * Gets the EntityProperty object for the property of
     * the object with the given name.
     */
    getPropertyByName(name: string): EntityProperty;

    /**
     * Gets the PropertyGroup object with the given name.
     */
    getGroupByName(name: string): PropertyGroup;


    /**
     * Reloads the native data form objects.
     */
    reload(): void;

    /**
     * Commits all property changes.
     */
    commitAll(): void;

    /**
     * Gets the 'validation' state of the {@link RadDataForm}.
     */
    hasValidationErrors(): boolean;
}

/**
* Defines the commit mode options for {@link commitMode}.
*/
declare enum CommitMode {
    /**
     When an editor's value is changed, the change is immediatelly committed.
     */
    Immediate,

    /**
     When an editor's value is changed, the change is committed when the editor loses focus.
     */
    OnLostFocus,

    /**
     When an editor's value is changed, the change is committed
     only when the {@link commitAll} method is called.
     */
    Manual
}

/**
* Defines the validation mode options for {@link validationMode}.
*/
declare enum ValidationMode {
    /**
     When an editor's value is changed, the change is immediatelly validated.
     */
    Immediate,

    /**
     When an editor's value is changed, the change is validated when the editor loses focus.
     */
    OnLostFocus,

    /**
     When an editor's value is changed, the change is committed
     only when the {@link commitAll} method is called.
     */
    Manual
}

/**
* Lists the possible AutoCompleteInline editor display modes.
*/
declare enum AutoCompleteDisplayMode {
    /**
     When an editor's value is changed, the change is immediatelly validated.
     */
    Plain,

    /**
     When an editor's value is changed, the change is validated when the editor loses focus.
     */
    Tokens
}

/**
* Defines the options for type of {@link PropertyEditor}.
*/
declare enum EditorType {

    /**
     The default editor that is used for input of simple text.
     */
    Text,

    /**
     An editor similar to the Text editor which supports the
     text to be input in more than one line.
     */
    MultilineText,

    /**
     A text input editor which uses an email-friendly keyboard layout.
     */
    Email,

    /**
     A text input editor which uses asterisks to hide the input.
     */
    Password,

    /**
     A text input editor which uses an phone-friendly keyboard layout.
     */
    Phone,

    /**
     A number input editor which supports floating point.
     */
    Decimal,

    /**
     A number input editor which supports only integers.
     */
    Number,

    /**
     An editor which shows a switch that is used for input of boolean values.
     */
    Switch,

    /**
     An number editor which takes input through buttons for
     increasing and decreasing the number.
     */
    Stepper,

    /**
     An number editor which takes input by sliding a pointer on a line.
     */
    Slider,

    /**
     An editor which allows picking an option from a predefined horizontal list.
     */
    SegmentedEditor,

    /**
     An editor which allows picking a date from the native date picker.
     */
    DatePicker,

    /**
     An editor which allows picking a time from the native time picker.
     */
    TimePicker,

    /**
     An editor which allows picking an option from an expanding list.
     */
    Picker,

    /**
     An editor which allows picking an option from a predefined vertical list.
     */
    List
}

/**
 * Font styles
 */
declare enum FontStyles {
    /**
     * Regular font style
     */
    Normal,
    /**
     * Bold font style
     */
    Bold,
    /**
     * Italic font style
     */
    Italic,
    /**
     * Combined Bold and Italic styles
     */
    BoldItalic
}

/**
 * A class that provides common arguments of {@link RadDataForm} events.
 */
export class DataFormEventData implements observable.EventData {

    /**
    * The name of the event that has been fired.
    */
    eventName: string;

    /**
    * The object that fires the event.
    */
    object: any;

    /**
    * The native editor used for this event
    */
    editor: any;

    /**
    * The native entity property object for this event
    */
    entityProperty: any;

    /**
    * Gets the name of the property related with this event.
    */
    propertyName: string;

    /**
    * The native property group for this event
    */
    group: any;

    /**
    * Gets the name of the group related with this event.
    */
    groupName: string;

    /**
    * The return value related with this event.
    */
    returnValue: any;
}

/**
 * A class that provides common arguments of {@link CustomPropertyEditor} events.
 */
export class DataFormCustomPropertyEditorEventData implements observable.EventData {

    /**
    * The name of the event that has been fired.
    */
    eventName: string;

    /**
    * The object that fires the event.
    */
    object: any;

    /**
    * The native view used for this event.
    */
    view: any;

    /**
    * The android context /Android only/.
    */
    context: any;

    /**
    * The value of the editor.
    */
    value: any;
}

/**
 * An object that can be used to define how the properties of an
 * object in {@link RadDataForm} are shown in groups.
 */
export class PropertyGroup extends Bindable {

    /**
     * Identifies the {@link name} dependency property.
     */
    static nameProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link hidden} dependency property.
     */
    static hiddenProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link titleHidden} dependency property.
     */
    static titleHiddenProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link collapsible} dependency property.
     */
    static collapsibleProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link titleStyle} dependency property.
     */
    static titleStyleProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link layout} dependency property.
     */
    static layoutProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link properties} dependency property.
     */
    static propertiesProperty: dependencyObservable.Property;

    /**
    * Gets or sets the name of this property group.
    */
    name: string;

    /**
    * Gets or sets a value indicating whether
    * this group should be hidden or visible.
    */
    hidden: boolean;

    /**
    * Gets or sets a value indicating whether
    * this group's header should be hidden or visible.
    */
    titleHidden: boolean;

    /**
    * Gets or sets a value indicating whether
    * this group can be collapsed or is expanded at all times.
    */
    collapsible: boolean;

    /**
    * Gets or sets a {@link GroupTitleStyle} object that
    * can be used to change the style of the title of this group.
    */
    titleStyle: any;

    /**
    * Gets or sets a {@link DataFormLayout} object that
    * can be used to change the layout of the editors of this group.
    */
    layout: DataFormLayout;

    /**
     * Gets or sets an array with properties which should be included
     * in this group.
     */
    properties: Array<EntityProperty>;
}

/**
 * Base class for the styling options for the editors and for the title of the groups.
 * Known descendants: {@link GroupTitleStyle} and {@link PropertyEditorStyle}.
 */
export class DataFormStyleBase extends Bindable {
    /**
     * Identifies the {@link strokeColor} dependency property.
     */
    static strokeColorProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link strokeWidth} dependency property.
     */
    static strokeWidthProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link fillColor} dependency property.
     */
    static fillColorProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link separatorColor} dependency property.
     */
    static separatorColorProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link labelTextColor} dependency property.
     */
    static labelTextColorProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link labelTextSize} dependency property.
     */
    static labelTextSizeProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link labelFontName} dependency property.
     */
    static labelFontNameProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link labelFontStyle} dependency property.
     */
    static labelFontStyleProperty: dependencyObservable.Property;

    /**
    * Gets or sets the color used for the separator lines between editor.
    * These lines are visible only on iOS.
    */
    separatorColor: string;

    /**
    * Gets or sets the color of the stroke lines.
    */
    strokeColor: string;

    /**
    * Gets or sets the color of the fill.
    */
    fillColor: string;

    /**
    * Gets or sets the width of the stroke.
    */
    strokeWidth: number;

    /**
    * Gets or sets the text color of the labels.
    */
    labelTextColor: string;

    /**
    * Gets or sets the text size of the labels.
    */
    labelTextSize: number;

    /**
    * Gets or sets the font name of the labels.
    */
    labelFontName: string;

    /**
    * Gets or sets the font style of the labels.
    * Must be one of the {@link FontStyles} enumeration.
    */
    labelFontStyle: FontStyles;
}

/**
 * An object used to specify the styling options for the
 * views that hold the title in data form groups.
 */
export class GroupTitleStyle extends DataFormStyleBase {
}

/**
 * An object used to tune the options for some of the
 * editors in {@link RadDataForm}.
 */
export class PropertyEditorParams extends Bindable {

    /**
     * Identifies the {@link minimum} dependency property.
     */
    static minimumProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link maximum} dependency property.
     */
    static maximumProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link step} dependency property.
     */
    static stepProperty: dependencyObservable.Property;

    /**
    * Gets or sets the minimum value supported by an editor 
    * if minimum is relevant for this editor.
    */
    minimum: number;

    /**
    * Gets or sets the maximum value supported by an editor 
    * if maximum is relevant for this editor.
    */
    maximum: number;

    /**
    * Gets or sets the step that is used to increase the editor
    * value incrementally if step is relevant for this editor.
    */
    step: number;
}

/**
 * An object used to specify the styling options for the
 * editors in {@link RadDataForm}.
 */
export class PropertyEditorStyle extends DataFormStyleBase {

    /**
     * Identifies the {@link editorHorizontalOffset} dependency property.
     */
    static editorHorizontalOffsetProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link editorVerticalOffset} dependency property.
     */
    static editorVerticalOffsetProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link labelHorizontalOffset} dependency property.
     */
    static labelHorizontalOffsetProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link labelVerticalOffset} dependency property.
     */
    static labelVerticalOffsetProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link labelHidden} dependency property.
     */
    static labelHiddenProperty: dependencyObservable.Property;

    /**
    * Gets or sets a horizontal offset that is applied to editors.
    */
    editorHorizontalOffset: number;

    /**
    * Gets or sets a vertical offset that is applied to editors.
    */
    editorVerticalOffset: number;

    /**
    * Gets or sets a horizontal offset that is applied to labels of editors.
    */
    labelHorizontalOffset: number;

    /**
    * Gets or sets a vertical offset that is applied to labels of editors.
    */
    labelVerticalOffset: number;

    /**
    * Gets or sets a value that specifies whether the labels
    * of the editors are hidden or visible.
    */
    labelHidden: boolean;
}

/**
 * An instance of this class is assigned to each of the properties of an entity that is being edited in {@link RadDataForm}.
 * This instance can be used to change or adjust the editor that is used for this property.
 */
export class EntityProperty extends Bindable {

    /**
     * Identifies the {@link editor} dependency property.
     */
    static editorProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link validators} dependency property.
     */
    static validatorsProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link converter} dependency property.
     */
    static converterProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link valuesProvider} dependency property.
     */
    static valuesProviderProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link valuesProvider} dependency property.
     */
    static autoCompleteDisplayModeProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link name} dependency property.
     */
    static nameProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link displayName} dependency property.
     */
    static displayNameProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link index} dependency property.
     */
    static indexProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link columnIndex} dependency property.
     */
    static columnIndexProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link hidden} dependency property.
     */
    static hiddenProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link readOnly} dependency property.
     */
    static readOnlyProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link required} dependency property.
     */
    static requiredProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link hintText} dependency property.
     */
    static hintTextProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link imageResource} dependency property.
     */
    static imageResourceProperty: dependencyObservable.Property;

    /**
    * Gets or sets a {@link PropertyEditor} that is used
    * to edit this property.
    */
    editor: PropertyEditor;

    /**
    * Gets or sets an array of {@link PropertyValidator} that are
    * used to validate the changes of this property.
    */
    validators: Array<PropertyValidator>;

    /**
    * Gets or sets a {@link PropertyConverter} that will
    * be used to convert between values stored in the model
    * and values shows in an editor.
    */
    converter: PropertyConverter;

    /**
    * Gets or sets an array of values that are accepted
    * as values for the editor associated with this property.
    * This property affects only editors of type:
    * Picker, List and SegmentedEditor.
    */
    valuesProvider: any;

    /**
    * Gets or sets displayMode of the AutoCompleteTextView of the editor.
    * This property affects only editors of type: AutoCompleteInline
    */
    autoCompleteDisplayMode: AutoCompleteDisplayMode;

    /**
    * The name of this property.
    * Please note that the name can be set only once.
    */
    name: string;

    /**
    * Gets or sets the name that is used for the label of the
    * editor of this property.
    */
    displayName: string;

    /**
    * Gets or sets the index which is used to determine the
    * order of the editors in their group.
    */
    index: number;

    /**
    * Gets or sets the columnIndex which is used to determine the
    * order of the editors in their group.
    */
    columnIndex: number;

    /**
    * Gets or sets a value indicating whether this property is hidden or visible.
    */
    hidden: boolean;

    /**
    * Gets or sets a value indicating whether this property can be edited or is read only.
    */
    readOnly: boolean;

    /**
    * Gets or sets a value indicating whether this property is required.
    */
    required: boolean;

    /**
    * Gets or sets the text displayed in the editor while its value is null.
    */
    hintText: string;

    /**
    * Gets or sets the name of an image resoure that will be used as the editor's label.
    */
    imageResource: any;

    /**
     * Represents the native EntityProperty of RadDataForm from Telerik UI for Android.
     */
    android: any;

    /**
     * Represents the native EntityProperty of RadDataForm from Telerik UI for iOS.
     */
    ios: any;
}

/**
 * An instance of this class is assigned to each of the editors used in {@link RadDataForm}.
 * It can be get or set through the editor property of {@link EntityProperty}.
 */
export class PropertyEditor extends Bindable {

    /**
     * Identifies the {@link type} dependency property.
     */
    static typeProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link style} dependency property.
     */
    static styleProperty: dependencyObservable.Property;

    /**
    * Gets or sets an instance of type {@link PropertyEditorStyle}
    * that can be used for customizations of the editor.
    */
    style: PropertyEditorStyle;

    /**
    * Gets or sets the type of the editor.
    * Must be one of the {@ EditorType} enumeration.
    */
    type: string;

    /**
     * Represents the native PropertyEditor of RadDataForm from Telerik UI for Android.
     */
    android: any;

    /**
     * Represents the native PropertyEditor of RadDataForm from Telerik UI for iOS.
     */
    ios: any;
}

/**
 * A custom implementation of an editor for {@link RadDataForm}.
 */
export class CustomPropertyEditor extends PropertyEditor {

    /**
     * An event fired when a view for the editor has to be created.
     * The event is fired with an instance of type {@link DataFormCustomPropertyEditorEventData}.
     * The view property of the event data has to be set with a new native view for this editor.
     */
    static editorNeedsViewEvent: string;

    /**
     * An event fired when the value of a property has to be set to the view for this editor.
     * The event is fired with an instance of type {@link DataFormCustomPropertyEditorEventData}.
     * The value passed with the value property of the event data
     * has to be applied to the view passed with the view property.
     */
    static editorHasToApplyValueEvent: string;

    /**
     * An event fired when the editor needs the value from the editor.
     * The event is fired with an instance of type {@link DataFormCustomPropertyEditorEventData}.
     * The value property of the event data has to be updated with the current editor value.
     */
    static editorNeedsValueEvent: string;

    /**
     * Represents the native PropertyEditor of RadDataForm from Telerik UI for Android.
     */
    android: any;

    /**
     * Represents the native PropertyEditor of RadDataForm from Telerik UI for iOS.
     */
    ios: any;

    /**
     * Used to notify the editor that its value is changed 
     * so that this value can be applied to the property depending on the current commit mode.
     */
    notifyValueChanged(): void;
}

/**
 * An interface that converters used by {@link RadDataForm} should implement.
 */
export interface PropertyConverter {

    /**
     * Used to convert the value that is stored in the property
     * to the value that should be displayed in the editor.
     */
    convertFrom(source: any): any;

    /**
     * Used to convert the value that is displayed in the editor
     * to a value that should be stored in the property.
     */
    convertTo(source: any): any;
}

/**
 * A base class for all validators used by {@link RadDataForm}.
 */
export class PropertyValidator extends Bindable {

    /**
     * Identifies the {@link errorMessage} dependency property.
     */
    static errorMessageProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link successMessage} dependency property.
     */
    static successMessageProperty: dependencyObservable.Property;

    /**
    * Gets or sets a message that will be displayed when the
    * new value doesn't meet the validation criteria.
    */
    errorMessage: string;

    /**
    * Gets or sets a message that will be displayed when the
    * new value meets the validation criteria.
    */
    successMessage: string;
}

/**
 * A base class for {@link MinimumLengthValidator} and {@link MaximumLengthValidator}.
 */
export class LengthValidator extends PropertyValidator {

    /**
     * Identifies the {@link length} dependency property.
     */
    static lengthProperty: dependencyObservable.Property;

    /**
    * Gets or sets a value that represents the requirement for the
    * length of the input for this field.
    */
    length: number
}

/**
 * A validator that validates whether the length of the input is long enough
 * according to the limit specified by the {@link length} property.
 */
export class MinimumLengthValidator extends LengthValidator {
}

/**
 * A validator that validates whether the length of the input exceeds
 * the limit specified by the {@link length} property.
 */
export class MaximumLengthValidator extends LengthValidator {
}

/**
 * A validator that validates whether a numeric input falls in the range
 * specified by the {@link minimum} and {@link maximum} properties.
 */
export class RangeValidator extends PropertyValidator {

    /**
     * Identifies the {@link minimum} dependency property.
     */
    static minimumProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link maximum} dependency property.
     */
    static maximumProperty: dependencyObservable.Property;

    /**
    * Gets or sets the minimum that is accepted for values of the associated property.
    */
    minimum: number;

    /**
    * Gets or sets the maximum that is accepted for values of the associated property.
    */
    maximum: number
}

/**
 * A validator that validates whether the input represents an email address.
 */
export class EmailValidator extends PropertyValidator {
}

/**
 * A validator that validates whether there is any input.
 */
export class NonEmptyValidator extends PropertyValidator {
}

/**
 * A validator that validates whether the input represents a phone number.
 */
export class PhoneValidator extends PropertyValidator {
}

/**
 * An object that can be used to define how the editors in a group
 * in {@link RadDataForm} are laid out.
 */
export class DataFormLayout extends Bindable {
}

/**
 * A {@link DataFormLayout} which lays items in one row or one column.
 */
export class DataFormStackLayout extends DataFormLayout {
    /**
     * Identifies the {@link orientation} dependency property.
     */
    static orientationProperty: dependencyObservable.Property;

    /**
    * Gets or sets the orientation that is accepted for this layout.
    */
    orientation: any;
}

/**
 * A {@link DataFormLayout} which lays items in multiple rows and columns.
 */
export class DataFormGridLayout extends DataFormLayout {
}