"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
/* ***********************************************************
* This is the item details view model.
*************************************************************/
var CarDetailViewModel = (function (_super) {
    __extends(CarDetailViewModel, _super);
    function CarDetailViewModel(_car) {
        var _this = _super.call(this) || this;
        _this._car = _car;
        return _this;
    }
    Object.defineProperty(CarDetailViewModel.prototype, "car", {
        get: function () {
            return this._car;
        },
        enumerable: true,
        configurable: true
    });
    return CarDetailViewModel;
}(observable_1.Observable));
exports.CarDetailViewModel = CarDetailViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWRldGFpbC12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyLWRldGFpbC12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBSTdDOzs4REFFOEQ7QUFDOUQ7SUFBd0Msc0NBQVU7SUFDOUMsNEJBQW9CLElBQVM7UUFBN0IsWUFDSSxpQkFBTyxTQUNWO1FBRm1CLFVBQUksR0FBSixJQUFJLENBQUs7O0lBRTdCLENBQUM7SUFFRCxzQkFBSSxtQ0FBRzthQUFQO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFDTCx5QkFBQztBQUFELENBQUMsQUFSRCxDQUF3Qyx1QkFBVSxHQVFqRDtBQVJZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcblxyXG5pbXBvcnQgeyBDYXIgfSBmcm9tIFwiLi4vc2hhcmVkL2Nhci1tb2RlbFwiO1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBUaGlzIGlzIHRoZSBpdGVtIGRldGFpbHMgdmlldyBtb2RlbC5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGNsYXNzIENhckRldGFpbFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2FyOiBDYXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYXIoKTogQ2FyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FyO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==