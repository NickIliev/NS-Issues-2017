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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBEQUF3RDtBQUN4RCxzREFBK0Q7QUFJL0Qsb0RBQWtEO0FBRWxEOzs7OzhEQUk4RDtBQU85RDtJQUlJLDBCQUNZLFdBQXVCLEVBQ3ZCLGlCQUFtQztRQURuQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBTHZDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsVUFBSyxHQUF5QixJQUFJLGtDQUFlLENBQU0sRUFBRSxDQUFDLENBQUM7SUFLL0QsQ0FBQztJQUVMOzs7a0VBRzhEO0lBQzlELG1DQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXZCOzs7O3NFQUk4RDtRQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTthQUNsQixPQUFPLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxFQUF2QixDQUF1QixDQUFDO2FBQ3RDLFNBQVMsQ0FBQyxVQUFDLElBQWdCO1lBQ3hCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELHNCQUFJLGtDQUFJO2FBQVI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFTO2FBQWI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVEOzs7Ozs7a0VBTThEO0lBQzlELHVDQUFZLEdBQVosVUFBYSxJQUF1QjtRQUNoQyxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUUvQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQyxFQUN0RTtZQUNJLFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxPQUFPO2dCQUNiLFFBQVEsRUFBRSxHQUFHO2dCQUNiLEtBQUssRUFBRSxNQUFNO2FBQ2hCO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXhEUSxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1NBQzFDLENBQUM7eUNBTTJCLHdCQUFVO1lBQ0oseUJBQWdCO09BTnRDLGdCQUFnQixDQXlENUI7SUFBRCx1QkFBQztDQUFBLEFBekRELElBeURDO0FBekRZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL2xpc3R2aWV3XCI7XG5cbmltcG9ydCB7IENhciB9IGZyb20gXCIuL3NoYXJlZC9jYXIubW9kZWxcIjtcbmltcG9ydCB7IENhclNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvY2FyLnNlcnZpY2VcIjtcblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiogVGhpcyBpcyB0aGUgbWFzdGVyIGxpc3QgY29tcG9uZW50IGluIHRoZSBtYXN0ZXItZGV0YWlsIHN0cnVjdHVyZS5cbiogVGhpcyBjb21wb25lbnQgZ2V0cyB0aGUgZGF0YSwgcGFzc2VzIGl0IHRvIHRoZSBtYXN0ZXIgdmlldyBhbmQgZGlzcGxheXMgaXQgaW4gYSBsaXN0LlxuKiBJdCBhbHNvIGhhbmRsZXMgdGhlIG5hdmlnYXRpb24gdG8gdGhlIGRldGFpbHMgcGFnZSBmb3IgZWFjaCBpdGVtLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkNhcnNMaXN0XCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2Nhci1saXN0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2Nhci1saXN0LmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQ2FyTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHJpdmF0ZSBfaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfY2FyczogT2JzZXJ2YWJsZUFycmF5PENhcj4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PENhcj4oW10pO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2NhclNlcnZpY2U6IENhclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnNcbiAgICApIHsgfVxuXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gZ2V0IHRoZSBkYXRhIGFuZCBhc3NpZ24gaXQgdG8gdGhlXG4gICAgKiBwcml2YXRlIHByb3BlcnR5IHRoYXQgaG9sZHMgaXQgaW5zaWRlIHRoZSBjb21wb25lbnQuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFRoZSBkYXRhIGlzIHJldHJpZXZlZCByZW1vdGVseSBmcm9tIEZpcmVCYXNlLlxuICAgICAgICAqIFRoZSBhY3R1YWwgZGF0YSByZXRyaWV2YWwgY29kZSBpcyB3cmFwcGVkIGluIGEgZGF0YSBzZXJ2aWNlLlxuICAgICAgICAqIENoZWNrIG91dCB0aGUgc2VydmljZSBpbiBjYXJzL3NoYXJlZC9jYXIuc2VydmljZS50c1xuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgICAgICB0aGlzLl9jYXJTZXJ2aWNlLmxvYWQoKVxuICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4gdGhpcy5faXNMb2FkaW5nID0gZmFsc2UpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChjYXJzOiBBcnJheTxDYXI+KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FycyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoY2Fycyk7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgY2FycygpOiBPYnNlcnZhYmxlQXJyYXk8Q2FyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYXJzO1xuICAgIH1cblxuICAgIGdldCBpc0xvYWRpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0xvYWRpbmc7XG4gICAgfVxuXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgXCJpdGVtVGFwXCIgZXZlbnQgaGFuZGxlciBvZiB0aGUgPFJhZExpc3RWaWV3PiB0byBuYXZpZ2F0ZSB0byB0aGVcbiAgICAqIGl0ZW0gZGV0YWlscyBwYWdlLiBSZXRyaWV2ZSBhIHJlZmVyZW5jZSBmb3IgdGhlIGRhdGEgaXRlbSAodGhlIGlkKSBhbmQgcGFzcyBpdFxuICAgICogdG8gdGhlIGl0ZW0gZGV0YWlscyBwYWdlLCBzbyB0aGF0IGl0IGNhbiBpZGVudGlmeSB3aGljaCBkYXRhIGl0ZW0gdG8gZGlzcGxheS5cbiAgICAqIExlYXJuIG1vcmUgYWJvdXQgbmF2aWdhdGluZyB3aXRoIGEgcGFyYW1ldGVyIGluIHRoaXMgZG9jdW1lbnRhdGlvbiBhcnRpY2xlOlxuICAgICogaHR0cDovL2RvY3MubmF0aXZlc2NyaXB0Lm9yZy9hbmd1bGFyL2NvcmUtY29uY2VwdHMvYW5ndWxhci1uYXZpZ2F0aW9uLmh0bWwjcGFzc2luZy1wYXJhbWV0ZXJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIG9uQ2FySXRlbVRhcChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSk6IHZvaWQge1xuICAgICAgICBjb25zdCB0YXBwZWRDYXJJdGVtID0gYXJncy52aWV3LmJpbmRpbmdDb250ZXh0O1xuXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NhcnMvY2FyLWRldGFpbFwiLCB0YXBwZWRDYXJJdGVtLmlkXSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVwiLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==