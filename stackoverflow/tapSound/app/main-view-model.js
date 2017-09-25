"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var app = require("application");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        return _super.call(this) || this;
    }
    HelloWorldModel.prototype.onTap = function () {
        var decorView = app.android.startActivity.getWindow().getDecorView();
        decorView.playSoundEffect(android.view.SoundEffectConstants.CLICK);
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDLGlDQUFtQztBQUluQztJQUFxQyxtQ0FBVTtJQUUzQztlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQUVNLCtCQUFLLEdBQVo7UUFDSSxJQUFJLFNBQVMsR0FBUSxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUUxRSxTQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQVhELENBQXFDLHVCQUFVLEdBVzlDO0FBWFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcblxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG5kZWNsYXJlIGxldCBhbmRyb2lkOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblRhcCgpIHtcbiAgICAgICAgbGV0IGRlY29yVmlldzogYW55ID0gYXBwLmFuZHJvaWQuc3RhcnRBY3Rpdml0eS5nZXRXaW5kb3coKS5nZXREZWNvclZpZXcoKTtcbiAgICAgICAgXG4gICAgICAgIGRlY29yVmlldy5wbGF5U291bmRFZmZlY3QoYW5kcm9pZC52aWV3LlNvdW5kRWZmZWN0Q29uc3RhbnRzLkNMSUNLKTtcbiAgICB9XG59Il19