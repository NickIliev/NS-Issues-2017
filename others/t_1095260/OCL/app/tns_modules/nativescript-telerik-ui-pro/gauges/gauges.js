var commonModule = require("./gauges-common");
var color_1 = require("color");
exports.knownCollections = commonModule.knownCollections;
var RadRadialGauge = (function (_super) {
    __extends(RadRadialGauge, _super);
    function RadRadialGauge() {
        _super.call(this);
        this._ios = TKRadialGauge.alloc().init();
    }
    Object.defineProperty(RadRadialGauge.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadRadialGauge.prototype, "nativeObject", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return RadRadialGauge;
}(commonModule.RadRadialGauge));
exports.RadRadialGauge = RadRadialGauge;
////////////// TITLE STYLE
var TitleStyle = (function (_super) {
    __extends(TitleStyle, _super);
    function TitleStyle() {
        _super.apply(this, arguments);
    }
    TitleStyle.prototype._onTextSizePropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labelTitle.font = UIFont.systemFontOfSize(eventData.newValue);
    };
    TitleStyle.prototype._onTextColorPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labelTitle.textColor = (new color_1.Color(eventData.newValue)).ios;
    };
    TitleStyle.prototype._onHorizontalOffsetPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labelTitleOffset = CGPointMake(eventData.newValue, this.owner.ios.labelTitleOffset.y);
    };
    TitleStyle.prototype._onVerticalOffsetPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labelTitleOffset = CGPointMake(this.owner.ios.labelTitleOffset.x, eventData.newValue);
    };
    return TitleStyle;
}(commonModule.TitleStyle));
exports.TitleStyle = TitleStyle;
/////////////// SUBTITLE STYLE
var SubtitleStyle = (function (_super) {
    __extends(SubtitleStyle, _super);
    function SubtitleStyle() {
        _super.apply(this, arguments);
    }
    SubtitleStyle.prototype._onTextSizePropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labelSubtitle.font = UIFont.systemFontOfSize(eventData.newValue);
    };
    SubtitleStyle.prototype._onTextColorPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labelSubtitle.textColor = (new color_1.Color(eventData.newValue)).ios;
    };
    SubtitleStyle.prototype._onHorizontalOffsetPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labelSubtitleOffset = CGPointMake(eventData.newValue, this.owner.ios.labelSubtitleOffset.y);
    };
    SubtitleStyle.prototype._onVerticalOffsetPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labelSubtitleOffset = CGPointMake(this.owner.ios.labelSubtitleOffset.x, eventData.newValue);
    };
    return SubtitleStyle;
}(commonModule.SubtitleStyle));
exports.SubtitleStyle = SubtitleStyle;
////////////////// SCALES
var RadialScale = (function (_super) {
    __extends(RadialScale, _super);
    function RadialScale() {
        _super.call(this);
        this._ios = TKGaugeRadialScale.alloc().init();
    }
    Object.defineProperty(RadialScale.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialScale.prototype, "nativeObject", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadialScale.prototype._onStartAnglePropertyChanged = function (eventData) {
        if (!this.ios) {
            return;
        }
        this.ios.startAngle = this.degreesToRadians(eventData.newValue);
        if (this.sweepAngle) {
            this.ios.endAngle = this.degreesToRadians(eventData.newValue + this.sweepAngle);
        }
    };
    RadialScale.prototype._onSweepAnglePropertyChanged = function (eventData) {
        if (!this.ios) {
            return;
        }
        this.ios.endAngle = this.degreesToRadians(eventData.newValue + this.startAngle);
    };
    RadialScale.prototype._onRadiusPropertyChanged = function (eventData) {
        if (!this.ios) {
            return;
        }
        this.ios.radius = eventData.newValue;
    };
    RadialScale.prototype.degreesToRadians = function (degrees) {
        return degrees * Math.PI / 180;
    };
    return RadialScale;
}(commonModule.RadialScale));
exports.RadialScale = RadialScale;
/////////////////////// SCALE STYLES
var ScaleStyle = (function (_super) {
    __extends(ScaleStyle, _super);
    function ScaleStyle() {
        _super.apply(this, arguments);
    }
    ScaleStyle.prototype._onLineColorPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.stroke = TKStroke.strokeWithColorWidth(new color_1.Color(eventData.newValue).ios, this.owner.ios.stroke.width);
    };
    ScaleStyle.prototype._onLineThicknessPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.stroke = TKStroke.strokeWithColorWidth(this.owner.ios.stroke.color, eventData.newValue);
    };
    ScaleStyle.prototype._onTicksVisiblePropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.ticks.hidden = !eventData.newValue;
    };
    ScaleStyle.prototype._onMajorTicksCountPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.ticks.majorTicksCount = eventData.newValue;
    };
    ScaleStyle.prototype._onMinorTicksCountPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.minorTicksCount = eventData.newValue;
    };
    ScaleStyle.prototype._onТicksOffsetPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.ticks.offset = eventData.newValue;
    };
    ScaleStyle.prototype._onTicksLayoutModePropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        if (eventData.newValue == commonModule.ScaleTicksLayoutMode.Inner) {
            this.owner.ios.ticks.position = 0 /* Inner */;
        }
        else if (eventData.newValue == commonModule.ScaleTicksLayoutMode.Outer) {
            this.owner.ios.ticks.position = 1 /* Outer */;
        }
    };
    ScaleStyle.prototype._onMajorTicksWidthPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.ticks.majorTicksWidth = eventData.newValue;
    };
    ScaleStyle.prototype._onMinorTicksWidthPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.ticks.minorTicksWidth = eventData.newValue;
    };
    ScaleStyle.prototype._onMajorTicksLengthPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.ticks.majorTicksLength = eventData.newValue;
    };
    ScaleStyle.prototype._onMinorTicksLengthPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.ticks.minorTicksLength = eventData.newValue;
    };
    ScaleStyle.prototype._onMajorTicksStrokeColorPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        var strokeWidth = this.owner.ios.ticks.majorTicksStroke.width ? this.owner.ios.ticks.majorTicksStroke.width : 0;
        this.owner.ios.ticks.majorTicksStroke = TKStroke.strokeWithColorWidth(new color_1.Color(eventData.newValue).ios, strokeWidth);
        this.owner.ios.setNeedsDisplay();
    };
    ScaleStyle.prototype._onМinorTicksStrokeColorPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        var strokeWidth = this.owner.ios.ticks.minorTicksStroke.width ? this.owner.ios.ticks.minorTicksStroke.width : 0;
        this.owner.ios.ticks.minorTicksStroke = TKStroke.strokeWithColorWidth(new color_1.Color(eventData.newValue).ios, strokeWidth);
    };
    ScaleStyle.prototype._onMajorTicksFillColorPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.ticks.majorTicksFill = TKSolidFill.solidFillWithColor(new color_1.Color(eventData.newValue).ios);
    };
    ScaleStyle.prototype._onMinorTicksFillColorPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.ticks.minorTicksFill = TKSolidFill.solidFillWithColor(new color_1.Color(eventData.newValue).ios);
    };
    ScaleStyle.prototype._onМajorTicksStrokeWidthPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        if (this.majorTicksStrokeColor) {
            this.owner.ios.ticks.majorTicksStroke = TKStroke.strokeWithColorWidth(new color_1.Color(this.majorTicksStrokeColor).ios, eventData.newValue);
        }
        else {
            this.owner.ios.ticks.majorTicksStroke = TKStroke.alloc().init();
            this.owner.ios.ticks.majorTicksStroke.width = eventData.newValue;
        }
        this.owner.ios.setNeedsDisplay();
    };
    ScaleStyle.prototype._onМinorTicksStrokeWidthPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        if (this.minorTicksStrokeColor) {
            this.owner.ios.ticks.minorTicksStroke = TKStroke.strokeWithColorWidth(new color_1.Color(this.minorTicksStrokeColor).ios, eventData.newValue);
        }
        else {
            this.owner.ios.ticks.minorTicksStroke = TKStroke.alloc().init();
            this.owner.ios.ticks.minorTicksStroke.width = eventData.newValue;
        }
    };
    ScaleStyle.prototype._onLabelsVisiblePropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labels.hidden = !eventData.newValue;
    };
    ScaleStyle.prototype._onLabelsCountPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labels.count = eventData.newValue;
    };
    ScaleStyle.prototype._onLabelsLayoutModePropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        if (eventData.newValue == commonModule.ScaleLabelsLayoutMode.Inner) {
            this.owner.ios.labels.position = 0 /* TKGaugeLabelsPositionInner */;
        }
        else if (eventData.newValue == commonModule.ScaleLabelsLayoutMode.Outer) {
            this.owner.ios.labels.position = 1 /* TKGaugeLabelsPositionOuter */;
        }
    };
    ScaleStyle.prototype._onLabelsOffsetPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labels.offset = eventData.newValue;
    };
    ScaleStyle.prototype._onLabelsSizePropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labels.font = UIFont.systemFontOfSize(eventData.newValue);
    };
    ScaleStyle.prototype._onLabelsColorPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.labels.color = new color_1.Color(eventData.newValue).ios;
    };
    return ScaleStyle;
}(commonModule.ScaleStyle));
exports.ScaleStyle = ScaleStyle;
//////////////////////////// NEEDLE STYLES
var NeedleStyle = (function (_super) {
    __extends(NeedleStyle, _super);
    function NeedleStyle() {
        _super.apply(this, arguments);
    }
    NeedleStyle.prototype._onLengthPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.length = eventData.newValue;
    };
    NeedleStyle.prototype._onBottomWidthPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.width = eventData.newValue;
    };
    NeedleStyle.prototype._onTopWidthPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.topWidth = eventData.newValue;
    };
    NeedleStyle.prototype._onCircleRadiusPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.circleRadius = eventData.newValue;
    };
    NeedleStyle.prototype._onCircleInnerRadiusPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.circleInnerRadius = eventData.newValue;
    };
    NeedleStyle.prototype._onOffsetPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.offset = eventData.newValue;
    };
    NeedleStyle.prototype._onCircleFillColorPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.circleFill = TKSolidFill.solidFillWithColor(new color_1.Color(eventData.newValue).ios);
    };
    NeedleStyle.prototype._onCircleStrokeColorPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        var strokeWidth = this.circleStrokeWidth ? this.circleStrokeWidth : 0;
        this.owner.ios.circleStroke = TKStroke.strokeWithColorWidth(new color_1.Color(eventData.newValue).ios, strokeWidth);
    };
    NeedleStyle.prototype._onCircleStrokeWidthPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        if (this.circleStrokeColor) {
            this.owner.ios.circleStroke = TKStroke.strokeWithColorWidth(new color_1.Color(this.circleStrokeColor).ios, eventData.newValue);
        }
        else {
            this.owner.ios.circleStroke = TKStroke.alloc().init();
            this.owner.ios.circleStroke.width = eventData.newValue;
        }
    };
    NeedleStyle.prototype._onFillColorPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.fill = TKSolidFill.solidFillWithColor(new color_1.Color(eventData.newValue).ios);
    };
    NeedleStyle.prototype._onStrokeColorPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        var strokeWidth = this.strokeWidth ? this.strokeWidth : 0;
        this.owner.ios.stroke = TKStroke.strokeWithColorWidth(new color_1.Color(eventData.newValue).ios, strokeWidth);
    };
    NeedleStyle.prototype._onStrokeWidthPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        if (this.strokeColor) {
            this.owner.ios.stroke = TKStroke.strokeWithColorWidth(new color_1.Color(this.strokeColor).ios, eventData.newValue);
        }
        else {
            this.owner.ios.stroke = TKStroke.alloc().init();
            this.owner.ios.stroke.width = eventData.newValue;
        }
    };
    return NeedleStyle;
}(commonModule.NeedleStyle));
exports.NeedleStyle = NeedleStyle;
/////////////////////////// BAR INDICATOR STYLE
var BarIndicatorStyle = (function (_super) {
    __extends(BarIndicatorStyle, _super);
    function BarIndicatorStyle() {
        _super.apply(this, arguments);
    }
    BarIndicatorStyle.prototype._onCapPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        if (eventData.newValue == commonModule.BarIndicatorCapMode.Edge) {
            this.owner.ios.cap = 1 /* Edge */;
        }
        else if (eventData.newValue == commonModule.BarIndicatorCapMode.Round) {
            this.owner.ios.cap = 0 /* Round */;
        }
    };
    BarIndicatorStyle.prototype._onBarWidthPropertyChanged = function (eventData) {
        if (!this.owner) {
            return;
        }
        this.owner.ios.width = eventData.newValue;
        this.owner.ios.width2 = eventData.newValue;
    };
    return BarIndicatorStyle;
}(commonModule.BarIndicatorStyle));
exports.BarIndicatorStyle = BarIndicatorStyle;
/////////////////////////// INDICATORS
var RadialNeedle = (function (_super) {
    __extends(RadialNeedle, _super);
    function RadialNeedle() {
        _super.call(this);
        this._ios = TKGaugeNeedle.alloc().init();
    }
    Object.defineProperty(RadialNeedle.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialNeedle.prototype, "nativeObject", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadialNeedle.prototype._onValuePropertyChanged = function (eventData) {
        if (!this._ios) {
            return;
        }
        if (this.isAnimated) {
            var duration = this.animationDuration ? (this.animationDuration / 1000) : 1;
            this._ios.setValueAnimatedWithDurationMediaTimingFunction(eventData.newValue, duration, undefined);
        }
        else {
            this._ios.value = eventData.newValue;
        }
    };
    return RadialNeedle;
}(commonModule.RadialNeedle));
exports.RadialNeedle = RadialNeedle;
var RadialBarIndicator = (function (_super) {
    __extends(RadialBarIndicator, _super);
    function RadialBarIndicator() {
        _super.call(this);
        this._ios = TKGaugeSegment.alloc().init();
    }
    Object.defineProperty(RadialBarIndicator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadialBarIndicator.prototype, "nativeObject", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return RadialBarIndicator;
}(commonModule.RadialBarIndicator));
exports.RadialBarIndicator = RadialBarIndicator;
//# sourceMappingURL=gauges.js.map