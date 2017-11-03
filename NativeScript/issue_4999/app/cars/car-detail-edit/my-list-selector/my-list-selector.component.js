"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var router_1 = require("nativescript-angular/router");
var car_edit_service_1 = require("../../shared/car-edit.service");
var my_list_selector_modal_view_component_1 = require("./my-list-selector-modal-view.component");
var capitalizeFirstLetter = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
/* ***********************************************************
* The MyListSelector custom component uses a {N} modal page to let the user select and option
* from a list. You can also check out the my-list-selector-modal-view.component.ts to see the
* contents of the modal page. Learn more about modal pages in this documentation article:
* https://docs.nativescript.org/angular/code-samples/modal-page
*************************************************************/
var MyListSelectorComponent = /** @class */ (function () {
    function MyListSelectorComponent(_pageRoute, _modalService, _vcRef, _carEditService) {
        this._pageRoute = _pageRoute;
        this._modalService = _modalService;
        this._vcRef = _vcRef;
        this._carEditService = _carEditService;
        this.selectedValueChange = new core_1.EventEmitter();
    }
    MyListSelectorComponent.prototype.ngOnInit = function () {
        var carId = "";
        // use switchMap to get the latest activatedRoute instance
        this._pageRoute.activatedRoute
            .switchMap(function (activatedRoute) { return activatedRoute.params; })
            .forEach(function (params) {
            carId = params.id;
        });
        this._carEditModel = this._carEditService.getEditableCarById(carId);
    };
    MyListSelectorComponent.prototype.onSelectorTap = function () {
        var _this = this;
        var title = "Select Car " + capitalizeFirstLetter(this.tag);
        var selectedIndex = this.items.indexOf(this.selectedValue);
        var options = {
            viewContainerRef: this._vcRef,
            context: {
                items: this.items,
                title: title,
                selectedIndex: selectedIndex
            },
            fullscreen: false
        };
        this._modalService.showModal(my_list_selector_modal_view_component_1.MyListSelectorModalViewComponent, options)
            .then(function (selectedValue) {
            if (selectedValue) {
                _this.selectedValue = selectedValue;
                _this.selectedValueChange.emit(_this.selectedValue);
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MyListSelectorComponent.prototype, "tag", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], MyListSelectorComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MyListSelectorComponent.prototype, "selectedValue", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], MyListSelectorComponent.prototype, "selectedValueChange", void 0);
    MyListSelectorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            providers: [modal_dialog_1.ModalDialogService],
            selector: "MyListSelector",
            templateUrl: "./my-list-selector.component.html"
        }),
        __metadata("design:paramtypes", [router_1.PageRoute,
            modal_dialog_1.ModalDialogService,
            core_1.ViewContainerRef,
            car_edit_service_1.CarEditService])
    ], MyListSelectorComponent);
    return MyListSelectorComponent;
}());
exports.MyListSelectorComponent = MyListSelectorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktbGlzdC1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteS1saXN0LXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRztBQUNqRyxrRUFBMkY7QUFDM0Ysc0RBQXdEO0FBRXhELGtFQUErRDtBQUUvRCxpR0FBMkY7QUFFM0YsSUFBTSxxQkFBcUIsR0FBRyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQztBQUU1RTs7Ozs7OERBSzhEO0FBTzlEO0lBUUksaUNBQ1ksVUFBcUIsRUFDckIsYUFBaUMsRUFDakMsTUFBd0IsRUFDeEIsZUFBK0I7UUFIL0IsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBb0I7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBUmpDLHdCQUFtQixHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO0lBUVosQ0FBQztJQUVoRCwwQ0FBUSxHQUFSO1FBQ0ksSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWYsMERBQTBEO1FBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYzthQUN6QixTQUFTLENBQUMsVUFBQyxjQUFjLElBQUssT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQixDQUFDO2FBQ3BELE9BQU8sQ0FBQyxVQUFDLE1BQU07WUFDWixLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsK0NBQWEsR0FBYjtRQUFBLGlCQW9CQztRQW5CRyxJQUFNLEtBQUssR0FBRyxnQkFBYyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFHLENBQUM7UUFDOUQsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdELElBQU0sT0FBTyxHQUF1QjtZQUNoQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUM3QixPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixLQUFLLE9BQUE7Z0JBQ0wsYUFBYSxlQUFBO2FBQ2hCO1lBQ0QsVUFBVSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLHdFQUFnQyxFQUFFLE9BQU8sQ0FBQzthQUNsRSxJQUFJLENBQUMsVUFBQyxhQUFxQjtZQUN4QixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEQsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQTlDUTtRQUFSLFlBQUssRUFBRTs7d0RBQWE7SUFDWjtRQUFSLFlBQUssRUFBRTtrQ0FBUSxLQUFLOzBEQUFTO0lBQ3JCO1FBQVIsWUFBSyxFQUFFOztrRUFBdUI7SUFDckI7UUFBVCxhQUFNLEVBQUU7O3dFQUFrRDtJQUpsRCx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxpQ0FBa0IsQ0FBQztZQUMvQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSxtQ0FBbUM7U0FDbkQsQ0FBQzt5Q0FVMEIsa0JBQVM7WUFDTixpQ0FBa0I7WUFDekIsdUJBQWdCO1lBQ1AsaUNBQWM7T0FabEMsdUJBQXVCLENBZ0RuQztJQUFELDhCQUFDO0NBQUEsQUFoREQsSUFnREM7QUFoRFksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ09wdGlvbnMsIE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbmltcG9ydCB7IFBhZ2VSb3V0ZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHsgQ2FyRWRpdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2Nhci1lZGl0LnNlcnZpY2VcIjtcbmltcG9ydCB7IENhciB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY2FyLm1vZGVsXCI7XG5pbXBvcnQgeyBNeUxpc3RTZWxlY3Rvck1vZGFsVmlld0NvbXBvbmVudCB9IGZyb20gXCIuL215LWxpc3Qtc2VsZWN0b3ItbW9kYWwtdmlldy5jb21wb25lbnRcIjtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKHMpID0+IHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBUaGUgTXlMaXN0U2VsZWN0b3IgY3VzdG9tIGNvbXBvbmVudCB1c2VzIGEge059IG1vZGFsIHBhZ2UgdG8gbGV0IHRoZSB1c2VyIHNlbGVjdCBhbmQgb3B0aW9uXG4qIGZyb20gYSBsaXN0LiBZb3UgY2FuIGFsc28gY2hlY2sgb3V0IHRoZSBteS1saXN0LXNlbGVjdG9yLW1vZGFsLXZpZXcuY29tcG9uZW50LnRzIHRvIHNlZSB0aGVcbiogY29udGVudHMgb2YgdGhlIG1vZGFsIHBhZ2UuIExlYXJuIG1vcmUgYWJvdXQgbW9kYWwgcGFnZXMgaW4gdGhpcyBkb2N1bWVudGF0aW9uIGFydGljbGU6XG4qIGh0dHBzOi8vZG9jcy5uYXRpdmVzY3JpcHQub3JnL2FuZ3VsYXIvY29kZS1zYW1wbGVzL21vZGFsLXBhZ2VcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHByb3ZpZGVyczogW01vZGFsRGlhbG9nU2VydmljZV0sXG4gICAgc2VsZWN0b3I6IFwiTXlMaXN0U2VsZWN0b3JcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL215LWxpc3Qtc2VsZWN0b3IuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBNeUxpc3RTZWxlY3RvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgdGFnOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaXRlbXM6IEFycmF5PHN0cmluZz47XG4gICAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZFZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBwcml2YXRlIF9jYXJFZGl0TW9kZWw6IENhcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9wYWdlUm91dGU6IFBhZ2VSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBfbW9kYWxTZXJ2aWNlOiBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3ZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIF9jYXJFZGl0U2VydmljZTogQ2FyRWRpdFNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGxldCBjYXJJZCA9IFwiXCI7XG5cbiAgICAgICAgLy8gdXNlIHN3aXRjaE1hcCB0byBnZXQgdGhlIGxhdGVzdCBhY3RpdmF0ZWRSb3V0ZSBpbnN0YW5jZVxuICAgICAgICB0aGlzLl9wYWdlUm91dGUuYWN0aXZhdGVkUm91dGVcbiAgICAgICAgICAgIC5zd2l0Y2hNYXAoKGFjdGl2YXRlZFJvdXRlKSA9PiBhY3RpdmF0ZWRSb3V0ZS5wYXJhbXMpXG4gICAgICAgICAgICAuZm9yRWFjaCgocGFyYW1zKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FySWQgPSBwYXJhbXMuaWQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9jYXJFZGl0TW9kZWwgPSB0aGlzLl9jYXJFZGl0U2VydmljZS5nZXRFZGl0YWJsZUNhckJ5SWQoY2FySWQpO1xuICAgIH1cblxuICAgIG9uU2VsZWN0b3JUYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gYFNlbGVjdCBDYXIgJHtjYXBpdGFsaXplRmlyc3RMZXR0ZXIodGhpcy50YWcpfWA7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YodGhpcy5zZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy5fdmNSZWYsXG4gICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuaXRlbXMsXG4gICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJbmRleFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fbW9kYWxTZXJ2aWNlLnNob3dNb2RhbChNeUxpc3RTZWxlY3Rvck1vZGFsVmlld0NvbXBvbmVudCwgb3B0aW9ucylcbiAgICAgICAgICAgIC50aGVuKChzZWxlY3RlZFZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSBzZWxlY3RlZFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==