"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(text, isItemVisible) {
        var _this = _super.call(this) || this;
        _this.text = text;
        _this.isItemVisible = isItemVisible;
        return _this;
    }
    Item.prototype.toggleVisibility = function (args) {
        console.dir(this);
        console.log(args.object);
        console.log("toggleVisibility value: " + this.isItemVisible);
        this.set("isItemVisible", !this.isItemVisible);
    };
    return Item;
}(observable_1.Observable));
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.items = [
            new Item("1", true),
            new Item("2", true),
            new Item("3", true),
            new Item("4", true),
        ];
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
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQXlEO0FBR3pEO0lBQW1CLHdCQUFVO0lBRXpCLGNBQW1CLElBQVksRUFBUyxhQUFzQjtRQUE5RCxZQUNJLGlCQUFPLFNBQ1Y7UUFGa0IsVUFBSSxHQUFKLElBQUksQ0FBUTtRQUFTLG1CQUFhLEdBQWIsYUFBYSxDQUFTOztJQUU5RCxDQUFDO0lBRU0sK0JBQWdCLEdBQXZCLFVBQXdCLElBQUk7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6QixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU3RCxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFmRCxDQUFtQix1QkFBVSxHQWU1QjtBQUVEO0lBQXFDLG1DQUFVO0lBTzNDO1FBQUEsWUFDSSxpQkFBTyxTQVFWO1FBTkcsS0FBSSxDQUFDLEtBQUssR0FBRztZQUNULElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7WUFDbkIsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztZQUNuQixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO1lBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7U0FDdEIsQ0FBQTs7SUFDTCxDQUFDO0lBRUQsc0JBQUksMENBQWE7YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMvQixDQUFDO2FBRUQsVUFBa0IsS0FBYztZQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3JELENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVNMLHNCQUFDO0FBQUQsQ0FBQyxBQTdCRCxDQUFxQyx1QkFBVSxHQTZCOUM7QUE3QlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tT2JqZWN0IH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcblxuXG5jbGFzcyBJdGVtIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGV4dDogc3RyaW5nLCBwdWJsaWMgaXNJdGVtVmlzaWJsZTogYm9vbGVhbikgeyBcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlVmlzaWJpbGl0eShhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3Mub2JqZWN0KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcInRvZ2dsZVZpc2liaWxpdHkgdmFsdWU6IFwiICsgdGhpcy5pc0l0ZW1WaXNpYmxlKTtcblxuICAgICAgICB0aGlzLnNldChcImlzSXRlbVZpc2libGVcIiwgIXRoaXMuaXNJdGVtVmlzaWJsZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwcml2YXRlIF9pc0l0ZW1WaXNpYmxlOiBib29sZWFuO1xuICAgIHByaXZhdGUgX2lzU3BlY2lmaWNDZWxsVmlzaWJsZVxuXG4gICAgcHVibGljIGl0ZW1zOiBBcnJheTxhbnk+XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLml0ZW1zID0gW1xuICAgICAgICAgICAgbmV3IEl0ZW0oXCIxXCIsIHRydWUpLFxuICAgICAgICAgICAgbmV3IEl0ZW0oXCIyXCIsIHRydWUpLFxuICAgICAgICAgICAgbmV3IEl0ZW0oXCIzXCIsIHRydWUpLFxuICAgICAgICAgICAgbmV3IEl0ZW0oXCI0XCIsIHRydWUpLFxuICAgICAgICBdXG4gICAgfVxuXG4gICAgZ2V0IGlzSXRlbVZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0l0ZW1WaXNpYmxlO1xuICAgIH1cblxuICAgIHNldCBpc0l0ZW1WaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0l0ZW1WaXNpYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faXNJdGVtVmlzaWJsZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnaXNJdGVtVmlzaWJsZScsIHZhbHVlKVxuICAgICAgICB9XG4gICAgfVxuXG59Il19