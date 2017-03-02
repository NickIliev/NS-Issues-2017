var view_1 = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var bindable_1 = require("ui/core/bindable");
var observable_array_1 = require("data/observable-array");
var gaugesInitializersImpl = require("./initializers/gauges-initializers");
var weakEvents = require("ui/core/weak-event-listener");
var ScaleLabelsLayoutMode;
(function (ScaleLabelsLayoutMode) {
    ScaleLabelsLayoutMode.Outer = "Outer";
    ScaleLabelsLayoutMode.Inner = "Inner";
})(ScaleLabelsLayoutMode = exports.ScaleLabelsLayoutMode || (exports.ScaleLabelsLayoutMode = {}));
var ScaleTicksLayoutMode;
(function (ScaleTicksLayoutMode) {
    ScaleTicksLayoutMode.Outer = "Outer";
    ScaleTicksLayoutMode.Inner = "Inner";
})(ScaleTicksLayoutMode = exports.ScaleTicksLayoutMode || (exports.ScaleTicksLayoutMode = {}));
var BarIndicatorCapMode;
(function (BarIndicatorCapMode) {
    BarIndicatorCapMode.Round = "Round";
    BarIndicatorCapMode.Edge = "Edge";
})(BarIndicatorCapMode = exports.BarIndicatorCapMode || (exports.BarIndicatorCapMode = {}));
/*
* Defines the known properties that are collections. This is used by the XML parser.
*/
var knownCollections;
(function (knownCollections) {
    knownCollections.scales = "scales";
    knownCollections.indicators = "indicators";
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
///////////////////////////////////////////////////
var RadGauge = (function (_super) {
    __extends(RadGauge, _super);
    function RadGauge() {
        _super.apply(this, arguments);
    }
    RadGauge.onScalesPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onScalesPropertyChanged(eventData);
    };
    RadGauge.onTitlePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onTitlePropertyChanged(eventData);
    };
    RadGauge.onSubtitlePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onSubtitlePropertyChanged(eventData);
    };
    RadGauge.onFillColorPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onFillColorPropertyChanged(eventData);
    };
    RadGauge.prototype._onScalesPropertyChanged = function (eventData) {
        if (!this.nativeObject) {
            return;
        }
        if (eventData.oldValue) {
            for (var i = 0; i < eventData.oldValue.length; i++) {
                var scale = eventData.oldValue.getItem(i);
                scale.owner = undefined;
            }
            weakEvents.removeWeakEventListener(eventData.oldValue, observable_array_1.ObservableArray.changeEvent, this.scalesCollectionChanged, this);
        }
        if (eventData.newValue) {
            weakEvents.addWeakEventListener(eventData.newValue, observable_array_1.ObservableArray.changeEvent, this.scalesCollectionChanged, this);
        }
        this.reloadScales();
    };
    RadGauge.prototype.scalesCollectionChanged = function (eventData) {
        this.reloadScales();
    };
    RadGauge.prototype.reloadScales = function () {
        this.nativeObject.removeAllScales();
        for (var i = 0; i < this.scales.length; i++) {
            var scale = this.scales.getItem(i);
            scale.owner = this;
            this.nativeObject.addScale(scale.nativeObject);
        }
    };
    RadGauge.onTitleStylePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onTitleStylePropertyChanged(eventData);
    };
    RadGauge.onSubtitleStylePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onSubtitleStylePropertyChanged(eventData);
    };
    RadGauge.prototype._onTitlePropertyChanged = function (eventData) {
        this.initializer.onTitleChanged(eventData, this);
    };
    RadGauge.prototype._onSubtitlePropertyChanged = function (eventData) {
        this.initializer.onSubtitleChanged(eventData, this);
    };
    RadGauge.prototype._onFillColorPropertyChanged = function (eventData) { };
    RadGauge.prototype._onTitleStylePropertyChanged = function (eventData) {
        this.initializer.onTitleStyleChanged(eventData, this);
    };
    RadGauge.prototype._onSubtitleStylePropertyChanged = function (eventData) {
        this.initializer.onSubtitleStyleChanged(eventData, this);
    };
    Object.defineProperty(RadGauge.prototype, "scales", {
        get: function () {
            return this._getValue(RadGauge.scalesProperty);
        },
        set: function (value) {
            this._setValue(RadGauge.scalesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadGauge.prototype, "title", {
        get: function () {
            return this._getValue(RadGauge.titleProperty);
        },
        set: function (value) {
            this._setValue(RadGauge.titleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadGauge.prototype, "subtitle", {
        get: function () {
            return this._getValue(RadGauge.subtitleProperty);
        },
        set: function (value) {
            this._setValue(RadGauge.subtitleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadGauge.prototype, "fillColor", {
        get: function () {
            return this._getValue(RadGauge.fillColorProperty);
        },
        set: function (value) {
            this._setValue(RadGauge.fillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadGauge.prototype, "titleStyle", {
        get: function () {
            return this._getValue(RadGauge.titleStyleProperty);
        },
        set: function (value) {
            this._setValue(RadGauge.titleStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadGauge.prototype, "subtitleStyle", {
        get: function () {
            return this._getValue(RadGauge.subtitleStyleProperty);
        },
        set: function (value) {
            this._setValue(RadGauge.subtitleStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadGauge.prototype, "nativeObject", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadGauge.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadGauge.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadGauge.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new gaugesInitializersImpl.RadGaugeValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    RadGauge.prototype._addArrayFromBuilder = function (name, value) {
        if (name == "scales") {
            this.scales = new observable_array_1.ObservableArray(value);
        }
    };
    RadGauge.scalesProperty = new dependencyObservable.Property("scales", "RadGauge", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadGauge.onScalesPropertyChanged));
    RadGauge.titleProperty = new dependencyObservable.Property("title", "RadGauge", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadGauge.onTitlePropertyChanged));
    RadGauge.subtitleProperty = new dependencyObservable.Property("subtitle", "RadGauge", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadGauge.onSubtitlePropertyChanged));
    RadGauge.fillColorProperty = new dependencyObservable.Property("fillColor", "RadGauge", new dependencyObservable.PropertyMetadata("white", dependencyObservable.PropertyMetadataSettings.AffectsStyle, RadGauge.onFillColorPropertyChanged));
    RadGauge.titleStyleProperty = new dependencyObservable.Property("titleStyle", "RadGauge", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadGauge.onTitleStylePropertyChanged));
    RadGauge.subtitleStyleProperty = new dependencyObservable.Property("subtitleStyle", "RadGauge", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadGauge.onSubtitleStylePropertyChanged));
    return RadGauge;
}(view_1.View));
exports.RadGauge = RadGauge;
////////////////////////////////////////////////////
var RadRadialGauge = (function (_super) {
    __extends(RadRadialGauge, _super);
    function RadRadialGauge() {
        _super.apply(this, arguments);
    }
    return RadRadialGauge;
}(RadGauge));
exports.RadRadialGauge = RadRadialGauge;
///////////////////////////////////////////////////
var GaugeScale = (function (_super) {
    __extends(GaugeScale, _super);
    function GaugeScale() {
        _super.apply(this, arguments);
    }
    GaugeScale.onIndicatorsPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onIndicatorsPropertyChanged(eventData);
    };
    GaugeScale.onMinimumPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMinimumPropertyChanged(eventData);
    };
    GaugeScale.onMaximumPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMaximumPropertyChanged(eventData);
    };
    GaugeScale.onScaleStylePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onScaleStylePropertyChanged(eventData);
    };
    GaugeScale.prototype._onIndicatorsPropertyChanged = function (eventData) {
        this.initializer.onIndicatorsChange(eventData, this);
    };
    GaugeScale.prototype._onMinimumPropertyChanged = function (eventData) {
        this.initializer.onMinimumChanged(eventData, this);
    };
    GaugeScale.prototype._onMaximumPropertyChanged = function (eventData) {
        this.initializer.onMaximumChanged(eventData, this);
    };
    GaugeScale.prototype._onScaleStylePropertyChanged = function (eventData) {
        this.initializer.onScaleStyleChanged(eventData, this);
    };
    Object.defineProperty(GaugeScale.prototype, "indicators", {
        get: function () {
            return this._getValue(GaugeScale.indicatorsProperty);
        },
        set: function (value) {
            this._setValue(GaugeScale.indicatorsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeScale.prototype, "minimum", {
        get: function () {
            return this._getValue(GaugeScale.minimumProperty);
        },
        set: function (value) {
            this._setValue(GaugeScale.minimumProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeScale.prototype, "maximum", {
        get: function () {
            return this._getValue(GaugeScale.maximumProperty);
        },
        set: function (value) {
            this._setValue(GaugeScale.maximumProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeScale.prototype, "style", {
        get: function () {
            return this._getValue(GaugeScale.styleProperty);
        },
        set: function (value) {
            this._setValue(GaugeScale.styleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    GaugeScale.prototype._addArrayFromBuilder = function (name, value) {
        if (name == "indicators") {
            this.indicators = new observable_array_1.ObservableArray(value);
        }
    };
    GaugeScale.prototype.indicatorsCollectionChanged = function (eventData) {
        this.initializer.reloadIndicators(this);
    };
    Object.defineProperty(GaugeScale.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeScale.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeScale.prototype, "nativeObject", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeScale.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new gaugesInitializersImpl.GaugeScaleValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeScale.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    GaugeScale.indicatorsProperty = new dependencyObservable.Property("indicators", "GaugeScale", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, GaugeScale.onIndicatorsPropertyChanged));
    GaugeScale.minimumProperty = new dependencyObservable.Property("minimum", "GaugeScale", new dependencyObservable.PropertyMetadata(0, dependencyObservable.PropertyMetadataSettings.AffectsStyle, GaugeScale.onMinimumPropertyChanged));
    GaugeScale.maximumProperty = new dependencyObservable.Property("maximum", "GaugeScale", new dependencyObservable.PropertyMetadata(100, dependencyObservable.PropertyMetadataSettings.AffectsStyle, GaugeScale.onMaximumPropertyChanged));
    GaugeScale.styleProperty = new dependencyObservable.Property("style", "GaugeScale", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, GaugeScale.onScaleStylePropertyChanged));
    return GaugeScale;
}(bindable_1.Bindable));
exports.GaugeScale = GaugeScale;
//////////////////////////////////////////////////////////
var RadialScale = (function (_super) {
    __extends(RadialScale, _super);
    function RadialScale() {
        _super.apply(this, arguments);
    }
    RadialScale.onStartAnglePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onStartAnglePropertyChanged(eventData);
    };
    RadialScale.onSweepAnglePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onSweepAnglePropertyChanged(eventData);
    };
    RadialScale.onRadiusPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onRadiusPropertyChanged(eventData);
    };
    RadialScale.prototype._onStartAnglePropertyChanged = function (eventData) { };
    RadialScale.prototype._onSweepAnglePropertyChanged = function (eventData) { };
    RadialScale.prototype._onRadiusPropertyChanged = function (eventData) { };
    Object.defineProperty(RadialScale.prototype, "startAngle", {
        get: function () {
            return this._getValue(RadialScale.startAngleProperty);
        },
        set: function (value) {
            this._setValue(RadialScale.startAngleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialScale.prototype, "sweepAngle", {
        get: function () {
            return this._getValue(RadialScale.sweepAngleProperty);
        },
        set: function (value) {
            this._setValue(RadialScale.sweepAngleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialScale.prototype, "radius", {
        get: function () {
            return this._getValue(RadialScale.radiusProperty);
        },
        set: function (value) {
            this._setValue(RadialScale.radiusProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadialScale.startAngleProperty = new dependencyObservable.Property("startAngle", "RadialScale", new dependencyObservable.PropertyMetadata(135, dependencyObservable.PropertyMetadataSettings.AffectsStyle, RadialScale.onStartAnglePropertyChanged));
    RadialScale.sweepAngleProperty = new dependencyObservable.Property("sweepAngle", "RadialScale", new dependencyObservable.PropertyMetadata(270, dependencyObservable.PropertyMetadataSettings.AffectsStyle, RadialScale.onSweepAnglePropertyChanged));
    RadialScale.radiusProperty = new dependencyObservable.Property("radius", "RadialScale", new dependencyObservable.PropertyMetadata(1, dependencyObservable.PropertyMetadataSettings.AffectsStyle, RadialScale.onRadiusPropertyChanged));
    return RadialScale;
}(GaugeScale));
exports.RadialScale = RadialScale;
/////////////////////////////////////////////////////////////
var GaugeIndicator = (function (_super) {
    __extends(GaugeIndicator, _super);
    function GaugeIndicator() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(GaugeIndicator.prototype, "initializer", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    GaugeIndicator.onIsAnimatedPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onIsAnimatedPropertyChanged(eventData);
    };
    GaugeIndicator.onAnimationDurationPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onAnimationDurationPropertyChanged(eventData);
    };
    GaugeIndicator.prototype._onIsAnimatedPropertyChanged = function (eventData) {
        this.initializer.onIsAnimatedChanged(eventData, this);
    };
    GaugeIndicator.prototype._onAnimationDurationPropertyChanged = function (eventData) {
        this.initializer.onAnimationDurationChanged(eventData, this);
    };
    Object.defineProperty(GaugeIndicator.prototype, "isAnimated", {
        get: function () {
            return this._getValue(GaugeIndicator.isAnimatedProperty);
        },
        set: function (value) {
            this._setValue(GaugeIndicator.isAnimatedProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeIndicator.prototype, "animationDuration", {
        get: function () {
            return this._getValue(GaugeIndicator.animationDurationProperty);
        },
        set: function (value) {
            this._setValue(GaugeIndicator.animationDurationProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeIndicator.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeIndicator.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeIndicator.prototype, "owner", {
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeIndicator.prototype, "nativeObject", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    GaugeIndicator.isAnimatedProperty = new dependencyObservable.Property("isAnimated", "GaugeIndicator", new dependencyObservable.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None, GaugeIndicator.onIsAnimatedPropertyChanged));
    GaugeIndicator.animationDurationProperty = new dependencyObservable.Property("animationDuration", "GaugeIndicator", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, GaugeIndicator.onAnimationDurationPropertyChanged));
    return GaugeIndicator;
}(bindable_1.Bindable));
exports.GaugeIndicator = GaugeIndicator;
///////////////////////////////////////////////////////////////
var RadialNeedle = (function (_super) {
    __extends(RadialNeedle, _super);
    function RadialNeedle() {
        _super.apply(this, arguments);
    }
    RadialNeedle.onNeedleStylePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onNeedleStylePropertyChanged(eventData);
    };
    RadialNeedle.onValuePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onValuePropertyChanged(eventData);
    };
    RadialNeedle.prototype._onNeedleStylePropertyChanged = function (eventData) {
        this.initializer.onNeedleStyleChanged(eventData, this);
    };
    RadialNeedle.prototype._onValuePropertyChanged = function (eventData) { };
    Object.defineProperty(RadialNeedle.prototype, "style", {
        get: function () {
            return this._getValue(RadialNeedle.styleProperty);
        },
        set: function (value) {
            this._setValue(RadialNeedle.styleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialNeedle.prototype, "value", {
        get: function () {
            return this._getValue(RadialNeedle.valueProperty);
        },
        set: function (value) {
            this._setValue(RadialNeedle.valueProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialNeedle.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new gaugesInitializersImpl.NeedleIndicatorValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    // private _initializer: gaugesInitializers.NeedleIndicatorValueMapper;
    RadialNeedle.styleProperty = new dependencyObservable.Property("style", "RadialNeedle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, RadialNeedle.onNeedleStylePropertyChanged));
    RadialNeedle.valueProperty = new dependencyObservable.Property("value", "RadialNeedle", new dependencyObservable.PropertyMetadata(0, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadialNeedle.onValuePropertyChanged));
    return RadialNeedle;
}(GaugeIndicator));
exports.RadialNeedle = RadialNeedle;
/////////////////////////////////////////////////////////////
var BarIndicator = (function (_super) {
    __extends(BarIndicator, _super);
    function BarIndicator() {
        _super.apply(this, arguments);
    }
    BarIndicator.onBarStylePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onBarStylePropertyChanged(eventData);
    };
    BarIndicator.onMinimumPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMinimumPropertyChanged(eventData);
    };
    BarIndicator.onMaximumPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMaximumPropertyChanged(eventData);
    };
    BarIndicator.onLocationPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onLocationPropertyChanged(eventData);
    };
    BarIndicator.onAnimationStartValueChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onAnimationStartValueChanged(eventData);
    };
    BarIndicator.prototype._onBarStylePropertyChanged = function (eventData) {
        this.initializer.onBarStyleChanged(eventData, this);
    };
    BarIndicator.prototype._onMinimumPropertyChanged = function (eventData) {
        this.initializer.onMinimumValueChanged(eventData, this);
    };
    BarIndicator.prototype._onMaximumPropertyChanged = function (eventData) {
        this.initializer.onMaximumValueChanged(eventData, this);
    };
    BarIndicator.prototype._onLocationPropertyChanged = function (eventData) {
        this.initializer.onLocationChanged(eventData, this);
    };
    BarIndicator.prototype._onAnimationStartValueChanged = function (eventData) { };
    Object.defineProperty(BarIndicator.prototype, "style", {
        get: function () {
            return this._getValue(BarIndicator.styleProperty);
        },
        set: function (value) {
            this._setValue(BarIndicator.styleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarIndicator.prototype, "minimum", {
        get: function () {
            return this._getValue(BarIndicator.minimumProperty);
        },
        set: function (value) {
            this._setValue(BarIndicator.minimumProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarIndicator.prototype, "maximum", {
        get: function () {
            return this._getValue(BarIndicator.maximumProperty);
        },
        set: function (value) {
            this._setValue(BarIndicator.maximumProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarIndicator.prototype, "location", {
        get: function () {
            return this._getValue(BarIndicator.locationProperty);
        },
        set: function (value) {
            this._setValue(BarIndicator.locationProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarIndicator.prototype, "animationStartValue", {
        get: function () {
            return this._getValue(BarIndicator.animationStartValueProperty);
        },
        set: function (value) {
            this._setValue(BarIndicator.animationStartValueProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarIndicator.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new gaugesInitializersImpl.BarIndicatorValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    // private _initializer: gaugesInitializers.BarIndicatorValueMapper;
    BarIndicator.styleProperty = new dependencyObservable.Property("style", "BarIndicator", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, BarIndicator.onBarStylePropertyChanged));
    BarIndicator.minimumProperty = new dependencyObservable.Property("minimum", "BarIndicator", new dependencyObservable.PropertyMetadata(0, dependencyObservable.PropertyMetadataSettings.None, BarIndicator.onMinimumPropertyChanged));
    BarIndicator.maximumProperty = new dependencyObservable.Property("maximum", "BarIndicator", new dependencyObservable.PropertyMetadata(0, dependencyObservable.PropertyMetadataSettings.None, BarIndicator.onMaximumPropertyChanged));
    BarIndicator.locationProperty = new dependencyObservable.Property("location", "BarIndicator", new dependencyObservable.PropertyMetadata(1, dependencyObservable.PropertyMetadataSettings.AffectsLayout, BarIndicator.onLocationPropertyChanged));
    BarIndicator.animationStartValueProperty = new dependencyObservable.Property("animationStartValue", "BarIndicator", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, BarIndicator.onAnimationStartValueChanged));
    return BarIndicator;
}(GaugeIndicator));
exports.BarIndicator = BarIndicator;
/////////////////////////////////////////////////////////////////
var RadialBarIndicator = (function (_super) {
    __extends(RadialBarIndicator, _super);
    function RadialBarIndicator() {
        _super.apply(this, arguments);
    }
    return RadialBarIndicator;
}(BarIndicator));
exports.RadialBarIndicator = RadialBarIndicator;
//////////////////////////STYLES
var GaugeStyleBase = (function (_super) {
    __extends(GaugeStyleBase, _super);
    function GaugeStyleBase() {
        _super.apply(this, arguments);
    }
    GaugeStyleBase.onFillColorPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onFillColorPropertyChanged(eventData);
    };
    GaugeStyleBase.onStrokeColorPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onStrokeColorPropertyChanged(eventData);
    };
    GaugeStyleBase.onStrokeWidthPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onStrokeWidthPropertyChanged(eventData);
    };
    // TODO implement common setting of stroke and fill because of repetative code;
    GaugeStyleBase.prototype._onFillColorPropertyChanged = function (eventData) { };
    GaugeStyleBase.prototype._onStrokeColorPropertyChanged = function (eventData) { };
    GaugeStyleBase.prototype._onStrokeWidthPropertyChanged = function (eventData) { };
    Object.defineProperty(GaugeStyleBase.prototype, "fillColor", {
        get: function () {
            return this._getValue(GaugeStyleBase.fillColorProperty);
        },
        set: function (value) {
            this._setValue(GaugeStyleBase.fillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeStyleBase.prototype, "strokeColor", {
        get: function () {
            return this._getValue(GaugeStyleBase.strokeColorProperty);
        },
        set: function (value) {
            this._setValue(GaugeStyleBase.strokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeStyleBase.prototype, "strokeWidth", {
        get: function () {
            return this._getValue(GaugeStyleBase.strokeWidthProperty);
        },
        set: function (value) {
            this._setValue(GaugeStyleBase.strokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GaugeStyleBase.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    GaugeStyleBase.prototype.shouldUpdateNativeObject = function () {
        if (!this.owner || !this.owner.nativeObject) {
            return false;
        }
        return true;
    };
    GaugeStyleBase.fillColorProperty = new dependencyObservable.Property("fillColor", "GaugeStyleBase", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, GaugeStyleBase.onFillColorPropertyChanged));
    GaugeStyleBase.strokeColorProperty = new dependencyObservable.Property("strokeColor", "GaugeStyleBase", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, GaugeStyleBase.onStrokeColorPropertyChanged));
    GaugeStyleBase.strokeWidthProperty = new dependencyObservable.Property("strokeWidth", "GaugeStyleBase", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, GaugeStyleBase.onStrokeWidthPropertyChanged));
    return GaugeStyleBase;
}(bindable_1.Bindable));
exports.GaugeStyleBase = GaugeStyleBase;
//////////////////////////////////////////////////////////////////
var TitleStyle = (function (_super) {
    __extends(TitleStyle, _super);
    function TitleStyle() {
        _super.apply(this, arguments);
    }
    TitleStyle.onTextSizePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onTextSizePropertyChanged(eventData);
    };
    TitleStyle.onTextColorPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onTextColorPropertyChanged(eventData);
    };
    TitleStyle.onHorizontalOffsetPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onHorizontalOffsetPropertyChanged(eventData);
    };
    TitleStyle.onVerticalOffsetPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onVerticalOffsetPropertyChanged(eventData);
    };
    TitleStyle.prototype._onTextSizePropertyChanged = function (eventData) { };
    TitleStyle.prototype._onTextColorPropertyChanged = function (eventData) { };
    TitleStyle.prototype._onHorizontalOffsetPropertyChanged = function (eventData) { };
    TitleStyle.prototype._onVerticalOffsetPropertyChanged = function (eventData) { };
    Object.defineProperty(TitleStyle.prototype, "textSize", {
        get: function () {
            return this._getValue(TitleStyle.textSizeProperty);
        },
        set: function (value) {
            this._setValue(TitleStyle.textSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleStyle.prototype, "textColor", {
        get: function () {
            return this._getValue(TitleStyle.textColorProperty);
        },
        set: function (value) {
            this._setValue(TitleStyle.textColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleStyle.prototype, "horizontalOffset", {
        get: function () {
            return this._getValue(TitleStyle.horizontalOffsetProperty);
        },
        set: function (value) {
            this._setValue(TitleStyle.horizontalOffsetProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleStyle.prototype, "verticalOffset", {
        get: function () {
            return this._getValue(TitleStyle.verticalOffsetProperty);
        },
        set: function (value) {
            this._setValue(TitleStyle.verticalOffsetProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    TitleStyle.textSizeProperty = new dependencyObservable.Property("textSize", "TitleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, TitleStyle.onTextSizePropertyChanged));
    TitleStyle.textColorProperty = new dependencyObservable.Property("textColor", "TitleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, TitleStyle.onTextColorPropertyChanged));
    TitleStyle.horizontalOffsetProperty = new dependencyObservable.Property("horizontalOffset", "TitleStyle", new dependencyObservable.PropertyMetadata(0, dependencyObservable.PropertyMetadataSettings.None, TitleStyle.onHorizontalOffsetPropertyChanged));
    TitleStyle.verticalOffsetProperty = new dependencyObservable.Property("verticalOffset", "TitleStyle", new dependencyObservable.PropertyMetadata(0, dependencyObservable.PropertyMetadataSettings.None, TitleStyle.onVerticalOffsetPropertyChanged));
    return TitleStyle;
}(GaugeStyleBase));
exports.TitleStyle = TitleStyle;
/////////////////////////////////////////////////////////////////////
var SubtitleStyle = (function (_super) {
    __extends(SubtitleStyle, _super);
    function SubtitleStyle() {
        _super.apply(this, arguments);
    }
    return SubtitleStyle;
}(TitleStyle));
exports.SubtitleStyle = SubtitleStyle;
var ScaleStyle = (function (_super) {
    __extends(ScaleStyle, _super);
    function ScaleStyle() {
        _super.apply(this, arguments);
    }
    ScaleStyle.onLineColorPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onLineColorPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onLineColorPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "lineColor", {
        get: function () {
            return this._getValue(ScaleStyle.lineColorProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.lineColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onLineThicknessPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onLineThicknessPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onLineThicknessPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "lineThickness", {
        get: function () {
            return this._getValue(ScaleStyle.lineThicknessProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.lineThicknessProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onTicksVisiblePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onTicksVisiblePropertyChanged(eventData);
    };
    ScaleStyle.prototype._onTicksVisiblePropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "ticksVisible", {
        get: function () {
            return this._getValue(ScaleStyle.ticksVisibleProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.ticksVisibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onMajorTicksCountPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMajorTicksCountPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onMajorTicksCountPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "majorTicksCount", {
        get: function () {
            return this._getValue(ScaleStyle.majorTicksCountProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.majorTicksCountProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onMinorTicksCountPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMinorTicksCountPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onMinorTicksCountPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "minorTicksCount", {
        get: function () {
            return this._getValue(ScaleStyle.minorTicksCountProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.minorTicksCountProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onТicksOffsetPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onТicksOffsetPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onТicksOffsetPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "ticksOffset", {
        get: function () {
            return this._getValue(ScaleStyle.ticksOffsetProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.ticksOffsetProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onTicksLayoutModePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onTicksLayoutModePropertyChanged(eventData);
    };
    ScaleStyle.prototype._onTicksLayoutModePropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "ticksLayoutMode", {
        get: function () {
            return this._getValue(ScaleStyle.ticksLayoutModeProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.ticksLayoutModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onMajorTicksWidthPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMajorTicksWidthPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onMajorTicksWidthPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "majorTicksWidth", {
        get: function () {
            return this._getValue(ScaleStyle.majorTicksWidthProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.majorTicksWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onMinorTicksWidthPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMinorTicksWidthPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onMinorTicksWidthPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "minorTicksWidth", {
        get: function () {
            return this._getValue(ScaleStyle.minorTicksWidthProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.minorTicksWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onMajorTicksLengthPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMajorTicksLengthPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onMajorTicksLengthPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "majorTicksLength", {
        get: function () {
            return this._getValue(ScaleStyle.majorTicksLengthProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.majorTicksLengthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onMinorTicksLengthPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMinorTicksLengthPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onMinorTicksLengthPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "minorTicksLength", {
        get: function () {
            return this._getValue(ScaleStyle.minorTicksLengthProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.minorTicksLengthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onMajorTicksStrokeColorPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMajorTicksStrokeColorPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onMajorTicksStrokeColorPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "majorTicksStrokeColor", {
        get: function () {
            return this._getValue(ScaleStyle.majorTicksStrokeColorProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.majorTicksStrokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onМinorTicksStrokeColorPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onМinorTicksStrokeColorPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onМinorTicksStrokeColorPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "minorTicksStrokeColor", {
        get: function () {
            return this._getValue(ScaleStyle.minorTicksStrokeColorProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.minorTicksStrokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onMajorTicksFillColorPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMajorTicksFillColorPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onMajorTicksFillColorPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "majorTicksFillColor", {
        get: function () {
            return this._getValue(ScaleStyle.majorTicksFillColorProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.majorTicksFillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onMinorTicksFillColorPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onMinorTicksFillColorPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onMinorTicksFillColorPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "minorTicksFillColor", {
        get: function () {
            return this._getValue(ScaleStyle.minorTicksFillColorProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.minorTicksFillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onМajorTicksStrokeWidthPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onМajorTicksStrokeWidthPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onМajorTicksStrokeWidthPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "majorTicksStrokeWidth", {
        get: function () {
            return this._getValue(ScaleStyle.majorTicksStrokeWidthProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.majorTicksStrokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onМinorTicksStrokeWidthPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onМinorTicksStrokeWidthPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onМinorTicksStrokeWidthPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "minorTicksStrokeWidth", {
        get: function () {
            return this._getValue(ScaleStyle.minorTicksStrokeWidthProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.minorTicksStrokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onLabelsVisiblePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onLabelsVisiblePropertyChanged(eventData);
    };
    ScaleStyle.prototype._onLabelsVisiblePropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "labelsVisible", {
        get: function () {
            return this._getValue(ScaleStyle.labelsVisibleProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.labelsVisibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onLabelsCountPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onLabelsCountPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onLabelsCountPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "labelsCount", {
        get: function () {
            return this._getValue(ScaleStyle.labelsCountProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.labelsCountProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onLabelsLayoutModePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onLabelsLayoutModePropertyChanged(eventData);
    };
    ScaleStyle.prototype._onLabelsLayoutModePropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "labelsLayoutMode", {
        get: function () {
            return this._getValue(ScaleStyle.labelsLayoutModeProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.labelsLayoutModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onLabelsOffsetPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onLabelsOffsetPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onLabelsOffsetPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "labelsOffset", {
        get: function () {
            return this._getValue(ScaleStyle.labelsOffsetProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.labelsOffsetProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onLabelsSizePropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onLabelsSizePropertyChanged(eventData);
    };
    ScaleStyle.prototype._onLabelsSizePropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "labelsSize", {
        get: function () {
            return this._getValue(ScaleStyle.labelsSizeProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.labelsSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.onLabelsColorPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onLabelsColorPropertyChanged(eventData);
    };
    ScaleStyle.prototype._onLabelsColorPropertyChanged = function (eventData) { };
    Object.defineProperty(ScaleStyle.prototype, "labelsColor", {
        get: function () {
            return this._getValue(ScaleStyle.labelsColorProperty);
        },
        set: function (value) {
            this._setValue(ScaleStyle.labelsColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScaleStyle.lineColorProperty = new dependencyObservable.Property("lineColor", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onLineColorPropertyChanged));
    ScaleStyle.lineThicknessProperty = new dependencyObservable.Property("lineThickness", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onLineThicknessPropertyChanged));
    ScaleStyle.ticksVisibleProperty = new dependencyObservable.Property("ticksVisible", "ScaleStyle", new dependencyObservable.PropertyMetadata(true, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onTicksVisiblePropertyChanged));
    ScaleStyle.majorTicksCountProperty = new dependencyObservable.Property("majorTicksCount", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onMajorTicksCountPropertyChanged));
    ScaleStyle.minorTicksCountProperty = new dependencyObservable.Property("minorTicksCount", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onMinorTicksCountPropertyChanged));
    ScaleStyle.ticksOffsetProperty = new dependencyObservable.Property("ticksOffset", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onТicksOffsetPropertyChanged));
    ScaleStyle.ticksLayoutModeProperty = new dependencyObservable.Property("ticksLayoutMode", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onTicksLayoutModePropertyChanged));
    ///////
    ScaleStyle.majorTicksWidthProperty = new dependencyObservable.Property("majorTicksWidth", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onMajorTicksWidthPropertyChanged));
    ///////
    ScaleStyle.minorTicksWidthProperty = new dependencyObservable.Property("minorTicksWidth", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onMinorTicksWidthPropertyChanged));
    /////////
    ScaleStyle.majorTicksLengthProperty = new dependencyObservable.Property("majorTicksLength", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onMajorTicksLengthPropertyChanged));
    ///////////
    ScaleStyle.minorTicksLengthProperty = new dependencyObservable.Property("minorTicksLength", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onMinorTicksLengthPropertyChanged));
    ////////
    ScaleStyle.majorTicksStrokeColorProperty = new dependencyObservable.Property("majorTicksStrokeColor", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onMajorTicksStrokeColorPropertyChanged));
    ////////
    ScaleStyle.minorTicksStrokeColorProperty = new dependencyObservable.Property("minorTicksStrokeColor", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onМinorTicksStrokeColorPropertyChanged));
    ///////////
    ScaleStyle.majorTicksFillColorProperty = new dependencyObservable.Property("majorTicksFillColor", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onMajorTicksFillColorPropertyChanged));
    ///////////
    ScaleStyle.minorTicksFillColorProperty = new dependencyObservable.Property("minorTicksFillColor", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onMinorTicksFillColorPropertyChanged));
    ///////
    ScaleStyle.majorTicksStrokeWidthProperty = new dependencyObservable.Property("majorTicksStrokeWidth", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onМajorTicksStrokeWidthPropertyChanged));
    ///////
    ScaleStyle.minorTicksStrokeWidthProperty = new dependencyObservable.Property("minorTicksStrokeWidth", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onМinorTicksStrokeWidthPropertyChanged));
    ScaleStyle.labelsVisibleProperty = new dependencyObservable.Property("labelsVisible", "ScaleStyle", new dependencyObservable.PropertyMetadata(true, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onLabelsVisiblePropertyChanged));
    ScaleStyle.labelsCountProperty = new dependencyObservable.Property("labelsCount", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onLabelsCountPropertyChanged));
    ScaleStyle.labelsLayoutModeProperty = new dependencyObservable.Property("labelsLayoutMode", "ScaleStyle", new dependencyObservable.PropertyMetadata("Inner", dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onLabelsLayoutModePropertyChanged));
    ScaleStyle.labelsOffsetProperty = new dependencyObservable.Property("labelsOffset", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onLabelsOffsetPropertyChanged));
    ///////////
    ScaleStyle.labelsSizeProperty = new dependencyObservable.Property("labelsSize", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onLabelsSizePropertyChanged));
    /////////
    ScaleStyle.labelsColorProperty = new dependencyObservable.Property("labelsColor", "ScaleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScaleStyle.onLabelsColorPropertyChanged));
    return ScaleStyle;
}(GaugeStyleBase));
exports.ScaleStyle = ScaleStyle;
//////////////////////////////////////////////////////
var IndicatorStyle = (function (_super) {
    __extends(IndicatorStyle, _super);
    function IndicatorStyle() {
        _super.apply(this, arguments);
    }
    return IndicatorStyle;
}(GaugeStyleBase));
exports.IndicatorStyle = IndicatorStyle;
//////////////////////////////////////////////////
var NeedleStyle = (function (_super) {
    __extends(NeedleStyle, _super);
    function NeedleStyle() {
        _super.apply(this, arguments);
    }
    NeedleStyle.onLengthPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onLengthPropertyChanged(eventData);
    };
    NeedleStyle.prototype._onLengthPropertyChanged = function (eventData) { };
    Object.defineProperty(NeedleStyle.prototype, "length", {
        get: function () {
            return this._getValue(NeedleStyle.lengthProperty);
        },
        set: function (value) {
            this._setValue(NeedleStyle.lengthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    NeedleStyle.onBottomWidthPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onBottomWidthPropertyChanged(eventData);
    };
    NeedleStyle.prototype._onBottomWidthPropertyChanged = function (eventData) { };
    Object.defineProperty(NeedleStyle.prototype, "bottomWidth", {
        get: function () {
            return this._getValue(NeedleStyle.bottomWidthProperty);
        },
        set: function (value) {
            this._setValue(NeedleStyle.bottomWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    NeedleStyle.onTopWidthPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onTopWidthPropertyChanged(eventData);
    };
    NeedleStyle.prototype._onTopWidthPropertyChanged = function (eventData) { };
    Object.defineProperty(NeedleStyle.prototype, "topWidth", {
        get: function () {
            return this._getValue(NeedleStyle.topWidthProperty);
        },
        set: function (value) {
            this._setValue(NeedleStyle.topWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    NeedleStyle.onCircleRadiusPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onCircleRadiusPropertyChanged(eventData);
    };
    NeedleStyle.prototype._onCircleRadiusPropertyChanged = function (eventData) { };
    Object.defineProperty(NeedleStyle.prototype, "circleRadius", {
        get: function () {
            return this._getValue(NeedleStyle.circleRadiusProperty);
        },
        set: function (value) {
            this._setValue(NeedleStyle.circleRadiusProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    NeedleStyle.onCircleInnerRadiusPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onCircleInnerRadiusPropertyChanged(eventData);
    };
    NeedleStyle.prototype._onCircleInnerRadiusPropertyChanged = function (eventData) { };
    Object.defineProperty(NeedleStyle.prototype, "circleInnerRadius", {
        get: function () {
            return this._getValue(NeedleStyle.circleInnerRadiusProperty);
        },
        set: function (value) {
            this._setValue(NeedleStyle.circleInnerRadiusProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    NeedleStyle.onOffsetPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onOffsetPropertyChanged(eventData);
    };
    NeedleStyle.prototype._onOffsetPropertyChanged = function (eventData) { };
    Object.defineProperty(NeedleStyle.prototype, "offset", {
        get: function () {
            return this._getValue(NeedleStyle.offsetProperty);
        },
        set: function (value) {
            this._setValue(NeedleStyle.offsetProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    NeedleStyle.onCircleFillColorPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onCircleFillColorPropertyChanged(eventData);
    };
    NeedleStyle.prototype._onCircleFillColorPropertyChanged = function (eventData) { };
    Object.defineProperty(NeedleStyle.prototype, "circleFillColor", {
        get: function () {
            return this._getValue(NeedleStyle.circleFillColorProperty);
        },
        set: function (value) {
            this._setValue(NeedleStyle.circleFillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    NeedleStyle.onCircleStrokeColorPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onCircleStrokeColorPropertyChanged(eventData);
    };
    NeedleStyle.prototype._onCircleStrokeColorPropertyChanged = function (eventData) { };
    Object.defineProperty(NeedleStyle.prototype, "circleStrokeColor", {
        get: function () {
            return this._getValue(NeedleStyle.circleStrokeColorProperty);
        },
        set: function (value) {
            this._setValue(NeedleStyle.circleStrokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    NeedleStyle.onCircleStrokeWidthPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onCircleStrokeWidthPropertyChanged(eventData);
    };
    NeedleStyle.prototype._onCircleStrokeWidthPropertyChanged = function (eventData) { };
    Object.defineProperty(NeedleStyle.prototype, "circleStrokeWidth", {
        get: function () {
            return this._getValue(NeedleStyle.circleStrokeWidthProperty);
        },
        set: function (value) {
            this._setValue(NeedleStyle.circleStrokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    // private _owner: RadialNeedle;
    NeedleStyle.lengthProperty = new dependencyObservable.Property("length", "NeedleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, NeedleStyle.onLengthPropertyChanged));
    NeedleStyle.bottomWidthProperty = new dependencyObservable.Property("bottomWidth", "NeedleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, NeedleStyle.onBottomWidthPropertyChanged));
    NeedleStyle.topWidthProperty = new dependencyObservable.Property("topWidth", "NeedleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, NeedleStyle.onTopWidthPropertyChanged));
    NeedleStyle.circleRadiusProperty = new dependencyObservable.Property("circleRadius", "NeedleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, NeedleStyle.onCircleRadiusPropertyChanged));
    NeedleStyle.circleInnerRadiusProperty = new dependencyObservable.Property("circleInnerRadius", "NeedleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, NeedleStyle.onCircleInnerRadiusPropertyChanged));
    NeedleStyle.offsetProperty = new dependencyObservable.Property("offset", "NeedleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, NeedleStyle.onOffsetPropertyChanged));
    NeedleStyle.circleFillColorProperty = new dependencyObservable.Property("circleFillColor", "NeedleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, NeedleStyle.onCircleFillColorPropertyChanged));
    NeedleStyle.circleStrokeColorProperty = new dependencyObservable.Property("circleStrokeColor", "NeedleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, NeedleStyle.onCircleStrokeColorPropertyChanged));
    NeedleStyle.circleStrokeWidthProperty = new dependencyObservable.Property("circleStrokeWidth", "NeedleStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, NeedleStyle.onCircleStrokeWidthPropertyChanged));
    return NeedleStyle;
}(IndicatorStyle));
exports.NeedleStyle = NeedleStyle;
//////////////////////////////////////////////////////////////
var BarIndicatorStyle = (function (_super) {
    __extends(BarIndicatorStyle, _super);
    function BarIndicatorStyle() {
        _super.apply(this, arguments);
    }
    BarIndicatorStyle.onCapPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onCapPropertyChanged(eventData);
    };
    BarIndicatorStyle.prototype._onCapPropertyChanged = function (eventData) { };
    Object.defineProperty(BarIndicatorStyle.prototype, "cap", {
        get: function () {
            return this._getValue(BarIndicatorStyle.capProperty);
        },
        set: function (value) {
            this._setValue(BarIndicatorStyle.capProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    BarIndicatorStyle.onBarWidthPropertyChanged = function (eventData) {
        var classInstance = eventData.object;
        classInstance._onBarWidthPropertyChanged(eventData);
    };
    BarIndicatorStyle.prototype._onBarWidthPropertyChanged = function (eventData) { };
    Object.defineProperty(BarIndicatorStyle.prototype, "barWidth", {
        get: function () {
            return this._getValue(BarIndicatorStyle.barWidthProperty);
        },
        set: function (value) {
            this._setValue(BarIndicatorStyle.barWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    BarIndicatorStyle.capProperty = new dependencyObservable.Property("cap", "BarIndicatorStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, BarIndicatorStyle.onCapPropertyChanged));
    BarIndicatorStyle.barWidthProperty = new dependencyObservable.Property("barWidth", "BarIndicatorStyle", new dependencyObservable.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, BarIndicatorStyle.onBarWidthPropertyChanged));
    return BarIndicatorStyle;
}(IndicatorStyle));
exports.BarIndicatorStyle = BarIndicatorStyle;
//# sourceMappingURL=gauges-common.js.map