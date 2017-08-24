"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var router_1 = require("nativescript-angular/router");
var car_service_1 = require("../../shared/car.service");
var list_selector_modal_view_component_1 = require("./list-selector-modal-view.component");
var capitalizeFirstLetter = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
/* ***********************************************************
* The ListSelector custom component uses a {N} modal page to let the user select and option
* from a list. You can also check out the list-selector-modal-view.component.ts to see the
* contents of the modal page. Learn more about modal pages in this documentation article:
* https://docs.nativescript.org/angular/code-samples/modal-page
*************************************************************/
var ListSelectorComponent = (function () {
    function ListSelectorComponent(_pageRoute, _modalService, _vcRef, _carService) {
        this._pageRoute = _pageRoute;
        this._modalService = _modalService;
        this._vcRef = _vcRef;
        this._carService = _carService;
    }
    ListSelectorComponent.prototype.ngOnInit = function () {
        var carId = "";
        // use switchMap to get the latest activatedRoute instance
        this._pageRoute.activatedRoute
            .switchMap(function (activatedRoute) { return activatedRoute.params; })
            .forEach(function (params) {
            carId = params.id;
        });
        this._car = this._carService.getCarById(carId);
    };
    ListSelectorComponent.prototype.onSelectorTap = function () {
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
        this._modalService.showModal(list_selector_modal_view_component_1.ListSelectorModalViewComponent, options)
            .then(function (selectedValue) {
            if (selectedValue) {
                _this._car[_this.tag] = selectedValue;
            }
        });
    };
    return ListSelectorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListSelectorComponent.prototype, "selectedValue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ListSelectorComponent.prototype, "items", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListSelectorComponent.prototype, "tag", void 0);
ListSelectorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        providers: [modal_dialog_1.ModalDialogService],
        selector: "ListSelector",
        templateUrl: "./list-selector.component.html"
    }),
    __metadata("design:paramtypes", [router_1.PageRoute,
        modal_dialog_1.ModalDialogService,
        core_1.ViewContainerRef,
        car_service_1.CarService])
], ListSelectorComponent);
exports.ListSelectorComponent = ListSelectorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRTtBQUMzRSxrRUFBMkY7QUFDM0Ysc0RBQXdEO0FBR3hELHdEQUFzRDtBQUN0RCwyRkFBc0Y7QUFFdEYsSUFBTSxxQkFBcUIsR0FBRyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQztBQUU1RTs7Ozs7OERBSzhEO0FBTzlELElBQWEscUJBQXFCO0lBTzlCLCtCQUNZLFVBQXFCLEVBQ3JCLGFBQWlDLEVBQ2pDLE1BQXdCLEVBQ3hCLFdBQXVCO1FBSHZCLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsa0JBQWEsR0FBYixhQUFhLENBQW9CO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO0lBQUksQ0FBQztJQUV4Qyx3Q0FBUSxHQUFSO1FBQ0ksSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWYsMERBQTBEO1FBQzFELElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYzthQUN6QixTQUFTLENBQUMsVUFBQyxjQUFjLElBQUssT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQixDQUFDO2FBQ3BELE9BQU8sQ0FBQyxVQUFDLE1BQU07WUFDWixLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELDZDQUFhLEdBQWI7UUFBQSxpQkFtQkM7UUFsQkcsSUFBTSxLQUFLLEdBQUcsZ0JBQWMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDO1FBQzlELElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3RCxJQUFNLE9BQU8sR0FBdUI7WUFDaEMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDN0IsT0FBTyxFQUFFO2dCQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsS0FBSyxPQUFBO2dCQUNMLGFBQWEsZUFBQTthQUNoQjtZQUNELFVBQVUsRUFBRSxLQUFLO1NBQ3BCLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxtRUFBOEIsRUFBRSxPQUFPLENBQUM7YUFDaEUsSUFBSSxDQUFDLFVBQUMsYUFBcUI7WUFDeEIsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQ3hDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUE5Q0QsSUE4Q0M7QUE3Q1k7SUFBUixZQUFLLEVBQUU7OzREQUF1QjtBQUN0QjtJQUFSLFlBQUssRUFBRTs4QkFBUSxLQUFLO29EQUFTO0FBQ3JCO0lBQVIsWUFBSyxFQUFFOztrREFBYTtBQUhaLHFCQUFxQjtJQU5qQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFNBQVMsRUFBRSxDQUFDLGlDQUFrQixDQUFDO1FBQy9CLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSxnQ0FBZ0M7S0FDaEQsQ0FBQztxQ0FTMEIsa0JBQVM7UUFDTixpQ0FBa0I7UUFDekIsdUJBQWdCO1FBQ1gsd0JBQVU7R0FYMUIscUJBQXFCLENBOENqQztBQTlDWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ09wdGlvbnMsIE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgUGFnZVJvdXRlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgQ2FyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jYXIubW9kZWxcIjtcclxuaW1wb3J0IHsgQ2FyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY2FyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTGlzdFNlbGVjdG9yTW9kYWxWaWV3Q29tcG9uZW50IH0gZnJvbSBcIi4vbGlzdC1zZWxlY3Rvci1tb2RhbC12aWV3LmNvbXBvbmVudFwiO1xyXG5cclxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKHMpID0+IHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpO1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBUaGUgTGlzdFNlbGVjdG9yIGN1c3RvbSBjb21wb25lbnQgdXNlcyBhIHtOfSBtb2RhbCBwYWdlIHRvIGxldCB0aGUgdXNlciBzZWxlY3QgYW5kIG9wdGlvblxyXG4qIGZyb20gYSBsaXN0LiBZb3UgY2FuIGFsc28gY2hlY2sgb3V0IHRoZSBsaXN0LXNlbGVjdG9yLW1vZGFsLXZpZXcuY29tcG9uZW50LnRzIHRvIHNlZSB0aGVcclxuKiBjb250ZW50cyBvZiB0aGUgbW9kYWwgcGFnZS4gTGVhcm4gbW9yZSBhYm91dCBtb2RhbCBwYWdlcyBpbiB0aGlzIGRvY3VtZW50YXRpb24gYXJ0aWNsZTpcclxuKiBodHRwczovL2RvY3MubmF0aXZlc2NyaXB0Lm9yZy9hbmd1bGFyL2NvZGUtc2FtcGxlcy9tb2RhbC1wYWdlXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHByb3ZpZGVyczogW01vZGFsRGlhbG9nU2VydmljZV0sXHJcbiAgICBzZWxlY3RvcjogXCJMaXN0U2VsZWN0b3JcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbGlzdC1zZWxlY3Rvci5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0U2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgaXRlbXM6IEFycmF5PHN0cmluZz47XHJcbiAgICBASW5wdXQoKSB0YWc6IHN0cmluZztcclxuXHJcbiAgICBwcml2YXRlIF9jYXI6IENhcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9wYWdlUm91dGU6IFBhZ2VSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIF9tb2RhbFNlcnZpY2U6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF92Y1JlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIF9jYXJTZXJ2aWNlOiBDYXJTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2FySWQgPSBcIlwiO1xyXG5cclxuICAgICAgICAvLyB1c2Ugc3dpdGNoTWFwIHRvIGdldCB0aGUgbGF0ZXN0IGFjdGl2YXRlZFJvdXRlIGluc3RhbmNlXHJcbiAgICAgICAgdGhpcy5fcGFnZVJvdXRlLmFjdGl2YXRlZFJvdXRlXHJcbiAgICAgICAgICAgIC5zd2l0Y2hNYXAoKGFjdGl2YXRlZFJvdXRlKSA9PiBhY3RpdmF0ZWRSb3V0ZS5wYXJhbXMpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChwYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNhcklkID0gcGFyYW1zLmlkO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FyID0gdGhpcy5fY2FyU2VydmljZS5nZXRDYXJCeUlkKGNhcklkKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNlbGVjdG9yVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gYFNlbGVjdCBDYXIgJHtjYXBpdGFsaXplRmlyc3RMZXR0ZXIodGhpcy50YWcpfWA7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHRoaXMuaXRlbXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy5fdmNSZWYsXHJcbiAgICAgICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLml0ZW1zLFxyXG4gICAgICAgICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fbW9kYWxTZXJ2aWNlLnNob3dNb2RhbChMaXN0U2VsZWN0b3JNb2RhbFZpZXdDb21wb25lbnQsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50aGVuKChzZWxlY3RlZFZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FyW3RoaXMudGFnXSA9IHNlbGVjdGVkVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==