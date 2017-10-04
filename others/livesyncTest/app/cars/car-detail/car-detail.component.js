"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
require("rxjs/add/operator/switchMap");
var car_service_1 = require("../shared/car.service");
/* ***********************************************************
* This is the item details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
*************************************************************/
var CarDetailComponent = /** @class */ (function () {
    function CarDetailComponent(_carService, _pageRoute, _routerExtensions) {
        this._carService = _carService;
        this._pageRoute = _pageRoute;
        this._routerExtensions = _routerExtensions;
    }
    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    CarDetailComponent.prototype.ngOnInit = function () {
        var carId = "";
        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .switchMap(function (activatedRoute) { return activatedRoute.params; })
            .forEach(function (params) {
            carId = params.id;
        });
        this._car = this._carService.getCarById(carId);
    };
    Object.defineProperty(CarDetailComponent.prototype, "car", {
        get: function () {
            return this._car;
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    CarDetailComponent.prototype.onBackButtonTap = function () {
        this._routerExtensions.backToPreviousPage();
    };
    /* ***********************************************************
    * The master-detail template comes with an example of an item edit page.
    * Check out the edit page in the /cars/car-detail-edit folder.
    *************************************************************/
    CarDetailComponent.prototype.onEditButtonTap = function () {
        this._routerExtensions.navigate(["/cars/car-detail-edit", this._car.id], {
            animated: true,
            transition: {
                name: "slideTop",
                duration: 200,
                curve: "ease"
            }
        });
    };
    CarDetailComponent = __decorate([
        core_1.Component({
            selector: "CarDetail",
            moduleId: module.id,
            templateUrl: "./car-detail.component.html"
        }),
        __metadata("design:paramtypes", [car_service_1.CarService,
            router_1.PageRoute,
            router_1.RouterExtensions])
    ], CarDetailComponent);
    return CarDetailComponent;
}());
exports.CarDetailComponent = CarDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXItZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBMEU7QUFDMUUsdUNBQXFDO0FBR3JDLHFEQUFtRDtBQUVuRDs7Ozs4REFJOEQ7QUFNOUQ7SUFHSSw0QkFDWSxXQUF1QixFQUN2QixVQUFxQixFQUNyQixpQkFBbUM7UUFGbkMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUNyQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO0lBQzNDLENBQUM7SUFFTDs7OztrRUFJOEQ7SUFDOUQscUNBQVEsR0FBUjtRQUNJLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVmOzs7c0VBRzhEO1FBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYzthQUN6QixTQUFTLENBQUMsVUFBQyxjQUFjLElBQUssT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQixDQUFDO2FBQ3BELE9BQU8sQ0FBQyxVQUFDLE1BQU07WUFDWixLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELHNCQUFJLG1DQUFHO2FBQVA7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUVEOztrRUFFOEQ7SUFDOUQsNENBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRDs7O2tFQUc4RDtJQUM5RCw0Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ3ZFO1lBQ0ksUUFBUSxFQUFFLElBQUk7WUFDZCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFFBQVEsRUFBRSxHQUFHO2dCQUNiLEtBQUssRUFBRSxNQUFNO2FBQ2hCO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXZEUSxrQkFBa0I7UUFMOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1NBQzdDLENBQUM7eUNBSzJCLHdCQUFVO1lBQ1gsa0JBQVM7WUFDRix5QkFBZ0I7T0FOdEMsa0JBQWtCLENBd0Q5QjtJQUFELHlCQUFDO0NBQUEsQUF4REQsSUF3REM7QUF4RFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGFnZVJvdXRlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwXCI7XG5cbmltcG9ydCB7IENhciB9IGZyb20gXCIuLi9zaGFyZWQvY2FyLm1vZGVsXCI7XG5pbXBvcnQgeyBDYXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jYXIuc2VydmljZVwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBUaGlzIGlzIHRoZSBpdGVtIGRldGFpbHMgY29tcG9uZW50IGluIHRoZSBtYXN0ZXItZGV0YWlsIHN0cnVjdHVyZS5cbiogVGhpcyBjb21wb25lbnQgcmV0cmlldmVzIHRoZSBwYXNzZWQgcGFyYW1ldGVyIGZyb20gdGhlIG1hc3RlciBsaXN0IGNvbXBvbmVudCxcbiogZmluZHMgdGhlIGRhdGEgaXRlbSBieSB0aGlzIHBhcmFtZXRlciBhbmQgZGlzcGxheXMgdGhlIGRldGFpbGVkIGRhdGEgaXRlbSBpbmZvcm1hdGlvbi5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJDYXJEZXRhaWxcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2FyLWRldGFpbC5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIENhckRldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHJpdmF0ZSBfY2FyOiBDYXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfY2FyU2VydmljZTogQ2FyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfcGFnZVJvdXRlOiBQYWdlUm91dGUsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnNcbiAgICApIHsgfVxuXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gZ2V0IHRoZSBkYXRhIGl0ZW0gaWQgcGFyYW1ldGVyIHBhc3NlZCB0aHJvdWdoIG5hdmlnYXRpb24uXG4gICAgKiBHZXQgdGhlIGRhdGEgaXRlbSBkZXRhaWxzIGZyb20gdGhlIGRhdGEgc2VydmljZSB1c2luZyB0aGlzIGlkIGFuZCBhc3NpZ24gaXQgdG8gdGhlXG4gICAgKiBwcml2YXRlIHByb3BlcnR5IHRoYXQgaG9sZHMgaXQgaW5zaWRlIHRoZSBjb21wb25lbnQuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNhcklkID0gXCJcIjtcblxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIExlYXJuIG1vcmUgYWJvdXQgaG93IHRvIGdldCBuYXZpZ2F0aW9uIHBhcmFtZXRlcnMgaW4gdGhpcyBkb2N1bWVudGF0aW9uIGFydGljbGU6XG4gICAgICAgICogaHR0cDovL2RvY3MubmF0aXZlc2NyaXB0Lm9yZy9hbmd1bGFyL2NvcmUtY29uY2VwdHMvYW5ndWxhci1uYXZpZ2F0aW9uLmh0bWwjcGFzc2luZy1wYXJhbWV0ZXJcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgdGhpcy5fcGFnZVJvdXRlLmFjdGl2YXRlZFJvdXRlXG4gICAgICAgICAgICAuc3dpdGNoTWFwKChhY3RpdmF0ZWRSb3V0ZSkgPT4gYWN0aXZhdGVkUm91dGUucGFyYW1zKVxuICAgICAgICAgICAgLmZvckVhY2goKHBhcmFtcykgPT4ge1xuICAgICAgICAgICAgICAgIGNhcklkID0gcGFyYW1zLmlkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fY2FyID0gdGhpcy5fY2FyU2VydmljZS5nZXRDYXJCeUlkKGNhcklkKTtcbiAgICB9XG5cbiAgICBnZXQgY2FyKCk6IENhciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYXI7XG4gICAgfVxuXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFRoZSBiYWNrIGJ1dHRvbiBpcyBlc3NlbnRpYWwgZm9yIGEgbWFzdGVyLWRldGFpbCBmZWF0dXJlLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgb25CYWNrQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuICAgIH1cblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBUaGUgbWFzdGVyLWRldGFpbCB0ZW1wbGF0ZSBjb21lcyB3aXRoIGFuIGV4YW1wbGUgb2YgYW4gaXRlbSBlZGl0IHBhZ2UuXG4gICAgKiBDaGVjayBvdXQgdGhlIGVkaXQgcGFnZSBpbiB0aGUgL2NhcnMvY2FyLWRldGFpbC1lZGl0IGZvbGRlci5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIG9uRWRpdEJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY2Fycy9jYXItZGV0YWlsLWVkaXRcIiwgdGhpcy5fY2FyLmlkXSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVRvcFwiLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==