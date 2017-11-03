"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_detail_component_1 = require("./item-detail.component");
var nativescript_angular_1 = require("nativescript-angular");
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var item_service_1 = require("./item.service");
var ItemsComponent = (function () {
    function ItemsComponent(_dataService, modal, vcRef) {
        this._dataService = _dataService;
        this.modal = modal;
        this.vcRef = vcRef;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this._pieSource = new observable_array_1.ObservableArray(this._dataService.getCategoricalSource());
    };
    Object.defineProperty(ItemsComponent.prototype, "pieSource", {
        get: function () {
            return this._pieSource;
        },
        enumerable: true,
        configurable: true
    });
    ItemsComponent.prototype.openModal = function () {
        var options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(item_detail_component_1.ItemDetailComponent, options);
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            providers: [nativescript_angular_1.ModalDialogService],
            templateUrl: "./items.component.html",
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService,
            nativescript_angular_1.ModalDialogService,
            core_1.ViewContainerRef])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUVBQThEO0FBQzlELDZEQUE4RTtBQUM5RSxzQ0FBb0U7QUFDcEUsMkVBQXlFO0FBRXpFLCtDQUFzRDtBQVV0RDtJQUlJLHdCQUFvQixZQUF5QixFQUNqQyxLQUF5QixFQUN6QixLQUF1QjtRQUZmLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ2pDLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLFVBQUssR0FBTCxLQUFLLENBQWtCO0lBQUksQ0FBQztJQUV4QyxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGtDQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELHNCQUFJLHFDQUFTO2FBQWI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELGtDQUFTLEdBQVQ7UUFDSSxJQUFNLE9BQU8sR0FBdUI7WUFDaEMsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsSUFBSTtZQUNoQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSztTQUMvQixDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsMkNBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQXZCUSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMseUNBQWtCLENBQUM7WUFDL0IsV0FBVyxFQUFFLHdCQUF3QjtTQUN4QyxDQUFDO3lDQUtvQywwQkFBVztZQUMxQix5Q0FBa0I7WUFDbEIsdUJBQWdCO09BTjFCLGNBQWMsQ0F3QjFCO0lBQUQscUJBQUM7Q0FBQSxBQXhCRCxJQXdCQztBQXhCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZW1EZXRhaWxDb21wb25lbnQgfSBmcm9tICcuL2l0ZW0tZGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UsIE1vZGFsRGlhbG9nT3B0aW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheSc7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuaW1wb3J0IHsgQ291bnRyeSwgSXRlbVNlcnZpY2UgfSBmcm9tICcuL2l0ZW0uc2VydmljZSc7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgcHJvdmlkZXJzOiBbTW9kYWxEaWFsb2dTZXJ2aWNlXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHByaXZhdGUgX3BpZVNvdXJjZTogT2JzZXJ2YWJsZUFycmF5PENvdW50cnk+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0YVNlcnZpY2U6IEl0ZW1TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3BpZVNvdXJjZSA9IG5ldyBPYnNlcnZhYmxlQXJyYXkodGhpcy5fZGF0YVNlcnZpY2UuZ2V0Q2F0ZWdvcmljYWxTb3VyY2UoKSk7XG4gICAgfVxuXG4gICAgZ2V0IHBpZVNvdXJjZSgpOiBPYnNlcnZhYmxlQXJyYXk8Q291bnRyeT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGllU291cmNlO1xuICAgIH1cblxuICAgIG9wZW5Nb2RhbCgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgICAgY29udGV4dDoge30sXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChJdGVtRGV0YWlsQ29tcG9uZW50LCBvcHRpb25zKTtcbiAgICB9XG59Il19