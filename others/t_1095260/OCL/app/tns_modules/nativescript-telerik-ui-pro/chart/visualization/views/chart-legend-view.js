var legendViewCommonModule = require('./chart-legend-view-common');
var commonModule = require("../../chart-common");
var chart_public_enum_1 = require("../../misc/chart-public-enum");
////////////////////////////////////////////////////////////////////////
// RadLegendView
////////////////////////////////////////////////////////////////////////
var RadLegendView = (function (_super) {
    __extends(RadLegendView, _super);
    function RadLegendView() {
        _super.apply(this, arguments);
    }
    RadLegendView.prototype.onPositionChanged = function (data) {
        this.updateLegendView(this._chart);
    };
    RadLegendView.prototype.onVerticalOffsetChanged = function (data) {
        this.updateLegendView(this._chart);
    };
    RadLegendView.prototype.onHorizontalOffsetChanged = function (data) {
        this.updateLegendView(this._chart);
    };
    RadLegendView.prototype.onOffsetOriginChanged = function (data) {
        this.updateLegendView(this._chart);
    };
    RadLegendView.prototype.onTitleChanged = function (data) {
        this.updateLegendView(this._chart);
    };
    RadLegendView.prototype.updateLegendPosition = function (chartView) {
        if (!this.position) {
            return;
        }
        switch (this.position.toLowerCase()) {
            case chart_public_enum_1.ChartLegendPosition.Left.toLowerCase():
                chartView.ios.legend.style.position = 0 /* Left */;
                break;
            case chart_public_enum_1.ChartLegendPosition.Right.toLowerCase():
                chartView.ios.legend.style.position = 1 /* Right */;
                break;
            case chart_public_enum_1.ChartLegendPosition.Top.toLowerCase():
                chartView.ios.legend.style.position = 2 /* Top */;
                break;
            case chart_public_enum_1.ChartLegendPosition.Bottom.toLowerCase():
                chartView.ios.legend.style.position = 3 /* Bottom */;
                break;
            case chart_public_enum_1.ChartLegendPosition.Floating.toLowerCase():
                chartView.ios.legend.style.position = 4 /* Floating */;
                break;
        }
        if (this.position.toLowerCase() === chart_public_enum_1.ChartLegendPosition.Floating.toLowerCase()) {
            switch (this.offsetOrigin.toLowerCase()) {
                case chart_public_enum_1.ChartLegendOffsetOrigin.TopLeft.toLowerCase():
                    chartView.ios.legend.style.offsetOrigin = 0 /* TopLeft */;
                    break;
                case chart_public_enum_1.ChartLegendOffsetOrigin.TopRight.toLowerCase():
                    chartView.ios.legend.style.offsetOrigin = 1 /* TopRight */;
                    break;
                case chart_public_enum_1.ChartLegendOffsetOrigin.BottomLeft.toLowerCase():
                    chartView.ios.legend.style.offsetOrigin = 2 /* BottomLeft */;
                    break;
                case chart_public_enum_1.ChartLegendOffsetOrigin.BottomRight.toLowerCase():
                    chartView.ios.legend.style.offsetOrigin = 3 /* BottomRight */;
                    break;
                default:
                    chartView.ios.legend.style.offsetOrigin = 0 /* TopLeft */;
            }
            chartView.ios.legend.style.offset = {
                horizontal: (isNaN(this.horizontalOffset)) ? 0 : this.horizontalOffset,
                vertical: (isNaN(this.verticalOffset)) ? 0 : this.verticalOffset
            };
        }
        chartView.ios.setNeedsLayout();
    };
    RadLegendView.prototype.updateLegendView = function (chartView) {
        if (!(chartView)) {
            return;
        }
        if (!(chartView instanceof commonModule.RadChartBase)) {
            return;
        }
        if (!this._chart) {
            this._chart = chartView;
        }
        chartView.ios.legend.hidden = false;
        if (this.position) {
            this.updateLegendPosition(chartView);
        }
        if (this.title) {
            chartView.ios.legend.titleLabel.text = this.title;
            chartView.ios.legend.showTitle = true;
        }
        chartView.updateChart();
    };
    return RadLegendView;
}(legendViewCommonModule.RadLegendView));
exports.RadLegendView = RadLegendView;
//# sourceMappingURL=chart-legend-view.js.map