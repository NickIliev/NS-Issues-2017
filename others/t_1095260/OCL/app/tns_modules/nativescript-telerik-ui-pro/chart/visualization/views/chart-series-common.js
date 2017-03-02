var bindable_1 = require("ui/core/bindable");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var initializersImpl = require("../../initializers/chart-initializers");
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var weakEvents = require("ui/core/weak-event-listener");
/**
 * Defines the selection modes of series.
 */
var SeriesSelectionMode;
(function (SeriesSelectionMode) {
    SeriesSelectionMode.None = "None"; // Series selection disabled.
    SeriesSelectionMode.NotSet = "NotSet"; // Series selection not set. Use the chart selection.
    SeriesSelectionMode.Series = "Series"; // Select the whole series.
    SeriesSelectionMode.DataPoint = "DataPoint"; // Select a single data point.
    SeriesSelectionMode.DataPointMultiple = "DataPointMultiple"; // Select multiple points.
})(SeriesSelectionMode = exports.SeriesSelectionMode || (exports.SeriesSelectionMode = {}));
/*
* Lists the possible categorical series combination modes.
*/
var SeriesStackMode;
(function (SeriesStackMode) {
    SeriesStackMode.None = "None";
    SeriesStackMode.Stack = "Stack";
    SeriesStackMode.Stack100 = "Stack100";
})(SeriesStackMode = exports.SeriesStackMode || (exports.SeriesStackMode = {}));
var ChartSeries = (function (_super) {
    __extends(ChartSeries, _super);
    function ChartSeries() {
        _super.call(this);
    }
    Object.defineProperty(ChartSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.ChartSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "selectionMode", {
        get: function () {
            return this._getValue(ChartSeries.selectionModeProperty);
        },
        set: function (value) {
            this._setValue(ChartSeries.selectionModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "labelStyle", {
        get: function () {
            return this._getValue(ChartSeries.labelStyleProperty);
        },
        set: function (value) {
            this._setValue(ChartSeries.labelStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "showLabels", {
        get: function () {
            return this._getValue(ChartSeries.showLabelsProperty);
        },
        set: function (value) {
            this._setValue(ChartSeries.showLabelsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    ChartSeries.prototype.updateOwnerChart = function () {
        if (this.owner) {
            this.owner.updateChart();
        }
    };
    Object.defineProperty(ChartSeries.prototype, "items", {
        get: function () {
            return this._getValue(ChartSeries.itemsProperty);
        },
        set: function (value) {
            this._setValue(ChartSeries.itemsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "valueProperty", {
        get: function () {
            return this._getValue(ChartSeries.valuePropertyProperty);
        },
        set: function (value) {
            this._setValue(ChartSeries.valuePropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "legendTitle", {
        get: function () {
            return this._getValue(ChartSeries.legendTitleProperty);
        },
        set: function (value) {
            this._setValue(ChartSeries.legendTitleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "ios", {
        get: function () {
            return undefined;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    ChartSeries.onLegendTitlePropertyChanged = function (data) {
        var series = data.object;
        series.onLegendTitleChanged(data);
    };
    ChartSeries.onItemsPropertyChanged = function (data) {
        var series = data.object;
        series.onItemsChanged(data);
    };
    ChartSeries.onValuePropertyPropertyChanged = function (data) {
        var series = data.object;
        series.onValuePropertyChanged(data);
    };
    ChartSeries.onShowLabelsPropertyChanged = function (data) {
        var series = data.object;
        series.onShowLabelsChanged(data);
    };
    ChartSeries.onLabelStylePropertyChanged = function (data) {
        var series = data.object;
        series.onLabelStyleChanged(data);
    };
    ChartSeries.onSelectionModePropertyChanged = function (data) {
        var series = data.object;
        series.onSelectionModeChanged(data);
    };
    ChartSeries.prototype.onSelectionModeChanged = function (data) {
        this.initializer.onSelectionModeChanged(data, this);
    };
    ChartSeries.prototype.onLabelStyleChanged = function (data) {
        this.initializer.onLabelStyleChanged(data, this);
    };
    ChartSeries.prototype.onShowLabelsChanged = function (data) {
        this.initializer.onShowLabelsChanged(data, this);
    };
    ChartSeries.prototype.onLegendTitleChanged = function (data) {
        this.initializer.onLegendTitleChanged(data, this);
    };
    ChartSeries.prototype.onItemsChanged = function (data) {
        this.initializer.onItemsChanged(data, this);
        if (data.oldValue instanceof observable_1.Observable) {
            weakEvents.removeWeakEventListener(data.oldValue, observable_array_1.ObservableArray.changeEvent, this.ItemsCollectionChangedInternal, this);
        }
        if (data.newValue instanceof observable_1.Observable) {
            weakEvents.addWeakEventListener(data.newValue, observable_array_1.ObservableArray.changeEvent, this.ItemsCollectionChangedInternal, this);
        }
    };
    ChartSeries.prototype.ItemsCollectionChangedInternal = function (data) {
        this.initializer.onItemsChanged(null, this);
    };
    ChartSeries.prototype.getItemAtIndex = function (index) {
        if (this.items.getItem) {
            return this.items.getItem(index);
        }
        return this.items[index];
    };
    ChartSeries.prototype.onValuePropertyChanged = function (data) {
        this.initializer.onValuePropertyChanged(data, this);
    };
    ChartSeries.selectionModeProperty = new dependencyObservable.Property("selectionMode", "ChartSeries", new proxy_1.PropertyMetadata(SeriesSelectionMode.NotSet, dependencyObservable.PropertyMetadataSettings.None, ChartSeries.onSelectionModePropertyChanged));
    ChartSeries.labelStyleProperty = new dependencyObservable.Property("labelStyle", "ChartSeries", new proxy_1.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None, ChartSeries.onLabelStylePropertyChanged));
    ChartSeries.showLabelsProperty = new dependencyObservable.Property("showLabels", "ChartSeries", new proxy_1.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None, ChartSeries.onShowLabelsPropertyChanged));
    ChartSeries.legendTitleProperty = new dependencyObservable.Property("legendTitle", "ChartSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ChartSeries.onLegendTitlePropertyChanged));
    ChartSeries.valuePropertyProperty = new dependencyObservable.Property("valueProperty", "ChartSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ChartSeries.onValuePropertyPropertyChanged));
    ChartSeries.itemsProperty = new dependencyObservable.Property("items", "ChartSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ChartSeries.onItemsPropertyChanged));
    return ChartSeries;
}(bindable_1.Bindable));
exports.ChartSeries = ChartSeries;
var CartesianSeries = (function (_super) {
    __extends(CartesianSeries, _super);
    function CartesianSeries() {
        _super.call(this);
    }
    Object.defineProperty(CartesianSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CartesianSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianSeries.prototype, "horizontalAxis", {
        get: function () {
            return this._getValue(CartesianSeries.horizontalAxisProperty);
        },
        set: function (value) {
            this._setValue(CartesianSeries.horizontalAxisProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartesianSeries.prototype, "verticalAxis", {
        get: function () {
            return this._getValue(CartesianSeries.verticalAxisProperty);
        },
        set: function (value) {
            this._setValue(CartesianSeries.verticalAxisProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CartesianSeries.onHorizontalAxisChanged = function (data) {
        var series = data.object;
        series.onHorizontalAxisChanged(data);
    };
    CartesianSeries.onVerticalAxisChanged = function (data) {
        var series = data.object;
        series.onVerticalAxisChanged(data);
    };
    CartesianSeries.prototype.onHorizontalAxisChanged = function (data) {
        this.updateAxisBindingContext(data);
        this.initializer.onHorizontalAxisChanged(data, this);
    };
    CartesianSeries.prototype.onVerticalAxisChanged = function (data) {
        this.updateAxisBindingContext(data);
        this.initializer.onVerticalAxisChanged(data, this);
    };
    CartesianSeries.prototype.updateAxisBindingContext = function (data) {
        var series = data.object;
        var newAxis = data.newValue;
        if (newAxis) {
            newAxis.bindingContext = series.bindingContext;
        }
        else {
            if (data.oldValue) {
                data.oldValue.bindingContext = null;
            }
        }
    };
    CartesianSeries.horizontalAxisProperty = new dependencyObservable.Property("horizontalAxis", "CartesianSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianSeries.onHorizontalAxisChanged));
    CartesianSeries.verticalAxisProperty = new dependencyObservable.Property("verticalAxis", "CartesianSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CartesianSeries.onVerticalAxisChanged));
    return CartesianSeries;
}(ChartSeries));
exports.CartesianSeries = CartesianSeries;
var CategoricalSeries = (function (_super) {
    __extends(CategoricalSeries, _super);
    function CategoricalSeries() {
        _super.call(this);
    }
    CategoricalSeries.onStackModePropertyChanged = function (data) {
        var series = data.object;
        series.onStackModeChanged(data);
    };
    CategoricalSeries.onCategoryPropertyChanged = function (data) {
        var series = data.object;
        series.onCategoryPropertyChanged(data);
    };
    Object.defineProperty(CategoricalSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CategoricalSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalSeries.prototype, "stackMode", {
        get: function () {
            return this._getValue(CategoricalSeries.stackModeProperty);
        },
        set: function (value) {
            this._setValue(CategoricalSeries.stackModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalSeries.prototype, "categoryProperty", {
        get: function () {
            return this._getValue(CategoricalSeries.categoryPropertyProperty);
        },
        set: function (value) {
            this._setValue(CategoricalSeries.categoryPropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    CategoricalSeries.prototype.onStackModeChanged = function (data) {
        this.initializer.onStackModePropertyChanged(data, this);
    };
    CategoricalSeries.prototype.onCategoryPropertyChanged = function (data) {
        this.initializer.onCategoryPropertyChanged(data, this);
    };
    CategoricalSeries.categoryPropertyProperty = new dependencyObservable.Property("categoryProperty", "CategoricalSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CategoricalSeries.onCategoryPropertyChanged));
    CategoricalSeries.stackModeProperty = new dependencyObservable.Property("stackMode", "CategoricalSeries", new proxy_1.PropertyMetadata(SeriesStackMode.None, dependencyObservable.PropertyMetadataSettings.AffectsLayout, CategoricalSeries.onStackModePropertyChanged));
    return CategoricalSeries;
}(CartesianSeries));
exports.CategoricalSeries = CategoricalSeries;
var BarSeries = (function (_super) {
    __extends(BarSeries, _super);
    function BarSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(BarSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.BarSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    return BarSeries;
}(CategoricalSeries));
exports.BarSeries = BarSeries;
var RangeBarSeries = (function (_super) {
    __extends(RangeBarSeries, _super);
    function RangeBarSeries() {
        _super.apply(this, arguments);
    }
    RangeBarSeries.onHighPropertyNamePropertyChanged = function (data) {
        var series = data.object;
        series.onHighPropertyNameChanged(data);
    };
    RangeBarSeries.onLowPropertyNamePropertyChanged = function (data) {
        var series = data.object;
        series.onLowPropertyNameChanged(data);
    };
    Object.defineProperty(RangeBarSeries.prototype, "lowPropertyName", {
        get: function () {
            return this._getValue(RangeBarSeries.lowPropertyNameProperty);
        },
        set: function (value) {
            this._setValue(RangeBarSeries.lowPropertyNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeBarSeries.prototype, "highPropertyName", {
        get: function () {
            return this._getValue(RangeBarSeries.highPropertyNameProperty);
        },
        set: function (value) {
            this._setValue(RangeBarSeries.highPropertyNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RangeBarSeries.prototype.onLowPropertyNameChanged = function (args) {
    };
    RangeBarSeries.prototype.onHighPropertyNameChanged = function (args) {
    };
    RangeBarSeries.highPropertyNameProperty = new dependencyObservable.Property("highPropertyName", "RangeBarSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RangeBarSeries.onHighPropertyNamePropertyChanged));
    RangeBarSeries.lowPropertyNameProperty = new dependencyObservable.Property("lowPropertyName", "RangeBarSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RangeBarSeries.onLowPropertyNamePropertyChanged));
    return RangeBarSeries;
}(CategoricalSeries));
exports.RangeBarSeries = RangeBarSeries;
var OhlcSeries = (function (_super) {
    __extends(OhlcSeries, _super);
    function OhlcSeries() {
        _super.apply(this, arguments);
    }
    OhlcSeries.onOpenPropertyNamePropertyChanged = function (data) {
        var series = data.object;
        series.onOpenPropertyNameChanged(data);
    };
    OhlcSeries.onClosePropertyNamePropertyChanged = function (data) {
        var series = data.object;
        series.onClosePropertyNameChanged(data);
    };
    OhlcSeries.onHighPropertyNamePropertyChanged = function (data) {
        var series = data.object;
        series.onHighPropertyNameChanged(data);
    };
    OhlcSeries.onLowPropertyNamePropertyChanged = function (data) {
        var series = data.object;
        series.onLowPropertyNameChanged(data);
    };
    Object.defineProperty(OhlcSeries.prototype, "lowPropertyName", {
        get: function () {
            return this._getValue(OhlcSeries.lowPropertyNameProperty);
        },
        set: function (value) {
            this._setValue(OhlcSeries.lowPropertyNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OhlcSeries.prototype, "highPropertyName", {
        get: function () {
            return this._getValue(OhlcSeries.highPropertyNameProperty);
        },
        set: function (value) {
            this._setValue(OhlcSeries.highPropertyNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OhlcSeries.prototype, "closePropertyName", {
        get: function () {
            return this._getValue(OhlcSeries.closePropertyNameProperty);
        },
        set: function (value) {
            this._setValue(OhlcSeries.closePropertyNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OhlcSeries.prototype, "openPropertyName", {
        get: function () {
            return this._getValue(OhlcSeries.openPropertyNameProperty);
        },
        set: function (value) {
            this._setValue(OhlcSeries.openPropertyNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    OhlcSeries.prototype.onLowPropertyNameChanged = function (args) {
    };
    OhlcSeries.prototype.onHighPropertyNameChanged = function (args) {
    };
    OhlcSeries.prototype.onClosePropertyNameChanged = function (args) {
    };
    OhlcSeries.prototype.onOpenPropertyNameChanged = function (args) {
    };
    OhlcSeries.openPropertyNameProperty = new dependencyObservable.Property("openPropertyName", "OhlcSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, OhlcSeries.onOpenPropertyNamePropertyChanged));
    OhlcSeries.closePropertyNameProperty = new dependencyObservable.Property("closePropertyName", "OhlcSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, OhlcSeries.onClosePropertyNamePropertyChanged));
    OhlcSeries.highPropertyNameProperty = new dependencyObservable.Property("highPropertyName", "OhlcSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, OhlcSeries.onHighPropertyNamePropertyChanged));
    OhlcSeries.lowPropertyNameProperty = new dependencyObservable.Property("lowPropertyName", "OhlcSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, OhlcSeries.onLowPropertyNamePropertyChanged));
    return OhlcSeries;
}(CategoricalSeries));
exports.OhlcSeries = OhlcSeries;
var CandleStickSeries = (function (_super) {
    __extends(CandleStickSeries, _super);
    function CandleStickSeries() {
        _super.call(this);
    }
    return CandleStickSeries;
}(OhlcSeries));
exports.CandleStickSeries = CandleStickSeries;
var BubbleSeries = (function (_super) {
    __extends(BubbleSeries, _super);
    function BubbleSeries() {
        _super.apply(this, arguments);
    }
    BubbleSeries.onBubbleScalePropertyChanged = function (data) {
        var series = data.object;
        series.onBubbleScaleChanged(data);
    };
    BubbleSeries.prototype.onBubbleScaleChanged = function (data) {
    };
    BubbleSeries.onBubbleSizePropertyPropertyChanged = function (data) {
        var series = data.object;
        series.onBubbleSizePropertyChanged(data);
    };
    BubbleSeries.prototype.onBubbleSizePropertyChanged = function (data) {
    };
    Object.defineProperty(BubbleSeries.prototype, "bubbleScale", {
        get: function () {
            return this._getValue(BubbleSeries.bubbleScaleProperty);
        },
        set: function (value) {
            this._setValue(BubbleSeries.bubbleScaleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BubbleSeries.prototype, "bubbleSizeProperty", {
        get: function () {
            return this._getValue(BubbleSeries.bubbleSizePropertyProperty);
        },
        set: function (value) {
            this._setValue(BubbleSeries.bubbleSizePropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    BubbleSeries.bubbleScaleProperty = new dependencyObservable.Property("bubbleScale", "BubbleSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, BubbleSeries.onBubbleScalePropertyChanged));
    BubbleSeries.bubbleSizePropertyProperty = new dependencyObservable.Property("bubbleSizeProperty", "BubbleSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, BubbleSeries.onBubbleSizePropertyPropertyChanged));
    return BubbleSeries;
}(CategoricalSeries));
exports.BubbleSeries = BubbleSeries;
var PieSeries = (function (_super) {
    __extends(PieSeries, _super);
    function PieSeries() {
        _super.call(this);
    }
    Object.defineProperty(PieSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.PieSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "ios", {
        get: function () {
            return undefined;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    PieSeries.onLegendLabelPropertyChanged = function (data) {
        var series = data.object;
        series.onLegendLabelChanged(data);
    };
    PieSeries.onExpandRadiusPropertyChanged = function (data) {
        var series = data.object;
        series.onExpandRadiusChanged(data);
    };
    PieSeries.onOuterRadiusFactorPropertyChanged = function (data) {
        var series = data.object;
        series.onOuterRadiusFactorChanged(data);
    };
    PieSeries.onStartAnglePropertyChanged = function (data) {
        var series = data.object;
        series.onStartAngleChanged(data);
    };
    PieSeries.onEndAnglePropertyChanged = function (data) {
        var series = data.object;
        series.onEndAngleChanged(data);
    };
    PieSeries.onShowPercentagePropertyChanged = function (data) {
        var series = data.object;
        series.onShowPercentageChanged(data);
    };
    PieSeries.prototype.onLegendLabelChanged = function (data) {
        this.initializer.onLabelPropertyChanged(data, this);
    };
    PieSeries.prototype.onExpandRadiusChanged = function (data) {
        this.initializer.onExpandRadiusChanged(data, this);
    };
    PieSeries.prototype.onOuterRadiusFactorChanged = function (data) {
        this.initializer.onOuterRadiusFactorChanged(data, this);
    };
    PieSeries.prototype.onStartAngleChanged = function (data) {
        this.initializer.onStartAngleChanged(data, this);
    };
    PieSeries.prototype.onEndAngleChanged = function (data) {
        this.initializer.onEndAngleChanged(data, this);
    };
    PieSeries.prototype.onShowPercentageChanged = function (data) {
        this.initializer.onShowPercentageChanged(data, this);
    };
    Object.defineProperty(PieSeries.prototype, "expandRadius", {
        get: function () {
            return this._getValue(PieSeries.expandRadiusProperty);
        },
        set: function (value) {
            this._setValue(PieSeries.expandRadiusProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "legendLabel", {
        get: function () {
            return this._getValue(PieSeries.legendLabelProperty);
        },
        set: function (value) {
            this._setValue(PieSeries.legendLabelProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "outerRadiusFactor", {
        get: function () {
            return this._getValue(PieSeries.outerRadiusFactorProperty);
        },
        set: function (value) {
            this._setValue(PieSeries.outerRadiusFactorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "startAngle", {
        get: function () {
            return this._getValue(PieSeries.startAngleProperty);
        },
        set: function (value) {
            this._setValue(PieSeries.startAngleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "endAngle", {
        get: function () {
            return this._getValue(PieSeries.endAngleProperty);
        },
        set: function (value) {
            this._setValue(PieSeries.endAngleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieSeries.prototype, "showPercentage", {
        get: function () {
            return this._getValue(PieSeries.showPercentageProperty);
        },
        set: function (value) {
            this._setValue(PieSeries.showPercentageProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PieSeries.legendLabelProperty = new dependencyObservable.Property("legendLabel", "PieSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PieSeries.onLegendLabelPropertyChanged));
    PieSeries.expandRadiusProperty = new dependencyObservable.Property("expandRadius", "PieSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PieSeries.onExpandRadiusPropertyChanged));
    PieSeries.outerRadiusFactorProperty = new dependencyObservable.Property("outerRadiusFactor", "PieSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PieSeries.onOuterRadiusFactorPropertyChanged));
    PieSeries.startAngleProperty = new dependencyObservable.Property("startAngle", "PieSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PieSeries.onStartAnglePropertyChanged));
    PieSeries.endAngleProperty = new dependencyObservable.Property("endAngle", "PieSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PieSeries.onEndAnglePropertyChanged));
    PieSeries.showPercentageProperty = new dependencyObservable.Property("showPercentage", "PieSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, PieSeries.onShowPercentagePropertyChanged));
    return PieSeries;
}(ChartSeries));
exports.PieSeries = PieSeries;
var DonutSeries = (function (_super) {
    __extends(DonutSeries, _super);
    function DonutSeries() {
        _super.apply(this, arguments);
    }
    DonutSeries.onInnerRadiusFactorPropertyChanged = function (data) {
        var series = data.object;
        series.onInnerRadiusFactorChanged(data);
    };
    Object.defineProperty(DonutSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.DonutSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    DonutSeries.prototype.onInnerRadiusFactorChanged = function (data) {
        this.initializer.onInnerRadiusFactorChanged(data, this);
    };
    Object.defineProperty(DonutSeries.prototype, "innerRadiusFactor", {
        get: function () {
            return this._getValue(DonutSeries.innerRadiusFactorProperty);
        },
        set: function (value) {
            this._setValue(DonutSeries.innerRadiusFactorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    DonutSeries.innerRadiusFactorProperty = new dependencyObservable.Property("innerRadiusFactor", "DonutSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, DonutSeries.onInnerRadiusFactorPropertyChanged));
    return DonutSeries;
}(PieSeries));
exports.DonutSeries = DonutSeries;
var ScatterSeries = (function (_super) {
    __extends(ScatterSeries, _super);
    function ScatterSeries() {
        _super.apply(this, arguments);
    }
    ScatterSeries.onXPropertyPropertyChanged = function (data) {
        var series = data.object;
        series.onXPropertyPropertyChanged(data);
    };
    ScatterSeries.onYPropertyPropertyChanged = function (data) {
        var series = data.object;
        series.onYPropertyPropertyChanged(data);
    };
    ScatterSeries.prototype.onXPropertyPropertyChanged = function (data) {
        this.initializer.onXPropertyChanged(data, this);
    };
    ScatterSeries.prototype.onYPropertyPropertyChanged = function (data) {
        this.initializer.onYPropertyChanged(data, this);
    };
    ScatterSeries.prototype.onValuePropertyChanged = function (data) {
        console.log("WARNING: ValueProperty is not used for Scatter series. Use XProperty & YPropety instead.");
    };
    Object.defineProperty(ScatterSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.ScatterSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterSeries.prototype, "xProperty", {
        get: function () {
            return this._getValue(ScatterSeries.xPropertyProperty);
        },
        set: function (value) {
            this._setValue(ScatterSeries.xPropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterSeries.prototype, "yProperty", {
        get: function () {
            return this._getValue(ScatterSeries.yPropertyProperty);
        },
        set: function (value) {
            this._setValue(ScatterSeries.yPropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScatterSeries.xPropertyProperty = new dependencyObservable.Property("xProperty", "ScatterSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ScatterSeries.onXPropertyPropertyChanged));
    ScatterSeries.yPropertyProperty = new dependencyObservable.Property("yProperty", "ScatterSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ScatterSeries.onYPropertyPropertyChanged));
    return ScatterSeries;
}(CartesianSeries));
exports.ScatterSeries = ScatterSeries;
var ScatterBubbleSeries = (function (_super) {
    __extends(ScatterBubbleSeries, _super);
    function ScatterBubbleSeries() {
        _super.apply(this, arguments);
    }
    ScatterBubbleSeries.onBubbleScalePropertyChanged = function (data) {
        var series = data.object;
        series.onBubbleScaleChanged(data);
    };
    ScatterBubbleSeries.prototype.onBubbleScaleChanged = function (data) {
        this.initializer.onBubbleScaleChanged(data, this);
    };
    ScatterBubbleSeries.onBubbleSizePropertyPropertyChanged = function (data) {
        var series = data.object;
        series.onBubbleSizePropertyChanged(data);
    };
    ScatterBubbleSeries.prototype.onBubbleSizePropertyChanged = function (data) {
        this.initializer.onBubbleSizePropertyChanged(data, this);
    };
    Object.defineProperty(ScatterBubbleSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.ScatterBubbleSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterBubbleSeries.prototype, "bubbleScale", {
        get: function () {
            return this._getValue(ScatterBubbleSeries.bubbleScaleProperty);
        },
        set: function (value) {
            this._setValue(ScatterBubbleSeries.bubbleScaleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScatterBubbleSeries.prototype, "bubbleSizeProperty", {
        get: function () {
            return this._getValue(ScatterBubbleSeries.bubbleSizePropertyProperty);
        },
        set: function (value) {
            this._setValue(ScatterBubbleSeries.bubbleSizePropertyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ScatterBubbleSeries.bubbleScaleProperty = new dependencyObservable.Property("bubbleScale", "ScatterBubbleSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScatterBubbleSeries.onBubbleScalePropertyChanged));
    ScatterBubbleSeries.bubbleSizePropertyProperty = new dependencyObservable.Property("bubbleSizeProperty", "ScatterBubbleSeries", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, ScatterBubbleSeries.onBubbleSizePropertyPropertyChanged));
    return ScatterBubbleSeries;
}(ScatterSeries));
exports.ScatterBubbleSeries = ScatterBubbleSeries;
//# sourceMappingURL=chart-series-common.js.map