"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_property_decorator_1 = require("../../shared/observable-property-decorator");
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(options) {
        var _this = _super.call(this) || this;
        _this.id = options.id;
        _this.name = options.name;
        _this.seats = options.seats;
        _this.luggage = Number(options.luggage);
        _this.class = options.class;
        _this.hasAC = options.hasAC;
        _this.doors = Number(options.doors);
        _this.price = Number(options.price);
        _this.transmission = options.transmission;
        _this.imageUrl = options.imageUrl;
        _this.imageStoragePath = options.imageStoragePath;
        return _this;
    }
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], Car.prototype, "id", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], Car.prototype, "imageStoragePath", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], Car.prototype, "name", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], Car.prototype, "seats", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", Number)
    ], Car.prototype, "luggage", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], Car.prototype, "class", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", Boolean)
    ], Car.prototype, "hasAC", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", Number)
    ], Car.prototype, "doors", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", Number)
    ], Car.prototype, "price", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], Car.prototype, "transmission", void 0);
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], Car.prototype, "imageUrl", void 0);
    return Car;
}(observable_1.Observable));
exports.Car = Car;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDLDRGQUFnRjtBQUVoRjtJQUF5Qix1QkFBVTtJQWEvQixhQUFZLE9BQVk7UUFBeEIsWUFDSSxpQkFBTyxTQWFWO1FBWEcsS0FBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN6QixLQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLEtBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixLQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxLQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDekMsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7O0lBQ3JELENBQUM7SUExQnFCO1FBQXJCLGtEQUFrQixFQUFFOzttQ0FBWTtJQUNYO1FBQXJCLGtEQUFrQixFQUFFOztpREFBMEI7SUFDekI7UUFBckIsa0RBQWtCLEVBQUU7O3FDQUFjO0lBQ2I7UUFBckIsa0RBQWtCLEVBQUU7O3NDQUFlO0lBQ2Q7UUFBckIsa0RBQWtCLEVBQUU7O3dDQUFpQjtJQUNoQjtRQUFyQixrREFBa0IsRUFBRTs7c0NBQWU7SUFDZDtRQUFyQixrREFBa0IsRUFBRTs7c0NBQWdCO0lBQ2Y7UUFBckIsa0RBQWtCLEVBQUU7O3NDQUFlO0lBQ2Q7UUFBckIsa0RBQWtCLEVBQUU7O3NDQUFlO0lBQ2Q7UUFBckIsa0RBQWtCLEVBQUU7OzZDQUFzQjtJQUNyQjtRQUFyQixrREFBa0IsRUFBRTs7eUNBQWtCO0lBaUIzQyxVQUFDO0NBQUEsQUE1QkQsQ0FBeUIsdUJBQVUsR0E0QmxDO0FBNUJZLGtCQUFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGVQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvb2JzZXJ2YWJsZS1wcm9wZXJ0eS1kZWNvcmF0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXIgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcclxuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSBpZDogc3RyaW5nO1xyXG4gICAgQE9ic2VydmFibGVQcm9wZXJ0eSgpIGltYWdlU3RvcmFnZVBhdGg6IHN0cmluZztcclxuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSBuYW1lOiBzdHJpbmc7XHJcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgc2VhdHM6IHN0cmluZztcclxuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSBsdWdnYWdlOiBudW1iZXI7XHJcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgY2xhc3M6IHN0cmluZztcclxuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSBoYXNBQzogYm9vbGVhbjtcclxuICAgIEBPYnNlcnZhYmxlUHJvcGVydHkoKSBkb29yczogbnVtYmVyO1xyXG4gICAgQE9ic2VydmFibGVQcm9wZXJ0eSgpIHByaWNlOiBudW1iZXI7XHJcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgdHJhbnNtaXNzaW9uOiBzdHJpbmc7XHJcbiAgICBAT2JzZXJ2YWJsZVByb3BlcnR5KCkgaW1hZ2VVcmw6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBhbnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gb3B0aW9ucy5pZDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWU7XHJcbiAgICAgICAgdGhpcy5zZWF0cyA9IG9wdGlvbnMuc2VhdHM7XHJcbiAgICAgICAgdGhpcy5sdWdnYWdlID0gTnVtYmVyKG9wdGlvbnMubHVnZ2FnZSk7XHJcbiAgICAgICAgdGhpcy5jbGFzcyA9IG9wdGlvbnMuY2xhc3M7XHJcbiAgICAgICAgdGhpcy5oYXNBQyA9IG9wdGlvbnMuaGFzQUM7XHJcbiAgICAgICAgdGhpcy5kb29ycyA9IE51bWJlcihvcHRpb25zLmRvb3JzKTtcclxuICAgICAgICB0aGlzLnByaWNlID0gTnVtYmVyKG9wdGlvbnMucHJpY2UpO1xyXG4gICAgICAgIHRoaXMudHJhbnNtaXNzaW9uID0gb3B0aW9ucy50cmFuc21pc3Npb247XHJcbiAgICAgICAgdGhpcy5pbWFnZVVybCA9IG9wdGlvbnMuaW1hZ2VVcmw7XHJcbiAgICAgICAgdGhpcy5pbWFnZVN0b3JhZ2VQYXRoID0gb3B0aW9ucy5pbWFnZVN0b3JhZ2VQYXRoO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==