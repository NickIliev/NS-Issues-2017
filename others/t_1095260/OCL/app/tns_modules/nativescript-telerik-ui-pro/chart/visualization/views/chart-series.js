var seriesCommonModule = require("./chart-series-common");
var initializersImpl = require("../../initializers/chart-initializers");
var commonModule = require("../../chart-common");
var PieSeries = (function (_super) {
    __extends(PieSeries, _super);
    function PieSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PieSeries.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    return PieSeries;
}(seriesCommonModule.PieSeries));
exports.PieSeries = PieSeries;
var DonutSeries = (function (_super) {
    __extends(DonutSeries, _super);
    function DonutSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(DonutSeries.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    DonutSeries.prototype.updateOwnerChart = function () {
        if (this.owner && (this.owner instanceof commonModule.RadPieChart)) {
            this.owner.updateChart();
        }
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
    return DonutSeries;
}(seriesCommonModule.DonutSeries));
exports.DonutSeries = DonutSeries;
////////////////////////////////////////////////////////////////////////
// BarSeries
////////////////////////////////////////////////////////////////////////
var BarSeries = (function (_super) {
    __extends(BarSeries, _super);
    function BarSeries() {
        _super.call(this);
    }
    Object.defineProperty(BarSeries.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    BarSeries.prototype.updateNative = function () {
        this.initializer.updateNative(this);
    };
    return BarSeries;
}(seriesCommonModule.BarSeries));
exports.BarSeries = BarSeries;
////////////////////////////////////////////////////////////////////////
// RangeBarSeries
////////////////////////////////////////////////////////////////////////
var RangeBarSeries = (function (_super) {
    __extends(RangeBarSeries, _super);
    function RangeBarSeries() {
        _super.call(this);
    }
    Object.defineProperty(RangeBarSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.RangeBarSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeBarSeries.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    RangeBarSeries.prototype.updateNative = function () {
        this.initializer.updateNative(this);
    };
    RangeBarSeries.prototype.onHighPropertyNameChanged = function (data) {
        this.initializer.onHighPropertyNameChanged(data, this);
    };
    RangeBarSeries.prototype.onLowPropertyNameChanged = function (data) {
        this.initializer.onLowPropertyNameChanged(data, this);
    };
    RangeBarSeries.prototype.onValuePropertyChanged = function (data) {
        console.log("WARNING: Range bar series doesn't use valueProperty property.");
    };
    return RangeBarSeries;
}(seriesCommonModule.RangeBarSeries));
exports.RangeBarSeries = RangeBarSeries;
////////////////////////////////////////////////////////////////////////
// LineSeries
////////////////////////////////////////////////////////////////////////
var LineSeries = (function (_super) {
    __extends(LineSeries, _super);
    function LineSeries() {
        _super.call(this);
    }
    Object.defineProperty(LineSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.LineSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineSeries.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    return LineSeries;
}(seriesCommonModule.CategoricalSeries));
exports.LineSeries = LineSeries;
var SplineSeries = (function (_super) {
    __extends(SplineSeries, _super);
    function SplineSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SplineSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.SplineSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    return SplineSeries;
}(LineSeries));
exports.SplineSeries = SplineSeries;
var AreaSeries = (function (_super) {
    __extends(AreaSeries, _super);
    function AreaSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(AreaSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.AreaSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    return AreaSeries;
}(LineSeries));
exports.AreaSeries = AreaSeries;
var SplineAreaSeries = (function (_super) {
    __extends(SplineAreaSeries, _super);
    function SplineAreaSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SplineAreaSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.SplineAreaSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    return SplineAreaSeries;
}(LineSeries));
exports.SplineAreaSeries = SplineAreaSeries;
var BubbleSeries = (function (_super) {
    __extends(BubbleSeries, _super);
    function BubbleSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(BubbleSeries.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BubbleSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.BubbleSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    BubbleSeries.prototype.onBubbleScaleChanged = function (data) {
        this.initializer.onBubbleScalePropertyChanged(data, this);
    };
    BubbleSeries.prototype.onBubbleSizePropertyChanged = function (data) {
        this.initializer.onBubbleSizePropertyChanged(data, this);
    };
    return BubbleSeries;
}(seriesCommonModule.BubbleSeries));
exports.BubbleSeries = BubbleSeries;
var ScatterSeries = (function (_super) {
    __extends(ScatterSeries, _super);
    function ScatterSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ScatterSeries.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    return ScatterSeries;
}(seriesCommonModule.ScatterSeries));
exports.ScatterSeries = ScatterSeries;
var ScatterBubbleSeries = (function (_super) {
    __extends(ScatterBubbleSeries, _super);
    function ScatterBubbleSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ScatterBubbleSeries.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    return ScatterBubbleSeries;
}(seriesCommonModule.ScatterBubbleSeries));
exports.ScatterBubbleSeries = ScatterBubbleSeries;
var OhlcSeries = (function (_super) {
    __extends(OhlcSeries, _super);
    function OhlcSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(OhlcSeries.prototype, "ios", {
        get: function () {
            return this._series;
        },
        set: function (value) {
            this._series = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OhlcSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.OhlcSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    OhlcSeries.prototype.onHighPropertyNameChanged = function (data) {
        this.initializer.onHighPropertyNameChanged(data, this);
    };
    OhlcSeries.prototype.onLowPropertyNameChanged = function (data) {
        this.initializer.onLowPropertyNameChanged(data, this);
    };
    OhlcSeries.prototype.onOpenPropertyNameChanged = function (data) {
        this.initializer.onOpenPropertyNameChanged(data, this);
    };
    OhlcSeries.prototype.onClosePropertyNameChanged = function (data) {
        this.initializer.onClosePropertyNameChanged(data, this);
    };
    OhlcSeries.prototype.onValuePropertyChanged = function (data) {
        console.log("WARNING: OHLC series doesn't use valueProperty property.");
    };
    return OhlcSeries;
}(seriesCommonModule.OhlcSeries));
exports.OhlcSeries = OhlcSeries;
var CandlestickSeries = (function (_super) {
    __extends(CandlestickSeries, _super);
    function CandlestickSeries() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CandlestickSeries.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CandlestickSeries.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new initializersImpl.CandlestickSeriesValueMapper();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    return CandlestickSeries;
}(OhlcSeries));
exports.CandlestickSeries = CandlestickSeries;
//# sourceMappingURL=chart-series.js.map