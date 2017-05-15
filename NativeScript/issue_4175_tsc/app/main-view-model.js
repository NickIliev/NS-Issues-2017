"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.checked = false;
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (value) {
            if (this._checked !== value) {
                this._checked = value;
                this.notifyPropertyChange('checked', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDO0lBQXFDLG1DQUFVO0lBSTNDO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBREcsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7O0lBQ3pCLENBQUM7SUFFRCxzQkFBSSxvQ0FBTzthQUFYO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQVksS0FBYztZQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQy9DLENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVFMLHNCQUFDO0FBQUQsQ0FBQyxBQXBCRCxDQUFxQyx1QkFBVSxHQW9COUM7QUFwQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuXG4gICAgcHJpdmF0ZSBfY2hlY2tlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBjaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tlZDtcbiAgICB9XG5cbiAgICBzZXQgY2hlY2tlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fY2hlY2tlZCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2UoJ2NoZWNrZWQnLCB2YWx1ZSlcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=