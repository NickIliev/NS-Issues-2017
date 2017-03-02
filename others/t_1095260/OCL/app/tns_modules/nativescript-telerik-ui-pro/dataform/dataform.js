var commonModule = require("./dataform-common");
var color_1 = require("color");
var observableModule = require("data/observable");
var utils = require("utils/utils");
var enums = require("ui/enums");
require("utils/module-merge").merge(commonModule, exports);
//////////////////////////////////////////////
var TKDataFormDelegateImplementation = (function (_super) {
    __extends(TKDataFormDelegateImplementation, _super);
    function TKDataFormDelegateImplementation() {
        _super.apply(this, arguments);
    }
    TKDataFormDelegateImplementation.new = function () {
        return _super.new.call(this);
    };
    TKDataFormDelegateImplementation.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    /**
     * Called when a row with the corresponding property is selected.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidSelectEditorForProperty = function (dataForm, editor, property) {
        var args = {
            eventName: commonModule.RadDataForm.editorSelectedEvent,
            object: this._owner,
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called when a row with the corresponding property is deselected.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidDeselectEditorForProperty = function (dataForm, editor, property) {
        var args = {
            eventName: commonModule.RadDataForm.editorDeselectedEvent,
            object: this._owner,
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called after a property is edited.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidEditProperty = function (dataForm, property) {
        var args = {
            eventName: commonModule.RadDataForm.propertyEditedEvent,
            object: this._owner,
            editor: undefined,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called after a property is validated.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidValidatePropertyEditor = function (dataForm, property, editor) {
        var args = {
            eventName: commonModule.RadDataForm.propertyValidatedEvent,
            object: this._owner,
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called when a property has to be validated.
     */
    TKDataFormDelegateImplementation.prototype.dataFormValidatePropertyEditor = function (dataForm, property, editor) {
        var args = {
            eventName: commonModule.RadDataForm.propertyValidateEvent,
            object: this._owner,
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.notify(args);
        return args.returnValue;
    };
    /**
     *  Called once when the data form creates its ediors. This method lets you to set properties that are not going to be changed.
     */
    TKDataFormDelegateImplementation.prototype.dataFormSetupEditorForProperty = function (dataForm, editor, property) {
        var entityProperty = this._owner.getPropertyByName(property.name);
        if (!entityProperty) {
            entityProperty = this._owner._createPropertyFromNative(property);
            if (!this._owner.properties) {
                this._owner.properties = new Array();
            }
            this._owner.properties.push(entityProperty);
        }
        entityProperty._updateNativeEditor(editor);
        var args = {
            eventName: commonModule.RadDataForm.editorSetupEvent,
            object: this._owner,
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
    *  Called when the data is reloaded in the native RadDataForm component (reloadData). This method lets you to set the PropertyChanged callbacks for all {N} properties.
    */
    TKDataFormDelegateImplementation.prototype.dataFormDidFinishEditorIntitialization = function (dataForm) {
        if (this._owner.source == undefined) {
            return;
        }
        if (this._owner.properties) {
            for (var i = 0; i < this._owner.properties.length; i++) {
                var entityProperty = this._owner.properties[i];
                this._owner._attachPropertyChangeListener(entityProperty);
                entityProperty._updateNativeEditor(entityProperty.editor.ios);
            }
        }
        if (this._owner.groups) {
            for (var i = 0; i < this._owner.groups.length; i++) {
                var group = this._owner.groups[i];
                if (group.properties) {
                    for (var j = 0; j < group.properties.length; j++) {
                        var entityProperty = group.properties[j];
                        this._owner._attachPropertyChangeListener(entityProperty);
                        entityProperty._updateNativeEditor(entityProperty.editor.ios);
                    }
                }
            }
        }
    };
    /**
     * Called before an editor is desplayed to the screen or after validation. This method lets you change the visual styles and setting of TKDataFormEditor object.
     */
    TKDataFormDelegateImplementation.prototype.dataFormUpdateEditorForProperty = function (dataForm, editor, property) {
        var entityProperty = this._owner.getPropertyByName(property.name);
        PropertyEditorHelper.applyStyle(entityProperty.editor);
        var args = {
            eventName: commonModule.RadDataForm.editorUpdateEvent,
            object: this._owner,
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * This method lets you change the visual styles and setting of TKEntityPropertyGroupView object.
     */
    TKDataFormDelegateImplementation.prototype.dataFormUpdateGroupViewForGroupAtIndex = function (dataForm, groupView, groupIndex) {
        //apply style customizations for defined in xml groups only and escape the default group with fields not included in xml 
        if (!this._owner.groups) {
            groupView.titleView.hidden = true;
            return;
        }
        if (groupView == null || groupView.group == null) {
            return;
        }
        var groupName = groupView.group.name;
        var group = this._owner.getGroupByName(groupName);
        groupView.collapsible = group.collapsible;
        groupView.titleView.hidden = group.titleHidden;
        this._owner._updateGroupLayout(group, groupView);
        this._owner._applyGroupTitleStyle(groupView, group.titleStyle);
        //throw event for additional customizations
        var args = {
            eventName: commonModule.RadDataForm.groupUpdateEvent,
            object: this._owner,
            editor: undefined,
            entityProperty: undefined,
            propertyName: undefined,
            group: groupView,
            groupName: groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called just before a property value will be committed to the business object.
     */
    TKDataFormDelegateImplementation.prototype.dataFormWillCommitProperty = function (dataForm, property) {
        var args = {
            eventName: commonModule.RadDataForm.propertyCommitEvent,
            object: this._owner,
            editor: undefined,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.notify(args);
        return args.returnValue;
    };
    /**
     * Called after a property value is committed to the business object.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidCommitProperty = function (dataForm, property) {
        if (this._owner.source.hasOwnProperty(property.name)) {
            this._owner.source[property.name] = property.originalValue;
        }
        var args = {
            eventName: commonModule.RadDataForm.propertyCommittedEvent,
            object: this._owner,
            editor: null,
            entityProperty: property,
            propertyName: property.name,
            group: null,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called after a group is collapsed.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidCollapseGroupView = function (dataForm, groupView) {
        var groupName = groupView != null && groupView.group != null ? groupView.group.name : null;
        var args = {
            eventName: commonModule.RadDataForm.groupCollapsedEvent,
            object: this._owner,
            editor: undefined,
            entityProperty: undefined,
            propertyName: undefined,
            group: groupView,
            groupName: groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called after a group is expanded.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidExpandGroupView = function (dataForm, groupView) {
        var groupName = groupView != null && groupView.group != null ? groupView.group.name : null;
        var args = {
            eventName: commonModule.RadDataForm.groupExpandedEvent,
            object: this._owner,
            editor: undefined,
            entityProperty: undefined,
            propertyName: undefined,
            group: groupView,
            groupName: groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    TKDataFormDelegateImplementation.ObjCProtocols = [TKDataFormDelegate];
    return TKDataFormDelegateImplementation;
}(NSObject));
var TKDataFormConverterImplementation = (function (_super) {
    __extends(TKDataFormConverterImplementation, _super);
    function TKDataFormConverterImplementation() {
        _super.apply(this, arguments);
    }
    TKDataFormConverterImplementation.new = function () {
        return _super.new.call(this);
    };
    TKDataFormConverterImplementation.prototype.initWithConverter = function (converter) {
        this._converter = converter;
        return this;
    };
    TKDataFormConverterImplementation.prototype.convertFrom = function (source) {
        return this._converter.convertFrom(source);
    };
    TKDataFormConverterImplementation.prototype.convertTo = function (source) {
        return this._converter.convertTo(source);
    };
    TKDataFormConverterImplementation.ObjCProtocols = [TKDataFormConverter];
    return TKDataFormConverterImplementation;
}(NSObject));
////////////////////////////////////////////////////////////////////////////
var TKDataFormCustomEditorDelegateImplementation = (function (_super) {
    __extends(TKDataFormCustomEditorDelegateImplementation, _super);
    function TKDataFormCustomEditorDelegateImplementation() {
        _super.apply(this, arguments);
    }
    TKDataFormCustomEditorDelegateImplementation.new = function () {
        return _super.new.call(this);
    };
    TKDataFormCustomEditorDelegateImplementation.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    TKDataFormCustomEditorDelegateImplementation.prototype.editorWillCreateView = function (editor) {
        var args = {
            eventName: commonModule.CustomPropertyEditor.editorNeedsViewEvent,
            object: this._owner,
            view: undefined,
            context: undefined,
            value: undefined
        };
        this._owner.notify(args);
        return args.view;
    };
    TKDataFormCustomEditorDelegateImplementation.prototype.editorShouldApplyValueEditorView = function (editor, value, view) {
        var args = {
            eventName: commonModule.CustomPropertyEditor.editorHasToApplyValueEvent,
            object: this._owner,
            view: view,
            context: undefined,
            value: value
        };
        this._owner.notify(args);
    };
    TKDataFormCustomEditorDelegateImplementation.prototype.editorWillReturnValueEditorView = function (editor, view) {
        var args = {
            eventName: commonModule.CustomPropertyEditor.editorNeedsValueEvent,
            object: this._owner,
            view: view,
            context: undefined,
            value: undefined
        };
        this._owner.notify(args);
        return args.value;
    };
    TKDataFormCustomEditorDelegateImplementation.ObjCProtocols = [TKDataFormCustomEditorDelegate];
    return TKDataFormCustomEditorDelegateImplementation;
}(NSObject));
////////////////////////////////////////////////////////////////////////////
var RadDataForm = (function (_super) {
    __extends(RadDataForm, _super);
    function RadDataForm() {
        _super.call(this);
        this._initialized = false;
        this._ios = TKDataForm.new();
        this._nativeDelegate = TKDataFormDelegateImplementation.new().initWithOwner(this);
    }
    Object.defineProperty(RadDataForm.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadDataForm.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this._ios.delegate = this._nativeDelegate;
    };
    RadDataForm.prototype.onUnloaded = function () {
        this._ios.delegate = null;
    };
    Object.defineProperty(RadDataForm.prototype, "editedObject", {
        get: function () {
            var result = this._ios.dataSource.writeJSONToString();
            var parsedResult = JSON.parse(result);
            var finalResult = JSON.stringify(parsedResult);
            return finalResult;
        },
        enumerable: true,
        configurable: true
    });
    RadDataForm.prototype._reset = function () {
        this._dataSource.removeAllGroups();
        this._initDataForm();
    };
    RadDataForm.prototype._applyGroupTitleStyle = function (groupView, titleStyle) {
        if (titleStyle.fillColor) {
            groupView.titleView.style.fill = TKSolidFill.solidFillWithColor((new color_1.Color(titleStyle.fillColor)).ios);
        }
        if (titleStyle.strokeColor || titleStyle.strokeWidth) {
            var stroke = TKStroke.new();
            if (titleStyle.strokeWidth) {
                stroke.width = titleStyle.strokeWidth;
            }
            if (titleStyle.strokeColor) {
                stroke.color = (new color_1.Color(titleStyle.strokeColor)).ios;
            }
            groupView.titleView.style.stroke = stroke;
        }
        if (titleStyle.separatorColor) {
            groupView.titleView.style.separatorColor = TKSolidFill.solidFillWithColor((new color_1.Color(titleStyle.separatorColor)).ios);
        }
        if (titleStyle.labelTextColor) {
            groupView.titleView.titleLabel.textColor = (new color_1.Color(titleStyle.labelTextColor)).ios;
        }
        if (titleStyle.labelFontName || titleStyle.labelTextSize || titleStyle.labelFontStyle) {
            groupView.titleView.titleLabel.font = RadDataForm.getFontWithProperties(titleStyle.labelFontName, titleStyle.labelTextSize, titleStyle.labelFontStyle);
        }
    };
    RadDataForm.prototype._updateGroupLayout = function (propertyGroup, nativeGroup) {
        if (propertyGroup.layout instanceof commonModule.DataFormStackLayout) {
            var nativeLayout = TKStackLayout.alloc().init();
            if (propertyGroup.layout.orientation == enums.Orientation.horizontal) {
                nativeLayout.orientation = 0 /* Horizontal */;
            }
            else {
                nativeLayout.orientation = 1 /* Vertical */;
            }
            nativeGroup.editorsContainer.layout = nativeLayout;
        }
        else if (propertyGroup.layout instanceof commonModule.DataFormGridLayout) {
            nativeGroup.editorsContainer.layout = TKGridLayout.alloc().init();
        }
    };
    RadDataForm.prototype.onGroupPropertyChanged = function (data) {
        if (!this._ios || !this._initialized) {
            return;
        }
        switch (data.propertyName) {
            case "hidden":
                var nativeGroup = this.getNativeGroup(data.object.name);
                nativeGroup.hidden = data.value;
                this.reload();
                break;
            case "collapsible":
            case "titleStyle":
                this.reload();
                break;
            case "layout":
                this._onLayoutPropertyChanged(data.object);
            case "name":
                this._reset();
                break;
        }
    };
    RadDataForm.prototype._onLayoutPropertyChanged = function (group) {
        if (!this._ios || !this._initialized) {
            return;
        }
        this._updateLayout(group);
    };
    RadDataForm.prototype._updateLayout = function (group) {
        this._updateNativeLayoutInfoForGroup(group);
        var nativeGroup = this.getNativeGroup(group.name);
        var nativeGroupView = this._ios.groupViewForGroup(nativeGroup);
        this._updateGroupLayout(group, nativeGroupView);
    };
    RadDataForm.prototype._updateNativeLayoutInfoForGroup = function (group) {
        if (group.properties) {
            for (var i = 0; i < group.properties.length; i++) {
                var property = group.properties[i];
                this._updateNativeLayoutInfoForProperty(property, group);
            }
        }
    };
    // This method aims to unify the behavior of the horizontal stack layout in Android and iOS.
    // When this layout is used the order of elements is determined by property's index in android
    // and the property's column in iOS.
    RadDataForm.prototype._updateNativeLayoutInfoForProperty = function (property, group) {
        if (group != null && group.layout instanceof commonModule.DataFormStackLayout
            && group.layout.orientation == enums.Orientation.horizontal) {
            property._indexIsColumn = true;
            property.ios.layoutInfo.row = 0;
            property.ios.layoutInfo.column = property.index;
        }
        else if (group != null && group.layout instanceof commonModule.DataFormStackLayout
            && group.layout.orientation == enums.Orientation.vertical) {
            property._indexIsColumn = false;
            property.ios.layoutInfo.row = property.index;
            property.ios.layoutInfo.column = 0;
        }
        else {
            property._indexIsColumn = false;
            property.ios.layoutInfo.row = property.index;
            property.ios.layoutInfo.column = property.columnIndex;
        }
    };
    RadDataForm.prototype.getNativeGroup = function (name) {
        var groupCount = this._dataSource.numberOfGroupsInDataForm(this.ios);
        for (var i = 0; i < groupCount; i++) {
            var group = this._dataSource.groupAtIndex(i);
            if (group.name == name) {
                return group;
            }
        }
        return null;
    };
    RadDataForm.prototype.onGroupTitleStylePropertyChanged = function (data) {
        if (!this._ios || !this._initialized) {
            return;
        }
        this.reload();
    };
    RadDataForm.prototype._onGroupLayoutPropertyChanged = function (data, group) {
        if (!this._ios || !this._initialized) {
            return;
        }
        this._updateLayout(group);
    };
    RadDataForm.prototype.onPropertyPropertyChanged = function (data) {
        if (!this._ios || !this._initialized) {
            return;
        }
        var property = data.object;
        if (!property || !property.ios) {
            this.reload();
            return;
        }
        var nativeProperty = property.ios;
        switch (data.propertyName) {
            case "readOnly":
                this.ios.updateEditorForProperty(nativeProperty);
                break;
            case "hintText":
            case "hidden":
            case "index":
            case "displayName":
            case "valuesProvider":
            case "editor":
                this.reload();
                break;
        }
    };
    RadDataForm.prototype._initDataForm = function () {
        if (!this.source || !this._dataSource) {
            console.log("WARNING: No source defined");
            return;
        }
        //go through all groups / entity properties
        if (this.groups) {
            for (var i = 0; i < this.groups.length; ++i) {
                var group = this.groups[i];
                var propertyNames = NSMutableArray.alloc().initWithCapacity(group.properties.length);
                if (group.properties) {
                    for (var j = 0; j < group.properties.length; ++j) {
                        var entityProperty = group.properties[j];
                        propertyNames.addObject(entityProperty.name);
                    }
                }
                this._dataSource.addGroupWithNamePropertyNames(group.name, propertyNames);
                // When a group is added to the data source, each property gets a new
                // value for its layoutInfo.row. Since we want the index defined in NS,
                // to have a bigger priority, we make the update after the property is
                // added to the data source.
                if (group.properties) {
                    for (var j = 0; j < group.properties.length; ++j) {
                        var entityProperty = group.properties[j];
                        this._updateNativeProperty(entityProperty);
                    }
                }
                var nativeGroup = this.getNativeGroup(group.name);
                if (group.hidden) {
                    nativeGroup.hidden = true;
                }
                if (!group.titleStyle) {
                    group.titleStyle = new commonModule.GroupTitleStyle();
                }
                if (!group.layout) {
                    group.layout = new commonModule.DataFormStackLayout();
                }
                this._attachGroupChangeListener(group);
            }
        }
        if (this.properties) {
            for (var i = 0; i < this.properties.length; ++i) {
                var entityProperty = this.properties[i];
                this._updateNativeProperty(entityProperty);
            }
        }
        this._ios.dataSource = this._dataSource;
        this._initialized = true;
    };
    RadDataForm.prototype._attachPropertyChangeListener = function (property) {
        var that = new WeakRef(this);
        property.off(observableModule.Observable.propertyChangeEvent);
        property.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
            that.get().onPropertyPropertyChanged(propertyChangeData);
        });
    };
    RadDataForm.prototype._attachGroupChangeListener = function (group) {
        var that = new WeakRef(this);
        group.off(observableModule.Observable.propertyChangeEvent);
        group.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
            that.get().onGroupPropertyChanged(propertyChangeData);
        });
        group.titleStyle.off(observableModule.Observable.propertyChangeEvent);
        group.titleStyle.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
            that.get().onGroupTitleStylePropertyChanged(propertyChangeData);
        });
        group.layout.off(observableModule.Observable.propertyChangeEvent);
        group.layout.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
            that.get()._onGroupLayoutPropertyChanged(propertyChangeData, group);
        });
    };
    RadDataForm.prototype._createPropertyFromNative = function (nativeProperty) {
        var entityProperty = new EntityProperty();
        entityProperty.name = nativeProperty.name;
        entityProperty._linkPropertyWithNative(nativeProperty);
        return entityProperty;
    };
    RadDataForm.prototype._updateNativeProperty = function (entityProperty) {
        var nativeProperty = this._dataSource.propertyWithName(entityProperty.name);
        if (nativeProperty) {
            entityProperty._linkPropertyWithNative(nativeProperty);
        }
        else {
            console.log("Cannot create native TKEntityProperty for EntityProperty with 'name': " + entityProperty.name);
        }
    };
    RadDataForm.prototype._onSourcePropertyChanged = function (eventData) {
        if (eventData.newValue) {
            var objJSON = JSON.stringify(eventData.newValue);
            this._dataSource = TKDataFormEntityDataSource.alloc().initWithJSONStringRootItemKeyPath(objJSON, null);
            this._initDataForm();
        }
    };
    RadDataForm.prototype._onMetadataPropertyChanged = function (eventData) {
        if (eventData.newValue) {
            var objJSON = JSON.stringify(eventData.newValue);
            this._ios.setupWithJSONAnnotationsString(objJSON);
            this.reload();
        }
    };
    RadDataForm.prototype._onIsReadOnlyPropertyChanged = function (data) {
        this._ios.readOnly = data.newValue;
    };
    RadDataForm.prototype._onCommitModePropertyChanged = function (data) {
        if (data.newValue) {
            switch (commonModule.CommitMode[data.newValue]) {
                case commonModule.CommitMode.Immediate:
                    this._ios.commitMode = 0 /* Immediate */; //TKDataFormCommitMode
                    break;
                case commonModule.CommitMode.Manual:
                    this._ios.commitMode = 2 /* Manual */; //TKDataFormCommitMode
                    break;
                case commonModule.CommitMode.OnLostFocus:
                    this._ios.commitMode = 1 /* OnLostFocus */; //TKDataFormCommitMode
                    break;
            }
        }
    };
    RadDataForm.prototype._onValidationModePropertyChanged = function (data) {
        if (data.newValue) {
            switch (commonModule.ValidationMode[data.newValue]) {
                case commonModule.ValidationMode.Immediate:
                    this._ios.validationMode = 0 /* Immediate */; //TKDataFormValidationMode
                    break;
                case commonModule.ValidationMode.Manual:
                    this._ios.validationMode = 2 /* Manual */; //TKDataFormValidationMode
                    break;
                case commonModule.ValidationMode.OnLostFocus:
                    this._ios.validationMode = 1 /* OnLostFocus */; //TKDataFormValidationMode
                    break;
            }
        }
    };
    RadDataForm.prototype._onGroupsPropertyChanged = function (eventData) {
    };
    RadDataForm.prototype.commitAll = function () {
        if (this._ios) {
            this._ios.commit();
        }
    };
    RadDataForm.prototype.reload = function () {
        if (this._ios) {
            this._ios.reloadData();
        }
    };
    RadDataForm.prototype.hasValidationErrors = function () {
        if (this._ios) {
            return this._ios.hasValidationErrors();
        }
    };
    ////////////////////////////////////////////////////////////////////////////
    // Helpers
    RadDataForm.getFontWithProperties = function (fontName, size, style) {
        var font = null;
        var fontSize = !isNaN(+size) ? size : 17;
        if (fontName) {
            font = UIFont.fontWithNameSize(fontName, fontSize);
            if (!font) {
                console.log("WARNING: Cannot create font with given name: " + fontSize);
                return;
            }
        }
        if (!font && !isNaN(+size)) {
            font = UIFont.systemFontOfSize(fontSize);
        }
        if (style) {
            var traits = 0 /* ClassUnknown */;
            switch (commonModule.FontStyles[style]) {
                case commonModule.FontStyles.Bold:
                    traits = 2 /* TraitBold */;
                    break;
                case commonModule.FontStyles.Italic:
                    traits = 1 /* TraitItalic */;
                    break;
                case commonModule.FontStyles.BoldItalic:
                    traits = 2 /* TraitBold */ | 1 /* TraitItalic */;
                    break;
            }
            if (!font) {
                font = UIFont.systemFontOfSize(fontSize);
            }
            var newFont = UIFont.fontWithDescriptorSize(utils.ios.getter(font, font.fontDescriptor).fontDescriptorWithSymbolicTraits(traits), fontSize);
            if (newFont) {
                font = newFont;
            }
        }
        return font;
    };
    return RadDataForm;
}(commonModule.RadDataForm));
exports.RadDataForm = RadDataForm;
///////////////////////////////////////////////
var PropertyGroup = (function (_super) {
    __extends(PropertyGroup, _super);
    function PropertyGroup() {
        _super.call(this);
    }
    //todo: consider if these properties need handles at all    
    PropertyGroup.prototype.onNameChanged = function (data) {
    };
    PropertyGroup.prototype.onHiddenChanged = function (data) {
    };
    PropertyGroup.prototype.onCollapsibleChanged = function (data) {
    };
    PropertyGroup.prototype.onTitleStyleChanged = function (data) {
    };
    PropertyGroup.prototype.onPropertiesChanged = function (data) {
    };
    return PropertyGroup;
}(commonModule.PropertyGroup));
exports.PropertyGroup = PropertyGroup;
var EntityProperty = (function (_super) {
    __extends(EntityProperty, _super);
    function EntityProperty() {
        _super.call(this);
        this._shouldSkipEditorUpdate = false;
        this._indexIsColumn = false;
    }
    Object.defineProperty(EntityProperty.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    EntityProperty.prototype._linkPropertyWithNative = function (value) {
        this._ios = value;
        this._ios.pickersUseIndexValue = false;
        this._onNativeSet();
    };
    EntityProperty.prototype._updateNativeEditor = function (nativeEditor) {
        if (!this.editor) {
            this._createEditorFromNative(nativeEditor);
        }
        else {
            PropertyEditorHelper._linkEditorWithNative(this.editor, nativeEditor);
        }
    };
    EntityProperty.prototype._createEditorFromNative = function (nativeEditor) {
        var type = PropertyEditor._getNativeEditorType(nativeEditor);
        this._shouldSkipEditorUpdate = true;
        var propertyEditor = new PropertyEditor();
        propertyEditor.type = type;
        PropertyEditorHelper._linkEditorWithNative(propertyEditor, nativeEditor);
        this.editor = propertyEditor;
        this._shouldSkipEditorUpdate = false;
    };
    EntityProperty.prototype._onNativeSet = function () {
        this.updateNativeValidators(this.validators);
        this.updateNativeValuesProvider(this.valuesProvider);
        this.updateNativeAutoCompleteDisplayMode(this.autoCompleteDisplayMode);
        this.updateNativeDisplayName(this.displayName);
        this.updateNativeIndex(this.index);
        this.updateNativeColumnIndex(this.columnIndex);
        this.updateNativeHidden(this.hidden);
        this.updateNativeReadOnly(this.readOnly);
        this.updateNativeRequired(this.required);
        this.updateNativeHintText(this.hintText);
        this.updateNativeImageResource(this.imageResource);
        this.updateNativeEditorParams(this.editor);
        this.updateNativeEditor(this.editor);
    };
    EntityProperty.prototype.onEditorTypeChanged = function () {
        var newEditor = new PropertyEditor();
        newEditor.type = this.editor.type;
        newEditor.style = this.editor.style;
        newEditor.params = this.editor.params;
        this.editor = newEditor;
    };
    EntityProperty.prototype.updateNativeEditorParams = function (value) {
        if (!this._ios || !value || !value.params) {
            return;
        }
        var editorParams = value.params;
        if (editorParams.minimum && editorParams.maximum) {
            if (!isNaN(editorParams.minimum) && !isNaN(editorParams.maximum)) {
                this._ios.range = TKRange.rangeWithMinimumAndMaximum(editorParams.minimum, editorParams.maximum);
            }
        }
        if (editorParams.step && !isNaN(editorParams.step)) {
            this._ios.step = editorParams.step;
        }
    };
    EntityProperty.prototype.updateNativeEditor = function (value) {
        if (!this._ios || !value) {
            return;
        }
        if (value instanceof CustomPropertyEditor) {
            this._ios.editorClass = TKDataFormCustomEditor.class();
            return;
        }
        if (value.type == commonModule.EditorType.DatePicker) {
            this._ios.converter = new StringToDateConverter().ios;
        }
        else if (value.type == commonModule.EditorType.TimePicker) {
            this._ios.converter = new StringToTimeConverter().ios;
        }
        this._ios.editorClass = value.editorClass;
    };
    EntityProperty.prototype.updateNativeValidators = function (value) {
        if (!this._ios || !value) {
            return;
        }
        var validatorSet = NSMutableArray.new();
        for (var k = 0; k < value.length; k++) {
            var validatorBase = value[k];
            var aValidator = validatorBase.ios;
            validatorSet.addObject(aValidator);
        }
        this._ios.validators = validatorSet;
    };
    EntityProperty.prototype.updateNativeValuesProvider = function (value) {
        if (!this._ios || !value) {
            return;
        }
        if (!(value instanceof Array)) {
            value = value.split(',');
        }
        var nativeSource = NSMutableArray.new();
        for (var i = 0; i < value.length; i++) {
            var nativeValue = value[i];
            if (typeof nativeValue == "string") {
                nativeValue = nativeValue.trim();
            }
            nativeSource.addObject(nativeValue);
        }
        this._ios.valuesProvider = nativeSource;
        if (this.editor && this.editor.ios) {
            this.editor.ios.update();
        }
    };
    EntityProperty.prototype.updateNativeAutoCompleteDisplayMode = function (value) {
        if (!this._ios || !value) {
            return;
        }
        var nativeValue;
        switch (value.toLowerCase()) {
            case commonModule.AutoCompleteDisplayMode.Plain.toLowerCase():
                nativeValue = 0 /* Plain */;
                break;
            case commonModule.AutoCompleteDisplayMode.Tokens.toLowerCase():
                nativeValue = 1 /* Tokens */;
                break;
        }
        if (nativeValue) {
            this._ios.autoCompleteDisplayMode = nativeValue;
        }
        else {
            console.log("autoCompleteDisplayMode cannot be set to: " + value);
        }
    };
    EntityProperty.prototype.updateNativeImageResource = function (value) {
        if (!this._ios || value === undefined) {
            return;
        }
        if (value != null) {
            var image = UIImage.imageNamed(value);
            this._ios.image = image;
        }
        else {
            this._ios.image = null;
        }
    };
    EntityProperty.prototype.updateNativeDisplayName = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.displayName = value;
    };
    EntityProperty.prototype.updateNativeIndex = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.index = value;
        if (this._indexIsColumn) {
            this._ios.layoutInfo.column = value;
        }
        else {
            this._ios.layoutInfo.row = value;
        }
    };
    EntityProperty.prototype.updateNativeConverter = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.converter = TKDataFormConverterImplementation.new().initWithConverter(value);
        if (this.editor && this.editor.ios) {
            this.editor.ios.update();
        }
    };
    EntityProperty.prototype.updateNativeColumnIndex = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        if (!this._indexIsColumn) {
            this._ios.layoutInfo.column = value;
        }
    };
    EntityProperty.prototype.updateNativeHidden = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.hidden = value;
    };
    EntityProperty.prototype.updateNativeReadOnly = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.readOnly = value;
    };
    EntityProperty.prototype.updateNativeRequired = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.required = value;
    };
    EntityProperty.prototype.updateNativeHintText = function (value) {
        if (!this._ios || !value) {
            return;
        }
        this._ios.hintText = value;
    };
    return EntityProperty;
}(commonModule.EntityProperty));
exports.EntityProperty = EntityProperty;
//NOTE: currently we don't have specific class for every one of the editors since they don't have specific properties, with small exceptions
var PropertyEditor = (function (_super) {
    __extends(PropertyEditor, _super);
    function PropertyEditor() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PropertyEditor.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditor.prototype, "editorClass", {
        get: function () {
            return this._editorClass;
        },
        enumerable: true,
        configurable: true
    });
    PropertyEditor.prototype.onStylePropertyChanged = function (propertyName) {
        PropertyEditorHelper.applyStyleForProperty(this, propertyName);
    };
    PropertyEditor.prototype.onParamsChanged = function (data) {
        PropertyEditorHelper._applyParams(this);
    };
    PropertyEditor.prototype.onParamsPropertyChanged = function (propertyName) {
        PropertyEditorHelper._applyParams(this);
    };
    PropertyEditor.prototype.onTypeChanged = function (data) {
        this._updateEditorClass();
    };
    PropertyEditor.prototype._updateEditorClass = function () {
        if (this.type == null) {
            return;
        }
        switch (commonModule.EditorType[this.type]) {
            case commonModule.EditorType.Text:
                this._editorClass = TKDataFormTextFieldEditor.class();
                break;
            case commonModule.EditorType.MultilineText:
                this._editorClass = TKDataFormMultilineTextEditor.class();
                break;
            case commonModule.EditorType.Email:
                this._editorClass = TKDataFormEmailEditor.class();
                break;
            case commonModule.EditorType.Password:
                this._editorClass = TKDataFormPasswordEditor.class();
                break;
            case commonModule.EditorType.Phone:
                this._editorClass = TKDataFormPhoneEditor.class();
                break;
            case commonModule.EditorType.Decimal:
                this._editorClass = TKDataFormDecimalEditor.class();
                break;
            case commonModule.EditorType.Number:
                this._editorClass = TKDataFormNumberEditor.class();
                break;
            case commonModule.EditorType.Switch:
                this._editorClass = TKDataFormSwitchEditor.class();
                break;
            case commonModule.EditorType.Stepper:
                this._editorClass = TKDataFormStepperEditor.class();
                break;
            case commonModule.EditorType.Slider:
                this._editorClass = TKDataFormSliderEditor.class();
                break;
            case commonModule.EditorType.SegmentedEditor:
                this._editorClass = TKDataFormSegmentedEditor.class();
                break;
            case commonModule.EditorType.DatePicker:
                this._editorClass = TKDataFormDatePickerEditor.class();
                break;
            case commonModule.EditorType.TimePicker:
                this._editorClass = TKDataFormTimePickerEditor.class();
                break;
            case commonModule.EditorType.Picker:
                this._editorClass = TKDataFormPickerViewEditor.class();
                break;
            case commonModule.EditorType.List:
                this._editorClass = TKDataFormOptionsEditor.class();
                break;
            case commonModule.EditorType.AutoCompleteInline:
                this._editorClass = TKDataFormAutoCompleteInlineEditor.class();
                break;
            default:
                console.log("WARNING: Unsupported editor type: " + this.type);
        }
    };
    PropertyEditor._getNativeEditorType = function (nativeEditor) {
        if (nativeEditor instanceof TKDataFormMultilineTextEditor) {
            return commonModule.EditorType.MultilineText;
        }
        if (nativeEditor instanceof TKDataFormEmailEditor) {
            return commonModule.EditorType.Email;
        }
        if (nativeEditor instanceof TKDataFormPasswordEditor) {
            return commonModule.EditorType.Password;
        }
        if (nativeEditor instanceof TKDataFormPhoneEditor) {
            return commonModule.EditorType.Phone;
        }
        if (nativeEditor instanceof TKDataFormDecimalEditor) {
            return commonModule.EditorType.Decimal;
        }
        if (nativeEditor instanceof TKDataFormNumberEditor) {
            return commonModule.EditorType.Number;
        }
        if (nativeEditor instanceof TKDataFormSwitchEditor) {
            return commonModule.EditorType.Switch;
        }
        if (nativeEditor instanceof TKDataFormStepperEditor) {
            return commonModule.EditorType.Stepper;
        }
        if (nativeEditor instanceof TKDataFormSliderEditor) {
            return commonModule.EditorType.Slider;
        }
        if (nativeEditor instanceof TKDataFormSegmentedEditor) {
            return commonModule.EditorType.SegmentedEditor;
        }
        if (nativeEditor instanceof TKDataFormDatePickerEditor) {
            return commonModule.EditorType.DatePicker;
        }
        if (nativeEditor instanceof TKDataFormTimePickerEditor) {
            return commonModule.EditorType.TimePicker;
        }
        if (nativeEditor instanceof TKDataFormPickerViewEditor) {
            return commonModule.EditorType.Picker;
        }
        if (nativeEditor instanceof TKDataFormOptionsEditor) {
            return commonModule.EditorType.List;
        }
        if (nativeEditor instanceof TKDataFormAutoCompleteInlineEditor) {
            return commonModule.EditorType.AutoCompleteInline;
        }
        return commonModule.EditorType.Text;
    };
    return PropertyEditor;
}(commonModule.PropertyEditor));
exports.PropertyEditor = PropertyEditor;
var CustomPropertyEditor = (function (_super) {
    __extends(CustomPropertyEditor, _super);
    function CustomPropertyEditor() {
        _super.call(this);
        this._nativeDelegate = TKDataFormCustomEditorDelegateImplementation.new().initWithOwner(this);
    }
    Object.defineProperty(CustomPropertyEditor.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomPropertyEditor.prototype, "editorClass", {
        get: function () {
            return this._editorClass;
        },
        enumerable: true,
        configurable: true
    });
    CustomPropertyEditor.prototype.onStylePropertyChanged = function (propertyName) {
        PropertyEditorHelper.applyStyleForProperty(this, propertyName);
    };
    CustomPropertyEditor.prototype.onParamsChanged = function (data) {
        PropertyEditorHelper._applyParams(this);
    };
    CustomPropertyEditor.prototype.onParamsPropertyChanged = function (propertyName) {
        PropertyEditorHelper._applyParams(this);
    };
    CustomPropertyEditor.prototype.onTypeChanged = function (data) {
        console.log("WARNING: You can't change CustomPropertyEditor's type");
    };
    CustomPropertyEditor.prototype.notifyValueChanged = function () {
        if (this.ios) {
            this.ios.notifyValueChange();
        }
    };
    return CustomPropertyEditor;
}(commonModule.CustomPropertyEditor));
exports.CustomPropertyEditor = CustomPropertyEditor;
var PropertyEditorHelper = (function () {
    function PropertyEditorHelper() {
    }
    PropertyEditorHelper._linkEditorWithNative = function (editor, value) {
        if (editor instanceof CustomPropertyEditor) {
            editor._ios = value;
        }
        else {
            editor._ios = value;
        }
        if (!editor.style) {
            editor.style = new commonModule.PropertyEditorStyle();
        }
        if (!editor.params) {
            editor.params = new commonModule.PropertyEditorParams();
        }
        PropertyEditorHelper._onNativeSet(editor);
    };
    PropertyEditorHelper._onNativeSet = function (editor) {
        if (!editor.ios) {
            return;
        }
        if (editor instanceof CustomPropertyEditor) {
            editor.ios.delegate = editor._nativeDelegate;
        }
        else {
            if (!editor.type) {
                editor.type = PropertyEditor._getNativeEditorType(editor.ios);
            }
        }
        PropertyEditorHelper._applyParams(editor);
    };
    PropertyEditorHelper._updateLabelTextColor = function (editor, labelTextColor) {
        if (!editor.ios || !labelTextColor) {
            return;
        }
        editor.ios.textLabel.textColor = (new color_1.Color(labelTextColor)).ios;
    };
    PropertyEditorHelper._updateLabelFont = function (editor, labelFontName, labelTextSize, labelFontStyle) {
        if (!editor.ios || (!labelFontName && !labelFontStyle && !labelTextSize)) {
            return;
        }
        editor.ios.textLabel.font = RadDataForm.getFontWithProperties(labelFontName, labelTextSize, labelFontStyle);
    };
    PropertyEditorHelper._updateLabelOffset = function (editor, labelHorizontalOffset, labelVerticalOffset) {
        if (!editor.ios || (!labelHorizontalOffset && !labelVerticalOffset)) {
            return;
        }
        editor.ios.style.textLabelOffset = {
            horizontal: (isNaN(labelHorizontalOffset)) ? 0 : labelHorizontalOffset,
            vertical: (isNaN(labelVerticalOffset)) ? 0 : labelVerticalOffset
        };
    };
    PropertyEditorHelper._updateEditorOffset = function (editor, editorHorizontalOffset, editorVerticalOffset) {
        if (!editor.ios || (!editorHorizontalOffset && !editorVerticalOffset)) {
            return;
        }
        editor.ios.style.editorOffset = {
            horizontal: (isNaN(editorHorizontalOffset)) ? 0 : editorHorizontalOffset,
            vertical: (isNaN(editorVerticalOffset)) ? 0 : editorVerticalOffset
        };
    };
    PropertyEditorHelper._updateEditorFillColor = function (editor, editorFillColor) {
        if (!editor.ios || !editorFillColor) {
            return;
        }
        editor.ios.style.fill = TKSolidFill.solidFillWithColor((new color_1.Color(editorFillColor)).ios);
    };
    PropertyEditorHelper._updateEditorStroke = function (editor, editorStrokeColor, editorStrokeWidth) {
        if (!editor.ios || (!editorStrokeColor && !editorStrokeWidth)) {
            return;
        }
        var stroke = TKStroke.new();
        if (editorStrokeWidth) {
            stroke.width = editorStrokeWidth;
        }
        if (editorStrokeColor) {
            stroke.color = (new color_1.Color(editorStrokeColor)).ios;
        }
        editor.ios.style.stroke = stroke;
    };
    PropertyEditorHelper._updateLabelHidden = function (editor, labelHidden) {
        if (!editor.ios || labelHidden == null) {
            return;
        }
        editor.ios.style.textLabelDisplayMode = labelHidden ? 1 /* Hidden */ : 0 /* Show */;
    };
    PropertyEditorHelper._updateSeparatorColor = function (editor, separatorColor) {
        if (!editor.ios || !separatorColor) {
            return;
        }
        editor.ios.style.separatorColor = TKSolidFill.solidFillWithColor((new color_1.Color(separatorColor)).ios);
        editor.ios.setNeedsDisplay();
    };
    PropertyEditorHelper._applyParams = function (editor) {
        var editorParams = editor.params;
        if (!editorParams) {
            return;
        }
        if (editorParams.minimum && editorParams.maximum) {
            if (!isNaN(editorParams.minimum) && !isNaN(editorParams.maximum)) {
                PropertyEditorHelper._updateNativeRange(editor, TKRange.rangeWithMinimumAndMaximum(editorParams.minimum, editorParams.maximum));
            }
        }
        if (editorParams.step && !isNaN(editorParams.step)) {
            PropertyEditorHelper._updateNativeStep(editor, editorParams.step);
        }
    };
    PropertyEditorHelper._updateNativeRange = function (editor, range) {
        if (!editor.ios) {
            return;
        }
        if (editor.ios.property.range == range) {
            return;
        }
        editor.ios.property.range = range;
        editor.ios.update();
    };
    PropertyEditorHelper._updateNativeStep = function (editor, step) {
        if (!editor.ios) {
            return;
        }
        if (editor.ios.property.step == step) {
            return;
        }
        editor.ios.property.step = step;
        editor.ios.update();
    };
    PropertyEditorHelper.applyStyle = function (editor) {
        if (!editor.style || !editor.ios) {
            return;
        }
        PropertyEditorHelper._updateLabelTextColor(editor, editor.style.labelTextColor);
        PropertyEditorHelper._updateLabelFont(editor, editor.style.labelFontName, editor.style.labelTextSize, editor.style.labelFontStyle);
        PropertyEditorHelper._updateLabelOffset(editor, editor.style.labelHorizontalOffset, editor.style.labelVerticalOffset);
        PropertyEditorHelper._updateEditorOffset(editor, editor.style.editorHorizontalOffset, editor.style.editorVerticalOffset);
        PropertyEditorHelper._updateEditorFillColor(editor, editor.style.fillColor);
        PropertyEditorHelper._updateEditorStroke(editor, editor.style.strokeColor, editor.style.strokeWidth);
        PropertyEditorHelper._updateLabelHidden(editor, editor.style.labelHidden);
        PropertyEditorHelper._updateSeparatorColor(editor, editor.style.separatorColor);
        PropertyEditorHelper.setNeedsLayout(editor);
        PropertyEditorHelper.setNeedsDisplay(editor);
    };
    PropertyEditorHelper.setNeedsDisplay = function (editor) {
        if (editor.ios) {
            editor.ios.setNeedsDisplay();
        }
    };
    PropertyEditorHelper.setNeedsLayout = function (editor) {
        if (editor.ios) {
            editor.ios.setNeedsLayout();
        }
    };
    PropertyEditorHelper.applyStyleForProperty = function (editor, propertyName) {
        if (!editor.style || !editor.ios) {
            return;
        }
        switch (propertyName) {
            case "labelTextColor":
                PropertyEditorHelper._updateLabelTextColor(editor, editor.style.labelTextColor);
                break;
            case "labelFontName":
            case "labelFontStyle":
            case "labelTextSize":
                PropertyEditorHelper._updateLabelFont(editor, editor.style.labelFontName, editor.style.labelTextSize, editor.style.labelFontStyle);
                break;
            case "labelHorizontalOffset":
            case "labelVerticalOffset":
                PropertyEditorHelper._updateLabelOffset(editor, editor.style.labelHorizontalOffset, editor.style.labelVerticalOffset);
                PropertyEditorHelper.setNeedsLayout(editor);
                break;
            case "editorHorizontalOffset":
            case "editorVerticalOffset":
                PropertyEditorHelper._updateEditorOffset(editor, editor.style.editorHorizontalOffset, editor.style.editorVerticalOffset);
                PropertyEditorHelper.setNeedsLayout(editor);
                break;
            case "fillColor":
                PropertyEditorHelper._updateEditorFillColor(editor, editor.style.fillColor);
                PropertyEditorHelper.setNeedsDisplay(editor);
                break;
            case "strokeColor":
            case "strokeWidth":
                PropertyEditorHelper._updateEditorStroke(editor, editor.style.strokeColor, editor.style.strokeWidth);
                PropertyEditorHelper.setNeedsDisplay(editor);
                break;
            case "labelHidden":
                PropertyEditorHelper._updateLabelHidden(editor, editor.style.labelHidden);
                PropertyEditorHelper.setNeedsLayout(editor);
                break;
            case "separatorColor":
                PropertyEditorHelper._updateSeparatorColor(editor, editor.style.separatorColor);
                PropertyEditorHelper.setNeedsDisplay(editor);
                break;
        }
    };
    return PropertyEditorHelper;
}());
exports.PropertyEditorHelper = PropertyEditorHelper;
//////////////////////////////////////////////////////////////////////////////////////////////
// Validators
var MinimumLengthValidator = (function (_super) {
    __extends(MinimumLengthValidator, _super);
    function MinimumLengthValidator() {
        _super.call(this);
        this._ios = TKDataFormMinimumLengthValidator.new();
    }
    Object.defineProperty(MinimumLengthValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    MinimumLengthValidator.prototype.onLengthChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.ios.minimumLength = data.newValue;
        }
    };
    return MinimumLengthValidator;
}(commonModule.MinimumLengthValidator));
exports.MinimumLengthValidator = MinimumLengthValidator;
var MaximumLengthValidator = (function (_super) {
    __extends(MaximumLengthValidator, _super);
    function MaximumLengthValidator() {
        _super.call(this);
        this._ios = TKDataFormMaximumLengthValidator.new();
    }
    Object.defineProperty(MaximumLengthValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    MaximumLengthValidator.prototype.onLengthChanged = function (data) {
        if (!isNaN(data.newValue)) {
            this.ios.maximumLegth = data.newValue;
        }
    };
    return MaximumLengthValidator;
}(commonModule.MaximumLengthValidator));
exports.MaximumLengthValidator = MaximumLengthValidator;
var EmailValidator = (function (_super) {
    __extends(EmailValidator, _super);
    function EmailValidator() {
        _super.call(this);
        this._ios = TKDataFormEmailValidator.new();
    }
    Object.defineProperty(EmailValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return EmailValidator;
}(commonModule.EmailValidator));
exports.EmailValidator = EmailValidator;
var NonEmptyValidator = (function (_super) {
    __extends(NonEmptyValidator, _super);
    function NonEmptyValidator() {
        _super.call(this);
        this._ios = TKDataFormNonEmptyValidator.new();
    }
    Object.defineProperty(NonEmptyValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return NonEmptyValidator;
}(commonModule.NonEmptyValidator));
exports.NonEmptyValidator = NonEmptyValidator;
var RangeValidator = (function (_super) {
    __extends(RangeValidator, _super);
    function RangeValidator() {
        _super.call(this);
        this._ios = TKDataFormRangeValidator.new();
    }
    Object.defineProperty(RangeValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RangeValidator.prototype.onMinimumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            if (this.ios.range) {
                this.ios.range.minimum = data.newValue;
            }
            else {
                this.ios.range = TKRange.rangeWithMinimumAndMaximum(data.newValue, data.newValue * 2);
            }
        }
    };
    RangeValidator.prototype.onMaximumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            if (this.ios.range) {
                this.ios.range.maximum = data.newValue;
            }
            else {
                this.ios.range = TKRange.rangeWithMinimumAndMaximum(data.newValue / 2, data.newValue);
            }
        }
    };
    return RangeValidator;
}(commonModule.RangeValidator));
exports.RangeValidator = RangeValidator;
var PhoneValidator = (function (_super) {
    __extends(PhoneValidator, _super);
    function PhoneValidator() {
        _super.call(this);
        this._ios = TKDataFormPhoneValidator.new();
    }
    Object.defineProperty(PhoneValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return PhoneValidator;
}(commonModule.PhoneValidator));
exports.PhoneValidator = PhoneValidator;
//////////////////////////////////////////////////////////////////////////////////////////////
// Converters
var StringToDateConverter = (function (_super) {
    __extends(StringToDateConverter, _super);
    function StringToDateConverter() {
        _super.call(this);
        this._ios = TKDataFormStringToDateConverter.new();
    }
    Object.defineProperty(StringToDateConverter.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return StringToDateConverter;
}(commonModule.StringToDateConverter));
exports.StringToDateConverter = StringToDateConverter;
var StringToTimeConverter = (function (_super) {
    __extends(StringToTimeConverter, _super);
    function StringToTimeConverter() {
        _super.call(this);
        this._ios = TKDataFormStringToTimeConverter.new();
    }
    Object.defineProperty(StringToTimeConverter.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return StringToTimeConverter;
}(commonModule.StringToTimeConverter));
exports.StringToTimeConverter = StringToTimeConverter;
//# sourceMappingURL=dataform.js.map