"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        // Initialize default values.
        _this.myItems = [{ age: 34 }, { age: 25 }, {}, { age: 37 }];
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "myItems", {
        get: function () {
            return this._myItems;
        },
        set: function (value) {
            if (this._myItems !== value) {
                this._myItems = value;
                this.notifyPropertyChange('myItems', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTJDO0FBRTNDO0lBQXFDLG1DQUFVO0lBSTNDO1FBQUEsWUFDSSxpQkFBTyxTQUlWO1FBRkcsNkJBQTZCO1FBQzdCLEtBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFFLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQzs7SUFDbkQsQ0FBQztJQUVELHNCQUFJLG9DQUFPO2FBQVg7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO2FBRUQsVUFBWSxLQUFpQjtZQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQy9DLENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVNMLHNCQUFDO0FBQUQsQ0FBQyxBQXRCRCxDQUFxQyx1QkFBVSxHQXNCOUM7QUF0QlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5cbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkTW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcblxuICAgIHByaXZhdGUgX215SXRlbXM6IEFycmF5PGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGRlZmF1bHQgdmFsdWVzLlxuICAgICAgICB0aGlzLm15SXRlbXMgPSBbe2FnZTozNH0se2FnZToyNX0se30se2FnZTozN31dO1xuICAgIH1cblxuICAgIGdldCBteUl0ZW1zKCk6IEFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXlJdGVtcztcbiAgICB9XG4gICAgXG4gICAgc2V0IG15SXRlbXModmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKHRoaXMuX215SXRlbXMgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9teUl0ZW1zID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCdteUl0ZW1zJywgdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=