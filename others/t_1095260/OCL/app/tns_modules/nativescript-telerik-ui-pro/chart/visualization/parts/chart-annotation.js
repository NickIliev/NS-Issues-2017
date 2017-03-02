var annotationModule = require("./chart-annotation-common");
var color_1 = require("color");
var chart_public_enum_1 = require("../../misc/chart-public-enum");
var ChartGridLineAnnotation = (function (_super) {
    __extends(ChartGridLineAnnotation, _super);
    function ChartGridLineAnnotation() {
        _super.call(this);
        this._ios = TKChartGridLineAnnotation.new();
        this._ios.style.stroke = TKStroke.strokeWithColor(new color_1.Color("Black").ios);
    }
    Object.defineProperty(ChartGridLineAnnotation.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    ChartGridLineAnnotation.prototype.update = function () {
        if (this.owner && this.owner.ios) {
            this.owner.ios.updateAnnotations();
        }
    };
    ChartGridLineAnnotation.prototype.onOwnerChanged = function () {
        if (!this.axisId) {
            console.log("WARNING: axisId property is mandatory for any anotation.");
            return;
        }
        if (!this.owner) {
            return;
        }
        var forAxis = this.owner.getAxixByID(this.axisId);
        if (forAxis) {
            this._ios.axis = forAxis.ios;
        }
        this.update();
    };
    ChartGridLineAnnotation.prototype.onValueChanged = function (data) {
        if (data.newValue) {
            this._ios.value = data.newValue;
            this.update();
        }
    };
    ChartGridLineAnnotation.prototype.onAxisIdChanged = function (data) {
        if (data.newValue && this.owner) {
            var forAxis = this.owner.getAxixByID(this.axisId);
            if (forAxis) {
                this._ios.axis = forAxis.ios;
                this.update();
            }
        }
    };
    ChartGridLineAnnotation.prototype.onZPositionChanged = function (data) {
        if (data.newValue) {
            switch (data.newValue.toLowerCase()) {
                case chart_public_enum_1.ChartAnnotationZPosition.BelowSeries.toLowerCase():
                    this._ios.zPosition = 0 /* BelowSeries */;
                    break;
                case chart_public_enum_1.ChartAnnotationZPosition.AboveSeries.toLowerCase():
                    this._ios.zPosition = 1 /* AboveSeries */;
                    break;
            }
        }
    };
    ChartGridLineAnnotation.prototype.onHiddenChanged = function (data) {
        this._ios.hidden = data.newValue;
        this.update();
    };
    ChartGridLineAnnotation.prototype.onStrokeWidthChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this._ios.style.stroke.width = data.newValue;
            this.update();
        }
    };
    ChartGridLineAnnotation.prototype.onStrokeColorChanged = function (data) {
        if (data.newValue) {
            this._ios.style.stroke.color = (new color_1.Color(data.newValue)).ios;
            this.update();
        }
    };
    ChartGridLineAnnotation.prototype.onStrokeDashPatternChanged = function (data) {
        if (data.newValue) {
            var array = JSON.parse("[" + data.newValue + "]");
            if (array instanceof Array) {
                var nativeSource = NSMutableArray.new();
                var item = void 0, name = void 0, value = void 0;
                for (var i = 0; i < array.length; i++) {
                    item = array[i];
                    nativeSource.addObject(item);
                }
                this._ios.style.stroke.dashPattern = nativeSource;
                this.update();
            }
        }
    };
    return ChartGridLineAnnotation;
}(annotationModule.ChartGridLineAnnotation));
exports.ChartGridLineAnnotation = ChartGridLineAnnotation;
var ChartPlotBandAnnotation = (function (_super) {
    __extends(ChartPlotBandAnnotation, _super);
    function ChartPlotBandAnnotation() {
        _super.call(this);
        this._ios = TKChartBandAnnotation.new();
        this._ios.style.stroke = TKStroke.strokeWithColor(new color_1.Color("Black").ios);
    }
    Object.defineProperty(ChartPlotBandAnnotation.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    ChartPlotBandAnnotation.prototype.update = function () {
        if (this.owner && this.owner.ios) {
            this.owner.ios.updateAnnotations();
        }
    };
    ChartPlotBandAnnotation.prototype.onOwnerChanged = function () {
        if (!this.axisId) {
            console.log("WARNING: axisId property is mandatory for any anotation.");
            return;
        }
        if (!this.owner) {
            return;
        }
        var forAxis = this.owner.getAxixByID(this.axisId);
        if (forAxis) {
            this._ios.axis = forAxis.ios;
            this.update();
        }
    };
    ChartPlotBandAnnotation.prototype.onMinValueChanged = function (data) {
        if (this.ios.range) {
            this.ios.range.minimum = data.newValue;
        }
        else {
            this.ios.range = TKRange.rangeWithMinimumAndMaximum(data.newValue, (this.maxValue != undefined) ? this.maxValue : data.newValue);
        }
        this.update();
    };
    ChartPlotBandAnnotation.prototype.onMaxValueChanged = function (data) {
        if (this.ios.range) {
            this.ios.range.maximum = data.newValue;
        }
        else {
            this.ios.range = TKRange.rangeWithMinimumAndMaximum((this.minValue != undefined) ? this.minValue : data.newValue, data.newValue);
        }
        this.update();
    };
    ChartPlotBandAnnotation.prototype.onFillColorChanged = function (data) {
        if (data.newValue) {
            this._ios.style.fill = TKSolidFill.solidFillWithColor((new color_1.Color(data.newValue)).ios);
            this.update();
        }
    };
    ChartPlotBandAnnotation.prototype.onAxisIdChanged = function (data) {
        if (data.newValue && this.owner) {
            var forAxis = this.owner.getAxixByID(this.axisId);
            if (forAxis) {
                this._ios.axis = forAxis.ios;
                this.update();
            }
        }
    };
    ChartPlotBandAnnotation.prototype.onZPositionChanged = function (data) {
        if (data.newValue) {
            switch (data.newValue.toLowerCase()) {
                case chart_public_enum_1.ChartAnnotationZPosition.BelowSeries.toLowerCase():
                    this._ios.zPosition = 0 /* BelowSeries */;
                    break;
                case chart_public_enum_1.ChartAnnotationZPosition.AboveSeries.toLowerCase():
                    this._ios.zPosition = 1 /* AboveSeries */;
                    break;
            }
            this.update();
        }
    };
    ChartPlotBandAnnotation.prototype.onHiddenChanged = function (data) {
        this._ios.hidden = data.newValue;
        this.update();
    };
    ChartPlotBandAnnotation.prototype.onStrokeWidthChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this._ios.style.stroke.width = data.newValue;
            this.update();
        }
    };
    ChartPlotBandAnnotation.prototype.onStrokeColorChanged = function (data) {
        if (data.newValue) {
            this._ios.style.stroke.color = (new color_1.Color(data.newValue)).ios;
            this.update();
        }
    };
    ChartPlotBandAnnotation.prototype.onStrokeDashPatternChanged = function (data) {
        if (data.newValue) {
            var array = JSON.parse("[" + data.newValue + "]");
            if (array instanceof Array) {
                var nativeSource = NSMutableArray.new();
                var item = void 0, name = void 0, value = void 0;
                for (var i = 0; i < array.length; i++) {
                    item = array[i];
                    nativeSource.addObject(item);
                }
                this._ios.style.stroke.dashPattern = nativeSource;
                this.update();
            }
        }
    };
    return ChartPlotBandAnnotation;
}(annotationModule.ChartPlotBandAnnotation));
exports.ChartPlotBandAnnotation = ChartPlotBandAnnotation;
//# sourceMappingURL=chart-annotation.js.map