"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var angular_1 = require("nativescript-telerik-ui/listview/angular");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxvREFBcUU7QUFDckUsZ0ZBQThFO0FBQzlFLG9FQUF3RjtBQUV4Rix5RkFBcUY7QUFDckYscUhBQWdIO0FBQ2hILGtJQUE0SCxDQUFDLHNDQUFzQztBQUNuSyw0R0FBd0c7QUFDeEcsMEVBQXVFO0FBQ3ZFLDJEQUF3RDtBQUN4RCw2REFBMEQ7QUFDMUQsOERBQTJEO0FBQzNELG9EQUFrRDtBQTRCbEQ7SUFBQTtJQUEwQixDQUFDO0lBQWQsVUFBVTtRQTFCdEIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLHVDQUFpQjtnQkFDakIsd0NBQWtCO2dCQUNsQiwrQkFBdUI7Z0JBQ3ZCLHNDQUE0QjthQUMvQjtZQUNELFlBQVksRUFBRTtnQkFDVixxQ0FBZ0I7Z0JBQ2hCLHlDQUFrQjtnQkFDbEIsa0RBQXNCO2dCQUN0QixvREFBdUI7Z0JBQ3ZCLHdFQUFnQztnQkFDaEMseURBQXlCO2FBQzVCO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLHdFQUFnQzthQUNuQztZQUNELFNBQVMsRUFBRTtnQkFDUCx3QkFBVTtnQkFDVixpQ0FBYzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csVUFBVSxDQUFJO0lBQUQsaUJBQUM7Q0FBQSxBQUEzQixJQUEyQjtBQUFkLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL2xpc3R2aWV3L2FuZ3VsYXJcIjtcclxuXHJcbmltcG9ydCB7IENhckRldGFpbEVkaXRDb21wb25lbnQgfSBmcm9tIFwiLi9jYXItZGV0YWlsLWVkaXQvY2FyLWRldGFpbC1lZGl0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNeUltYWdlQWRkUmVtb3ZlQ29tcG9uZW50IH0gZnJvbSBcIi4vY2FyLWRldGFpbC1lZGl0L215LWltYWdlLWFkZC1yZW1vdmUvbXktaW1hZ2UtYWRkLXJlbW92ZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTXlMaXN0U2VsZWN0b3JNb2RhbFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi9jYXItZGV0YWlsLWVkaXQvbXktbGlzdC1zZWxlY3Rvci9teS1saXN0LXNlbGVjdG9yLW1vZGFsLXZpZXcuY29tcG9uZW50XCI7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbmltcG9ydCB7IE15TGlzdFNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSBcIi4vY2FyLWRldGFpbC1lZGl0L215LWxpc3Qtc2VsZWN0b3IvbXktbGlzdC1zZWxlY3Rvci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2FyRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vY2FyLWRldGFpbC9jYXItZGV0YWlsLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDYXJMaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vY2FyLWxpc3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENhcnNSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vY2Fycy1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBDYXJFZGl0U2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC9jYXItZWRpdC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENhclNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvY2FyLnNlcnZpY2VcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ2Fyc1JvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBDYXJMaXN0Q29tcG9uZW50LFxyXG4gICAgICAgIENhckRldGFpbENvbXBvbmVudCxcclxuICAgICAgICBDYXJEZXRhaWxFZGl0Q29tcG9uZW50LFxyXG4gICAgICAgIE15TGlzdFNlbGVjdG9yQ29tcG9uZW50LFxyXG4gICAgICAgIE15TGlzdFNlbGVjdG9yTW9kYWxWaWV3Q29tcG9uZW50LFxyXG4gICAgICAgIE15SW1hZ2VBZGRSZW1vdmVDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgICAgICBNeUxpc3RTZWxlY3Rvck1vZGFsVmlld0NvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIENhclNlcnZpY2UsXHJcbiAgICAgICAgQ2FyRWRpdFNlcnZpY2VcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyc01vZHVsZSB7IH1cclxuIl19