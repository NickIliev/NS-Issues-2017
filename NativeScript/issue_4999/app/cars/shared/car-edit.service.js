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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWVkaXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhci1lZGl0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MseUNBQWtDO0FBQ2xDLDZDQUEyQztBQUczQztJQUdJLHdCQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtJQUFHLENBQUM7SUFFL0Msa0NBQVMsR0FBVCxVQUFVLEVBQVU7UUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMkNBQWtCLEdBQWxCLFVBQW1CLEVBQVU7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFNUMsdUNBQXVDO1lBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxlQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFwQlEsY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQUl3Qix3QkFBVTtPQUhsQyxjQUFjLENBcUIxQjtJQUFELHFCQUFDO0NBQUEsQUFyQkQsSUFxQkM7QUFyQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgQ2FyIH0gZnJvbSBcIi4vY2FyLm1vZGVsXCI7XG5pbXBvcnQgeyBDYXJTZXJ2aWNlIH0gZnJvbSBcIi4vY2FyLnNlcnZpY2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhckVkaXRTZXJ2aWNlIHtcbiAgICBwcml2YXRlIF9lZGl0TW9kZWw6IENhcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NhclNlcnZpY2U6IENhclNlcnZpY2UpIHt9XG5cbiAgICBzdGFydEVkaXQoaWQ6IHN0cmluZyk6IENhciB7XG4gICAgICAgIHRoaXMuX2VkaXRNb2RlbCA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RWRpdGFibGVDYXJCeUlkKGlkKTtcbiAgICB9XG5cbiAgICBnZXRFZGl0YWJsZUNhckJ5SWQoaWQ6IHN0cmluZyk6IENhciB7XG4gICAgICAgIGlmICghdGhpcy5fZWRpdE1vZGVsIHx8IHRoaXMuX2VkaXRNb2RlbC5pZCAhPT0gaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhciA9IHRoaXMuX2NhclNlcnZpY2UuZ2V0Q2FyQnlJZChpZCk7XG5cbiAgICAgICAgICAgIC8vIGdldCBmcmVzaCBlZGl0YWJsZSBjb3B5IG9mIGNhciBtb2RlbFxuICAgICAgICAgICAgdGhpcy5fZWRpdE1vZGVsID0gbmV3IENhcihjYXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRNb2RlbDtcbiAgICB9XG59XG4iXX0=