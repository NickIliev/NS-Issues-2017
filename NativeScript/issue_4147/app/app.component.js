"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("platform");
var enums_1 = require("ui/enums");
var isTablet = (platform_1.device.deviceType == enums_1.DeviceType.Tablet);
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "ns-app",
        moduleId: module.id,
        templateUrl: "./app.component.html",
        styleUrls: ['./phone.css']
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFDMUMscUNBQWtDO0FBQ2xDLGtDQUFzQztBQUV0QyxJQUFNLFFBQVEsR0FBWSxDQUFDLGlCQUFNLENBQUMsVUFBVSxJQUFJLGtCQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7QUFRbkUsSUFBYSxZQUFZO0lBQXpCO0lBQTRCLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFBN0IsSUFBNkI7QUFBaEIsWUFBWTtJQU54QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFFBQVE7UUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSxzQkFBc0I7UUFDbkMsU0FBUyxFQUFFLENBQUUsYUFBYSxDQUFDO0tBQzlCLENBQUM7R0FDVyxZQUFZLENBQUk7QUFBaEIsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgZGV2aWNlIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgeyBEZXZpY2VUeXBlIH0gZnJvbSBcInVpL2VudW1zXCI7XG5cbmNvbnN0IGlzVGFibGV0OiBib29sZWFuID0gKGRldmljZS5kZXZpY2VUeXBlID09IERldmljZVR5cGUuVGFibGV0KTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtYXBwXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FwcC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWyAnLi9waG9uZS5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgeyB9XG4iXX0=