"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.hint = "my Hint";
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "hint", {
        get: function () {
            return this._hint;
        },
        set: function (value) {
            if (this._hint !== value) {
                this._hint = value;
                this.notifyPropertyChange('hint', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTJDO0FBRTNDO0lBQXFDLG1DQUFVO0lBSTNDO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBREcsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7O0lBQzFCLENBQUM7SUFFRCxzQkFBSSxpQ0FBSTthQUFSO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQUVELFVBQVMsS0FBYTtZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQzVDLENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVFMLHNCQUFDO0FBQUQsQ0FBQyxBQXBCRCxDQUFxQyx1QkFBVSxHQW9COUM7QUFwQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5cbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxuICAgIHByaXZhdGUgX2hpbnQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuaGludCA9IFwibXkgSGludFwiO1xuICAgIH1cblxuICAgIGdldCBoaW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaW50O1xuICAgIH1cbiAgICBcbiAgICBzZXQgaGludCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLl9oaW50ICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faGludCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgnaGludCcsIHZhbHVlKVxuICAgICAgICB9XG4gICAgfVxufSJdfQ==