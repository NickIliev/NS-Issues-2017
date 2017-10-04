"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var car_model_1 = require("./car.model");
var car_service_1 = require("./car.service");
var CarEditService = /** @class */ (function () {
    function CarEditService(_carService) {
        this._carService = _carService;
    }
    CarEditService.prototype.startEdit = function (id) {
        this._editModel = null;
        return this.getEditableCarById(id);
    };
    CarEditService.prototype.getEditableCarById = function (id) {
        if (!this._editModel || this._editModel.id !== id) {
            var car = this._carService.getCarById(id);
            // get fresh editable copy of car model
            this._editModel = new car_model_1.Car(car);
        }
        return this._editModel;
    };
    CarEditService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [car_service_1.CarService])
    ], CarEditService);
    return CarEditService;
}());
exports.CarEditService = CarEditService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWVkaXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhci1lZGl0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MseUNBQWtDO0FBQ2xDLDZDQUEyQztBQUczQztJQUdJLHdCQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7SUFFL0Msa0NBQVMsR0FBVCxVQUFVLEVBQVU7UUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMkNBQWtCLEdBQWxCLFVBQW1CLEVBQVU7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFNUMsdUNBQXVDO1lBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxlQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFwQlEsY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQUl3Qix3QkFBVTtPQUhsQyxjQUFjLENBcUIxQjtJQUFELHFCQUFDO0NBQUEsQUFyQkQsSUFxQkM7QUFyQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmltcG9ydCB7IENhciB9IGZyb20gXCIuL2Nhci5tb2RlbFwiO1xyXG5pbXBvcnQgeyBDYXJTZXJ2aWNlIH0gZnJvbSBcIi4vY2FyLnNlcnZpY2VcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENhckVkaXRTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2VkaXRNb2RlbDogQ2FyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NhclNlcnZpY2U6IENhclNlcnZpY2UpIHt9XHJcblxyXG4gICAgc3RhcnRFZGl0KGlkOiBzdHJpbmcpOiBDYXIge1xyXG4gICAgICAgIHRoaXMuX2VkaXRNb2RlbCA9IG51bGw7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEVkaXRhYmxlQ2FyQnlJZChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWRpdGFibGVDYXJCeUlkKGlkOiBzdHJpbmcpOiBDYXIge1xyXG4gICAgICAgIGlmICghdGhpcy5fZWRpdE1vZGVsIHx8IHRoaXMuX2VkaXRNb2RlbC5pZCAhPT0gaWQpIHtcclxuICAgICAgICAgICAgY29uc3QgY2FyID0gdGhpcy5fY2FyU2VydmljZS5nZXRDYXJCeUlkKGlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBmcmVzaCBlZGl0YWJsZSBjb3B5IG9mIGNhciBtb2RlbFxyXG4gICAgICAgICAgICB0aGlzLl9lZGl0TW9kZWwgPSBuZXcgQ2FyKGNhcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdE1vZGVsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==