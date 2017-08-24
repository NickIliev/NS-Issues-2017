"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.items = new observable_array_1.ObservableArray([0, 1, 1, 2, 3, 5]);
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
    HelloWorldModel.prototype.addFibo = function () {
        this.items.push(this.items.getItem(this.items.length - 2) + this.items.getItem(this.items.length - 1));
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLDBEQUF3RDtBQUN4RDtJQUFxQyxtQ0FBVTtJQUkzQztRQUFBLFlBQ0ksaUJBQU8sU0FHVjtRQURHLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUN6RCxDQUFDO0lBRUQsc0JBQUksa0NBQUs7YUFBVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7YUFFRCxVQUFVLEtBQTJCO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDN0MsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU0QsaUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0csQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQXhCRCxDQUFxQyx1QkFBVSxHQXdCOUM7QUF4QlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZS1hcnJheSc7XG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwcml2YXRlIF9pdGVtczogT2JzZXJ2YWJsZUFycmF5PGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLml0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheShbMCwgMSwgMSwgMiwgMywgNV0pO1xuICAgIH1cblxuICAgIGdldCBpdGVtcygpOiBPYnNlcnZhYmxlQXJyYXk8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgICB9XG5cbiAgICBzZXQgaXRlbXModmFsdWU6IE9ic2VydmFibGVBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtcyAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCdpdGVtcycsIHZhbHVlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkRmlibygpIHtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHRoaXMuaXRlbXMuZ2V0SXRlbSh0aGlzLml0ZW1zLmxlbmd0aCAtIDIpICsgdGhpcy5pdGVtcy5nZXRJdGVtKHRoaXMuaXRlbXMubGVuZ3RoIC0gMSkpO1xuICAgIH1cbn0iXX0=