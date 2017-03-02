var bindable_1 = require("ui/core/bindable");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var initializersImpl = require("../../initializers/chart-initializers");
/**
* Represents an axis in a Cartesian chart. This class is a base class for all
* axes that can be used within a RadCartesianChart instance.
*/
var CartesianAxis = (function (_super) {
    __extends(CartesianAxis, _super);
    function CartesianAxis() {
        _super.apply(this, arguments);
    }
    CartesianAxis.onLineColorPropertyChanged = function (data) {
        var axis = data.object;
        axis.onLineColorChanged(data);
    };
    /*
    * Called when the lineColor property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLineColorChanged = function (data) {
        this.initializer.onLineColorChanged(data, this);
    };
    CartesianAxis.onLineThicknessPropertyChanged = function (data) {
        var axis = data.object;
        axis.onLineThicknessChanged(data);
    };
    /*
    * Called when the lineThickness property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLineThicknessChanged = function (data) {
        this.initializer.onLineThicknessChanged(data, this);
    };
    CartesianAxis.onLineHiddenPropertyChanged = function (data) {
        var axis = data.object;
        axis.onLineHiddenChanged(data);
    };
    /*
    * Called when the lineHidden property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLineHiddenChanged = function (data) {
        this.initializer.onLineHiddenChanged(data, this);
    };
    CartesianAxis.onLabelTextColorPropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelTextColorChanged(data);
    };
    /*
    * Callen when the labelTextColor property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelTextColorChanged = function (data) {
        this.initializer.onLabelTextColorChanged(data, this);
    };
    CartesianAxis.onLabelSizePropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelSizeChanged(data);
    };
    /**
    * Called when the labelSize property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelSizeChanged = function (data) {
        this.initializer.onLabelSizeChanged(data, this);
    };
    CartesianAxis.onLabelFormatPropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelFormatChanged(data);
    };
    /**
    * Called when the labelFormat property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelFormatChanged = function (data) {
        this.initializer.onLabelFormatChanged(data, this);
    };
    CartesianAxis.onLabelMarginPropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelMarginChanged(data);
    };
    /**
    * Called when the labelMargin property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelMarginChanged = function (data) {
        this.initializer.onLabelMarginChanged(data, this);
    };
    CartesianAxis.onLabelRotationAnglePropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelRotationAngleChanged(data);
    };
    /**
    * Called when the labelRotationAngle property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelRotationAngleChanged = function (data) {
        this.initializer.onLabelRotationAngleChanged(data, this);
    };
    CartesianAxis.onLabelFitModePropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelFitModeChanged(data);
    };
    /**
    * Called when the labelFitMode property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelFitModeChanged = function (data) {
        this.initializer.onLabelFitModeChanged(data, this);
    };
    CartesianAxis.onLabelLayoutModePropertyChanged = function (data) {
        var axis = data.object;
        axis.onLabelLayoutModeChanged(data);
    };
    /**
    * Called when the labelLayoutMode property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onLabelLayoutModeChanged = function (data) {
        this.initializer.onLabelLayoutModeChanged(data, this);
    };
    CartesianAxis.onHorizontalLocationPropertyChanged = function (data) {
        var axis = data.object;
        axis.onHorizontalLocationChanged(data);
    };
    /**
    * Called when the horizontalLocation property changes.
    * @param data an object containing information about the change event.
    */
    CartesianAxis.prototype.onHorizontalLocationChanged = function (data) {
        this.initializer.onHorizontalLocationChanged(data, this);
    };
    CartesianAxis.onVerticalLocationPropertyChanged = function (data) {
        var axis = data.object;
        axis.onVerticalLocationChanged(data);
    };
    /**
    * Called when the verticalLocation property changes.
    */
    CartesianAxis.prototype.onVerticalLocationChanged = function (data) {
        this.initializer.onVerticalLocationChanged(data, this);
    };
    CartesianAxis.onAllowPanPropertyChanged = function (data) {
        var axis = data.object;
        axis.onAllowPanChanged(data);
    };
    /**
    * Called when the allowPan property changes.
    */
    CartesianAxis.prototype.onAllowPanChanged = function (data) {
        this.initializer.onAllowPanChanged(data, this);
    };
    CartesianAxis.onAllowZoomPropertyChanged = function (data) {
        var axis = data.object;
        axis.onAllowZoomChanged(data);
    };
    /**
    * Called when the allowZoom property changes.
    */
    CartesianAxis.prototype.onAllowZoomChanged = function (data) {
        this.initializer.onAllowZoomChanged(data, this);
    };
    CartesianAxis.onHiddenPropertyChanged = function (data) {
        var axis = data.object;
        axis.onHiddenChanged(data);
    };
    /**
    * Called when the hidden property changes.
    */
    CartesianAxis.prototype.onHiddenChanged = function (data) {
        this.initializer.onHiddenChanged(data, this);
    };
    Object.defineProperty(CartesianAxis.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CartesianAxisValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    CartesianAxis.prototype.update = function () {
        if (!this.owner) {
            return;
        }
        if (this.ios) {
            this.owner.updateChart();
        }
    };
    Object.defineProperty(CartesianAxis.prototype, "id", {
        get: function () {
            return this._getValue(CartesianAxis.idProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.idProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "lineHidden", {
        get: function () {
            return this._getValue(CartesianAxis.lineHiddenProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.lineHiddenProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "lineThickness", {
        get: function () {
            return this._getValue(CartesianAxis.lineThicknessProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.lineThicknessProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "lineColor", {
        get: function () {
            return this._getValue(CartesianAxis.lineColorProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.lineColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelTextColor", {
        get: function () {
            return this._getValue(CartesianAxis.labelTextColorProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelTextColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelSize", {
        get: function () {
            return this._getValue(CartesianAxis.labelSizeProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelMargin", {
        get: function () {
            return this._getValue(CartesianAxis.labelMarginProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelMarginProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelRotationAngle", {
        get: function () {
            return this._getValue(CartesianAxis.labelRotationAngleProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelRotationAngleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelFitMode", {
        get: function () {
            return this._getValue(CartesianAxis.labelFitModeProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelFitModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelLayoutMode", {
        get: function () {
            return this._getValue(CartesianAxis.labelLayoutModeProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelLayoutModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "labelFormat", {
        get: function () {
            return this._getValue(CartesianAxis.labelFormatProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.labelFormatProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "horizontalLocation", {
        get: function () {
            return this._getValue(CartesianAxis.horizontalLocationProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.horizontalLocationProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "verticalLocation", {
        get: function () {
            return this._getValue(CartesianAxis.verticalLocationProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.verticalLocationProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "allowPan", {
        get: function () {
            return this._getValue(CartesianAxis.allowPanProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.allowPanProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "allowZoom", {
        get: function () {
            return this._getValue(CartesianAxis.allowZoomProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.allowZoomProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianAxis.prototype, "hidden", {
        get: function () {
            return this._getValue(CartesianAxis.hiddenProperty);
        },
        set: function (value) {
            this._setValue(CartesianAxis.hiddenProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    /*
    * Identifies the lineColor dependency property.
    */
    CartesianAxis.idProperty = new dependencyObservable.Property("id", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle));
    /*
    * Identifies the lineColor dependency property.
    */
    CartesianAxis.lineColorProperty = new dependencyObservable.Property("lineColor", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLineColorPropertyChanged));
    /*
    * Identifies the lineThickness dependency property.
    */
    CartesianAxis.lineThicknessProperty = new dependencyObservable.Property("lineThickness", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLineThicknessPropertyChanged));
    /*
    * Identifies the lineHidden dependency property.
    */
    CartesianAxis.lineHiddenProperty = new dependencyObservable.Property("lineHidden", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLineHiddenPropertyChanged));
    /*
    * Identifies the labelTextColor dependency property.
    */
    CartesianAxis.labelTextColorProperty = new dependencyObservable.Property("labelTextColor", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelTextColorPropertyChanged));
    /**
    * Identifies the labelSize dependency property.
    */
    CartesianAxis.labelSizeProperty = new dependencyObservable.Property("labelSize", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelSizePropertyChanged));
    /**
    * Identifies labelFormat dependency property.
    */
    CartesianAxis.labelFormatProperty = new dependencyObservable.Property("labelFormat", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelFormatPropertyChanged));
    /**
    * Identifies the labelMargin dependency property.
    */
    CartesianAxis.labelMarginProperty = new dependencyObservable.Property("labelMargin", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelMarginPropertyChanged));
    /**
    * Identifies the labelRotationAngle dependency property.
    */
    CartesianAxis.labelRotationAngleProperty = new dependencyObservable.Property("labelRotationAngle", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelRotationAnglePropertyChanged));
    /**
    * Identifies the labelFitMode dependency property.
    */
    CartesianAxis.labelFitModeProperty = new dependencyObservable.Property("labelFitMode", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelFitModePropertyChanged));
    /**
    * Identifies the labelLayoutMode dependency property.
    */
    CartesianAxis.labelLayoutModeProperty = new dependencyObservable.Property("labelLayoutMode", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onLabelLayoutModePropertyChanged));
    /**
    * Identifies the horizontalLocation dependency property.
    */
    CartesianAxis.horizontalLocationProperty = new dependencyObservable.Property("horizontalLocation", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onHorizontalLocationPropertyChanged));
    /**
    * Identifies the verticalLocation dependency property.
    */
    CartesianAxis.verticalLocationProperty = new dependencyObservable.Property("verticalLocation", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onVerticalLocationPropertyChanged));
    /**
    * Identifies the allowPan dependency property.
    */
    CartesianAxis.allowPanProperty = new dependencyObservable.Property("allowPan", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onAllowPanPropertyChanged));
    /**
    * Identifies the allowZoom dependency property.
    */
    CartesianAxis.allowZoomProperty = new dependencyObservable.Property("allowZoom", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onAllowZoomPropertyChanged));
    /**
    * Identifies the hidden dependency property.
    */
    CartesianAxis.hiddenProperty = new dependencyObservable.Property("hidden", "CartesianAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianAxis.onHiddenPropertyChanged));
    return CartesianAxis;
}(bindable_1.Bindable));
exports.CartesianAxis = CartesianAxis;
var CategoricalAxis = (function (_super) {
    __extends(CategoricalAxis, _super);
    function CategoricalAxis() {
        _super.call(this);
    }
    CategoricalAxis.onMajorTickIntervalPropertyChanged = function (data) {
        var categoricalAxis = data.object;
        categoricalAxis.onMajorTickIntervalChanged(data);
    };
    CategoricalAxis.onPlotModePropertyChanged = function (data) {
        var categoricalAxis = data.object;
        categoricalAxis.onPlotModeChanged(data);
    };
    Object.defineProperty(CategoricalAxis.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CategoricalAxisValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalAxis.prototype, "majorTickInterval", {
        get: function () {
            return this._getValue(CategoricalAxis.majorTickIntervalProperty);
        },
        set: function (value) {
            this._setValue(CategoricalAxis.majorTickIntervalProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalAxis.prototype, "plotMode", {
        get: function () {
            return this._getValue(CategoricalAxis.plotModeProperty);
        },
        set: function (value) {
            this._setValue(CategoricalAxis.plotModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CategoricalAxis.prototype.onMajorTickIntervalChanged = function (data) {
        this.initializer.onMajorTickIntervalChanged(data, this);
    };
    CategoricalAxis.prototype.onPlotModeChanged = function (data) {
        this.initializer.onPlotModeChanged(data, this);
    };
    CategoricalAxis.majorTickIntervalProperty = new dependencyObservable.Property("majorTickInterval", "CategoricalAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CategoricalAxis.onMajorTickIntervalPropertyChanged));
    CategoricalAxis.plotModeProperty = new dependencyObservable.Property("plotMode", "CategoricalAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CategoricalAxis.onPlotModePropertyChanged));
    return CategoricalAxis;
}(CartesianAxis));
exports.CategoricalAxis = CategoricalAxis;
var LinearAxis = (function (_super) {
    __extends(LinearAxis, _super);
    function LinearAxis() {
        _super.apply(this, arguments);
    }
    LinearAxis.onMinimumPropertyChanged = function (data) {
        var axis = data.object;
        axis.onMinimumChanged(data);
    };
    LinearAxis.prototype.onMinimumChanged = function (data) {
    };
    LinearAxis.onMaximumPropertyChanged = function (data) {
        var axis = data.object;
        axis.onMaximumChanged(data);
    };
    LinearAxis.prototype.onMaximumChanged = function (data) {
    };
    LinearAxis.onMajorStepPropertyChanged = function (data) {
        var axis = data.object;
        axis.onMajorStepChanged(data);
    };
    LinearAxis.prototype.onMajorStepChanged = function (data) {
    };
    Object.defineProperty(LinearAxis.prototype, "majorStep", {
        get: function () {
            return this._getValue(LinearAxis.majorStepProperty);
        },
        set: function (value) {
            this._setValue(LinearAxis.majorStepProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinearAxis.prototype, "maximum", {
        get: function () {
            return this._getValue(LinearAxis.maximumProperty);
        },
        set: function (value) {
            this._setValue(LinearAxis.maximumProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinearAxis.prototype, "minimum", {
        get: function () {
            return this._getValue(LinearAxis.minimumProperty);
        },
        set: function (value) {
            this._setValue(LinearAxis.minimumProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    LinearAxis.majorStepProperty = new dependencyObservable.Property("majorStep", "LinearAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, LinearAxis.onMajorStepPropertyChanged));
    LinearAxis.minimumProperty = new dependencyObservable.Property("minimum", "LinearAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, LinearAxis.onMinimumPropertyChanged));
    LinearAxis.maximumProperty = new dependencyObservable.Property("maximum", "LinearAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, LinearAxis.onMaximumPropertyChanged));
    return LinearAxis;
}(CartesianAxis));
exports.LinearAxis = LinearAxis;
var DateTimeContinuousAxis = (function (_super) {
    __extends(DateTimeContinuousAxis, _super);
    function DateTimeContinuousAxis() {
        _super.call(this);
    }
    DateTimeContinuousAxis.onPlotModePropertyChanged = function (data) {
        var dateTimeAxis = data.object;
        dateTimeAxis.onPlotModeChanged(data);
    };
    DateTimeContinuousAxis.onDateFormatPropertyChanged = function (data) {
        var axis = data.object;
        axis.onDateFormatChanged(data);
    };
    DateTimeContinuousAxis.onSourceDateFormatPropertyChanged = function (data) {
        var axis = data.object;
        axis.onSourceDateFormatChanged(data);
    };
    DateTimeContinuousAxis.prototype.onPlotModeChanged = function (data) {
    };
    DateTimeContinuousAxis.prototype.onDateFormatChanged = function (data) {
    };
    DateTimeContinuousAxis.prototype.onSourceDateFormatChanged = function (data) {
    };
    Object.defineProperty(DateTimeContinuousAxis.prototype, "plotMode", {
        get: function () {
            return this._getValue(DateTimeContinuousAxis.plotModeProperty);
        },
        set: function (value) {
            this._setValue(DateTimeContinuousAxis.plotModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeContinuousAxis.prototype, "dateFormat", {
        get: function () {
            return this._getValue(DateTimeContinuousAxis.dateFormatProperty);
        },
        set: function (value) {
            this._setValue(DateTimeContinuousAxis.dateFormatProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeContinuousAxis.prototype, "sourceDateFormat", {
        get: function () {
            return this._getValue(DateTimeContinuousAxis.sourceDateFormatProperty);
        },
        set: function (value) {
            this._setValue(DateTimeContinuousAxis.sourceDateFormatProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DateTimeContinuousAxis.plotModeProperty = new dependencyObservable.Property("plotMode", "DateTimeContinuousAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, DateTimeContinuousAxis.onPlotModePropertyChanged));
    DateTimeContinuousAxis.dateFormatProperty = new dependencyObservable.Property("dateFormat", "DateTimeContinuousAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, DateTimeContinuousAxis.onDateFormatPropertyChanged));
    DateTimeContinuousAxis.sourceDateFormatProperty = new dependencyObservable.Property("sourceDateFormat", "DateTimeContinuousAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, DateTimeContinuousAxis.onSourceDateFormatPropertyChanged));
    return DateTimeContinuousAxis;
}(LinearAxis));
exports.DateTimeContinuousAxis = DateTimeContinuousAxis;
var DateTimeCategoricalAxis = (function (_super) {
    __extends(DateTimeCategoricalAxis, _super);
    function DateTimeCategoricalAxis() {
        _super.call(this);
    }
    DateTimeCategoricalAxis.onDateTimeComponentPropertyChanged = function (data) {
        var axis = data.object;
        axis.onDateTimeComponentChanged(data);
    };
    DateTimeCategoricalAxis.onDateFormatPropertyChanged = function (data) {
        var axis = data.object;
        axis.onDateFormatChanged(data);
    };
    DateTimeCategoricalAxis.prototype.onDateTimeComponentChanged = function (data) {
    };
    DateTimeCategoricalAxis.prototype.onDateFormatChanged = function (data) {
    };
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "dateTimeComponent", {
        get: function () {
            return this._getValue(DateTimeCategoricalAxis.dateTimeComponentProperty);
        },
        set: function (value) {
            this._setValue(DateTimeCategoricalAxis.dateTimeComponentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "dateFormat", {
        get: function () {
            return this._getValue(DateTimeCategoricalAxis.dateFormatProperty);
        },
        set: function (value) {
            this._setValue(DateTimeCategoricalAxis.dateFormatProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeCategoricalAxis.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    DateTimeCategoricalAxis.dateTimeComponentProperty = new dependencyObservable.Property("dateTimeComponent", "DateTimeCategoricalAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, DateTimeCategoricalAxis.onDateTimeComponentPropertyChanged));
    DateTimeCategoricalAxis.dateFormatProperty = new dependencyObservable.Property("dateFormat", "DateTimeCategoricalAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, DateTimeCategoricalAxis.onDateFormatPropertyChanged));
    return DateTimeCategoricalAxis;
}(CategoricalAxis));
exports.DateTimeCategoricalAxis = DateTimeCategoricalAxis;
var LogarithmicAxis = (function (_super) {
    __extends(LogarithmicAxis, _super);
    function LogarithmicAxis() {
        _super.call(this);
    }
    LogarithmicAxis.onExponentStepPropertyChanged = function (data) {
        var axis = data.object;
        axis.onExponentStepChanged(data);
    };
    LogarithmicAxis.onLogarithmBasePropertyChanged = function (data) {
        var axis = data.object;
        axis.onLogarithmBaseChanged(data);
    };
    LogarithmicAxis.prototype.onExponentStepChanged = function (data) {
    };
    LogarithmicAxis.prototype.onLogarithmBaseChanged = function (data) {
    };
    Object.defineProperty(LogarithmicAxis.prototype, "exponentStep", {
        get: function () {
            return this._getValue(LogarithmicAxis.exponentStepProperty);
        },
        set: function (value) {
            this._setValue(LogarithmicAxis.exponentStepProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogarithmicAxis.prototype, "logarithmBase", {
        get: function () {
            return this._getValue(LogarithmicAxis.logarithmBaseProperty);
        },
        set: function (value) {
            this._setValue(LogarithmicAxis.logarithmBaseProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogarithmicAxis.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogarithmicAxis.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    LogarithmicAxis.exponentStepProperty = new dependencyObservable.Property("exponentStep", "LogarithmicAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, LogarithmicAxis.onExponentStepPropertyChanged));
    LogarithmicAxis.logarithmBaseProperty = new dependencyObservable.Property("logarithmBase", "LogarithmicAxis", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, LogarithmicAxis.onLogarithmBasePropertyChanged));
    return LogarithmicAxis;
}(LinearAxis));
exports.LogarithmicAxis = LogarithmicAxis;
//# sourceMappingURL=chart-axis-common.js.map