var viewModule = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var chart_public_enum_1 = require("../../misc/chart-public-enum");
var RadLegendView = (function (_super) {
    __extends(RadLegendView, _super);
    function RadLegendView() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(RadLegendView.prototype, "position", {
        get: function () {
            return this._getValue(RadLegendView.positionProperty);
        },
        set: function (value) {
            this._setValue(RadLegendView.positionProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadLegendView.onPositionPropertyChanged = function (data) {
        var legend = data.object;
        legend.onPositionChanged(data);
    };
    RadLegendView.prototype.onPositionChanged = function (data) {
    };
    Object.defineProperty(RadLegendView.prototype, "offsetOrigin", {
        get: function () {
            return this._getValue(RadLegendView.offsetOriginProperty);
        },
        set: function (value) {
            this._setValue(RadLegendView.offsetOriginProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadLegendView.onOffsetOriginPropertyChanged = function (data) {
        var legend = data.object;
        legend.onOffsetOriginChanged(data);
    };
    RadLegendView.prototype.onOffsetOriginChanged = function (data) {
    };
    Object.defineProperty(RadLegendView.prototype, "horizontalOffset", {
        get: function () {
            return this._getValue(RadLegendView.horizontalOffsetProperty);
        },
        set: function (value) {
            this._setValue(RadLegendView.horizontalOffsetProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadLegendView.onHorizontalOffsetPropertyChanged = function (data) {
        var legend = data.object;
        legend.onHorizontalOffsetChanged(data);
    };
    RadLegendView.prototype.onHorizontalOffsetChanged = function (data) {
    };
    Object.defineProperty(RadLegendView.prototype, "verticalOffset", {
        get: function () {
            return this._getValue(RadLegendView.verticalOffsetProperty);
        },
        set: function (value) {
            this._setValue(RadLegendView.verticalOffsetProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadLegendView.onVerticalOffsetPropertyChanged = function (data) {
        var legend = data.object;
        legend.onVerticalOffsetChanged(data);
    };
    RadLegendView.prototype.onVerticalOffsetChanged = function (data) {
    };
    Object.defineProperty(RadLegendView.prototype, "title", {
        get: function () {
            return this._getValue(RadLegendView.titleProperty);
        },
        set: function (value) {
            this._setValue(RadLegendView.titleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RadLegendView.onTitlePropertyChanged = function (data) {
        var legend = data.object;
        legend.onTitleChanged(data);
    };
    RadLegendView.prototype.onTitleChanged = function (data) {
    };
    RadLegendView.prototype.updateLegendView = function (chartView) {
    };
    RadLegendView.positionProperty = new dependencyObservable.Property("position", "RadLegendView", new proxy_1.PropertyMetadata(chart_public_enum_1.ChartLegendPosition.Bottom, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadLegendView.onPositionPropertyChanged));
    RadLegendView.offsetOriginProperty = new dependencyObservable.Property("offsetOrigin", "RadLegendView", new proxy_1.PropertyMetadata(chart_public_enum_1.ChartLegendOffsetOrigin.TopLeft, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadLegendView.onOffsetOriginPropertyChanged));
    RadLegendView.horizontalOffsetProperty = new dependencyObservable.Property("horizontalOffset", "RadLegendView", new proxy_1.PropertyMetadata(0, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadLegendView.onHorizontalOffsetPropertyChanged));
    RadLegendView.verticalOffsetProperty = new dependencyObservable.Property("verticalOffset", "RadLegendView", new proxy_1.PropertyMetadata(0, dependencyObservable.PropertyMetadataSettings.AffectsLayout, RadLegendView.onVerticalOffsetPropertyChanged));
    RadLegendView.titleProperty = new dependencyObservable.Property("title", "RadLegendView", new proxy_1.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, RadLegendView.onTitlePropertyChanged));
    return RadLegendView;
}(viewModule.View));
exports.RadLegendView = RadLegendView;
//# sourceMappingURL=chart-legend-view-common.js.map