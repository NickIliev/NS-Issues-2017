"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.message = "Parent binding message";
        _this.anotherMessage = "another message";
        _this.items = [1, 1, 2, 3, 5, 8, 13, 21, 34, 1, 2, 3, 5, 8, 13, 21, 34];
        return _this;
    }
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDO0lBQXFDLG1DQUFVO0lBTTNDO1FBQUEsWUFDSSxpQkFBTyxTQUtWO1FBSEcsS0FBSSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztRQUN4QyxLQUFJLENBQUMsY0FBYyxHQUFHLGlCQUFpQixDQUFDO1FBQ3hDLEtBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7O0lBQzNFLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFiRCxDQUFxQyx1QkFBVSxHQWE5QztBQWJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5cbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBhbm90aGVyTWVzc2FnZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJQYXJlbnQgYmluZGluZyBtZXNzYWdlXCI7XG4gICAgICAgIHRoaXMuYW5vdGhlck1lc3NhZ2UgPSBcImFub3RoZXIgbWVzc2FnZVwiO1xuICAgICAgICB0aGlzLml0ZW1zID0gWzEsIDEsIDIsIDMsIDUsIDgsIDEzLCAyMSwgMzQsIDEsIDIsIDMsIDUsIDgsIDEzLCAyMSwgMzRdO1xuICAgIH1cbn0iXX0=