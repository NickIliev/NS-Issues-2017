"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.items = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 143];
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "isItemVisible", {
        get: function () {
            return this._isItemVisible;
        },
        set: function (value) {
            if (this._isItemVisible !== value) {
                this._isItemVisible = value;
                this.notifyPropertyChange('isItemVisible', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    HelloWorldModel.prototype.toggleVisibility = function () {
        this.isItemVisible = !this.isItemVisible;
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDO0lBQXFDLG1DQUFVO0lBSzNDO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7O0lBQzdELENBQUM7SUFFRCxzQkFBSSwwQ0FBYTthQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7YUFFRCxVQUFrQixLQUFjO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDckQsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU00sMENBQWdCLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQXpCRCxDQUFxQyx1QkFBVSxHQXlCOUM7QUF6QlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgcHJpdmF0ZSBfaXNJdGVtVmlzaWJsZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgaXRlbXM6IEFycmF5PGFueT5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbMSwgMSwgMiwgMywgNSwgOCwgMTMsIDIxLCAzNCwgNTUsIDg5LCAxNDNdO1xuICAgIH1cblxuICAgIGdldCBpc0l0ZW1WaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNJdGVtVmlzaWJsZTtcbiAgICB9XG5cbiAgICBzZXQgaXNJdGVtVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5faXNJdGVtVmlzaWJsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzSXRlbVZpc2libGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2UoJ2lzSXRlbVZpc2libGUnLCB2YWx1ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KCkge1xuICAgICAgICB0aGlzLmlzSXRlbVZpc2libGUgPSAhdGhpcy5pc0l0ZW1WaXNpYmxlO1xuICAgIH1cbn0iXX0=