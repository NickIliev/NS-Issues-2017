"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("data/observable-array");
var router_1 = require("nativescript-angular/router");
var car_service_1 = require("./shared/car.service");
/* ***********************************************************
* This is the master list component in the master-detail structure.
* This component gets the data, passes it to the master view and displays it in a list.
* It also handles the navigation to the details page for each item.
*************************************************************/
var CarListComponent = /** @class */ (function () {
    function CarListComponent(_carService, _routerExtensions) {
        this._carService = _carService;
        this._routerExtensions = _routerExtensions;
        this._isLoading = false;
        this._cars = new observable_array_1.ObservableArray([]);
    }
    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    CarListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._isLoading = true;
        /* ***********************************************************
        * The data is retrieved remotely from FireBase.
        * The actual data retrieval code is wrapped in a data service.
        * Check out the service in cars/shared/car.service.ts
        *************************************************************/
        this._carService.load()
            .finally(function () { return _this._isLoading = false; })
            .subscribe(function (cars) {
            _this._cars = new observable_array_1.ObservableArray(cars);
            _this._isLoading = false;
        });
    };
    Object.defineProperty(CarListComponent.prototype, "cars", {
        get: function () {
            return this._cars;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarListComponent.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * Use the "itemTap" event handler of the <RadListView> to navigate to the
    * item details page. Retrieve a reference for the data item (the id) and pass it
    * to the item details page, so that it can identify which data item to display.
    * Learn more about navigating with a parameter in this documentation article:
    * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
    *************************************************************/
    CarListComponent.prototype.onCarItemTap = function (args) {
        var tappedCarItem = args.view.bindingContext;
        this._routerExtensions.navigate(["/cars/car-detail", tappedCarItem.id], {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    };
    CarListComponent = __decorate([
        core_1.Component({
            selector: "CarsList",
            moduleId: module.id,
            templateUrl: "./car-list.component.html",
            styleUrls: ["./car-list.component.css"]
        }),
        __metadata("design:paramtypes", [car_service_1.CarService,
            router_1.RouterExtensions])
    ], CarListComponent);
    return CarListComponent;
}());
exports.CarListComponent = CarListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBEQUF3RDtBQUN4RCxzREFBK0Q7QUFJL0Qsb0RBQWtEO0FBRWxEOzs7OzhEQUk4RDtBQU85RDtJQUlJLDBCQUNZLFdBQXVCLEVBQ3ZCLGlCQUFtQztRQURuQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBTHZDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsVUFBSyxHQUF5QixJQUFJLGtDQUFlLENBQU0sRUFBRSxDQUFDLENBQUM7SUFLL0QsQ0FBQztJQUVMOzs7a0VBRzhEO0lBQzlELG1DQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXZCOzs7O3NFQUk4RDtRQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTthQUNsQixPQUFPLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxFQUF2QixDQUF1QixDQUFDO2FBQ3RDLFNBQVMsQ0FBQyxVQUFDLElBQWdCO1lBQ3hCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELHNCQUFJLGtDQUFJO2FBQVI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFTO2FBQWI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVEOzs7Ozs7a0VBTThEO0lBQzlELHVDQUFZLEdBQVosVUFBYSxJQUF1QjtRQUNoQyxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUUvQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQyxFQUN0RTtZQUNJLFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxPQUFPO2dCQUNiLFFBQVEsRUFBRSxHQUFHO2dCQUNiLEtBQUssRUFBRSxNQUFNO2FBQ2hCO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXhEUSxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQzFDLENBQUM7eUNBTTJCLHdCQUFVO1lBQ0oseUJBQWdCO09BTnRDLGdCQUFnQixDQXlENUI7SUFBRCx1QkFBQztDQUFBLEFBekRELElBeURDO0FBekRZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9saXN0dmlld1wiO1xuXG5pbXBvcnQgeyBDYXIgfSBmcm9tIFwiLi9zaGFyZWQvY2FyLm1vZGVsXCI7XG5pbXBvcnQgeyBDYXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL2Nhci5zZXJ2aWNlXCI7XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIFRoaXMgaXMgdGhlIG1hc3RlciBsaXN0IGNvbXBvbmVudCBpbiB0aGUgbWFzdGVyLWRldGFpbCBzdHJ1Y3R1cmUuXG4qIFRoaXMgY29tcG9uZW50IGdldHMgdGhlIGRhdGEsIHBhc3NlcyBpdCB0byB0aGUgbWFzdGVyIHZpZXcgYW5kIGRpc3BsYXlzIGl0IGluIGEgbGlzdC5cbiogSXQgYWxzbyBoYW5kbGVzIHRoZSBuYXZpZ2F0aW9uIHRvIHRoZSBkZXRhaWxzIHBhZ2UgZm9yIGVhY2ggaXRlbS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJDYXJzTGlzdFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jYXItbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9jYXItbGlzdC5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIENhckxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHByaXZhdGUgX2lzTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2NhcnM6IE9ic2VydmFibGVBcnJheTxDYXI+ID0gbmV3IE9ic2VydmFibGVBcnJheTxDYXI+KFtdKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9jYXJTZXJ2aWNlOiBDYXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zXG4gICAgKSB7IH1cblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGdldCB0aGUgZGF0YSBhbmQgYXNzaWduIGl0IHRvIHRoZVxuICAgICogcHJpdmF0ZSBwcm9wZXJ0eSB0aGF0IGhvbGRzIGl0IGluc2lkZSB0aGUgY29tcG9uZW50LlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2lzTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBUaGUgZGF0YSBpcyByZXRyaWV2ZWQgcmVtb3RlbHkgZnJvbSBGaXJlQmFzZS5cbiAgICAgICAgKiBUaGUgYWN0dWFsIGRhdGEgcmV0cmlldmFsIGNvZGUgaXMgd3JhcHBlZCBpbiBhIGRhdGEgc2VydmljZS5cbiAgICAgICAgKiBDaGVjayBvdXQgdGhlIHNlcnZpY2UgaW4gY2Fycy9zaGFyZWQvY2FyLnNlcnZpY2UudHNcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgdGhpcy5fY2FyU2VydmljZS5sb2FkKClcbiAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHRoaXMuX2lzTG9hZGluZyA9IGZhbHNlKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY2FyczogQXJyYXk8Q2FyPikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhcnMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KGNhcnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IGNhcnMoKTogT2JzZXJ2YWJsZUFycmF5PENhcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FycztcbiAgICB9XG5cbiAgICBnZXQgaXNMb2FkaW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNMb2FkaW5nO1xuICAgIH1cblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBVc2UgdGhlIFwiaXRlbVRhcFwiIGV2ZW50IGhhbmRsZXIgb2YgdGhlIDxSYWRMaXN0Vmlldz4gdG8gbmF2aWdhdGUgdG8gdGhlXG4gICAgKiBpdGVtIGRldGFpbHMgcGFnZS4gUmV0cmlldmUgYSByZWZlcmVuY2UgZm9yIHRoZSBkYXRhIGl0ZW0gKHRoZSBpZCkgYW5kIHBhc3MgaXRcbiAgICAqIHRvIHRoZSBpdGVtIGRldGFpbHMgcGFnZSwgc28gdGhhdCBpdCBjYW4gaWRlbnRpZnkgd2hpY2ggZGF0YSBpdGVtIHRvIGRpc3BsYXkuXG4gICAgKiBMZWFybiBtb3JlIGFib3V0IG5hdmlnYXRpbmcgd2l0aCBhIHBhcmFtZXRlciBpbiB0aGlzIGRvY3VtZW50YXRpb24gYXJ0aWNsZTpcbiAgICAqIGh0dHA6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvYW5ndWxhci9jb3JlLWNvbmNlcHRzL2FuZ3VsYXItbmF2aWdhdGlvbi5odG1sI3Bhc3NpbmctcGFyYW1ldGVyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBvbkNhckl0ZW1UYXAoYXJnczogTGlzdFZpZXdFdmVudERhdGEpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGFwcGVkQ2FySXRlbSA9IGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dDtcblxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jYXJzL2Nhci1kZXRhaWxcIiwgdGFwcGVkQ2FySXRlbS5pZF0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=