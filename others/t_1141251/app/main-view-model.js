"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.items = [1, 1, 3, 4, 5, 8, 13, 21, 34, 55, 89];
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            if (this._items !== value) {
                this._items = value;
                this.notifyPropertyChange('items', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDO0lBQXFDLG1DQUFVO0lBSzNDO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7SUFDeEQsQ0FBQztJQUVELHNCQUFJLGtDQUFLO2FBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBVSxLQUFpQjtZQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQzdDLENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVFMLHNCQUFDO0FBQUQsQ0FBQyxBQXJCRCxDQUFxQyx1QkFBVSxHQXFCOUM7QUFyQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgcHJpdmF0ZSBfY291bnRlcjogbnVtYmVyO1xuICAgIHByaXZhdGUgX2l0ZW1zOiBBcnJheTxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5pdGVtcyA9IFsxLCAxLCAzLCA0LCA1LCA4LCAxMywgMjEsIDM0LCA1NSwgODldO1xuICAgIH1cblxuICAgIGdldCBpdGVtcygpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICAgIH1cblxuICAgIHNldCBpdGVtcyh2YWx1ZTogQXJyYXk8YW55Pikge1xuICAgICAgICBpZiAodGhpcy5faXRlbXMgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtcyA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnaXRlbXMnLCB2YWx1ZSlcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=