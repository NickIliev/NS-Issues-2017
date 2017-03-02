var bindable_1 = require("ui/core/bindable");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var RadCartesianChartGrid = (function (_super) {
    __extends(RadCartesianChartGrid, _super);
    function RadCartesianChartGrid() {
        _super.call(this);
    }
    Object.defineProperty(RadCartesianChartGrid.prototype, "owner", {
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
    RadCartesianChartGrid.prototype.applyGridStyle = function () {
    };
    RadCartesianChartGrid.prototype.onOwnerChanged = function () {
    };
    Object.defineProperty(RadCartesianChartGrid.prototype, "verticalStripLinesVisible", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.verticalStripLinesVisibleProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.verticalStripLinesVisibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "horizontalStripLinesVisible", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.horizontalStripLinesVisibleProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.horizontalStripLinesVisibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "verticalLinesVisible", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.verticalLinesVisibleProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.verticalLinesVisibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "horizontalLinesVisible", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.horizontalLinesVisibleProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.horizontalLinesVisibleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "horizontalStripLineColor", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.horizontalStripLineColorProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.horizontalStripLineColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "verticalStripLineColor", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.verticalStripLineColorProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.verticalStripLineColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "verticalStrokeWidth", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.verticalStrokeWidthProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.verticalStrokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "horizontalStrokeWidth", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.horizontalStrokeWidthProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.horizontalStrokeWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "verticalStrokeColor", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.verticalStrokeColorProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.verticalStrokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "horizontalStrokeColor", {
        get: function () {
            return this._getValue(RadCartesianChartGrid.horizontalStrokeColorProperty);
        },
        set: function (value) {
            this._setValue(RadCartesianChartGrid.horizontalStrokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCartesianChartGrid.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    RadCartesianChartGrid.horizontalStripLinesVisibleChanged = function (data) {
        var grid = data.object;
        grid.onHorizontalStripLinesVisibleChanged(data);
    };
    RadCartesianChartGrid.prototype.onHorizontalStripLinesVisibleChanged = function (data) {
    };
    RadCartesianChartGrid.verticalStripLinesVisibleChanged = function (data) {
        var grid = data.object;
        grid.onVerticalStripLinesVisibleChanged(data);
    };
    RadCartesianChartGrid.prototype.onVerticalStripLinesVisibleChanged = function (data) {
    };
    RadCartesianChartGrid.verticalLinesVisibleChanged = function (data) {
        var grid = data.object;
        grid.onVerticalLinesVisibleChanged(data);
    };
    RadCartesianChartGrid.prototype.onVerticalLinesVisibleChanged = function (data) {
    };
    RadCartesianChartGrid.horizontalLinesVisibleChanged = function (data) {
        var grid = data.object;
        grid.onHorizontalLinesVisibleChanged(data);
    };
    RadCartesianChartGrid.prototype.onHorizontalLinesVisibleChanged = function (data) {
    };
    RadCartesianChartGrid.verticalStrokeColorChanged = function (data) {
        var grid = data.object;
        grid.onVerticalStrokeColorChanged(data);
    };
    RadCartesianChartGrid.prototype.onVerticalStrokeColorChanged = function (data) {
    };
    RadCartesianChartGrid.horizontalStrokeColorChanged = function (data) {
        var grid = data.object;
        grid.onHorizontalStrokeColorChanged(data);
    };
    RadCartesianChartGrid.prototype.onHorizontalStrokeColorChanged = function (data) {
    };
    RadCartesianChartGrid.horizontalStrokeWidthChanged = function (data) {
        var grid = data.object;
        grid.onHorizontalStrokeWidthChanged(data);
    };
    RadCartesianChartGrid.prototype.onHorizontalStrokeWidthChanged = function (data) {
    };
    RadCartesianChartGrid.verticalStrokeWidthChanged = function (data) {
        var grid = data.object;
        grid.onVerticalStrokeWidthChanged(data);
    };
    RadCartesianChartGrid.prototype.onVerticalStrokeWidthChanged = function (data) {
    };
    RadCartesianChartGrid.verticalStripLineColorChanged = function (data) {
        var grid = data.object;
        grid.onVerticalStripLineColorChanged(data);
    };
    RadCartesianChartGrid.prototype.onVerticalStripLineColorChanged = function (data) {
    };
    RadCartesianChartGrid.horizontalStripLineColorChanged = function (data) {
        var grid = data.object;
        grid.onHorizontalStripLineColorChanged(data);
    };
    RadCartesianChartGrid.prototype.onHorizontalStripLineColorChanged = function (data) {
    };
    RadCartesianChartGrid.horizontalStrokeColorProperty = new dependencyObservable.Property("horizontalStrokeColor", "RadCartesianChartGrid", new proxy_1.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.horizontalStrokeColorChanged));
    RadCartesianChartGrid.verticalStrokeColorProperty = new dependencyObservable.Property("verticalStrokeColor", "RadCartesianChartGrid", new proxy_1.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.verticalStrokeColorChanged));
    RadCartesianChartGrid.horizontalStrokeWidthProperty = new dependencyObservable.Property("horizontalStrokeWidth", "RadCartesianChartGrid", new proxy_1.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.horizontalStrokeWidthChanged));
    RadCartesianChartGrid.verticalStrokeWidthProperty = new dependencyObservable.Property("verticalStrokeWidth", "RadCartesianChartGrid", new proxy_1.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.verticalStrokeWidthChanged));
    RadCartesianChartGrid.verticalStripLineColorProperty = new dependencyObservable.Property("verticalStripLineColor", "RadCartesianChartGrid", new proxy_1.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.verticalStripLineColorChanged));
    RadCartesianChartGrid.horizontalStripLineColorProperty = new dependencyObservable.Property("horizontalStripLineColor", "RadCartesianChartGrid", new proxy_1.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.horizontalStripLineColorChanged));
    RadCartesianChartGrid.verticalLinesVisibleProperty = new dependencyObservable.Property("verticalLinesVisible", "RadCartesianChartGrid", new proxy_1.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.verticalLinesVisibleChanged));
    RadCartesianChartGrid.horizontalLinesVisibleProperty = new dependencyObservable.Property("horizontalLinesVisible", "RadCartesianChartGrid", new proxy_1.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.horizontalLinesVisibleChanged));
    RadCartesianChartGrid.verticalStripLinesVisibleProperty = new dependencyObservable.Property("verticalStripLinesVisible", "RadCartesianChartGrid", new proxy_1.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.verticalStripLinesVisibleChanged));
    RadCartesianChartGrid.horizontalStripLinesVisibleProperty = new dependencyObservable.Property("horizontalStripLinesVisible", "RadCartesianChartGrid", new proxy_1.PropertyMetadata(undefined, undefined, RadCartesianChartGrid.horizontalStripLinesVisibleChanged));
    return RadCartesianChartGrid;
}(bindable_1.Bindable));
exports.RadCartesianChartGrid = RadCartesianChartGrid;
//# sourceMappingURL=chart-cartesian-chart-grid-common.js.map