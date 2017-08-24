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
var CarListComponent = (function () {
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
        this._routerExtensions.navigate(["/cars/detail", tappedCarItem.id]);
    };
    return CarListComponent;
}());
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
exports.CarListComponent = CarListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBEQUF3RDtBQUN4RCxzREFBK0Q7QUFJL0Qsb0RBQWtEO0FBRWxEOzs7OzhEQUk4RDtBQU85RCxJQUFhLGdCQUFnQjtJQUl6QiwwQkFDWSxXQUF1QixFQUN2QixpQkFBbUM7UUFEbkMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUx2QyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLFVBQUssR0FBeUIsSUFBSSxrQ0FBZSxDQUFNLEVBQUUsQ0FBQyxDQUFDO0lBSy9ELENBQUM7SUFFTDs7O2tFQUc4RDtJQUM5RCxtQ0FBUSxHQUFSO1FBQUEsaUJBY0M7UUFiRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUV2Qjs7OztzRUFJOEQ7UUFDOUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7YUFDbEIsT0FBTyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssRUFBdkIsQ0FBdUIsQ0FBQzthQUN0QyxTQUFTLENBQUMsVUFBQyxJQUFnQjtZQUN4QixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksa0NBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxzQkFBSSxrQ0FBSTthQUFSO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBUzthQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRDs7Ozs7O2tFQU04RDtJQUM5RCx1Q0FBWSxHQUFaLFVBQWEsSUFBdUI7UUFDaEMsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFFL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBakRELElBaURDO0FBakRZLGdCQUFnQjtJQU41QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSwyQkFBMkI7UUFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7S0FDMUMsQ0FBQztxQ0FNMkIsd0JBQVU7UUFDSix5QkFBZ0I7R0FOdEMsZ0JBQWdCLENBaUQ1QjtBQWpEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvbGlzdHZpZXdcIjtcclxuXHJcbmltcG9ydCB7IENhciB9IGZyb20gXCIuL3NoYXJlZC9jYXIubW9kZWxcIjtcclxuaW1wb3J0IHsgQ2FyU2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC9jYXIuc2VydmljZVwiO1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBUaGlzIGlzIHRoZSBtYXN0ZXIgbGlzdCBjb21wb25lbnQgaW4gdGhlIG1hc3Rlci1kZXRhaWwgc3RydWN0dXJlLlxyXG4qIFRoaXMgY29tcG9uZW50IGdldHMgdGhlIGRhdGEsIHBhc3NlcyBpdCB0byB0aGUgbWFzdGVyIHZpZXcgYW5kIGRpc3BsYXlzIGl0IGluIGEgbGlzdC5cclxuKiBJdCBhbHNvIGhhbmRsZXMgdGhlIG5hdmlnYXRpb24gdG8gdGhlIGRldGFpbHMgcGFnZSBmb3IgZWFjaCBpdGVtLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIkNhcnNMaXN0XCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jYXItbGlzdC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2Nhci1saXN0LmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhckxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSBfaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9jYXJzOiBPYnNlcnZhYmxlQXJyYXk8Q2FyPiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8Q2FyPihbXSk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfY2FyU2VydmljZTogQ2FyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zXHJcbiAgICApIHsgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFVzZSB0aGUgXCJuZ09uSW5pdFwiIGhhbmRsZXIgdG8gZ2V0IHRoZSBkYXRhIGFuZCBhc3NpZ24gaXQgdG8gdGhlXHJcbiAgICAqIHByaXZhdGUgcHJvcGVydHkgdGhhdCBob2xkcyBpdCBpbnNpZGUgdGhlIGNvbXBvbmVudC5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pc0xvYWRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICogVGhlIGRhdGEgaXMgcmV0cmlldmVkIHJlbW90ZWx5IGZyb20gRmlyZUJhc2UuXHJcbiAgICAgICAgKiBUaGUgYWN0dWFsIGRhdGEgcmV0cmlldmFsIGNvZGUgaXMgd3JhcHBlZCBpbiBhIGRhdGEgc2VydmljZS5cclxuICAgICAgICAqIENoZWNrIG91dCB0aGUgc2VydmljZSBpbiBjYXJzL3NoYXJlZC9jYXIuc2VydmljZS50c1xyXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAgICAgdGhpcy5fY2FyU2VydmljZS5sb2FkKClcclxuICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4gdGhpcy5faXNMb2FkaW5nID0gZmFsc2UpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGNhcnM6IEFycmF5PENhcj4pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhcnMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KGNhcnMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYXJzKCk6IE9ic2VydmFibGVBcnJheTxDYXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FycztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNMb2FkaW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0xvYWRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBcIml0ZW1UYXBcIiBldmVudCBoYW5kbGVyIG9mIHRoZSA8UmFkTGlzdFZpZXc+IHRvIG5hdmlnYXRlIHRvIHRoZVxyXG4gICAgKiBpdGVtIGRldGFpbHMgcGFnZS4gUmV0cmlldmUgYSByZWZlcmVuY2UgZm9yIHRoZSBkYXRhIGl0ZW0gKHRoZSBpZCkgYW5kIHBhc3MgaXRcclxuICAgICogdG8gdGhlIGl0ZW0gZGV0YWlscyBwYWdlLCBzbyB0aGF0IGl0IGNhbiBpZGVudGlmeSB3aGljaCBkYXRhIGl0ZW0gdG8gZGlzcGxheS5cclxuICAgICogTGVhcm4gbW9yZSBhYm91dCBuYXZpZ2F0aW5nIHdpdGggYSBwYXJhbWV0ZXIgaW4gdGhpcyBkb2N1bWVudGF0aW9uIGFydGljbGU6XHJcbiAgICAqIGh0dHA6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvYW5ndWxhci9jb3JlLWNvbmNlcHRzL2FuZ3VsYXItbmF2aWdhdGlvbi5odG1sI3Bhc3NpbmctcGFyYW1ldGVyXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25DYXJJdGVtVGFwKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGFwcGVkQ2FySXRlbSA9IGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dDtcclxuXHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY2Fycy9kZXRhaWxcIiwgdGFwcGVkQ2FySXRlbS5pZF0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==