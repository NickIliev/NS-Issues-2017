"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
require("rxjs/add/operator/switchMap");
var dialogs_1 = require("ui/dialogs");
var car_edit_service_1 = require("../shared/car-edit.service");
var car_service_1 = require("../shared/car.service");
var constants_1 = require("./constants");
/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
var CarDetailEditComponent = /** @class */ (function () {
    function CarDetailEditComponent(_carService, _carEditService, _pageRoute, _routerExtensions) {
        this._carService = _carService;
        this._carEditService = _carEditService;
        this._pageRoute = _pageRoute;
        this._routerExtensions = _routerExtensions;
        this._carClassOptions = [];
        this._carDoorOptions = [];
        this._carSeatOptions = [];
        this._carTransmissionOptions = [];
        this._isCarImageDirty = false;
        this._isUpdating = false;
    }
    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    CarDetailEditComponent.prototype.ngOnInit = function () {
        this.initializeEditOptions();
        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        var carId = "";
        this._pageRoute.activatedRoute
            .switchMap(function (activatedRoute) { return activatedRoute.params; })
            .forEach(function (params) {
            carId = params.id;
        });
        this._car = this._carEditService.startEdit(carId);
    };
    Object.defineProperty(CarDetailEditComponent.prototype, "isUpdating", {
        get: function () {
            return this._isUpdating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditComponent.prototype, "car", {
        get: function () {
            return this._car;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditComponent.prototype, "pricePerDay", {
        get: function () {
            return this._car.price;
        },
        set: function (value) {
            // force iOS UISlider to work with discrete steps
            this._car.price = Math.round(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditComponent.prototype, "luggageValue", {
        get: function () {
            return this._car.luggage;
        },
        set: function (value) {
            // force iOS UISlider to work with discrete steps
            this._car.luggage = Math.round(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditComponent.prototype, "carClassOptions", {
        get: function () {
            return this._carClassOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditComponent.prototype, "carDoorOptions", {
        get: function () {
            return this._carDoorOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditComponent.prototype, "carSeatOptions", {
        get: function () {
            return this._carSeatOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditComponent.prototype, "carTransmissionOptions", {
        get: function () {
            return this._carTransmissionOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditComponent.prototype, "carImageUrl", {
        get: function () {
            return this._car.imageUrl;
        },
        set: function (value) {
            this._car.imageUrl = value;
            this._isCarImageDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * The edit cancel button navigates back to the item details page.
    *************************************************************/
    CarDetailEditComponent.prototype.onCancelButtonTap = function () {
        this._routerExtensions.backToPreviousPage();
    };
    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data item details.
    * Check out the data service as cars/shared/car.service.ts
    *************************************************************/
    CarDetailEditComponent.prototype.onDoneButtonTap = function () {
        /* ***********************************************************
        * By design this app is set up to work with read-only sample data.
        * Follow the steps in the "Firebase database setup" section in app/readme.md file
        * and uncomment the code block below to make it editable.
        *************************************************************/
        var _this = this;
        /* ***********************************************************
        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isCarImageDirty && this._car.imageUrl) {
            queue = queue
                .then(() => this._carService.uploadImage(this._car.imageStoragePath, this._car.imageUrl))
                .then((uploadedFile: any) => {
                    this._car.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._carService.update(this._car))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/cars"], {
                    clearHistory: true,
                    animated: true,
                    transition: {
                        name: "slideBottom",
                        duration: 200,
                        curve: "ease"
                    }
                });
            })
            .catch((errorMessage: any) => {
                this._isUpdating = false;
                alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
            });
        *************************************************************/
        /* ***********************************************************
        * Comment out the code block below if you made the app editable.
        *************************************************************/
        var readOnlyMessage = "Check out the \"Firebase database setup\" section in the readme file to make it editable."; // tslint:disable-line:max-line-length
        var queue = Promise.resolve();
        queue.then(function () { return dialogs_1.alert({ title: "Read-Only Template!", message: readOnlyMessage, okButtonText: "Ok" }); })
            .then(function () { return _this._routerExtensions.navigate(["/cars"], {
            clearHistory: true,
            animated: true,
            transition: {
                name: "slideBottom",
                duration: 200,
                curve: "ease"
            }
        }); });
    };
    CarDetailEditComponent.prototype.initializeEditOptions = function () {
        for (var _i = 0, carClassList_1 = constants_1.carClassList; _i < carClassList_1.length; _i++) {
            var classItem = carClassList_1[_i];
            this._carClassOptions.push(classItem);
        }
        for (var _a = 0, carDoorList_1 = constants_1.carDoorList; _a < carDoorList_1.length; _a++) {
            var doorItem = carDoorList_1[_a];
            this._carDoorOptions.push(doorItem);
        }
        for (var _b = 0, carSeatList_1 = constants_1.carSeatList; _b < carSeatList_1.length; _b++) {
            var seatItem = carSeatList_1[_b];
            this._carSeatOptions.push(seatItem);
        }
        for (var _c = 0, carTransmissionList_1 = constants_1.carTransmissionList; _c < carTransmissionList_1.length; _c++) {
            var transmissionItem = carTransmissionList_1[_c];
            this._carTransmissionOptions.push(transmissionItem);
        }
    };
    CarDetailEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "CarDetailEdit",
            templateUrl: "./car-detail-edit.component.html",
            styleUrls: ["./car-detail-edit.component.css"]
        }),
        __metadata("design:paramtypes", [car_service_1.CarService,
            car_edit_service_1.CarEditService,
            router_1.PageRoute,
            router_1.RouterExtensions])
    ], CarDetailEditComponent);
    return CarDetailEditComponent;
}());
exports.CarDetailEditComponent = CarDetailEditComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWRldGFpbC1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhci1kZXRhaWwtZWRpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQTBFO0FBQzFFLHVDQUFxQztBQUNyQyxzQ0FBbUM7QUFFbkMsK0RBQTREO0FBRTVELHFEQUFtRDtBQUNuRCx5Q0FBMEY7QUFFMUY7Ozs4REFHOEQ7QUFPOUQ7SUFTSSxnQ0FDWSxXQUF1QixFQUN2QixlQUErQixFQUMvQixVQUFxQixFQUNyQixpQkFBbUM7UUFIbkMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQVh2QyxxQkFBZ0IsR0FBa0IsRUFBRSxDQUFDO1FBQ3JDLG9CQUFlLEdBQWtCLEVBQUUsQ0FBQztRQUNwQyxvQkFBZSxHQUFrQixFQUFFLENBQUM7UUFDcEMsNEJBQXVCLEdBQWtCLEVBQUUsQ0FBQztRQUM1QyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7SUFPakMsQ0FBQztJQUVMOzs7O2tFQUk4RDtJQUM5RCx5Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFN0I7OztzRUFHOEQ7UUFDOUQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjO2FBQ3pCLFNBQVMsQ0FBQyxVQUFDLGNBQWMsSUFBSyxPQUFBLGNBQWMsQ0FBQyxNQUFNLEVBQXJCLENBQXFCLENBQUM7YUFDcEQsT0FBTyxDQUFDLFVBQUMsTUFBTTtZQUNaLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLElB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aXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYWdlUm91dGUsIFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL3N3aXRjaE1hcFwiO1xyXG5pbXBvcnQgeyBhbGVydCB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcblxyXG5pbXBvcnQgeyBDYXJFZGl0U2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY2FyLWVkaXQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDYXIgfSBmcm9tIFwiLi4vc2hhcmVkL2Nhci5tb2RlbFwiO1xyXG5pbXBvcnQgeyBDYXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jYXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBjYXJDbGFzc0xpc3QsIGNhckRvb3JMaXN0LCBjYXJTZWF0TGlzdCwgY2FyVHJhbnNtaXNzaW9uTGlzdCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBUaGlzIGlzIHRoZSBpdGVtIGRldGFpbCBlZGl0IGNvbXBvbmVudC5cclxuKiBUaGlzIGNvbXBvbmVudCBnZXRzIHRoZSBzZWxlY3RlZCBkYXRhIGl0ZW0sIHByb3ZpZGVzIG9wdGlvbnMgdG8gZWRpdCB0aGUgaXRlbSBhbmQgc2F2ZXMgdGhlIGNoYW5nZXMuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcIkNhckRldGFpbEVkaXRcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2FyLWRldGFpbC1lZGl0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vY2FyLWRldGFpbC1lZGl0LmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhckRldGFpbEVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSBfY2FyOiBDYXI7XHJcbiAgICBwcml2YXRlIF9jYXJDbGFzc09wdGlvbnM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIHByaXZhdGUgX2NhckRvb3JPcHRpb25zOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBwcml2YXRlIF9jYXJTZWF0T3B0aW9uczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfY2FyVHJhbnNtaXNzaW9uT3B0aW9uczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfaXNDYXJJbWFnZURpcnR5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9pc1VwZGF0aW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfY2FyU2VydmljZTogQ2FyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9jYXJFZGl0U2VydmljZTogQ2FyRWRpdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfcGFnZVJvdXRlOiBQYWdlUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9uc1xyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGdldCB0aGUgZGF0YSBpdGVtIGlkIHBhcmFtZXRlciBwYXNzZWQgdGhyb3VnaCBuYXZpZ2F0aW9uLlxyXG4gICAgKiBHZXQgdGhlIGRhdGEgaXRlbSBkZXRhaWxzIGZyb20gdGhlIGRhdGEgc2VydmljZSB1c2luZyB0aGlzIGlkIGFuZCBhc3NpZ24gaXQgdG8gdGhlXHJcbiAgICAqIHByaXZhdGUgcHJvcGVydHkgdGhhdCBob2xkcyBpdCBpbnNpZGUgdGhlIGNvbXBvbmVudC5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVFZGl0T3B0aW9ucygpO1xyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICogTGVhcm4gbW9yZSBhYm91dCBob3cgdG8gZ2V0IG5hdmlnYXRpb24gcGFyYW1ldGVycyBpbiB0aGlzIGRvY3VtZW50YXRpb24gYXJ0aWNsZTpcclxuICAgICAgICAqIGh0dHA6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvYW5ndWxhci9jb3JlLWNvbmNlcHRzL2FuZ3VsYXItbmF2aWdhdGlvbi5odG1sI3Bhc3NpbmctcGFyYW1ldGVyXHJcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICBsZXQgY2FySWQgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLl9wYWdlUm91dGUuYWN0aXZhdGVkUm91dGVcclxuICAgICAgICAgICAgLnN3aXRjaE1hcCgoYWN0aXZhdGVkUm91dGUpID0+IGFjdGl2YXRlZFJvdXRlLnBhcmFtcylcclxuICAgICAgICAgICAgLmZvckVhY2goKHBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FySWQgPSBwYXJhbXMuaWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9jYXIgPSB0aGlzLl9jYXJFZGl0U2VydmljZS5zdGFydEVkaXQoY2FySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1VwZGF0aW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VwZGF0aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYXIoKTogQ2FyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwcmljZVBlckRheSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXIucHJpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHByaWNlUGVyRGF5KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBmb3JjZSBpT1MgVUlTbGlkZXIgdG8gd29yayB3aXRoIGRpc2NyZXRlIHN0ZXBzXHJcbiAgICAgICAgdGhpcy5fY2FyLnByaWNlID0gTWF0aC5yb3VuZCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGx1Z2dhZ2VWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXIubHVnZ2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbHVnZ2FnZVZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBmb3JjZSBpT1MgVUlTbGlkZXIgdG8gd29yayB3aXRoIGRpc2NyZXRlIHN0ZXBzXHJcbiAgICAgICAgdGhpcy5fY2FyLmx1Z2dhZ2UgPSBNYXRoLnJvdW5kKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2FyQ2xhc3NPcHRpb25zKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXJDbGFzc09wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNhckRvb3JPcHRpb25zKCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXJEb29yT3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2FyU2VhdE9wdGlvbnMoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhclNlYXRPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYXJUcmFuc21pc3Npb25PcHRpb25zKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXJUcmFuc21pc3Npb25PcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYXJJbWFnZVVybCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXIuaW1hZ2VVcmw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGNhckltYWdlVXJsKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jYXIuaW1hZ2VVcmwgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9pc0NhckltYWdlRGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBlZGl0IGNhbmNlbCBidXR0b24gbmF2aWdhdGVzIGJhY2sgdG8gdGhlIGl0ZW0gZGV0YWlscyBwYWdlLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIG9uQ2FuY2VsQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVGhlIGVkaXQgZG9uZSBidXR0b24gdXNlcyB0aGUgZGF0YSBzZXJ2aWNlIHRvIHNhdmUgdGhlIHVwZGF0ZWQgdmFsdWVzIG9mIHRoZSBkYXRhIGl0ZW0gZGV0YWlscy5cclxuICAgICogQ2hlY2sgb3V0IHRoZSBkYXRhIHNlcnZpY2UgYXMgY2Fycy9zaGFyZWQvY2FyLnNlcnZpY2UudHNcclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBvbkRvbmVCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAqIEJ5IGRlc2lnbiB0aGlzIGFwcCBpcyBzZXQgdXAgdG8gd29yayB3aXRoIHJlYWQtb25seSBzYW1wbGUgZGF0YS5cclxuICAgICAgICAqIEZvbGxvdyB0aGUgc3RlcHMgaW4gdGhlIFwiRmlyZWJhc2UgZGF0YWJhc2Ugc2V0dXBcIiBzZWN0aW9uIGluIGFwcC9yZWFkbWUubWQgZmlsZVxyXG4gICAgICAgICogYW5kIHVuY29tbWVudCB0aGUgY29kZSBibG9jayBiZWxvdyB0byBtYWtlIGl0IGVkaXRhYmxlLlxyXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgbGV0IHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2lzVXBkYXRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5faXNDYXJJbWFnZURpcnR5ICYmIHRoaXMuX2Nhci5pbWFnZVVybCkge1xyXG4gICAgICAgICAgICBxdWV1ZSA9IHF1ZXVlXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLl9jYXJTZXJ2aWNlLnVwbG9hZEltYWdlKHRoaXMuX2Nhci5pbWFnZVN0b3JhZ2VQYXRoLCB0aGlzLl9jYXIuaW1hZ2VVcmwpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHVwbG9hZGVkRmlsZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FyLmltYWdlVXJsID0gdXBsb2FkZWRGaWxlLnVybDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcXVldWUudGhlbigoKSA9PiB0aGlzLl9jYXJTZXJ2aWNlLnVwZGF0ZSh0aGlzLl9jYXIpKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jYXJzXCJdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZUJvdHRvbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvck1lc3NhZ2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNVcGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoeyB0aXRsZTogXCJPb3BzIVwiLCBtZXNzYWdlOiBcIlNvbWV0aGluZyB3ZW50IHdyb25nLiBQbGVhc2UgdHJ5IGFnYWluLlwiLCBva0J1dHRvblRleHQ6IFwiT2tcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAqIENvbW1lbnQgb3V0IHRoZSBjb2RlIGJsb2NrIGJlbG93IGlmIHlvdSBtYWRlIHRoZSBhcHAgZWRpdGFibGUuXHJcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICBjb25zdCByZWFkT25seU1lc3NhZ2UgPSBcIkNoZWNrIG91dCB0aGUgXFxcIkZpcmViYXNlIGRhdGFiYXNlIHNldHVwXFxcIiBzZWN0aW9uIGluIHRoZSByZWFkbWUgZmlsZSB0byBtYWtlIGl0IGVkaXRhYmxlLlwiOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgICAgIGNvbnN0IHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgcXVldWUudGhlbigoKSA9PiBhbGVydCh7IHRpdGxlOiBcIlJlYWQtT25seSBUZW1wbGF0ZSFcIiwgbWVzc2FnZTogcmVhZE9ubHlNZXNzYWdlLCBva0J1dHRvblRleHQ6IFwiT2tcIiB9KSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY2Fyc1wiXSwge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZUJvdHRvbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVFZGl0T3B0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNsYXNzSXRlbSBvZiBjYXJDbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FyQ2xhc3NPcHRpb25zLnB1c2goY2xhc3NJdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgZG9vckl0ZW0gb2YgY2FyRG9vckxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FyRG9vck9wdGlvbnMucHVzaChkb29ySXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHNlYXRJdGVtIG9mIGNhclNlYXRMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhclNlYXRPcHRpb25zLnB1c2goc2VhdEl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCB0cmFuc21pc3Npb25JdGVtIG9mIGNhclRyYW5zbWlzc2lvbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FyVHJhbnNtaXNzaW9uT3B0aW9ucy5wdXNoKHRyYW5zbWlzc2lvbkl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=