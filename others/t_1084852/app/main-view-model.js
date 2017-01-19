"use strict";
var observable_1 = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.pdfUrl = "https://ia601708.us.archive.org/6/items/sreyas-ebooks/sree-vishnusahasranamasthothram.pdf";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBMkM7QUFFM0M7SUFBcUMsbUNBQVU7SUFLM0M7UUFBQSxZQUNJLGlCQUFPLFNBR1Y7UUFERyxLQUFJLENBQUMsTUFBTSxHQUFHLDJGQUEyRixDQUFDOztJQUM5RyxDQUFDO0lBRUQsc0JBQUksbUNBQU07YUFBVjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFXLEtBQWE7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUM5QyxDQUFDO1FBQ0wsQ0FBQzs7O09BUEE7SUFTTSxnQ0FBTSxHQUFiO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTCxzQkFBQztBQUFELENBQUMsQUExQkQsQ0FBcUMsdUJBQVUsR0EwQjlDO0FBMUJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG5cbiAgICBwcml2YXRlIF9wZGZVcmw6IHN0cmluZztcblxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5wZGZVcmwgPSBcImh0dHBzOi8vaWE2MDE3MDgudXMuYXJjaGl2ZS5vcmcvNi9pdGVtcy9zcmV5YXMtZWJvb2tzL3NyZWUtdmlzaG51c2FoYXNyYW5hbWFzdGhvdGhyYW0ucGRmXCI7XG4gICAgfVxuXG4gICAgZ2V0IHBkZlVybCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGRmVXJsO1xuICAgIH1cbiAgICBcbiAgICBzZXQgcGRmVXJsKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BkZlVybCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3BkZlVybCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZSgncGRmVXJsJywgdmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Mb2FkKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBERiBmaWxlIGxvYWRlZFwiKTtcbiAgICB9XG5cbn0iXX0=