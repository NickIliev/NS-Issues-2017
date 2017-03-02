var bindable_1 = require("ui/core/bindable");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var chart_public_enum_1 = require("../../misc/chart-public-enum");
var Trackball = (function (_super) {
    __extends(Trackball, _super);
    function Trackball() {
        _super.call(this);
    }
    Object.defineProperty(Trackball.prototype, "android", {
        get: function () {
            return this._android;
        },
        set: function (value) {
            this._android = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trackball.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    Trackball.onSnapModePropertyChanged = function (data) {
        var trackball = data.object;
        trackball.onSnapModeChanged(data);
    };
    Object.defineProperty(Trackball.prototype, "snapMode", {
        get: function () {
            return this._getValue(Trackball.snapModeProperty);
        },
        set: function (value) {
            this._setValue(Trackball.snapModeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Trackball.onShowIntersectionPointsPropertyChanged = function (data) {
        var classInstance = data.object;
        classInstance.onShowIntersectionPointsChanged(data);
    };
    Object.defineProperty(Trackball.prototype, "showIntersectionPoints", {
        get: function () {
            return this._getValue(Trackball.showIntersectionPointsProperty);
        },
        set: function (value) {
            this._setValue(Trackball.showIntersectionPointsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Trackball.prototype.onSnapModeChanged = function (data) { };
    Trackball.prototype.onShowIntersectionPointsChanged = function (data) { };
    ;
    Trackball.prototype.onOwnerChanged = function () { };
    Trackball.snapModeProperty = new dependencyObservable.Property("snapMode", "Trackball", new proxy_1.PropertyMetadata(chart_public_enum_1.TrackballSnapMode.ClosestPoint, dependencyObservable.PropertyMetadataSettings.None, Trackball.onSnapModePropertyChanged));
    Trackball.showIntersectionPointsProperty = new dependencyObservable.Property("showIntersectionPoints", "Trackball", new proxy_1.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None, Trackball.onShowIntersectionPointsPropertyChanged));
    return Trackball;
}(bindable_1.Bindable));
exports.Trackball = Trackball;
//# sourceMappingURL=chart-track-ball-common.js.map