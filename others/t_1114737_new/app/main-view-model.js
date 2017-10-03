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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDO0lBQXFDLG1DQUFVO0lBTzNDO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7O0lBQzdELENBQUM7SUFFRCxzQkFBSSwwQ0FBYTthQUFqQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7YUFFRCxVQUFrQixLQUFjO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDckQsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU00sMENBQWdCLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQTNCRCxDQUFxQyx1QkFBVSxHQTJCOUM7QUEzQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgcHJpdmF0ZSBfaXNJdGVtVmlzaWJsZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9pc1NwZWNpZmljQ2VsbFZpc2libGVcblxuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8YW55PlxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5pdGVtcyA9IFsxLCAxLCAyLCAzLCA1LCA4LCAxMywgMjEsIDM0LCA1NSwgODksIDE0M107XG4gICAgfVxuXG4gICAgZ2V0IGlzSXRlbVZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0l0ZW1WaXNpYmxlO1xuICAgIH1cblxuICAgIHNldCBpc0l0ZW1WaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0l0ZW1WaXNpYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faXNJdGVtVmlzaWJsZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnaXNJdGVtVmlzaWJsZScsIHZhbHVlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZVZpc2liaWxpdHkoKSB7XG4gICAgICAgIHRoaXMuaXNJdGVtVmlzaWJsZSA9ICF0aGlzLmlzSXRlbVZpc2libGU7XG4gICAgfVxufSJdfQ==