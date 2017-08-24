"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        // Initialize default values.
        _this.ObserverName = "John Smith";
        _this._LearnerName = "Jane Doe";
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "ObserverName", {
        get: function () {
            return this._ObserverName;
        },
        set: function (value) {
            if (this._ObserverName !== value) {
                this._ObserverName = value;
                this.notifyPropertyChange('ObserverName', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HelloWorldModel.prototype, "LearnerName", {
        get: function () {
            return this._LearnerName;
        },
        set: function (value) {
            if (this._LearnerName !== value) {
                this._LearnerName = value;
                this.notifyPropertyChange('LearnerName', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTJDO0FBRTNDO0lBQXFDLG1DQUFVO0lBSzNDO1FBQUEsWUFDSSxpQkFBTyxTQUtWO1FBSEcsNkJBQTZCO1FBQzdCLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDOztJQUNuQyxDQUFDO0lBRUQsc0JBQUkseUNBQVk7YUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDO2FBRUQsVUFBaUIsS0FBYTtZQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3BELENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVNELHNCQUFJLHdDQUFXO2FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO2FBRUQsVUFBZ0IsS0FBYTtZQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ25ELENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVNMLHNCQUFDO0FBQUQsQ0FBQyxBQW5DRCxDQUFxQyx1QkFBVSxHQW1DOUM7QUFuQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5cbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxuICAgIHByaXZhdGUgX0xlYXJuZXJOYW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfT2JzZXJ2ZXJOYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGRlZmF1bHQgdmFsdWVzLlxuICAgICAgICB0aGlzLk9ic2VydmVyTmFtZSA9IFwiSm9obiBTbWl0aFwiO1xuICAgICAgICB0aGlzLl9MZWFybmVyTmFtZSA9IFwiSmFuZSBEb2VcIjtcbiAgICB9XG5cbiAgICBnZXQgT2JzZXJ2ZXJOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9PYnNlcnZlck5hbWU7XG4gICAgfVxuICAgIFxuICAgIHNldCBPYnNlcnZlck5hbWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5fT2JzZXJ2ZXJOYW1lICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fT2JzZXJ2ZXJOYW1lID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCdPYnNlcnZlck5hbWUnLCB2YWx1ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBMZWFybmVyTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fTGVhcm5lck5hbWU7XG4gICAgfVxuICAgIFxuICAgIHNldCBMZWFybmVyTmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLl9MZWFybmVyTmFtZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX0xlYXJuZXJOYW1lID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCdMZWFybmVyTmFtZScsIHZhbHVlKVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbiJdfQ==