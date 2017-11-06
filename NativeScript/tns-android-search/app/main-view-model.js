"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this._items = ['apple', 'apple cider', 'apple pie', 'orange', 'orange juice', 'strawberry', 'blueberry'];
        _this.items = new observable_array_1.ObservableArray();
        _this.items.push(_this._items);
        return _this;
    }
    HelloWorldModel.prototype.filter = function (value) {
        if (value === void 0) { value = ''; }
        this.items.splice(0, this.items.length); // remove all items
        this.items.push(this._items.filter(function (i) { return -1 !== i.indexOf(value); }));
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTBDO0FBQzFDLDBEQUFxRDtBQUVyRDtJQUFxQyxtQ0FBVTtJQUszQztRQUFBLFlBQ0ksaUJBQU8sU0FFVjtRQU5PLFlBQU0sR0FBRyxDQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBRSxDQUFBO1FBQ3RHLFdBQUssR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQTtRQUloQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7O0lBQ2hDLENBQUM7SUFFRCxnQ0FBTSxHQUFOLFVBQU8sS0FBa0I7UUFBbEIsc0JBQUEsRUFBQSxVQUFrQjtRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLG1CQUFtQjtRQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQXZCLENBQXVCLENBQUUsQ0FBQyxDQUFBO0lBQ3RFLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFkRCxDQUFxQyx1QkFBVSxHQWM5QztBQWRZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdkYXRhL29ic2VydmFibGUnXHJcbmltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tICdkYXRhL29ic2VydmFibGUtYXJyYXknXHJcblxyXG5leHBvcnQgY2xhc3MgSGVsbG9Xb3JsZE1vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfaXRlbXMgPSBbICdhcHBsZScsICdhcHBsZSBjaWRlcicsICdhcHBsZSBwaWUnLCAnb3JhbmdlJywgJ29yYW5nZSBqdWljZScsICdzdHJhd2JlcnJ5JywgJ2JsdWViZXJyeScgXVxyXG4gICAgcHVibGljIGl0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheSgpXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCh0aGlzLl9pdGVtcylcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXIodmFsdWU6IHN0cmluZyA9ICcnKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoMCwgdGhpcy5pdGVtcy5sZW5ndGgpIC8vIHJlbW92ZSBhbGwgaXRlbXNcclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2godGhpcy5faXRlbXMuZmlsdGVyKGkgPT4gLTEgIT09IGkuaW5kZXhPZih2YWx1ZSkgKSlcclxuICAgIH1cclxufSJdfQ==