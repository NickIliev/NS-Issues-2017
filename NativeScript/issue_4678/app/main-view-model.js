"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.myItems = [1, 2, 3, 4, 5, 6, 7, 8];
        _this.myNewItems = [1, 2, 3, 4, 5, 6, 7, 8];
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "myItems", {
        get: function () {
            return this._myItems;
        },
        set: function (value) {
            if (this._myItems !== value) {
                this._myItems = value;
                this.notifyPropertyChange('myItems', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelloWorldModel.prototype, "myNewItems", {
        get: function () {
            return this._myNewItems;
        },
        set: function (value) {
            if (this._myNewItems !== value) {
                this._myNewItems = value;
                this.notifyPropertyChange('myNewItems', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDO0lBQXFDLG1DQUFVO0lBSzNDO1FBQUEsWUFDSSxpQkFBTyxTQUlWO1FBRkcsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QyxLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztJQUMvQyxDQUFDO0lBRUQsc0JBQUksb0NBQU87YUFBWDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFFRCxVQUFZLEtBQWlCO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDL0MsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU0Qsc0JBQUksdUNBQVU7YUFBZDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7YUFFRCxVQUFlLEtBQWlCO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDbEQsQ0FBQztRQUNMLENBQUM7OztPQVBBO0lBU0wsc0JBQUM7QUFBRCxDQUFDLEFBbENELENBQXFDLHVCQUFVLEdBa0M5QztBQWxDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwcml2YXRlIF9teUl0ZW1zOiBBcnJheTxhbnk+O1xuICAgIHByaXZhdGUgX215TmV3SXRlbXM6IEFycmF5PGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLm15SXRlbXMgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOF07XG4gICAgICAgIHRoaXMubXlOZXdJdGVtcyA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4XTtcbiAgICB9XG5cbiAgICBnZXQgbXlJdGVtcygpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX215SXRlbXM7XG4gICAgfVxuXG4gICAgc2V0IG15SXRlbXModmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKHRoaXMuX215SXRlbXMgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9teUl0ZW1zID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCdteUl0ZW1zJywgdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbXlOZXdJdGVtcygpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX215TmV3SXRlbXM7XG4gICAgfVxuXG4gICAgc2V0IG15TmV3SXRlbXModmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKHRoaXMuX215TmV3SXRlbXMgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9teU5ld0l0ZW1zID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCdteU5ld0l0ZW1zJywgdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=