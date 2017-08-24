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
var CarDetailComponent = (function () {
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
    * Note the "clearHistory" option that is used here. It ensures the
    * correct operation of the native OS back navigation.
    *************************************************************/
    CarDetailComponent.prototype.onBackButtonTap = function () {
        this._routerExtensions.navigate(["/cars"], { clearHistory: true });
    };
    /* ***********************************************************
    * The master-detail template comes with an example of an item edit page.
    * Check out the edit page in the /cars/car-detail-edit folder.
    *************************************************************/
    CarDetailComponent.prototype.onEditButtonTap = function () {
        this._routerExtensions.navigate(["/cars/detail-edit", this._car.id]);
    };
    return CarDetailComponent;
}());
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
exports.CarDetailComponent = CarDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXItZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBMEU7QUFDMUUsdUNBQXFDO0FBR3JDLHFEQUFtRDtBQUVuRDs7Ozs4REFJOEQ7QUFNOUQsSUFBYSxrQkFBa0I7SUFHM0IsNEJBQ1ksV0FBdUIsRUFDdkIsVUFBcUIsRUFDckIsaUJBQW1DO1FBRm5DLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtJQUMzQyxDQUFDO0lBRUw7Ozs7a0VBSThEO0lBQzlELHFDQUFRLEdBQVI7UUFDSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFZjs7O3NFQUc4RDtRQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWM7YUFDekIsU0FBUyxDQUFDLFVBQUMsY0FBYyxJQUFLLE9BQUEsY0FBYyxDQUFDLE1BQU0sRUFBckIsQ0FBcUIsQ0FBQzthQUNwRCxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQ1osS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxzQkFBSSxtQ0FBRzthQUFQO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFFRDs7OztrRUFJOEQ7SUFDOUQsNENBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7O2tFQUc4RDtJQUM5RCw0Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLEFBbERELElBa0RDO0FBbERZLGtCQUFrQjtJQUw5QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSw2QkFBNkI7S0FDN0MsQ0FBQztxQ0FLMkIsd0JBQVU7UUFDWCxrQkFBUztRQUNGLHlCQUFnQjtHQU50QyxrQkFBa0IsQ0FrRDlCO0FBbERZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZVJvdXRlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9zd2l0Y2hNYXBcIjtcclxuXHJcbmltcG9ydCB7IENhciB9IGZyb20gXCIuLi9zaGFyZWQvY2FyLm1vZGVsXCI7XHJcbmltcG9ydCB7IENhclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nhci5zZXJ2aWNlXCI7XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFRoaXMgaXMgdGhlIGl0ZW0gZGV0YWlscyBjb21wb25lbnQgaW4gdGhlIG1hc3Rlci1kZXRhaWwgc3RydWN0dXJlLlxyXG4qIFRoaXMgY29tcG9uZW50IHJldHJpZXZlcyB0aGUgcGFzc2VkIHBhcmFtZXRlciBmcm9tIHRoZSBtYXN0ZXIgbGlzdCBjb21wb25lbnQsXHJcbiogZmluZHMgdGhlIGRhdGEgaXRlbSBieSB0aGlzIHBhcmFtZXRlciBhbmQgZGlzcGxheXMgdGhlIGRldGFpbGVkIGRhdGEgaXRlbSBpbmZvcm1hdGlvbi5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJDYXJEZXRhaWxcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2Nhci1kZXRhaWwuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FyRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHByaXZhdGUgX2NhcjogQ2FyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2NhclNlcnZpY2U6IENhclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfcGFnZVJvdXRlOiBQYWdlUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9uc1xyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGdldCB0aGUgZGF0YSBpdGVtIGlkIHBhcmFtZXRlciBwYXNzZWQgdGhyb3VnaCBuYXZpZ2F0aW9uLlxyXG4gICAgKiBHZXQgdGhlIGRhdGEgaXRlbSBkZXRhaWxzIGZyb20gdGhlIGRhdGEgc2VydmljZSB1c2luZyB0aGlzIGlkIGFuZCBhc3NpZ24gaXQgdG8gdGhlXHJcbiAgICAqIHByaXZhdGUgcHJvcGVydHkgdGhhdCBob2xkcyBpdCBpbnNpZGUgdGhlIGNvbXBvbmVudC5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2FySWQgPSBcIlwiO1xyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICogTGVhcm4gbW9yZSBhYm91dCBob3cgdG8gZ2V0IG5hdmlnYXRpb24gcGFyYW1ldGVycyBpbiB0aGlzIGRvY3VtZW50YXRpb24gYXJ0aWNsZTpcclxuICAgICAgICAqIGh0dHA6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvYW5ndWxhci9jb3JlLWNvbmNlcHRzL2FuZ3VsYXItbmF2aWdhdGlvbi5odG1sI3Bhc3NpbmctcGFyYW1ldGVyXHJcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICB0aGlzLl9wYWdlUm91dGUuYWN0aXZhdGVkUm91dGVcclxuICAgICAgICAgICAgLnN3aXRjaE1hcCgoYWN0aXZhdGVkUm91dGUpID0+IGFjdGl2YXRlZFJvdXRlLnBhcmFtcylcclxuICAgICAgICAgICAgLmZvckVhY2goKHBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FySWQgPSBwYXJhbXMuaWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9jYXIgPSB0aGlzLl9jYXJTZXJ2aWNlLmdldENhckJ5SWQoY2FySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYXIoKTogQ2FyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBiYWNrIGJ1dHRvbiBpcyBlc3NlbnRpYWwgZm9yIGEgbWFzdGVyLWRldGFpbCBmZWF0dXJlLlxyXG4gICAgKiBOb3RlIHRoZSBcImNsZWFySGlzdG9yeVwiIG9wdGlvbiB0aGF0IGlzIHVzZWQgaGVyZS4gSXQgZW5zdXJlcyB0aGVcclxuICAgICogY29ycmVjdCBvcGVyYXRpb24gb2YgdGhlIG5hdGl2ZSBPUyBiYWNrIG5hdmlnYXRpb24uXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25CYWNrQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NhcnNcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBtYXN0ZXItZGV0YWlsIHRlbXBsYXRlIGNvbWVzIHdpdGggYW4gZXhhbXBsZSBvZiBhbiBpdGVtIGVkaXQgcGFnZS5cclxuICAgICogQ2hlY2sgb3V0IHRoZSBlZGl0IHBhZ2UgaW4gdGhlIC9jYXJzL2Nhci1kZXRhaWwtZWRpdCBmb2xkZXIuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25FZGl0QnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NhcnMvZGV0YWlsLWVkaXRcIiwgdGhpcy5fY2FyLmlkXSk7XHJcbiAgICB9XHJcbn1cclxuIl19