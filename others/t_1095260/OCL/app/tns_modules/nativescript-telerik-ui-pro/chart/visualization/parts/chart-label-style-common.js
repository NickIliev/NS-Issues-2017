var bindable_1 = require("ui/core/bindable");
var proxy_1 = require("ui/core/proxy");
var dependencyObservable = require("ui/core/dependency-observable");
var PointLabelStyle = (function (_super) {
    __extends(PointLabelStyle, _super);
    function PointLabelStyle() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PointLabelStyle.prototype, "textColor", {
        get: function () {
            return this._getValue(PointLabelStyle.textColorProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.textColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "strokeColor", {
        get: function () {
            return this._getValue(PointLabelStyle.strokeColorProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.strokeColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "fillColor", {
        get: function () {
            return this._getValue(PointLabelStyle.fillColorProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.fillColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "textSize", {
        get: function () {
            return this._getValue(PointLabelStyle.textSizeProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.textSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "margin", {
        get: function () {
            return this._getValue(PointLabelStyle.marginProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.marginProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "textFormat", {
        get: function () {
            return this._getValue(PointLabelStyle.textFormatProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.textFormatProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "fontName", {
        get: function () {
            return this._getValue(PointLabelStyle.fontNameProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.fontNameProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLabelStyle.prototype, "fontStyle", {
        get: function () {
            return this._getValue(PointLabelStyle.fontStyleProperty);
        },
        set: function (value) {
            this._setValue(PointLabelStyle.fontStyleProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PointLabelStyle.strokeColorProperty = new dependencyObservable.Property("strokeColor", "PointLabelStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.fillColorProperty = new dependencyObservable.Property("fillColor", "PointLabelStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.textColorProperty = new dependencyObservable.Property("textColor", "PointLabelStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.textSizeProperty = new dependencyObservable.Property("textSize", "PointLabelStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.marginProperty = new dependencyObservable.Property("margin", "PointLabelStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.textFormatProperty = new dependencyObservable.Property("textFormat", "PointLabelStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.fontNameProperty = new dependencyObservable.Property("fontName", "PointLabelStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    PointLabelStyle.fontStyleProperty = new dependencyObservable.Property("fontStyle", "PointLabelStyle", new proxy_1.PropertyMetadata(undefined, undefined, undefined));
    return PointLabelStyle;
}(bindable_1.Bindable));
exports.PointLabelStyle = PointLabelStyle;
//# sourceMappingURL=chart-label-style-common.js.map