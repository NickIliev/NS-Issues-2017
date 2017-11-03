"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var angular_1 = require("nativescript-pro-ui/listview/angular");
var car_detail_edit_component_1 = require("./car-detail-edit/car-detail-edit.component");
var my_image_add_remove_component_1 = require("./car-detail-edit/my-image-add-remove/my-image-add-remove.component");
var my_list_selector_modal_view_component_1 = require("./car-detail-edit/my-list-selector/my-list-selector-modal-view.component"); // tslint:disable-line:max-line-length
var my_list_selector_component_1 = require("./car-detail-edit/my-list-selector/my-list-selector.component");
var car_detail_component_1 = require("./car-detail/car-detail.component");
var car_list_component_1 = require("./car-list.component");
var cars_routing_module_1 = require("./cars-routing.module");
var car_edit_service_1 = require("./shared/car-edit.service");
var car_service_1 = require("./shared/car.service");
var CarsModule = /** @class */ (function () {
    function CarsModule() {
    }
    CarsModule = __decorate([
        core_1.NgModule({
            imports: [
                cars_routing_module_1.CarsRoutingModule,
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                angular_1.NativeScriptUIListViewModule
            ],
            declarations: [
                car_list_component_1.CarListComponent,
                car_detail_component_1.CarDetailComponent,
                car_detail_edit_component_1.CarDetailEditComponent,
                my_list_selector_component_1.MyListSelectorComponent,
                my_list_selector_modal_view_component_1.MyListSelectorModalViewComponent,
                my_image_add_remove_component_1.MyImageAddRemoveComponent
            ],
            entryComponents: [
                my_list_selector_modal_view_component_1.MyListSelectorModalViewComponent
            ],
            providers: [
                car_service_1.CarService,
                car_edit_service_1.CarEditService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], CarsModule);
    return CarsModule;
}());
exports.CarsModule = CarsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxvREFBcUU7QUFDckUsZ0ZBQThFO0FBQzlFLGdFQUFvRjtBQUVwRix5RkFBcUY7QUFDckYscUhBQWdIO0FBQ2hILGtJQUE0SCxDQUFDLHNDQUFzQztBQUNuSyw0R0FBd0c7QUFDeEcsMEVBQXVFO0FBQ3ZFLDJEQUF3RDtBQUN4RCw2REFBMEQ7QUFDMUQsOERBQTJEO0FBQzNELG9EQUFrRDtBQTRCbEQ7SUFBQTtJQUEwQixDQUFDO0lBQWQsVUFBVTtRQTFCdEIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLHVDQUFpQjtnQkFDakIsd0NBQWtCO2dCQUNsQiwrQkFBdUI7Z0JBQ3ZCLHNDQUE0QjthQUMvQjtZQUNELFlBQVksRUFBRTtnQkFDVixxQ0FBZ0I7Z0JBQ2hCLHlDQUFrQjtnQkFDbEIsa0RBQXNCO2dCQUN0QixvREFBdUI7Z0JBQ3ZCLHdFQUFnQztnQkFDaEMseURBQXlCO2FBQzVCO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLHdFQUFnQzthQUNuQztZQUNELFNBQVMsRUFBRTtnQkFDUCx3QkFBVTtnQkFDVixpQ0FBYzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csVUFBVSxDQUFJO0lBQUQsaUJBQUM7Q0FBQSxBQUEzQixJQUEyQjtBQUFkLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvbGlzdHZpZXcvYW5ndWxhclwiO1xuXG5pbXBvcnQgeyBDYXJEZXRhaWxFZGl0Q29tcG9uZW50IH0gZnJvbSBcIi4vY2FyLWRldGFpbC1lZGl0L2Nhci1kZXRhaWwtZWRpdC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE15SW1hZ2VBZGRSZW1vdmVDb21wb25lbnQgfSBmcm9tIFwiLi9jYXItZGV0YWlsLWVkaXQvbXktaW1hZ2UtYWRkLXJlbW92ZS9teS1pbWFnZS1hZGQtcmVtb3ZlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTXlMaXN0U2VsZWN0b3JNb2RhbFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi9jYXItZGV0YWlsLWVkaXQvbXktbGlzdC1zZWxlY3Rvci9teS1saXN0LXNlbGVjdG9yLW1vZGFsLXZpZXcuY29tcG9uZW50XCI7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG5pbXBvcnQgeyBNeUxpc3RTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gXCIuL2Nhci1kZXRhaWwtZWRpdC9teS1saXN0LXNlbGVjdG9yL215LWxpc3Qtc2VsZWN0b3IuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDYXJEZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi9jYXItZGV0YWlsL2Nhci1kZXRhaWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDYXJMaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vY2FyLWxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDYXJzUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2NhcnMtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IENhckVkaXRTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL2Nhci1lZGl0LnNlcnZpY2VcIjtcbmltcG9ydCB7IENhclNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvY2FyLnNlcnZpY2VcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENhcnNSb3V0aW5nTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ2FyTGlzdENvbXBvbmVudCxcbiAgICAgICAgQ2FyRGV0YWlsQ29tcG9uZW50LFxuICAgICAgICBDYXJEZXRhaWxFZGl0Q29tcG9uZW50LFxuICAgICAgICBNeUxpc3RTZWxlY3RvckNvbXBvbmVudCxcbiAgICAgICAgTXlMaXN0U2VsZWN0b3JNb2RhbFZpZXdDb21wb25lbnQsXG4gICAgICAgIE15SW1hZ2VBZGRSZW1vdmVDb21wb25lbnRcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBNeUxpc3RTZWxlY3Rvck1vZGFsVmlld0NvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENhclNlcnZpY2UsXG4gICAgICAgIENhckVkaXRTZXJ2aWNlXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENhcnNNb2R1bGUgeyB9XG4iXX0=