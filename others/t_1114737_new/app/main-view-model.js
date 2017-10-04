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
        // console.dir(this);
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
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDO0lBQW1CLHdCQUFVO0lBRXpCLGNBQW1CLElBQVksRUFBUyxhQUFzQjtRQUE5RCxZQUNJLGlCQUFPLFNBQ1Y7UUFGa0IsVUFBSSxHQUFKLElBQUksQ0FBUTtRQUFTLG1CQUFhLEdBQWIsYUFBYSxDQUFTOztJQUU5RCxDQUFDO0lBRU0sK0JBQWdCLEdBQXZCLFVBQXdCLElBQUk7UUFDeEIscUJBQXFCO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTdELElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQyxBQVpELENBQW1CLHVCQUFVLEdBWTVCO0FBRUQ7SUFBcUMsbUNBQVU7SUFJM0M7UUFBQSxZQUNJLGlCQUFPLFNBUVY7UUFORyxLQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztZQUNuQixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO1lBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7WUFDbkIsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztTQUN0QixDQUFBOztJQUNMLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFkRCxDQUFxQyx1QkFBVSxHQWM5QztBQWRZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5cbmNsYXNzIEl0ZW0gZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZXh0OiBzdHJpbmcsIHB1YmxpYyBpc0l0ZW1WaXNpYmxlOiBib29sZWFuKSB7IFxuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KGFyZ3MpIHtcbiAgICAgICAgLy8gY29uc29sZS5kaXIodGhpcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidG9nZ2xlVmlzaWJpbGl0eSB2YWx1ZTogXCIgKyB0aGlzLmlzSXRlbVZpc2libGUpO1xuXG4gICAgICAgIHRoaXMuc2V0KFwiaXNJdGVtVmlzaWJsZVwiLCAhdGhpcy5pc0l0ZW1WaXNpYmxlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXG4gICAgICAgICAgICBuZXcgSXRlbShcIjFcIiwgdHJ1ZSksXG4gICAgICAgICAgICBuZXcgSXRlbShcIjJcIiwgdHJ1ZSksXG4gICAgICAgICAgICBuZXcgSXRlbShcIjNcIiwgdHJ1ZSksXG4gICAgICAgICAgICBuZXcgSXRlbShcIjRcIiwgdHJ1ZSksXG4gICAgICAgIF1cbiAgICB9XG59Il19