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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktbGlzdC1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteS1saXN0LXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRztBQUNqRyxrRUFBMkY7QUFDM0Ysc0RBQXdEO0FBRXhELGtFQUErRDtBQUUvRCxpR0FBMkY7QUFFM0YsSUFBTSxxQkFBcUIsR0FBRyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQztBQUU1RTs7Ozs7OERBSzhEO0FBTzlEO0lBUUksaUNBQ1ksVUFBcUIsRUFDckIsYUFBaUMsRUFDakMsTUFBd0IsRUFDeEIsZUFBK0I7UUFIL0IsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBb0I7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBUmpDLHdCQUFtQixHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO0lBUVosQ0FBQztJQUVoRCwwQ0FBUSxHQUFSO1FBQ0ksSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWYsMERBQTBEO1FBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYzthQUN6QixTQUFTLENBQUMsVUFBQyxjQUFjLElBQUssT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQixDQUFDO2FBQ3BELE9BQU8sQ0FBQyxVQUFDLE1BQU07WUFDWixLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsK0NBQWEsR0FBYjtRQUFBLGlCQW9CQztRQW5CRyxJQUFNLEtBQUssR0FBRyxnQkFBYyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFHLENBQUM7UUFDOUQsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdELElBQU0sT0FBTyxHQUF1QjtZQUNoQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUM3QixPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixLQUFLLE9BQUE7Z0JBQ0wsYUFBYSxlQUFBO2FBQ2hCO1lBQ0QsVUFBVSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLHdFQUFnQyxFQUFFLE9BQU8sQ0FBQzthQUNsRSxJQUFJLENBQUMsVUFBQyxhQUFxQjtZQUN4QixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEQsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQTlDUTtRQUFSLFlBQUssRUFBRTs7d0RBQWE7SUFDWjtRQUFSLFlBQUssRUFBRTtrQ0FBUSxLQUFLOzBEQUFTO0lBQ3JCO1FBQVIsWUFBSyxFQUFFOztrRUFBdUI7SUFDckI7UUFBVCxhQUFNLEVBQUU7O3dFQUFrRDtJQUpsRCx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyxpQ0FBa0IsQ0FBQztZQUMvQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSxtQ0FBbUM7U0FDbkQsQ0FBQzt5Q0FVMEIsa0JBQVM7WUFDTixpQ0FBa0I7WUFDekIsdUJBQWdCO1lBQ1AsaUNBQWM7T0FabEMsdUJBQXVCLENBZ0RuQztJQUFELDhCQUFDO0NBQUEsQUFoREQsSUFnREM7QUFoRFksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nT3B0aW9ucywgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBQYWdlUm91dGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBDYXJFZGl0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY2FyLWVkaXQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDYXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2Nhci5tb2RlbFwiO1xyXG5pbXBvcnQgeyBNeUxpc3RTZWxlY3Rvck1vZGFsVmlld0NvbXBvbmVudCB9IGZyb20gXCIuL215LWxpc3Qtc2VsZWN0b3ItbW9kYWwtdmlldy5jb21wb25lbnRcIjtcclxuXHJcbmNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9IChzKSA9PiBzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcy5zbGljZSgxKTtcclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVGhlIE15TGlzdFNlbGVjdG9yIGN1c3RvbSBjb21wb25lbnQgdXNlcyBhIHtOfSBtb2RhbCBwYWdlIHRvIGxldCB0aGUgdXNlciBzZWxlY3QgYW5kIG9wdGlvblxyXG4qIGZyb20gYSBsaXN0LiBZb3UgY2FuIGFsc28gY2hlY2sgb3V0IHRoZSBteS1saXN0LXNlbGVjdG9yLW1vZGFsLXZpZXcuY29tcG9uZW50LnRzIHRvIHNlZSB0aGVcclxuKiBjb250ZW50cyBvZiB0aGUgbW9kYWwgcGFnZS4gTGVhcm4gbW9yZSBhYm91dCBtb2RhbCBwYWdlcyBpbiB0aGlzIGRvY3VtZW50YXRpb24gYXJ0aWNsZTpcclxuKiBodHRwczovL2RvY3MubmF0aXZlc2NyaXB0Lm9yZy9hbmd1bGFyL2NvZGUtc2FtcGxlcy9tb2RhbC1wYWdlXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHByb3ZpZGVyczogW01vZGFsRGlhbG9nU2VydmljZV0sXHJcbiAgICBzZWxlY3RvcjogXCJNeUxpc3RTZWxlY3RvclwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9teS1saXN0LXNlbGVjdG9yLmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIE15TGlzdFNlbGVjdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHRhZzogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgaXRlbXM6IEFycmF5PHN0cmluZz47XHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZFZhbHVlOiBzdHJpbmc7XHJcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIHByaXZhdGUgX2NhckVkaXRNb2RlbDogQ2FyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX3BhZ2VSb3V0ZTogUGFnZVJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgX21vZGFsU2VydmljZTogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3ZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgX2NhckVkaXRTZXJ2aWNlOiBDYXJFZGl0U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNhcklkID0gXCJcIjtcclxuXHJcbiAgICAgICAgLy8gdXNlIHN3aXRjaE1hcCB0byBnZXQgdGhlIGxhdGVzdCBhY3RpdmF0ZWRSb3V0ZSBpbnN0YW5jZVxyXG4gICAgICAgIHRoaXMuX3BhZ2VSb3V0ZS5hY3RpdmF0ZWRSb3V0ZVxyXG4gICAgICAgICAgICAuc3dpdGNoTWFwKChhY3RpdmF0ZWRSb3V0ZSkgPT4gYWN0aXZhdGVkUm91dGUucGFyYW1zKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgocGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYXJJZCA9IHBhcmFtcy5pZDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhckVkaXRNb2RlbCA9IHRoaXMuX2NhckVkaXRTZXJ2aWNlLmdldEVkaXRhYmxlQ2FyQnlJZChjYXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3RvclRhcCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IGBTZWxlY3QgQ2FyICR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHRoaXMudGFnKX1gO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSB0aGlzLml0ZW1zLmluZGV4T2YodGhpcy5zZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICBjb25zdCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMuX3ZjUmVmLFxyXG4gICAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtczogdGhpcy5pdGVtcyxcclxuICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJbmRleFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGFsU2VydmljZS5zaG93TW9kYWwoTXlMaXN0U2VsZWN0b3JNb2RhbFZpZXdDb21wb25lbnQsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50aGVuKChzZWxlY3RlZFZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gc2VsZWN0ZWRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=