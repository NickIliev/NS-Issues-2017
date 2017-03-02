var viewModule = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var weakEvents = require("ui/core/weak-event-listener");
var chart_public_enum_1 = require("./misc/chart-public-enum");
var initializersImpl = require("./initializers/chart-initializers");
var RadChartBase = (function (_super) {
    __extends(RadChartBase, _super);
    function RadChartBase() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(RadChartBase.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "androidView", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "rootLayout", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    RadChartBase.prototype.reloadPalettes = function () {
        if (this._initializer) {
            this._initializer.reloadPalettes(this);
        }
    };
    Object.defineProperty(RadChartBase.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.ChartBaseValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "legend", {
        get: function () {
            return this._getValue(RadChartBase.legendProperty);
        },
        set: function (value) {
            this._setValue(RadChartBase.legendProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "palettes", {
        get: function () {
            return this._getValue(RadChartBase.palettesProperty);
        },
        set: function (value) {
            this._setValue(RadChartBase.palettesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "series", {
        get: function () {
            return this._getValue(RadChartBase.seriesProperty);
        },
        set: function (value) {
            this._setValue(RadChartBase.seriesProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "annotations", {
        get: function () {
            return this._getValue(RadChartBase.annotationsProperty);
        },
        set: function (value) {
            this._setValue(RadChartBase.annotationsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "selectionMode", {
        get: function () {
            return this._getValue(RadChartBase.selectionModeProperty);
        },
        set: function (value) {
            this._setValue(RadChartBase.selectionModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "seriesSelectionMode", {
        get: function () {
            return this._getValue(RadChartBase.seriesSelectionModeProperty);
        },
        set: function (value) {
            this._setValue(RadChartBase.seriesSelectionModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadChartBase.prototype, "pointSelectionMode", {
        get: function () {
            return this._getValue(RadChartBase.pointSelectionModeProperty);
        },
        set: function (value) {
            this._setValue(RadChartBase.pointSelectionModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadChartBase.prototype.updateChart = function () {
    };
    RadChartBase.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "series") {
            this.series = new observable_array_1.ObservableArray(value);
        }
        else if (name === "palettes") {
            this.palettes = new observable_array_1.ObservableArray(value);
        }
        else if (name === "annotations") {
            this.annotations = new observable_array_1.ObservableArray(value);
        }
    };
    RadChartBase.prototype._onBindingContextChanged = function (oldValue, newValue) {
        _super.prototype._onBindingContextChanged.call(this, oldValue, newValue);
        if (this.series) {
            for (var i = 0; i < this.series.length; i++) {
                this.series.getItem(i).bindingContext = newValue;
                if (this.series.getItem(i).horizontalAxis) {
                    this.series.getItem(i).horizontalAxis.bindingContext = newValue;
                    ;
                }
                if (this.series.getItem(i).verticalAxis) {
                    this.series.getItem(i).verticalAxis.bindingContext = newValue;
                    ;
                }
            }
        }
    };
    RadChartBase.prototype.getAxixByID = function (axisID) {
        return null;
    };
    RadChartBase.onLegendPropertyChanged = function (data) {
        var chart = data.object;
        chart.onLegendChanged(data);
    };
    RadChartBase.prototype.onLegendChanged = function (data) {
        this.legend.updateLegendView(this);
        this.initializer.onLegendChanged(data, this);
    };
    RadChartBase.onPalettesPropertyChanged = function (data) {
        var chart = data.object;
        chart.onPalettesChanged(data);
    };
    RadChartBase.prototype.onPalettesChanged = function (data) {
        this.initializer.onPalettesChanged(data, this);
        if (data.oldValue instanceof observable_1.Observable) {
            weakEvents.removeWeakEventListener(data.oldValue, observable_array_1.ObservableArray.changeEvent, this.PalettesCollectionChangedInternal, this);
        }
        if (data.newValue instanceof observable_1.Observable) {
            weakEvents.addWeakEventListener(data.newValue, observable_array_1.ObservableArray.changeEvent, this.PalettesCollectionChangedInternal, this);
        }
    };
    RadChartBase.prototype.PalettesCollectionChangedInternal = function (data) {
        this.initializer.onPalettesChanged(data, this);
    };
    RadChartBase.onSeriesPropertyChanged = function (data) {
        var chartBase = data.object;
        chartBase.onSeriesChanged(data);
    };
    RadChartBase.prototype.onSeriesChanged = function (data) {
        this.initializer.onSeriesChanged(data, this);
        if (data.oldValue instanceof observable_1.Observable) {
            weakEvents.removeWeakEventListener(data.oldValue, observable_array_1.ObservableArray.changeEvent, this.SeriesCollectionChangedInternal, this);
        }
        if (data.newValue instanceof observable_1.Observable) {
            weakEvents.addWeakEventListener(data.newValue, observable_array_1.ObservableArray.changeEvent, this.SeriesCollectionChangedInternal, this);
        }
    };
    RadChartBase.prototype.SeriesCollectionChangedInternal = function (data) {
        this.initializer.onSeriesChanged(data, this);
    };
    RadChartBase.onAnnotationsPropertyChanged = function (data) {
        var chartBase = data.object;
        chartBase.onAnnotationsChanged(data);
    };
    RadChartBase.prototype.onAnnotationsChanged = function (data) {
        this.initializer.onAnnotationsChanged(data, this);
        if (data.oldValue instanceof observable_1.Observable) {
            weakEvents.removeWeakEventListener(data.oldValue, observable_array_1.ObservableArray.changeEvent, this.AnnotationsCollectionChangedInternal, this);
        }
        if (data.newValue instanceof observable_1.Observable) {
            weakEvents.addWeakEventListener(data.newValue, observable_array_1.ObservableArray.changeEvent, this.AnnotationsCollectionChangedInternal, this);
        }
    };
    RadChartBase.prototype.AnnotationsCollectionChangedInternal = function (data) {
        this.initializer.onAnnotationsChanged(data, this);
    };
    RadChartBase.onSelectionModePropertyChanged = function (data) {
        var chartBase = data.object;
        chartBase.onSelectionModeChanged(data);
    };
    RadChartBase.onSeriesSelectionModePropertyChanged = function (data) {
        var chartBase = data.object;
        chartBase.onSeriesSelectionModeChanged(data);
    };
    RadChartBase.onPointSelectionModePropertyChanged = function (data) {
        var chartBase = data.object;
        chartBase.onPointSelectionModeChanged(data);
    };
    RadChartBase.prototype.onSelectionModeChanged = function (data) {
    };
    RadChartBase.prototype.onSeriesSelectionModeChanged = function (data) {
    };
    RadChartBase.prototype.onPointSelectionModeChanged = function (data) {
    };
    RadChartBase.seriesSelectedEvent = "seriesSelected";
    RadChartBase.seriesDeselectedEvent = "seriesDeselected";
    RadChartBase.pointSelectedEvent = "pointSelected";
    RadChartBase.pointDeselectedEvent = "pointDeselected";
    RadChartBase.chartZoomedEvent = "chartZoomed";
    RadChartBase.chartPannedEvent = "chartPanned";
    RadChartBase.trackballTrackedSelectionEvent = "trackballTrackedSelection";
    RadChartBase.legendProperty = new dependencyObservable.Property("legend", "RadChartBase", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadChartBase.onLegendPropertyChanged));
    RadChartBase.seriesProperty = new dependencyObservable.Property("series", "RadChartBase", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadChartBase.onSeriesPropertyChanged));
    RadChartBase.palettesProperty = new dependencyObservable.Property("palettes", "RadChartBase", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadChartBase.onPalettesPropertyChanged));
    RadChartBase.annotationsProperty = new dependencyObservable.Property("annotations", "RadChartBase", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadChartBase.onAnnotationsPropertyChanged));
    RadChartBase.selectionModeProperty = new dependencyObservable.Property("selectionMode", "RadChartBase", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadChartBase.onSelectionModePropertyChanged));
    RadChartBase.seriesSelectionModeProperty = new dependencyObservable.Property("seriesSelectionMode", "RadChartBase", new proxy_1.PropertyMetadata(chart_public_enum_1.ChartSelectionMode.None, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadChartBase.onSeriesSelectionModePropertyChanged));
    RadChartBase.pointSelectionModeProperty = new dependencyObservable.Property("pointSelectionMode", "RadChartBase", new proxy_1.PropertyMetadata(chart_public_enum_1.ChartSelectionMode.None, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadChartBase.onPointSelectionModePropertyChanged));
    return RadChartBase;
}(viewModule.View));
exports.RadChartBase = RadChartBase;
var RadCartesianChart = (function (_super) {
    __extends(RadCartesianChart, _super);
    function RadCartesianChart() {
        _super.apply(this, arguments);
    }
    RadCartesianChart.onGridChanged = function (data) {
        var chart = data.object;
        chart.onGridChanged(data);
    };
    RadCartesianChart.prototype.onGridChanged = function (data) {
    };
    RadCartesianChart.onHorizontalAxisPropertyChanged = function (data) {
        var chart = data.object;
        chart.onHorizontalAxisChanged(data);
    };
    RadCartesianChart.onVerticalAxisPropertyChanged = function (data) {
        var chart = data.object;
        chart.onVerticalAxisChanged(data);
    };
    RadCartesianChart.onHorizontalZoomPropertyChanged = function (data) {
        var chart = data.object;
        chart.onHorizontalZoomChanged(data);
    };
    RadCartesianChart.onVerticalZoomPropertyChanged = function (data) {
        var chart = data.object;
        chart.onVerticalZoomChanged(data);
    };
    RadCartesianChart.onTrackballPropertyChanged = function (data) {
        var chart = data.object;
        chart.onTrackballChanged(data);
    };
    RadCartesianChart.prototype.onHorizontalAxisChanged = function (data) {
        this.updateAxisBindingContext(data);
    };
    RadCartesianChart.prototype.onVerticalAxisChanged = function (data) {
        this.updateAxisBindingContext(data);
    };
    RadCartesianChart.prototype.onHorizontalZoomChanged = function (data) {
    };
    RadCartesianChart.prototype.onVerticalZoomChanged = function (data) {
    };
    RadCartesianChart.prototype.onTrackballChanged = function (data) {
    };
    RadCartesianChart.prototype.updateAxisBindingContext = function (data) {
        var chart = data.object;
        if (data.newValue) {
            data.newValue.bindingContext = chart.bindingContext;
        }
        else {
            if (data.oldValue) {
                data.oldValue.bindingContext = null;
            }
        }
    };
    RadCartesianChart.prototype._onBindingContextChanged = function (oldValue, newValue) {
        _super.prototype._onBindingContextChanged.call(this, oldValue, newValue);
        if (this.horizontalAxis) {
            this.horizontalAxis.bindingContext = newValue;
            ;
        }
        if (this.verticalAxis) {
            this.verticalAxis.bindingContext = newValue;
            ;
        }
    };
    Object.defineProperty(RadCartesianChart.prototype, "grid", {
        get: function () {
            return this._getValue(RadCartesianChart.gridProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChart.gridProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "horizontalAxis", {
        get: function () {
            return this._getValue(RadCartesianChart.horizontalAxisProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChart.horizontalAxisProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "verticalAxis", {
        get: function () {
            return this._getValue(RadCartesianChart.verticalAxisProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChart.verticalAxisProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "horizontalZoom", {
        get: function () {
            return this._getValue(RadCartesianChart.horizontalZoomProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChart.horizontalZoomProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "verticalZoom", {
        get: function () {
            return this._getValue(RadCartesianChart.verticalZoomProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChart.verticalZoomProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChart.prototype, "trackball", {
        get: function () {
            return this._getValue(RadCartesianChart.trackballProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChart.trackballProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadCartesianChart.gridProperty = new dependencyObservable.Property("grid", "RadCartesianChart", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCartesianChart.onGridChanged));
    RadCartesianChart.horizontalAxisProperty = new dependencyObservable.Property("horizontalAxis", "RadCartesianChart", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCartesianChart.onHorizontalAxisPropertyChanged));
    RadCartesianChart.verticalAxisProperty = new dependencyObservable.Property("verticalAxis", "RadCartesianChart", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCartesianChart.onVerticalAxisPropertyChanged));
    RadCartesianChart.verticalZoomProperty = new dependencyObservable.Property("verticalZoom", "RadCartesianChart", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCartesianChart.onVerticalZoomPropertyChanged));
    RadCartesianChart.horizontalZoomProperty = new dependencyObservable.Property("horizontalZoom", "RadCartesianChart", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadCartesianChart.onHorizontalZoomPropertyChanged));
    RadCartesianChart.trackballProperty = new dependencyObservable.Property("trackball", "RadCartesianChart", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadCartesianChart.onTrackballPropertyChanged));
    return RadCartesianChart;
}(RadChartBase));
exports.RadCartesianChart = RadCartesianChart;
var RadPieChart = (function (_super) {
    __extends(RadPieChart, _super);
    function RadPieChart() {
        _super.call(this);
    }
    return RadPieChart;
}(RadChartBase));
exports.RadPieChart = RadPieChart;
//# sourceMappingURL=chart-common.js.map