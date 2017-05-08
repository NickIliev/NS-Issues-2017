"use strict";
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.source = ["ala"];
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "source", {
        get: function () {
            return this._source;
        },
        set: function (value) {
            if (this._source !== value) {
                this._source = value;
                this.notifyPropertyChange('source', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBMkM7QUFFM0M7SUFBcUMsbUNBQVU7SUFLM0M7UUFBQSxZQUNJLGlCQUFPLFNBR1Y7UUFERyxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7O0lBQzFCLENBQUM7SUFFRCxzQkFBSSxtQ0FBTTthQUFWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQVcsS0FBaUI7WUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUM5QyxDQUFDO1FBQ0wsQ0FBQzs7O09BUEE7SUFTTCxzQkFBQztBQUFELENBQUMsQUF0QkQsQ0FBcUMsdUJBQVUsR0FzQjlDO0FBdEJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cblxuICAgIHByaXZhdGUgX3NvdXJjZTogQXJyYXk8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc291cmNlID0gW1wiYWxhXCJdO1xuICAgIH1cblxuICAgIGdldCBzb3VyY2UoKTogQXJyYXk8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zb3VyY2U7XG4gICAgfVxuICAgIFxuICAgIHNldCBzb3VyY2UodmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKHRoaXMuX3NvdXJjZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnc291cmNlJywgdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=