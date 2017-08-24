"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
require("rxjs/add/operator/switchMap");
var platform_1 = require("tns-core-modules/platform");
var dialogs_1 = require("ui/dialogs");
var car_service_1 = require("../shared/car.service");
var constants_1 = require("./constants");
/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
var CarDetailEditComponent = (function () {
    function CarDetailEditComponent(_carService, _pageRoute, _routerExtensions) {
        this._carService = _carService;
        this._pageRoute = _pageRoute;
        this._routerExtensions = _routerExtensions;
        this._carClasses = [];
        this._carDoors = [];
        this._carSeats = [];
        this._carTransmissions = [];
        this._carImageUriToUpload = null;
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
        this._car = this._carService.getCarById(carId);
    };
    Object.defineProperty(CarDetailEditComponent.prototype, "isAndroid", {
        get: function () {
            return platform_1.isAndroid;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(CarDetailEditComponent.prototype, "carClasses", {
        get: function () {
            return this._carClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditComponent.prototype, "carDoors", {
        get: function () {
            return this._carDoors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditComponent.prototype, "carSeats", {
        get: function () {
            return this._carSeats;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditComponent.prototype, "carTransmissions", {
        get: function () {
            return this._carTransmissions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarDetailEditComponent.prototype, "carLuggageValue", {
        set: function (value) {
            this._car.luggage = value;
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
        var _this = this;
        var queue = Promise.resolve();
        this._isUpdating = true;
        if (this._isCarImageDirty && this._carImageUriToUpload) {
            queue = queue
                .then(function () { return _this._carService.uploadImage(_this._car.imageStoragePath, _this._carImageUriToUpload); })
                .then(function (uploadedFile) {
                _this._car.imageUrl = uploadedFile.url;
            });
        }
        queue.then(function () { return _this._carService.update(_this._car); })
            .then(function () {
            _this._isUpdating = false;
            _this._routerExtensions.navigate(["/cars"], { clearHistory: true });
        })
            .catch(function (errorMessage) {
            _this._isUpdating = false;
            dialogs_1.alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
        });
    };
    CarDetailEditComponent.prototype.onImageAddRemove = function (args) {
        if (args.newValue) {
            this._isCarImageDirty = true;
            this._carImageUriToUpload = args.newValue;
        }
    };
    CarDetailEditComponent.prototype.initializeEditOptions = function () {
        for (var _i = 0, carClassList_1 = constants_1.carClassList; _i < carClassList_1.length; _i++) {
            var classItem = carClassList_1[_i];
            this._carClasses.push(classItem);
        }
        for (var _a = 0, carDoorList_1 = constants_1.carDoorList; _a < carDoorList_1.length; _a++) {
            var doorItem = carDoorList_1[_a];
            this._carDoors.push(doorItem);
        }
        for (var _b = 0, carSeatList_1 = constants_1.carSeatList; _b < carSeatList_1.length; _b++) {
            var seatItem = carSeatList_1[_b];
            this._carSeats.push(seatItem);
        }
        for (var _c = 0, carTransmissionList_1 = constants_1.carTransmissionList; _c < carTransmissionList_1.length; _c++) {
            var transmissionItem = carTransmissionList_1[_c];
            this._carTransmissions.push(transmissionItem);
        }
    };
    return CarDetailEditComponent;
}());
CarDetailEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "CarDetailEdit",
        templateUrl: "./car-detail-edit.component.html",
        styleUrls: ["./car-detail-edit.component.css"]
    }),
    __metadata("design:paramtypes", [car_service_1.CarService,
        router_1.PageRoute,
        router_1.RouterExtensions])
], CarDetailEditComponent);
exports.CarDetailEditComponent = CarDetailEditComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLWRldGFpbC1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhci1kZXRhaWwtZWRpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQTBFO0FBQzFFLHVDQUFxQztBQUNyQyxzREFBc0Q7QUFDdEQsc0NBQW1DO0FBR25DLHFEQUFtRDtBQUNuRCx5Q0FBMEY7QUFFMUY7Ozs4REFHOEQ7QUFPOUQsSUFBYSxzQkFBc0I7SUFVL0IsZ0NBQ1ksV0FBdUIsRUFDdkIsVUFBcUIsRUFDckIsaUJBQW1DO1FBRm5DLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQVh2QyxnQkFBVyxHQUFrQixFQUFFLENBQUM7UUFDaEMsY0FBUyxHQUFrQixFQUFFLENBQUM7UUFDOUIsY0FBUyxHQUFrQixFQUFFLENBQUM7UUFDOUIsc0JBQWlCLEdBQWtCLEVBQUUsQ0FBQztRQUN0Qyx5QkFBb0IsR0FBVyxJQUFJLENBQUM7UUFDcEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBTWpDLENBQUM7SUFFTDs7OztrRUFJOEQ7SUFDOUQseUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRTdCOzs7c0VBRzhEO1FBQzlELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYzthQUN6QixTQUFTLENBQUMsVUFBQyxjQUFjLElBQUssT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQixDQUFDO2FBQ3BELE9BQU8sQ0FBQyxVQUFDLE1BQU07WUFDWixLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxJQUFJ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c0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFBhZ2VSb3V0ZSwgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwXCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XHJcbmltcG9ydCB7IGFsZXJ0IH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcbmltcG9ydCB7IENhciB9IGZyb20gXCIuLi9zaGFyZWQvY2FyLm1vZGVsXCI7XHJcbmltcG9ydCB7IENhclNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2Nhci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGNhckNsYXNzTGlzdCwgY2FyRG9vckxpc3QsIGNhclNlYXRMaXN0LCBjYXJUcmFuc21pc3Npb25MaXN0IH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFRoaXMgaXMgdGhlIGl0ZW0gZGV0YWlsIGVkaXQgY29tcG9uZW50LlxyXG4qIFRoaXMgY29tcG9uZW50IGdldHMgdGhlIHNlbGVjdGVkIGRhdGEgaXRlbSwgcHJvdmlkZXMgb3B0aW9ucyB0byBlZGl0IHRoZSBpdGVtIGFuZCBzYXZlcyB0aGUgY2hhbmdlcy5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwiQ2FyRGV0YWlsRWRpdFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jYXItZGV0YWlsLWVkaXQuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9jYXItZGV0YWlsLWVkaXQuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FyRGV0YWlsRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIF9jYXI6IENhcjtcclxuICAgIHByaXZhdGUgX2NhckNsYXNzZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIHByaXZhdGUgX2NhckRvb3JzOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBwcml2YXRlIF9jYXJTZWF0czogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfY2FyVHJhbnNtaXNzaW9uczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfY2FySW1hZ2VVcmlUb1VwbG9hZDogc3RyaW5nID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2lzQ2FySW1hZ2VEaXJ0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaXNVcGRhdGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2NhclNlcnZpY2U6IENhclNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfcGFnZVJvdXRlOiBQYWdlUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9uc1xyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGdldCB0aGUgZGF0YSBpdGVtIGlkIHBhcmFtZXRlciBwYXNzZWQgdGhyb3VnaCBuYXZpZ2F0aW9uLlxyXG4gICAgKiBHZXQgdGhlIGRhdGEgaXRlbSBkZXRhaWxzIGZyb20gdGhlIGRhdGEgc2VydmljZSB1c2luZyB0aGlzIGlkIGFuZCBhc3NpZ24gaXQgdG8gdGhlXHJcbiAgICAqIHByaXZhdGUgcHJvcGVydHkgdGhhdCBob2xkcyBpdCBpbnNpZGUgdGhlIGNvbXBvbmVudC5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVFZGl0T3B0aW9ucygpO1xyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICogTGVhcm4gbW9yZSBhYm91dCBob3cgdG8gZ2V0IG5hdmlnYXRpb24gcGFyYW1ldGVycyBpbiB0aGlzIGRvY3VtZW50YXRpb24gYXJ0aWNsZTpcclxuICAgICAgICAqIGh0dHA6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvYW5ndWxhci9jb3JlLWNvbmNlcHRzL2FuZ3VsYXItbmF2aWdhdGlvbi5odG1sI3Bhc3NpbmctcGFyYW1ldGVyXHJcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICBsZXQgY2FySWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX3BhZ2VSb3V0ZS5hY3RpdmF0ZWRSb3V0ZVxyXG4gICAgICAgICAgICAuc3dpdGNoTWFwKChhY3RpdmF0ZWRSb3V0ZSkgPT4gYWN0aXZhdGVkUm91dGUucGFyYW1zKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgocGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYXJJZCA9IHBhcmFtcy5pZDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhciA9IHRoaXMuX2NhclNlcnZpY2UuZ2V0Q2FyQnlJZChjYXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzQW5kcm9pZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaXNBbmRyb2lkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1VwZGF0aW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VwZGF0aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYXIoKTogQ2FyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYXJDbGFzc2VzKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXJDbGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYXJEb29ycygpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FyRG9vcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNhclNlYXRzKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXJTZWF0cztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2FyVHJhbnNtaXNzaW9ucygpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FyVHJhbnNtaXNzaW9ucztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgY2FyTHVnZ2FnZVZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9jYXIubHVnZ2FnZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBlZGl0IGNhbmNlbCBidXR0b24gbmF2aWdhdGVzIGJhY2sgdG8gdGhlIGl0ZW0gZGV0YWlscyBwYWdlLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIG9uQ2FuY2VsQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVGhlIGVkaXQgZG9uZSBidXR0b24gdXNlcyB0aGUgZGF0YSBzZXJ2aWNlIHRvIHNhdmUgdGhlIHVwZGF0ZWQgdmFsdWVzIG9mIHRoZSBkYXRhIGl0ZW0gZGV0YWlscy5cclxuICAgICogQ2hlY2sgb3V0IHRoZSBkYXRhIHNlcnZpY2UgYXMgY2Fycy9zaGFyZWQvY2FyLnNlcnZpY2UudHNcclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBvbkRvbmVCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2lzVXBkYXRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5faXNDYXJJbWFnZURpcnR5ICYmIHRoaXMuX2NhckltYWdlVXJpVG9VcGxvYWQpIHtcclxuICAgICAgICAgICAgcXVldWUgPSBxdWV1ZVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5fY2FyU2VydmljZS51cGxvYWRJbWFnZSh0aGlzLl9jYXIuaW1hZ2VTdG9yYWdlUGF0aCwgdGhpcy5fY2FySW1hZ2VVcmlUb1VwbG9hZCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbigodXBsb2FkZWRGaWxlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYXIuaW1hZ2VVcmwgPSB1cGxvYWRlZEZpbGUudXJsO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBxdWV1ZS50aGVuKCgpID0+IHRoaXMuX2NhclNlcnZpY2UudXBkYXRlKHRoaXMuX2NhcikpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzVXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NhcnNcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yTWVzc2FnZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh7IHRpdGxlOiBcIk9vcHMhXCIsIG1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uXCIsIG9rQnV0dG9uVGV4dDogXCJPa1wiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkltYWdlQWRkUmVtb3ZlKGFyZ3MpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYXJncy5uZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0NhckltYWdlRGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9jYXJJbWFnZVVyaVRvVXBsb2FkID0gYXJncy5uZXdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplRWRpdE9wdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjbGFzc0l0ZW0gb2YgY2FyQ2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhckNsYXNzZXMucHVzaChjbGFzc0l0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBkb29ySXRlbSBvZiBjYXJEb29yTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYXJEb29ycy5wdXNoKGRvb3JJdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qgc2VhdEl0ZW0gb2YgY2FyU2VhdExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FyU2VhdHMucHVzaChzZWF0SXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHRyYW5zbWlzc2lvbkl0ZW0gb2YgY2FyVHJhbnNtaXNzaW9uTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYXJUcmFuc21pc3Npb25zLnB1c2godHJhbnNtaXNzaW9uSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==