"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.dataItems = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "dataItems", {
        get: function () {
            return this._dataItems;
        },
        set: function (value) {
            if (this._dataItems !== value) {
                this._dataItems = value;
                this.notifyPropertyChange('dataItems', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDO0lBQXFDLG1DQUFVO0lBSTNDO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBREcsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztJQUN4RCxDQUFDO0lBRUQsc0JBQUksc0NBQVM7YUFBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7YUFFRCxVQUFjLEtBQWlCO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDakQsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU0wsc0JBQUM7QUFBRCxDQUFDLEFBckJELENBQXFDLHVCQUFVLEdBcUI5QztBQXJCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwcml2YXRlIF9kYXRhSXRlbXM6IEFycmF5PGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmRhdGFJdGVtcyA9IFsxLCAxLCAyLCAzLCA1LCA4LCAxMywgMjEsIDM0LCA1NV07XG4gICAgfVxuXG4gICAgZ2V0IGRhdGFJdGVtcygpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFJdGVtcztcbiAgICB9XG5cbiAgICBzZXQgZGF0YUl0ZW1zKHZhbHVlOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhSXRlbXMgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhSXRlbXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2UoJ2RhdGFJdGVtcycsIHZhbHVlKVxuICAgICAgICB9XG4gICAgfVxuXG59Il19