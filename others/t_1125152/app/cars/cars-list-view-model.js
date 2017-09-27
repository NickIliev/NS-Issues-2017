"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var observable_property_decorator_1 = require("../shared/observable-property-decorator");
var car_service_1 = require("./shared/car-service");
/* ***********************************************************
* This is the master list view model.
*************************************************************/
var CarsListViewModel = (function (_super) {
    __extends(CarsListViewModel, _super);
    function CarsListViewModel() {
        var _this = _super.call(this) || this;
        _this.cars = new observable_array_1.ObservableArray([]);
        _this.isLoading = false;
        _this._carService = car_service_1.CarService.getInstance();
        return _this;
    }
    CarsListViewModel.prototype.load = function () {
        var _this = this;
        this.isLoading = true;
        this._carService.load()
            .finally(function () { return _this.isLoading = false; })
            .subscribe(function (cars) {
            _this.cars = new observable_array_1.ObservableArray(cars);
            _this.isLoading = false;
        });
    };
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", observable_array_1.ObservableArray)
    ], CarsListViewModel.prototype, "cars", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", Boolean)
    ], CarsListViewModel.prototype, "isLoading", void 0);
    return CarsListViewModel;
}(observable_1.Observable));
exports.CarsListViewModel = CarsListViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fycy1saXN0LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJzLWxpc3Qtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE2QztBQUM3QywwREFBd0Q7QUFHeEQseUZBQTZFO0FBRTdFLG9EQUFrRDtBQUVsRDs7OERBRThEO0FBQzlEO0lBQXVDLHFDQUFVO0lBTTdDO1FBQUEsWUFDSSxpQkFBTyxTQU1WO1FBSkcsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLGtDQUFlLENBQU0sRUFBRSxDQUFDLENBQUM7UUFDekMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIsS0FBSSxDQUFDLFdBQVcsR0FBRyx3QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDOztJQUNoRCxDQUFDO0lBRUQsZ0NBQUksR0FBSjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7YUFDbEIsT0FBTyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssRUFBdEIsQ0FBc0IsQ0FBQzthQUNyQyxTQUFTLENBQUMsVUFBQyxJQUFnQjtZQUN4QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksa0NBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUF2QnFCO1FBQXJCLGtEQUFrQixFQUFFO2tDQUFPLGtDQUFlO21EQUFNO0lBQzNCO1FBQXJCLGtEQUFrQixFQUFFOzt3REFBb0I7SUF1QjdDLHdCQUFDO0NBQUEsQUF6QkQsQ0FBdUMsdUJBQVUsR0F5QmhEO0FBekJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuXHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9zaGFyZWQvY29uZmlnXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVQcm9wZXJ0eSB9IGZyb20gXCIuLi9zaGFyZWQvb2JzZXJ2YWJsZS1wcm9wZXJ0eS1kZWNvcmF0b3JcIjtcclxuaW1wb3J0IHsgQ2FyIH0gZnJvbSBcIi4vc2hhcmVkL2Nhci1tb2RlbFwiO1xyXG5pbXBvcnQgeyBDYXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL2Nhci1zZXJ2aWNlXCI7XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFRoaXMgaXMgdGhlIG1hc3RlciBsaXN0IHZpZXcgbW9kZWwuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBjbGFzcyBDYXJzTGlzdFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gICAgQE9ic2VydmFibGVQcm9wZXJ0eSgpIGNhcnM6IE9ic2VydmFibGVBcnJheTxDYXI+O1xyXG4gICAgQE9ic2VydmFibGVQcm9wZXJ0eSgpIGlzTG9hZGluZzogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF9jYXJTZXJ2aWNlOiBDYXJTZXJ2aWNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FycyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q2FyPihbXSk7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FyU2VydmljZSA9IENhclNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FyU2VydmljZS5sb2FkKClcclxuICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4gdGhpcy5pc0xvYWRpbmcgPSBmYWxzZSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY2FyczogQXJyYXk8Q2FyPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJzID0gbmV3IE9ic2VydmFibGVBcnJheShjYXJzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==