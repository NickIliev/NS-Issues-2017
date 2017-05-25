"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.items = [{ title: "first", image: "res://icon" }, { title: "SEECOOOND", image: "res://icon" }, { title: "third", image: "res://icon" }];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTJDO0FBRTNDO0lBQXFDLG1DQUFVO0lBSTNDO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUUsWUFBWSxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBRSxZQUFZLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUE7O0lBQ2xJLENBQUM7SUFFRCxzQkFBSSxrQ0FBSzthQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzthQUVELFVBQVUsS0FBaUI7WUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUM3QyxDQUFDO1FBQ0wsQ0FBQzs7O09BUEE7SUFRTCxzQkFBQztBQUFELENBQUMsQUFwQkQsQ0FBcUMsdUJBQVUsR0FvQjlDO0FBcEJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwcml2YXRlIF9pdGVtczogQXJyYXk8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbe3RpdGxlOlwiZmlyc3RcIixpbWFnZTogXCJyZXM6Ly9pY29uXCJ9LHt0aXRsZTpcIlNFRUNPT09ORFwiLGltYWdlOiBcInJlczovL2ljb25cIn0se3RpdGxlOlwidGhpcmRcIixpbWFnZTogXCJyZXM6Ly9pY29uXCJ9XVxuICAgIH1cblxuICAgIGdldCBpdGVtcygpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICAgIH1cbiAgICBcbiAgICBzZXQgaXRlbXModmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faXRlbXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2UoJ2l0ZW1zJywgdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG59Il19