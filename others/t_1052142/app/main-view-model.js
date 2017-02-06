"use strict";
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.items = [];
        _this.items2 = [];
        _this.items = [1111, 2222, 3333, 4444, 5555, 6666, 7777];
        _this.items2 = ["aaa", "bbb", "ccc", "ddd", "eee", "fff", "ggg"];
        return _this;
    }
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBNkM7QUFHN0M7SUFBcUMsbUNBQVU7SUFJM0M7UUFBQSxZQUNJLGlCQUFPLFNBTVY7UUFUTSxXQUFLLEdBQWUsRUFBRSxDQUFDO1FBQ3ZCLFlBQU0sR0FBZSxFQUFFLENBQUM7UUFJM0IsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXhELEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzs7SUFFcEUsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQVpELENBQXFDLHVCQUFVLEdBWTlDO0FBWlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCAqIGFzIGh0dHBNb2R1bGUgZnJvbSBcImh0dHBcIjtcblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgcHVibGljIGl0ZW1zOiBBcnJheTxhbnk+ID0gW107XG4gICAgcHVibGljIGl0ZW1zMjogQXJyYXk8YW55PiA9IFtdO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbMTExMSwgMjIyMiwgMzMzMywgNDQ0NCwgNTU1NSwgNjY2NiwgNzc3N107XG5cbiAgICAgICAgdGhpcy5pdGVtczIgPSBbXCJhYWFcIiwgXCJiYmJcIiwgXCJjY2NcIiwgXCJkZGRcIiwgXCJlZWVcIiwgXCJmZmZcIiwgXCJnZ2dcIl07XG5cbiAgICB9XG59Il19