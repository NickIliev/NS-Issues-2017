var bindable_1 = require("ui/core/bindable");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var CartesianChartAnnotation = (function (_super) {
    __extends(CartesianChartAnnotation, _super);
    function CartesianChartAnnotation() {
        _super.apply(this, arguments);
    }
    CartesianChartAnnotation.onAxisIdPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onAxisIdChanged(data);
    };
    CartesianChartAnnotation.onZPositionPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onZPositionChanged(data);
    };
    CartesianChartAnnotation.onHiddenPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onHiddenChanged(data);
    };
    CartesianChartAnnotation.onStrokeWidthPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onStrokeWidthChanged(data);
    };
    CartesianChartAnnotation.onStrokeColorPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onStrokeColorChanged(data);
    };
    CartesianChartAnnotation.onStrokeDashPatternPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onStrokeDashPatternChanged(data);
    };
    CartesianChartAnnotation.prototype.onAxisIdChanged = function (data) {
    };
    CartesianChartAnnotation.prototype.onZPositionChanged = function (data) {
    };
    CartesianChartAnnotation.prototype.onHiddenChanged = function (data) {
    };
    CartesianChartAnnotation.prototype.onStrokeWidthChanged = function (data) {
    };
    CartesianChartAnnotation.prototype.onStrokeColorChanged = function (data) {
    };
    CartesianChartAnnotation.prototype.onStrokeDashPatternChanged = function (data) {
    };
    CartesianChartAnnotation.prototype.onOwnerChanged = function () {
    };
    Object.defineProperty(CartesianChartAnnotation.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = value;
            this.onOwnerChanged();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianChartAnnotation.prototype, "axisId", {
        get: function () {
            return this._getValue(CartesianChartAnnotation.axisIdProperty);
        },
        set: function (value) {
            this._setValue(CartesianChartAnnotation.axisIdProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianChartAnnotation.prototype, "zPosition", {
        get: function () {
            return this._getValue(CartesianChartAnnotation.zPositionProperty);
        },
        set: function (value) {
            this._setValue(CartesianChartAnnotation.zPositionProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianChartAnnotation.prototype, "hidden", {
        get: function () {
            return this._getValue(CartesianChartAnnotation.hiddenProperty);
        },
        set: function (value) {
            this._setValue(CartesianChartAnnotation.hiddenProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianChartAnnotation.prototype, "strokeWidth", {
        get: function () {
            return this._getValue(CartesianChartAnnotation.strokeWidthProperty);
        },
        set: function (value) {
            this._setValue(CartesianChartAnnotation.strokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianChartAnnotation.prototype, "strokeColor", {
        get: function () {
            return this._getValue(CartesianChartAnnotation.strokeColorProperty);
        },
        set: function (value) {
            this._setValue(CartesianChartAnnotation.strokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianChartAnnotation.prototype, "strokeDashPattern", {
        get: function () {
            return this._getValue(CartesianChartAnnotation.strokeDashPatternProperty);
        },
        set: function (value) {
            this._setValue(CartesianChartAnnotation.strokeDashPatternProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CartesianChartAnnotation.axisIdProperty = new dependencyObservable.Property("axisId", "CartesianChartAnnotation", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianChartAnnotation.onAxisIdPropertyChanged));
    CartesianChartAnnotation.zPositionProperty = new dependencyObservable.Property("zPosition", "CartesianChartAnnotation", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianChartAnnotation.onZPositionPropertyChanged));
    CartesianChartAnnotation.hiddenProperty = new dependencyObservable.Property("hidden", "CartesianChartAnnotation", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianChartAnnotation.onHiddenPropertyChanged));
    CartesianChartAnnotation.strokeWidthProperty = new dependencyObservable.Property("strokeWidth", "CartesianChartAnnotation", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, CartesianChartAnnotation.onStrokeWidthPropertyChanged));
    CartesianChartAnnotation.strokeColorProperty = new dependencyObservable.Property("strokeColor", "CartesianChartAnnotation", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, CartesianChartAnnotation.onStrokeColorPropertyChanged));
    CartesianChartAnnotation.strokeDashPatternProperty = new dependencyObservable.Property("strokeDashPattern", "CartesianChartAnnotation", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, CartesianChartAnnotation.onStrokeDashPatternPropertyChanged));
    return CartesianChartAnnotation;
}(bindable_1.Bindable));
exports.CartesianChartAnnotation = CartesianChartAnnotation;
var ChartGridLineAnnotation = (function (_super) {
    __extends(ChartGridLineAnnotation, _super);
    function ChartGridLineAnnotation() {
        _super.apply(this, arguments);
    }
    ChartGridLineAnnotation.onValuePropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onValueChanged(data);
    };
    ChartGridLineAnnotation.prototype.onValueChanged = function (data) {
    };
    Object.defineProperty(ChartGridLineAnnotation.prototype, "value", {
        get: function () {
            return this._getValue(ChartGridLineAnnotation.valueProperty);
        },
        set: function (value) {
            this._setValue(ChartGridLineAnnotation.valueProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ChartGridLineAnnotation.valueProperty = new dependencyObservable.Property("value", "ChartGridLineAnnotation", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ChartGridLineAnnotation.onValuePropertyChanged));
    return ChartGridLineAnnotation;
}(CartesianChartAnnotation));
exports.ChartGridLineAnnotation = ChartGridLineAnnotation;
var ChartPlotBandAnnotation = (function (_super) {
    __extends(ChartPlotBandAnnotation, _super);
    function ChartPlotBandAnnotation() {
        _super.apply(this, arguments);
    }
    ChartPlotBandAnnotation.onMinValuePropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onMinValueChanged(data);
    };
    ChartPlotBandAnnotation.onMaxValuePropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onMaxValueChanged(data);
    };
    ChartPlotBandAnnotation.onFillColorPropertyChanged = function (data) {
        var annotation = data.object;
        annotation.onFillColorChanged(data);
    };
    ChartPlotBandAnnotation.prototype.onMinValueChanged = function (data) {
    };
    ChartPlotBandAnnotation.prototype.onMaxValueChanged = function (data) {
    };
    ChartPlotBandAnnotation.prototype.onFillColorChanged = function (data) {
    };
    Object.defineProperty(ChartPlotBandAnnotation.prototype, "minValue", {
        get: function () {
            return this._getValue(ChartPlotBandAnnotation.minValueProperty);
        },
        set: function (value) {
            this._setValue(ChartPlotBandAnnotation.minValueProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartPlotBandAnnotation.prototype, "maxValue", {
        get: function () {
            return this._getValue(ChartPlotBandAnnotation.maxValueProperty);
        },
        set: function (value) {
            this._setValue(ChartPlotBandAnnotation.maxValueProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartPlotBandAnnotation.prototype, "fillColor", {
        get: function () {
            return this._getValue(ChartPlotBandAnnotation.fillColorProperty);
        },
        set: function (value) {
            this._setValue(ChartPlotBandAnnotation.fillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ChartPlotBandAnnotation.minValueProperty = new dependencyObservable.Property("minValue", "ChartPlotBandAnnotation", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ChartPlotBandAnnotation.onMinValuePropertyChanged));
    ChartPlotBandAnnotation.maxValueProperty = new dependencyObservable.Property("maxValue", "ChartPlotBandAnnotation", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ChartPlotBandAnnotation.onMaxValuePropertyChanged));
    ChartPlotBandAnnotation.fillColorProperty = new dependencyObservable.Property("fillColor", "ChartPlotBandAnnotation", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsStyle, ChartPlotBandAnnotation.onFillColorPropertyChanged));
    return ChartPlotBandAnnotation;
}(CartesianChartAnnotation));
exports.ChartPlotBandAnnotation = ChartPlotBandAnnotation;
//# sourceMappingURL=chart-annotation-common.js.map