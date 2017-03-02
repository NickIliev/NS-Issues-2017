var dependencyObservable = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var view_1 = require("ui/core/view");
var bindable_1 = require("ui/core/bindable");
var observable = require("data/observable");
var enums = require("ui/enums");
var utils = require("utils/utils");
var knownCollections;
(function (knownCollections) {
    knownCollections.properties = "properties";
    knownCollections.groups = "groups";
    knownCollections.validators = "validators";
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
/*
* Lists the possible commit modes.
*/
var CommitMode;
(function (CommitMode) {
    CommitMode.Immediate = "Immediate";
    CommitMode.OnLostFocus = "OnLostFocus";
    CommitMode.Manual = "Manual";
})(CommitMode = exports.CommitMode || (exports.CommitMode = {}));
/*
* Lists the possible AutoCompleteInline editor display modes.
*/
var AutoCompleteDisplayMode;
(function (AutoCompleteDisplayMode) {
    AutoCompleteDisplayMode.Plain = "Plain";
    AutoCompleteDisplayMode.Tokens = "Tokens";
})(AutoCompleteDisplayMode = exports.AutoCompleteDisplayMode || (exports.AutoCompleteDisplayMode = {}));
/*
* Lists the possible validation modes.
*/
var ValidationMode;
(function (ValidationMode) {
    ValidationMode.Immediate = "Immediate";
    ValidationMode.OnLostFocus = "OnLostFocus";
    ValidationMode.Manual = "Manual";
})(ValidationMode = exports.ValidationMode || (exports.ValidationMode = {}));
/*
* Lists the possible editors.
*/
var EditorType;
(function (EditorType) {
    EditorType.Text = "Text";
    EditorType.MultilineText = "MultilineText";
    EditorType.Email = "Email";
    EditorType.Password = "Password";
    EditorType.Phone = "Phone";
    EditorType.Decimal = "Decimal";
    EditorType.Number = "Number";
    EditorType.Switch = "Switch";
    EditorType.Stepper = "Stepper";
    EditorType.Slider = "Slider";
    EditorType.SegmentedEditor = "SegmentedEditor";
    EditorType.DatePicker = "DatePicker";
    EditorType.TimePicker = "TimePicker";
    EditorType.Picker = "Picker";
    EditorType.List = "List";
    EditorType.AutoCompleteInline = "AutoCompleteInline";
})(EditorType = exports.EditorType || (exports.EditorType = {}));
/**
 * Font styles
 */
var FontStyles;
(function (FontStyles) {
    FontStyles.Normal = "Normal";
    FontStyles.Bold = "Bold";
    FontStyles.Italic = "Italic";
    FontStyles.BoldItalic = "BoldItalic";
})(FontStyles = exports.FontStyles || (exports.FontStyles = {}));
/**
 * A class that provides common arguments of {@link RadDataForm} events.
 */
var DataFormEventData = (function () {
    function DataFormEventData() {
    }
    return DataFormEventData;
}());
exports.DataFormEventData = DataFormEventData;
/**
 * A class that provides common arguments of {@link CustomPropertyEditor} events.
 */
var DataFormCustomPropertyEditorEventData = (function () {
    function DataFormCustomPropertyEditorEventData() {
    }
    return DataFormCustomPropertyEditorEventData;
}());
exports.DataFormCustomPropertyEditorEventData = DataFormCustomPropertyEditorEventData;
///////////////////////////////////////////////////////////////////////////////
var RadDataForm = (function (_super) {
    __extends(RadDataForm, _super);
    function RadDataForm() {
        _super.call(this);
    }
    RadDataForm.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
    };
    RadDataForm.onIsReadOnlyPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onIsReadOnlyPropertyChanged(eventData);
    };
    RadDataForm.onValidationModePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onValidationModePropertyChanged(eventData);
    };
    RadDataForm.onCommitModePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onCommitModePropertyChanged(eventData);
    };
    RadDataForm.onSourcePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onSourcePropertyChanged(eventData);
    };
    RadDataForm.onMetadataPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMetadataPropertyChanged(eventData);
    };
    RadDataForm.onGroupsPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onGroupsPropertyChanged(eventData);
    };
    RadDataForm.onPropertiesPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onPropertiesPropertyChanged(eventData);
    };
    RadDataForm.prototype._onBindingContextChanged = function (oldValue, newValue) {
        _super.prototype._onBindingContextChanged.call(this, oldValue, newValue);
        if (this.groups) {
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].properties) {
                    for (var j = 0; j < this.groups[i].properties.length; j++) {
                        var entityProperty = this.groups[i].properties[j];
                        entityProperty.bindingContext = newValue;
                    }
                }
            }
        }
        if (this.properties) {
            for (var i = 0; i < this.properties.length; i++) {
                var entityProperty = this.properties[i];
                entityProperty.bindingContext = newValue;
            }
        }
    };
    RadDataForm.prototype._onIsReadOnlyPropertyChanged = function (eventData) { };
    ;
    RadDataForm.prototype._onCommitModePropertyChanged = function (eventData) { };
    ;
    RadDataForm.prototype._onValidationModePropertyChanged = function (eventData) { };
    ;
    RadDataForm.prototype._onSourcePropertyChanged = function (eventData) { };
    ;
    RadDataForm.prototype._onMetadataPropertyChanged = function (eventData) { };
    ;
    RadDataForm.prototype._onGroupsPropertyChanged = function (eventData) { };
    ;
    RadDataForm.prototype._onPropertiesPropertyChanged = function (eventData) { };
    ;
    Object.defineProperty(RadDataForm.prototype, "isReadOnly", {
        get: function () {
            return this._getValue(RadDataForm.isReadOnlyProperty);
        },
        set: function (value) {
            this._setValue(RadDataForm.isReadOnlyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadDataForm.prototype, "commitMode", {
        get: function () {
            return this._getValue(RadDataForm.commitModeProperty);
        },
        set: function (value) {
            this._setValue(RadDataForm.commitModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadDataForm.prototype, "validationMode", {
        get: function () {
            return this._getValue(RadDataForm.validationModeProperty);
        },
        set: function (value) {
            this._setValue(RadDataForm.validationModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadDataForm.prototype, "source", {
        get: function () {
            return this._getValue(RadDataForm.sourceProperty);
        },
        set: function (value) {
            this._setValue(RadDataForm.sourceProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadDataForm.prototype, "metadata", {
        get: function () {
            return this._getValue(RadDataForm.metadataProperty);
        },
        set: function (value) {
            this._setValue(RadDataForm.metadataProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadDataForm.prototype, "groups", {
        get: function () {
            return this._getValue(RadDataForm.groupsProperty);
        },
        set: function (value) {
            this._setValue(RadDataForm.groupsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadDataForm.prototype, "properties", {
        get: function () {
            return this._getValue(RadDataForm.propertiesProperty);
        },
        set: function (value) {
            this._setValue(RadDataForm.propertiesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadDataForm.prototype, "editedObject", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadDataForm.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadDataForm.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    RadDataForm.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "groups") {
            this.groups = value;
        }
        if (name === "properties") {
            this.properties = value;
        }
    };
    RadDataForm.prototype.getPropertyByName = function (propertyName) {
        if (this.groups) {
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].properties) {
                    for (var j = 0; j < this.groups[i].properties.length; j++) {
                        var entityProperty = this.groups[i].properties[j];
                        if (entityProperty.name === propertyName) {
                            return entityProperty;
                        }
                    }
                }
            }
        }
        if (this.properties) {
            for (var i = 0; i < this.properties.length; i++) {
                var entityProperty = this.properties[i];
                if (entityProperty.name === propertyName) {
                    return entityProperty;
                }
            }
        }
        return null;
    };
    RadDataForm.prototype.getGroupByName = function (groupName) {
        if (this.groups) {
            for (var i = 0; i < this.groups.length; i++) {
                if (groupName === this.groups[i].name) {
                    return this.groups[i];
                }
            }
        }
        return null;
    };
    RadDataForm.prototype.reload = function () { };
    RadDataForm.prototype.commitAll = function () { };
    RadDataForm.editorSelectedEvent = "editorSelected";
    RadDataForm.editorDeselectedEvent = "editorDeselected";
    RadDataForm.propertyEditedEvent = "propertyEdited";
    RadDataForm.propertyValidateEvent = "propertyValidate";
    RadDataForm.propertyValidatedEvent = "propertyValidated";
    RadDataForm.editorSetupEvent = "editorSetup";
    RadDataForm.editorUpdateEvent = "editorUpdate";
    RadDataForm.groupUpdateEvent = "groupUpdate";
    RadDataForm.propertyCommitEvent = "propertyCommit";
    RadDataForm.propertyCommittedEvent = "propertyCommitted";
    RadDataForm.groupExpandedEvent = "groupExpanded";
    RadDataForm.groupCollapsedEvent = "groupCollapsed";
    RadDataForm.isReadOnlyProperty = new dependencyObservable.Property("isReadOnly", "RadDataForm", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadDataForm.onIsReadOnlyPropertyChanged));
    RadDataForm.commitModeProperty = new dependencyObservable.Property("commitMode", "RadDataForm", new proxy_1.PropertyMetadata(CommitMode.Immediate, dependencyObservable.PropertyMetadataSettings.None, RadDataForm.onCommitModePropertyChanged));
    RadDataForm.validationModeProperty = new dependencyObservable.Property("validationMode", "RadDataForm", new proxy_1.PropertyMetadata(ValidationMode.Immediate, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadDataForm.onValidationModePropertyChanged));
    RadDataForm.sourceProperty = new dependencyObservable.Property("source", "RadDataForm", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadDataForm.onSourcePropertyChanged));
    RadDataForm.metadataProperty = new dependencyObservable.Property("metadata", "RadDataForm", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadDataForm.onMetadataPropertyChanged));
    RadDataForm.groupsProperty = new dependencyObservable.Property("groups", "RadDataForm", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadDataForm.onGroupsPropertyChanged));
    RadDataForm.propertiesProperty = new dependencyObservable.Property("properties", "RadDataForm", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadDataForm.onPropertiesPropertyChanged));
    return RadDataForm;
}(view_1.View));
exports.RadDataForm = RadDataForm;
///////////////////////////////////////////////////////////////////////////////
var PropertyGroup = (function (_super) {
    __extends(PropertyGroup, _super);
    function PropertyGroup() {
        _super.apply(this, arguments);
    }
    PropertyGroup.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "properties") {
            this.properties = value;
        }
    };
    PropertyGroup.onNamePropertyChanged = function (data) {
        var group = data.object;
        group.onNameChanged(data);
    };
    PropertyGroup.onHiddenPropertyChanged = function (data) {
        var group = data.object;
        group.onHiddenChanged(data);
    };
    PropertyGroup.onTitleHiddenPropertyChanged = function (data) {
        var group = data.object;
        group.onTitleHiddenChanged(data);
    };
    PropertyGroup.onCollapsiblePropertyChanged = function (data) {
        var group = data.object;
        group.onCollapsibleChanged(data);
    };
    PropertyGroup.onTitleStylePropertyChanged = function (data) {
        var group = data.object;
        group.onTitleStyleChanged(data);
    };
    PropertyGroup.onPropertiesPropertyChanged = function (data) {
        var group = data.object;
        group.onPropertiesChanged(data);
    };
    PropertyGroup.onLayoutPropertyChanged = function (data) {
        var group = data.object;
        group.onLayoutChanged(data);
    };
    PropertyGroup.prototype.onNameChanged = function (data) {
    };
    PropertyGroup.prototype.onHiddenChanged = function (data) {
    };
    PropertyGroup.prototype.onTitleHiddenChanged = function (data) {
    };
    PropertyGroup.prototype.onCollapsibleChanged = function (data) {
    };
    PropertyGroup.prototype.onTitleStyleChanged = function (data) {
    };
    PropertyGroup.prototype.onPropertiesChanged = function (data) {
    };
    PropertyGroup.prototype.onLayoutChanged = function (data) {
    };
    Object.defineProperty(PropertyGroup.prototype, "name", {
        get: function () {
            return this._getValue(PropertyGroup.nameProperty);
        },
        set: function (value) {
            this._setValue(PropertyGroup.nameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyGroup.prototype, "hidden", {
        get: function () {
            return this._getValue(PropertyGroup.hiddenProperty);
        },
        set: function (value) {
            this._setValue(PropertyGroup.hiddenProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyGroup.prototype, "titleHidden", {
        get: function () {
            return this._getValue(PropertyGroup.titleHiddenProperty);
        },
        set: function (value) {
            this._setValue(PropertyGroup.titleHiddenProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyGroup.prototype, "collapsible", {
        get: function () {
            return this._getValue(PropertyGroup.collapsibleProperty);
        },
        set: function (value) {
            this._setValue(PropertyGroup.collapsibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyGroup.prototype, "titleStyle", {
        get: function () {
            return this._getValue(PropertyGroup.titleStyleProperty);
        },
        set: function (value) {
            this._setValue(PropertyGroup.titleStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyGroup.prototype, "properties", {
        get: function () {
            return this._getValue(PropertyGroup.propertiesProperty);
        },
        set: function (value) {
            this._setValue(PropertyGroup.propertiesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyGroup.prototype, "layout", {
        get: function () {
            return this._getValue(PropertyGroup.layoutProperty);
        },
        set: function (value) {
            this._setValue(PropertyGroup.layoutProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PropertyGroup.nameProperty = new dependencyObservable.Property("name", "PropertyGroup", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, PropertyGroup.onNamePropertyChanged));
    PropertyGroup.hiddenProperty = new dependencyObservable.Property("hidden", "PropertyGroup", new proxy_1.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PropertyGroup.onHiddenPropertyChanged));
    PropertyGroup.titleHiddenProperty = new dependencyObservable.Property("titleHidden", "PropertyGroup", new proxy_1.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PropertyGroup.onTitleHiddenPropertyChanged));
    PropertyGroup.collapsibleProperty = new dependencyObservable.Property("collapsible", "PropertyGroup", new proxy_1.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PropertyGroup.onCollapsiblePropertyChanged));
    PropertyGroup.titleStyleProperty = new dependencyObservable.Property("titleStyle", "PropertyGroup", new proxy_1.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None, PropertyGroup.onTitleStylePropertyChanged));
    PropertyGroup.propertiesProperty = new dependencyObservable.Property("properties", "PropertyGroup", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PropertyGroup.onPropertiesPropertyChanged));
    PropertyGroup.layoutProperty = new dependencyObservable.Property("layout", "PropertyGroup", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PropertyGroup.onLayoutPropertyChanged));
    return PropertyGroup;
}(bindable_1.Bindable));
exports.PropertyGroup = PropertyGroup;
///////////////////////////////////////////////////////////////////////////////
var PropertyEditorParams = (function (_super) {
    __extends(PropertyEditorParams, _super);
    function PropertyEditorParams() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PropertyEditorParams.prototype, "minimum", {
        get: function () {
            return this._getValue(PropertyEditorParams.minimumProperty);
        },
        set: function (value) {
            this._setValue(PropertyEditorParams.minimumProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditorParams.prototype, "maximum", {
        get: function () {
            return this._getValue(PropertyEditorParams.maximumProperty);
        },
        set: function (value) {
            this._setValue(PropertyEditorParams.maximumProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditorParams.prototype, "step", {
        get: function () {
            return this._getValue(PropertyEditorParams.stepProperty);
        },
        set: function (value) {
            this._setValue(PropertyEditorParams.stepProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PropertyEditorParams.minimumProperty = new dependencyObservable.Property("minimum", "PropertyEditorParams", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PropertyEditorParams.maximumProperty = new dependencyObservable.Property("maximum", "PropertyEditorParams", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PropertyEditorParams.stepProperty = new dependencyObservable.Property("step", "PropertyEditorParams", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    return PropertyEditorParams;
}(bindable_1.Bindable));
exports.PropertyEditorParams = PropertyEditorParams;
///////////////////////////////////////////////////////////////////////////////
var DataFormStyleBase = (function (_super) {
    __extends(DataFormStyleBase, _super);
    function DataFormStyleBase() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(DataFormStyleBase.prototype, "separatorColor", {
        get: function () {
            return this._getValue(GroupTitleStyle.separatorColorProperty);
        },
        set: function (value) {
            this._setValue(GroupTitleStyle.separatorColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataFormStyleBase.prototype, "strokeColor", {
        get: function () {
            return this._getValue(GroupTitleStyle.strokeColorProperty);
        },
        set: function (value) {
            this._setValue(GroupTitleStyle.strokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataFormStyleBase.prototype, "fillColor", {
        get: function () {
            return this._getValue(GroupTitleStyle.fillColorProperty);
        },
        set: function (value) {
            this._setValue(GroupTitleStyle.fillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataFormStyleBase.prototype, "strokeWidth", {
        get: function () {
            return this._getValue(GroupTitleStyle.strokeWidthProperty);
        },
        set: function (value) {
            this._setValue(GroupTitleStyle.strokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataFormStyleBase.prototype, "labelTextColor", {
        get: function () {
            return this._getValue(GroupTitleStyle.labelTextColorProperty);
        },
        set: function (value) {
            this._setValue(GroupTitleStyle.labelTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataFormStyleBase.prototype, "labelTextSize", {
        get: function () {
            return this._getValue(GroupTitleStyle.labelTextSizeProperty);
        },
        set: function (value) {
            this._setValue(GroupTitleStyle.labelTextSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataFormStyleBase.prototype, "labelFontName", {
        get: function () {
            return this._getValue(GroupTitleStyle.labelFontNameProperty);
        },
        set: function (value) {
            this._setValue(GroupTitleStyle.labelFontNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataFormStyleBase.prototype, "labelFontStyle", {
        get: function () {
            return this._getValue(GroupTitleStyle.labelFontStyleProperty);
        },
        set: function (value) {
            this._setValue(GroupTitleStyle.labelFontStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DataFormStyleBase.strokeColorProperty = new dependencyObservable.Property("strokeColor", "DataFormStyleBase", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    DataFormStyleBase.strokeWidthProperty = new dependencyObservable.Property("strokeWidth", "DataFormStyleBase", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    DataFormStyleBase.fillColorProperty = new dependencyObservable.Property("fillColor", "DataFormStyleBase", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    DataFormStyleBase.separatorColorProperty = new dependencyObservable.Property("separatorColor", "DataFormStyleBase", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    DataFormStyleBase.labelTextColorProperty = new dependencyObservable.Property("labelTextColor", "DataFormStyleBase", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    DataFormStyleBase.labelTextSizeProperty = new dependencyObservable.Property("labelTextSize", "DataFormStyleBase", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    DataFormStyleBase.labelFontNameProperty = new dependencyObservable.Property("labelFontName", "DataFormStyleBase", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    DataFormStyleBase.labelFontStyleProperty = new dependencyObservable.Property("labelFontStyle", "DataFormStyleBase", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    return DataFormStyleBase;
}(bindable_1.Bindable));
exports.DataFormStyleBase = DataFormStyleBase;
//todo: add properties for separator Leading/Trailing Space , insets
var GroupTitleStyle = (function (_super) {
    __extends(GroupTitleStyle, _super);
    function GroupTitleStyle() {
        _super.apply(this, arguments);
    }
    return GroupTitleStyle;
}(DataFormStyleBase));
exports.GroupTitleStyle = GroupTitleStyle;
// declare class TKDataFormEditorStyle extends NSObject {
//from base class:
// 	stroke: TKStroke;
// 	fill: TKFill;
// 	separatorColor: TKFill;
//iplemented
// 	editorOffset: UIOffset;
// 	textLabelOffset: UIOffset;
// 	textLabelDisplayMode: TKDataFormEditorTextLabelDisplayMode;
//todo: add required properties
// 	accessoryArrowSize: CGSize; //ios specific
// 	accessoryArrowStroke: TKStroke; //ios specific
// 	feedbackImageViewOffset: UIOffset;
// 	feedbackLabelOffset: UIOffset;
// 	imageViewOffset: UIOffset; //add when image view is added as feature
// 	insets: UIEdgeInsets;
// 	separatorLeadingSpace: number; //iOS specific
// 	separatorTrailingSpace: number; //iOS specific
// }
var PropertyEditorStyle = (function (_super) {
    __extends(PropertyEditorStyle, _super);
    function PropertyEditorStyle() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PropertyEditorStyle.prototype, "editorHorizontalOffset", {
        get: function () {
            return this._getValue(PropertyEditorStyle.editorHorizontalOffsetProperty);
        },
        set: function (value) {
            this._setValue(PropertyEditorStyle.editorHorizontalOffsetProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditorStyle.prototype, "editorVerticalOffset", {
        get: function () {
            return this._getValue(PropertyEditorStyle.editorVerticalOffsetProperty);
        },
        set: function (value) {
            this._setValue(PropertyEditorStyle.editorVerticalOffsetProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditorStyle.prototype, "labelHorizontalOffset", {
        get: function () {
            return this._getValue(PropertyEditorStyle.labelHorizontalOffsetProperty);
        },
        set: function (value) {
            this._setValue(PropertyEditorStyle.labelHorizontalOffsetProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditorStyle.prototype, "labelVerticalOffset", {
        get: function () {
            return this._getValue(PropertyEditorStyle.labelVerticalOffsetProperty);
        },
        set: function (value) {
            this._setValue(PropertyEditorStyle.labelVerticalOffsetProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditorStyle.prototype, "labelHidden", {
        get: function () {
            return this._getValue(PropertyEditorStyle.labelHiddenProperty);
        },
        set: function (value) {
            this._setValue(PropertyEditorStyle.labelHiddenProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PropertyEditorStyle.editorHorizontalOffsetProperty = new dependencyObservable.Property("editorHorizontalOffset", "PropertyEditorStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PropertyEditorStyle.editorVerticalOffsetProperty = new dependencyObservable.Property("editorVerticalOffset", "PropertyEditorStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PropertyEditorStyle.labelHorizontalOffsetProperty = new dependencyObservable.Property("labelHorizontalOffset", "PropertyEditorStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PropertyEditorStyle.labelVerticalOffsetProperty = new dependencyObservable.Property("labelVerticalOffset", "PropertyEditorStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PropertyEditorStyle.labelHiddenProperty = new dependencyObservable.Property("labelHidden", "PropertyEditorStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    return PropertyEditorStyle;
}(DataFormStyleBase));
exports.PropertyEditorStyle = PropertyEditorStyle;
////////////////////////////////////////////////////////////////////
// name : the name of bound entity property  
// displayName  : the label to be shown for editor  
// index : the index in group 
// hidden : boolean for show/hide of editor 
// readOnly : boolean , read only state 
// required : boolean , if the value is required. Note: consider to move this to validator 
// hintText : string, the gray text shown as hint in empty editor 
// editor : PropertyEditor derived instance with specific properties for editors
// valuesProvider : an array or comma separated string with values used by some editors  
// converter : PropertyConverter derived instance with specific properties for data conversion
// validator : PropertyValidator  
///////////////////////////////////////////////////////////////////////////////
var EntityProperty = (function (_super) {
    __extends(EntityProperty, _super);
    function EntityProperty() {
        _super.apply(this, arguments);
        this.namePropertySilentUpdate = false;
    }
    Object.defineProperty(EntityProperty.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    EntityProperty.onEditorPropertyChanged = function (data) {
        var prop = data.object;
        if (data.oldValue) {
            data.oldValue.off(observable.Observable.propertyChangeEvent);
        }
        if (data.newValue) {
            data.newValue.on(observable.Observable.propertyChangeEvent, function (propertyChangeData) {
                if (propertyChangeData.propertyName === "type") {
                    prop.onEditorTypeChanged();
                }
            });
        }
        prop.onEditorChanged(data);
    };
    EntityProperty.prototype.onEditorTypeChanged = function () {
        this.updateNativeEditor(this.editor);
    };
    EntityProperty.onValidatorsPropertyChanged = function (data) {
        var prop = data.object;
        prop.onValidatorsChanged(data);
    };
    EntityProperty.onConverterPropertyChanged = function (data) {
        var prop = data.object;
        prop.onConverterChanged(data);
    };
    EntityProperty.onValuesProviderPropertyChanged = function (data) {
        var prop = data.object;
        prop.onValuesProviderChanged(data);
    };
    EntityProperty.onAutoCompleteDisplayModePropertyChanged = function (data) {
        var prop = data.object;
        prop.onAutoCompleteDisplayModeChanged(data);
    };
    EntityProperty.onNamePropertyChanged = function (data) {
        var prop = data.object;
        if (prop.namePropertySilentUpdate) {
            prop.namePropertySilentUpdate = false;
            return;
        }
        if (data.oldValue == null) {
            prop.onNameChanged(data);
        }
        else {
            prop.namePropertySilentUpdate = true;
            prop.name = data.oldValue;
            console.log("EntityProperty's name is already set and can't be changed.");
        }
    };
    EntityProperty.onDisplayNamePropertyChanged = function (data) {
        var prop = data.object;
        prop.onDisplayNameChanged(data);
    };
    EntityProperty.onIndexPropertyChanged = function (data) {
        var prop = data.object;
        prop.onIndexChanged(data);
    };
    EntityProperty.onColumnIndexPropertyChanged = function (data) {
        var prop = data.object;
        prop.onColumnIndexChanged(data);
    };
    EntityProperty.onHiddenPropertyChanged = function (data) {
        var prop = data.object;
        prop.onHiddenChanged(data);
    };
    EntityProperty.onReadOnlyPropertyChanged = function (data) {
        var prop = data.object;
        prop.onReadOnlyChanged(data);
    };
    EntityProperty.onRequiredPropertyChanged = function (data) {
        var prop = data.object;
        prop.onRequiredChanged(data);
    };
    EntityProperty.onHintTextPropertyChanged = function (data) {
        var prop = data.object;
        prop.onHintTextChanged(data);
    };
    EntityProperty.onImageResourcePropertyChanged = function (data) {
        var prop = data.object;
        prop.onImageResourceChanged(data);
    };
    EntityProperty.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "validators") {
            this.validators = value;
        }
    };
    EntityProperty.prototype.onEditorChanged = function (data) {
        if (data.newValue instanceof PropertyEditor) {
            this.updateNativeEditor(data.newValue);
        }
    };
    EntityProperty.prototype.onValidatorsChanged = function (data) {
        if (data.newValue && data.newValue instanceof Array) {
            this.updateNativeValidators(data.newValue);
        }
    };
    EntityProperty.prototype.onConverterChanged = function (data) {
        if (data.newValue) {
            this.updateNativeConverter(data.newValue);
        }
    };
    EntityProperty.prototype.onValuesProviderChanged = function (data) {
        if (data.newValue) {
            if (data.newValue instanceof Array) {
                this.updateNativeValuesProvider(data.newValue);
            }
            else {
                var array = data.newValue.split(',');
                this.updateNativeValuesProvider(array);
            }
        }
    };
    EntityProperty.prototype.onAutoCompleteDisplayModeChanged = function (data) {
        if (data.newValue) {
            this.updateNativeAutoCompleteDisplayMode(data.newValue);
        }
    };
    EntityProperty.prototype.onNameChanged = function (data) {
    };
    EntityProperty.prototype.onDisplayNameChanged = function (data) {
        if (data.newValue) {
            this.updateNativeDisplayName(data.newValue);
        }
    };
    EntityProperty.prototype.onIndexChanged = function (data) {
        if (!isNaN(data.newValue)) {
            this.updateNativeIndex(data.newValue);
        }
    };
    EntityProperty.prototype.onColumnIndexChanged = function (data) {
        if (!isNaN(data.newValue)) {
            this.updateNativeColumnIndex(data.newValue);
        }
    };
    EntityProperty.prototype.onHiddenChanged = function (data) {
        this.updateNativeHidden(data.newValue);
    };
    EntityProperty.prototype.onReadOnlyChanged = function (data) {
        this.updateNativeReadOnly(data.newValue);
    };
    EntityProperty.prototype.onRequiredChanged = function (data) {
        this.updateNativeRequired(data.newValue);
    };
    EntityProperty.prototype.onHintTextChanged = function (data) {
        this.updateNativeHintText(data.newValue);
    };
    EntityProperty.prototype.onImageResourceChanged = function (data) {
        if (this.imageResource != null) {
            if (this.imageResource.indexOf(utils.RESOURCE_PREFIX) === 0) {
                this.imageResource = this.imageResource.substr(utils.RESOURCE_PREFIX.length);
                return;
            }
        }
        this.updateNativeImageResource(this.imageResource);
    };
    Object.defineProperty(EntityProperty.prototype, "editor", {
        get: function () {
            return this._getValue(EntityProperty.editorProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.editorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "validators", {
        get: function () {
            return this._getValue(EntityProperty.validatorsProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.validatorsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "converter", {
        get: function () {
            return this._getValue(EntityProperty.converterProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.converterProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "valuesProvider", {
        get: function () {
            return this._getValue(EntityProperty.valuesProviderProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.valuesProviderProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "autoCompleteDisplayMode", {
        get: function () {
            return this._getValue(EntityProperty.autoCompleteDisplayModeProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.autoCompleteDisplayModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "name", {
        get: function () {
            return this._getValue(EntityProperty.nameProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.nameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "displayName", {
        get: function () {
            return this._getValue(EntityProperty.displayNameProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.displayNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "index", {
        get: function () {
            return this._getValue(EntityProperty.indexProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.indexProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "columnIndex", {
        get: function () {
            return this._getValue(EntityProperty.columnIndexProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.columnIndexProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "hidden", {
        get: function () {
            return this._getValue(EntityProperty.hiddenProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.hiddenProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "readOnly", {
        get: function () {
            return this._getValue(EntityProperty.readOnlyProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.readOnlyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "required", {
        get: function () {
            return this._getValue(EntityProperty.requiredProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.requiredProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "hintText", {
        get: function () {
            return this._getValue(EntityProperty.hintTextProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.hintTextProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "imageResource", {
        get: function () {
            return this._getValue(EntityProperty.imageResourceProperty);
        },
        set: function (value) {
            this._setValue(EntityProperty.imageResourceProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    EntityProperty.prototype.updateNativeEditor = function (value) {
    };
    EntityProperty.prototype.updateNativeValidators = function (value) {
    };
    EntityProperty.prototype.updateNativeConverter = function (value) {
    };
    EntityProperty.prototype.updateNativeValuesProvider = function (value) {
    };
    EntityProperty.prototype.updateNativeAutoCompleteDisplayMode = function (value) {
    };
    EntityProperty.prototype.updateNativeDisplayName = function (value) {
    };
    EntityProperty.prototype.updateNativeIndex = function (value) {
    };
    EntityProperty.prototype.updateNativeColumnIndex = function (value) {
    };
    EntityProperty.prototype.updateNativeHidden = function (value) {
    };
    EntityProperty.prototype.updateNativeReadOnly = function (value) {
    };
    EntityProperty.prototype.updateNativeRequired = function (value) {
    };
    EntityProperty.prototype.updateNativeHintText = function (value) {
    };
    EntityProperty.prototype.updateNativeImageResource = function (value) {
    };
    EntityProperty.editorProperty = new dependencyObservable.Property("editor", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, EntityProperty.onEditorPropertyChanged));
    EntityProperty.validatorsProperty = new dependencyObservable.Property("validators", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, EntityProperty.onValidatorsPropertyChanged));
    EntityProperty.converterProperty = new dependencyObservable.Property("converter", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, EntityProperty.onConverterPropertyChanged));
    EntityProperty.valuesProviderProperty = new dependencyObservable.Property("valuesProvider", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, EntityProperty.onValuesProviderPropertyChanged));
    EntityProperty.autoCompleteDisplayModeProperty = new dependencyObservable.Property("autoCompleteDisplayMode", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, EntityProperty.onAutoCompleteDisplayModePropertyChanged));
    EntityProperty.nameProperty = new dependencyObservable.Property("name", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, EntityProperty.onNamePropertyChanged));
    EntityProperty.displayNameProperty = new dependencyObservable.Property("displayName", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, EntityProperty.onDisplayNamePropertyChanged));
    EntityProperty.indexProperty = new dependencyObservable.Property("index", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, EntityProperty.onIndexPropertyChanged));
    EntityProperty.columnIndexProperty = new dependencyObservable.Property("columnIndex", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, EntityProperty.onColumnIndexPropertyChanged));
    EntityProperty.hiddenProperty = new dependencyObservable.Property("hidden", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, EntityProperty.onHiddenPropertyChanged));
    EntityProperty.readOnlyProperty = new dependencyObservable.Property("readOnly", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, EntityProperty.onReadOnlyPropertyChanged));
    EntityProperty.requiredProperty = new dependencyObservable.Property("required", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, EntityProperty.onRequiredPropertyChanged));
    EntityProperty.hintTextProperty = new dependencyObservable.Property("hintText", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, EntityProperty.onHintTextPropertyChanged));
    EntityProperty.imageResourceProperty = new dependencyObservable.Property("imageResource", "EntityProperty", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, EntityProperty.onImageResourcePropertyChanged));
    return EntityProperty;
}(bindable_1.Bindable));
exports.EntityProperty = EntityProperty;
//////////////////////////////////////////////////////
// type : tye type of the editor to be used for this property
// style : EditorStyle instance
// todo: extend with common editor properties 
var PropertyEditor = (function (_super) {
    __extends(PropertyEditor, _super);
    function PropertyEditor() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PropertyEditor.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditor.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    PropertyEditor.onTypePropertyChanged = function (data) {
        var editor = data.object;
        editor.onTypeChanged(data);
    };
    PropertyEditor.onStylePropertyChanged = function (data) {
        var editor = data.object;
        if (data.oldValue) {
            data.oldValue.off(observable.Observable.propertyChangeEvent);
        }
        if (data.newValue) {
            data.newValue.on(observable.Observable.propertyChangeEvent, function (propertyChangeData) {
                editor.onStylePropertyChanged(propertyChangeData.propertyName);
            });
        }
        editor.onStyleChanged(data);
    };
    PropertyEditor.onParamsPropertyChanged = function (data) {
        var editor = data.object;
        if (data.oldValue) {
            data.oldValue.off(observable.Observable.propertyChangeEvent);
        }
        if (data.newValue) {
            data.newValue.on(observable.Observable.propertyChangeEvent, function (propertyChangeData) {
                editor.onParamsPropertyChanged(propertyChangeData.propertyName);
            });
        }
        editor.onParamsChanged(data);
    };
    PropertyEditor.prototype.onStylePropertyChanged = function (propertyName) {
    };
    PropertyEditor.prototype.onParamsPropertyChanged = function (propertyName) {
    };
    PropertyEditor.prototype.onTypeChanged = function (data) {
    };
    PropertyEditor.prototype.onStyleChanged = function (data) {
    };
    PropertyEditor.prototype.onParamsChanged = function (data) {
    };
    Object.defineProperty(PropertyEditor.prototype, "type", {
        get: function () {
            return this._getValue(PropertyEditor.typeProperty);
        },
        set: function (value) {
            this._setValue(PropertyEditor.typeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditor.prototype, "style", {
        get: function () {
            return this._getValue(PropertyEditor.styleProperty);
        },
        set: function (value) {
            this._setValue(PropertyEditor.styleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditor.prototype, "params", {
        get: function () {
            return this._getValue(PropertyEditor.paramsProperty);
        },
        set: function (value) {
            this._setValue(PropertyEditor.paramsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PropertyEditor.typeProperty = new dependencyObservable.Property("type", "PropertyEditor", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PropertyEditor.onTypePropertyChanged));
    PropertyEditor.styleProperty = new dependencyObservable.Property("style", "PropertyEditor", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PropertyEditor.onStylePropertyChanged));
    PropertyEditor.paramsProperty = new dependencyObservable.Property("params", "PropertyEditor", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PropertyEditor.onParamsPropertyChanged));
    return PropertyEditor;
}(bindable_1.Bindable));
exports.PropertyEditor = PropertyEditor;
var CustomPropertyEditor = (function (_super) {
    __extends(CustomPropertyEditor, _super);
    function CustomPropertyEditor() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CustomPropertyEditor.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomPropertyEditor.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    CustomPropertyEditor.prototype.notifyValueChanged = function () {
    };
    CustomPropertyEditor.editorNeedsViewEvent = "editorNeedsView";
    CustomPropertyEditor.editorHasToApplyValueEvent = "editorHasToApplyValue";
    CustomPropertyEditor.editorNeedsValueEvent = "editorNeedsValue";
    return CustomPropertyEditor;
}(PropertyEditor));
exports.CustomPropertyEditor = CustomPropertyEditor;
//////////////////////////////////////////////////////
// errorMessage : message on error
// successMessage : message on success
var PropertyValidator = (function (_super) {
    __extends(PropertyValidator, _super);
    function PropertyValidator() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PropertyValidator.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyValidator.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    PropertyValidator.onErrorMessagePropertyChanged = function (data) {
        var validator = data.object;
        validator.onErrorMessageChanged(data);
    };
    PropertyValidator.onSuccessMessagePropertyChanged = function (data) {
        var validator = data.object;
        validator.onSuccessMessageChanged(data);
    };
    PropertyValidator.prototype.onErrorMessageChanged = function (data) {
        if (data.newValue) {
            if (this.ios) {
                this.ios.errorMessage = data.newValue;
            }
            else {
                this.android.setNegativeMessage(data.newValue);
            }
        }
    };
    PropertyValidator.prototype.onSuccessMessageChanged = function (data) {
        if (data.newValue) {
            if (this.ios) {
                this.ios.positiveMessage = data.newValue;
            }
            else {
                this.android.setPositiveMessage(data.newValue);
            }
        }
    };
    Object.defineProperty(PropertyValidator.prototype, "errorMessage", {
        get: function () {
            return this._getValue(PropertyValidator.errorMessageProperty);
        },
        set: function (value) {
            this._setValue(PropertyValidator.errorMessageProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyValidator.prototype, "successMessage", {
        get: function () {
            return this._getValue(PropertyValidator.successMessageProperty);
        },
        set: function (value) {
            this._setValue(PropertyValidator.successMessageProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PropertyValidator.errorMessageProperty = new dependencyObservable.Property("errorMessage", "PropertyValidator", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, PropertyValidator.onErrorMessagePropertyChanged));
    PropertyValidator.successMessageProperty = new dependencyObservable.Property("successMessage", "PropertyValidator", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, PropertyValidator.onSuccessMessagePropertyChanged));
    return PropertyValidator;
}(bindable_1.Bindable));
exports.PropertyValidator = PropertyValidator;
var LengthValidator = (function (_super) {
    __extends(LengthValidator, _super);
    function LengthValidator() {
        _super.apply(this, arguments);
    }
    LengthValidator.onLengthPropertyChanged = function (data) {
        var validator = data.object;
        validator.onLengthChanged(data);
    };
    LengthValidator.prototype.onLengthChanged = function (data) {
        console.log("Minimum/maximum setter in parrent");
    };
    Object.defineProperty(LengthValidator.prototype, "length", {
        get: function () {
            return this._getValue(LengthValidator.errorMessageProperty);
        },
        set: function (value) {
            this._setValue(LengthValidator.lengthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    LengthValidator.lengthProperty = new dependencyObservable.Property("length", "LengthValidator", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, LengthValidator.onLengthPropertyChanged));
    return LengthValidator;
}(PropertyValidator));
exports.LengthValidator = LengthValidator;
var MinimumLengthValidator = (function (_super) {
    __extends(MinimumLengthValidator, _super);
    function MinimumLengthValidator() {
        _super.apply(this, arguments);
    }
    return MinimumLengthValidator;
}(LengthValidator));
exports.MinimumLengthValidator = MinimumLengthValidator;
var MaximumLengthValidator = (function (_super) {
    __extends(MaximumLengthValidator, _super);
    function MaximumLengthValidator() {
        _super.apply(this, arguments);
    }
    return MaximumLengthValidator;
}(LengthValidator));
exports.MaximumLengthValidator = MaximumLengthValidator;
var EmailValidator = (function (_super) {
    __extends(EmailValidator, _super);
    function EmailValidator() {
        _super.apply(this, arguments);
    }
    return EmailValidator;
}(PropertyValidator));
exports.EmailValidator = EmailValidator;
var NonEmptyValidator = (function (_super) {
    __extends(NonEmptyValidator, _super);
    function NonEmptyValidator() {
        _super.apply(this, arguments);
    }
    return NonEmptyValidator;
}(PropertyValidator));
exports.NonEmptyValidator = NonEmptyValidator;
var RangeValidator = (function (_super) {
    __extends(RangeValidator, _super);
    function RangeValidator() {
        _super.apply(this, arguments);
    }
    RangeValidator.onMinimumPropertyChanged = function (data) {
        var axis = data.object;
        axis.onMinimumChanged(data);
    };
    RangeValidator.onMaximumPropertyChanged = function (data) {
        var axis = data.object;
        axis.onMaximumChanged(data);
    };
    RangeValidator.prototype.onMinimumChanged = function (data) {
    };
    RangeValidator.prototype.onMaximumChanged = function (data) {
    };
    Object.defineProperty(RangeValidator.prototype, "maximum", {
        get: function () {
            return this._getValue(RangeValidator.maximumProperty);
        },
        set: function (value) {
            this._setValue(RangeValidator.maximumProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeValidator.prototype, "minimum", {
        get: function () {
            return this._getValue(RangeValidator.minimumProperty);
        },
        set: function (value) {
            this._setValue(RangeValidator.minimumProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RangeValidator.minimumProperty = new dependencyObservable.Property("minimum", "RangeValidator", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RangeValidator.onMinimumPropertyChanged));
    RangeValidator.maximumProperty = new dependencyObservable.Property("maximum", "RangeValidator", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RangeValidator.onMaximumPropertyChanged));
    return RangeValidator;
}(PropertyValidator));
exports.RangeValidator = RangeValidator;
var PhoneValidator = (function (_super) {
    __extends(PhoneValidator, _super);
    function PhoneValidator() {
        _super.apply(this, arguments);
    }
    return PhoneValidator;
}(PropertyValidator));
exports.PhoneValidator = PhoneValidator;
var StringToDateConverter = (function () {
    function StringToDateConverter() {
    }
    StringToDateConverter.prototype.convertFrom = function (value) { };
    StringToDateConverter.prototype.convertTo = function (value) { };
    return StringToDateConverter;
}());
exports.StringToDateConverter = StringToDateConverter;
var StringToTimeConverter = (function () {
    function StringToTimeConverter() {
    }
    StringToTimeConverter.prototype.convertFrom = function (value) { };
    StringToTimeConverter.prototype.convertTo = function (value) { };
    return StringToTimeConverter;
}());
exports.StringToTimeConverter = StringToTimeConverter;
///////////////////////////////////////////////////////////////////////////////
var DataFormLayout = (function (_super) {
    __extends(DataFormLayout, _super);
    function DataFormLayout() {
        _super.apply(this, arguments);
    }
    return DataFormLayout;
}(bindable_1.Bindable));
exports.DataFormLayout = DataFormLayout;
var DataFormStackLayout = (function (_super) {
    __extends(DataFormStackLayout, _super);
    function DataFormStackLayout() {
        _super.apply(this, arguments);
    }
    DataFormStackLayout.onOrientationPropertyChanged = function (data) {
        var layout = data.object;
        layout.onOrientationChanged(data);
    };
    DataFormStackLayout.prototype.onOrientationChanged = function (data) {
    };
    Object.defineProperty(DataFormStackLayout.prototype, "orientation", {
        get: function () {
            return this._getValue(DataFormStackLayout.orientationProperty);
        },
        set: function (value) {
            this._setValue(DataFormStackLayout.orientationProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DataFormStackLayout.orientationProperty = new dependencyObservable.Property("orientation", "DataFormStackLayout", new proxy_1.PropertyMetadata(enums.Orientation.vertical, dependencyObservable.PropertyMetadataSettings.AffectsLayout, DataFormStackLayout.onOrientationPropertyChanged));
    return DataFormStackLayout;
}(DataFormLayout));
exports.DataFormStackLayout = DataFormStackLayout;
var DataFormGridLayout = (function (_super) {
    __extends(DataFormGridLayout, _super);
    function DataFormGridLayout() {
        _super.apply(this, arguments);
    }
    return DataFormGridLayout;
}(DataFormLayout));
exports.DataFormGridLayout = DataFormGridLayout;
//# sourceMappingURL=dataform-common.js.map