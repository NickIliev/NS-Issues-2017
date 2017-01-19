"use strict";
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.pdfUrl = "http://quranmalayalam.com/files/quran_ml_full.pdf";
        return _this;
    }
    Object.defineProperty(HelloWorldModel.prototype, "pdfUrl", {
        get: function () {
            return this._pdfUrl;
        },
        set: function (value) {
            if (this._pdfUrl !== value) {
                this._pdfUrl = value;
                this.notifyPropertyChange('pdfUrl', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    HelloWorldModel.prototype.onLoad = function () {
        console.log("PDF file loaded");
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBMkM7QUFFM0M7SUFBcUMsbUNBQVU7SUFLM0M7UUFBQSxZQUNJLGlCQUFPLFNBR1Y7UUFERyxLQUFJLENBQUMsTUFBTSxHQUFHLG1EQUFtRCxDQUFDOztJQUN0RSxDQUFDO0lBRUQsc0JBQUksbUNBQU07YUFBVjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFXLEtBQWE7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUM5QyxDQUFDO1FBQ0wsQ0FBQzs7O09BUEE7SUFTTSxnQ0FBTSxHQUFiO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTCxzQkFBQztBQUFELENBQUMsQUExQkQsQ0FBcUMsdUJBQVUsR0EwQjlDO0FBMUJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwcml2YXRlIF9wZGZVcmw6IHN0cmluZztcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5wZGZVcmwgPSBcImh0dHA6Ly9xdXJhbm1hbGF5YWxhbS5jb20vZmlsZXMvcXVyYW5fbWxfZnVsbC5wZGZcIjtcbiAgICB9XG5cbiAgICBnZXQgcGRmVXJsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZGZVcmw7XG4gICAgfVxuICAgIFxuICAgIHNldCBwZGZVcmwodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5fcGRmVXJsICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fcGRmVXJsID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5Q2hhbmdlKCdwZGZVcmwnLCB2YWx1ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkxvYWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUERGIGZpbGUgbG9hZGVkXCIpO1xuICAgIH1cblxufSJdfQ==