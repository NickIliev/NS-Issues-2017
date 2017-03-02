var cartesianChartGridModule = require("./chart-cartesian-chart-grid-common");
var color_1 = require("color");
////////////////////////////////////////////////////////////////////////
// RadCartesianChartGrid
////////////////////////////////////////////////////////////////////////
//NOTE: The workflow that uses exclusively created TKChartGridStyle instance (this.ios) is dummy, but needed.
//We faced with a bug that grid styling has some statics and if we set properties directly to this.owner.ios.gridStyle
//in view with multiple charts the grid of all of them have the same horizontal/vertial lines.
//The native code should be debug and statics removed.
////////////////////////////////////////////////////////////////////////
var RadCartesianChartGrid = (function (_super) {
    __extends(RadCartesianChartGrid, _super);
    function RadCartesianChartGrid() {
        _super.call(this);
        this._ios = TKChartGridStyle.new();
        this._ios.drawOrder = 1 /* VerticalFirst */;
    }
    Object.defineProperty(RadCartesianChartGrid.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadCartesianChartGrid.prototype.onOwnerChanged = function () {
        this.applyGridStyle();
    };
    RadCartesianChartGrid.prototype.applyGridStyle = function () {
        if (!this.owner) {
            return;
        }
        var style = this.owner.ios.gridStyle;
        style.drawOrder = this.ios.drawOrder;
        style.verticalLineStroke = this.ios.verticalLineStroke;
        ;
        style.verticalLineAlternateStroke = this.ios.verticalLineAlternateStroke;
        style.verticalLinesHidden = this.ios.verticalLinesHidden;
        style.verticalFill = this.ios.verticalFill;
        style.verticalAlternateFill = this.ios.verticalAlternateFill;
        style.horizontalLineStroke = this.ios.horizontalLineStroke;
        style.horizontalLineAlternateStroke = this.ios.horizontalLineAlternateStroke;
        style.horizontalFill = this.ios.horizontalFill;
        style.horizontalAlternateFill = this.ios.horizontalAlternateFill;
        style.horizontalLinesHidden = this.ios.horizontalLinesHidden;
        this.owner.updateChart();
    };
    RadCartesianChartGrid.prototype.updateGridStyle = function () {
        if (this.verticalLinesVisible != undefined)
            this.ios.verticalLinesHidden = (this.verticalLinesVisible) ? false : true;
        if (this.horizontalLinesVisible != undefined)
            this.ios.horizontalLinesHidden = (this.horizontalLinesVisible) ? false : true;
        if (this.verticalStripLineColor != undefined)
            this.updateVerticalFill(this.verticalStripLineColor);
        if (this.horizontalStripLineColor != undefined)
            this.updateHorizontalFill(this.horizontalStripLineColor);
        if (this.verticalStrokeColor) {
            var colors = this.verticalStrokeColor.split(',');
            this.ios.verticalLineStroke.color = (new color_1.Color(colors[0].trim())).ios;
            this.ios.verticalLineAlternateStroke.color = (colors[1] == undefined) ? (new color_1.Color(colors[0].trim())).ios : (new color_1.Color(colors[1].trim())).ios;
        }
        if (this.horizontalStrokeColor) {
            var colors = this.horizontalStrokeColor.split(',');
            this.ios.horizontalLineStroke.color = (new color_1.Color(colors[0].trim())).ios;
            this.ios.horizontalLineAlternateStroke.color = (colors[1] == undefined) ? (new color_1.Color(colors[0].trim())).ios : (new color_1.Color(colors[1].trim())).ios;
        }
        this.ios.verticalLineStroke.width = this.verticalStrokeWidth;
        this.ios.verticalLineAlternateStroke.width = this.verticalStrokeWidth;
        this.ios.horizontalLineStroke.width = this.horizontalStrokeWidth;
        this.ios.horizontalLineAlternateStroke.width = this.horizontalStrokeWidth;
        this.applyGridStyle();
    };
    RadCartesianChartGrid.prototype.updateHorizontalFill = function (color) {
        if (!color || !this.horizontalStripLinesVisible) {
            this.ios.horizontalFill = null;
            this.ios.horizontalAlternateFill = null;
        }
        else {
            var colors = color.split(',');
            // This is a workaround for the fact that in iOS when there is an alternate fill, it is applied first.
            if (colors[1] == undefined) {
                this.ios.horizontalFill = TKSolidFill.solidFillWithColor((new color_1.Color(colors[0].trim())).ios);
                this.ios.horizontalAlternateFill = null;
            }
            else {
                this.ios.horizontalAlternateFill = TKSolidFill.solidFillWithColor((new color_1.Color(colors[0].trim())).ios);
                this.ios.horizontalFill = TKSolidFill.solidFillWithColor((new color_1.Color(colors[1].trim())).ios);
            }
        }
        this.applyGridStyle();
    };
    RadCartesianChartGrid.prototype.updateVerticalFill = function (color) {
        if (!color || !this.verticalStripLinesVisible) {
            this.ios.verticalFill = null;
            this.ios.verticalAlternateFill = null;
        }
        else {
            var colors = color.split(',');
            // This is a workaround for the fact that in iOS when there is an alternate fill, it is applied first.
            if (colors[1] == undefined) {
                this.ios.verticalFill = TKSolidFill.solidFillWithColor((new color_1.Color(colors[0].trim())).ios);
                this.ios.verticalAlternateFill = null;
            }
            else {
                this.ios.verticalAlternateFill = TKSolidFill.solidFillWithColor((new color_1.Color(colors[0].trim())).ios);
                this.ios.verticalFill = TKSolidFill.solidFillWithColor((new color_1.Color(colors[1].trim())).ios);
            }
        }
        this.applyGridStyle();
    };
    RadCartesianChartGrid.prototype.onVerticalLinesVisibleChanged = function (data) {
        this.ios.verticalLinesHidden = (data.newValue) ? false : true;
        this.applyGridStyle();
    };
    RadCartesianChartGrid.prototype.onHorizontalLinesVisibleChanged = function (data) {
        this.ios.horizontalLinesHidden = (data.newValue) ? false : true;
        this.applyGridStyle();
    };
    RadCartesianChartGrid.prototype.onHorizontalStripLinesVisibleChanged = function (data) {
        this.updateHorizontalFill((data.newValue) ? this.horizontalStripLineColor : null);
    };
    RadCartesianChartGrid.prototype.onVerticalStripLinesVisibleChanged = function (data) {
        this.updateVerticalFill((data.newValue) ? this.verticalStripLineColor : null);
    };
    RadCartesianChartGrid.prototype.onVerticalStrokeColorChanged = function (data) {
        if (data.newValue) {
            var colors = data.newValue.split(',');
            this.ios.verticalLineStroke.color = (new color_1.Color(colors[0].trim())).ios;
            this.ios.verticalLineAlternateStroke.color = (colors[1] == undefined) ? (new color_1.Color(colors[0].trim())).ios : (new color_1.Color(colors[1].trim())).ios;
            this.applyGridStyle();
        }
    };
    RadCartesianChartGrid.prototype.onHorizontalStrokeColorChanged = function (data) {
        if (data.newValue) {
            var colors = data.newValue.split(',');
            this.ios.horizontalLineStroke.color = (new color_1.Color(colors[0].trim())).ios;
            this.ios.horizontalLineAlternateStroke.color = (colors[1] == undefined) ? (new color_1.Color(colors[0].trim())).ios : (new color_1.Color(colors[1].trim())).ios;
            this.applyGridStyle();
        }
    };
    RadCartesianChartGrid.prototype.onHorizontalStrokeWidthChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.ios.horizontalLineStroke.width = data.newValue;
            this.ios.horizontalLineAlternateStroke.width = data.newValue;
            this.applyGridStyle();
        }
    };
    RadCartesianChartGrid.prototype.onVerticalStrokeWidthChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.ios.verticalLineStroke.width = data.newValue;
            this.ios.verticalLineAlternateStroke.width = data.newValue;
            this.applyGridStyle();
        }
    };
    RadCartesianChartGrid.prototype.onVerticalStripLineColorChanged = function (data) {
        this.updateVerticalFill(data.newValue);
    };
    RadCartesianChartGrid.prototype.onHorizontalStripLineColorChanged = function (data) {
        this.updateHorizontalFill(data.newValue);
    };
    return RadCartesianChartGrid;
}(cartesianChartGridModule.RadCartesianChartGrid));
exports.RadCartesianChartGrid = RadCartesianChartGrid;
//# sourceMappingURL=chart-cartesian-chart-grid.js.map