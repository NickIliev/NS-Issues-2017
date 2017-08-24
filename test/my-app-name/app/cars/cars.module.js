"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var angular_1 = require("nativescript-telerik-ui/listview/angular");
var car_detail_edit_component_1 = require("./car-detail-edit/car-detail-edit.component");
var image_add_remove_component_1 = require("./car-detail-edit/image-add-remove/image-add-remove.component");
var list_selector_modal_view_component_1 = require("./car-detail-edit/list-selector/list-selector-modal-view.component");
var list_selector_component_1 = require("./car-detail-edit/list-selector/list-selector.component");
var car_detail_component_1 = require("./car-detail/car-detail.component");
var car_list_component_1 = require("./car-list.component");
var cars_routing_module_1 = require("./cars-routing.module");
var car_service_1 = require("./shared/car.service");
var CarsModule = (function () {
    function CarsModule() {
    }
    return CarsModule;
}());
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
            list_selector_component_1.ListSelectorComponent,
            list_selector_modal_view_component_1.ListSelectorModalViewComponent,
            image_add_remove_component_1.ImageAddRemoveComponent
        ],
        entryComponents: [
            list_selector_modal_view_component_1.ListSelectorModalViewComponent
        ],
        providers: [
            car_service_1.CarService
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], CarsModule);
exports.CarsModule = CarsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxvREFBcUU7QUFDckUsZ0ZBQThFO0FBQzlFLG9FQUF3RjtBQUV4Rix5RkFBcUY7QUFDckYsNEdBQXdHO0FBQ3hHLHlIQUFvSDtBQUNwSCxtR0FBZ0c7QUFDaEcsMEVBQXVFO0FBQ3ZFLDJEQUF3RDtBQUN4RCw2REFBMEQ7QUFDMUQsb0RBQWtEO0FBMkJsRCxJQUFhLFVBQVU7SUFBdkI7SUFBMEIsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQUEzQixJQUEyQjtBQUFkLFVBQVU7SUF6QnRCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLHVDQUFpQjtZQUNqQix3Q0FBa0I7WUFDbEIsK0JBQXVCO1lBQ3ZCLHNDQUE0QjtTQUMvQjtRQUNELFlBQVksRUFBRTtZQUNWLHFDQUFnQjtZQUNoQix5Q0FBa0I7WUFDbEIsa0RBQXNCO1lBQ3RCLCtDQUFxQjtZQUNyQixtRUFBOEI7WUFDOUIsb0RBQXVCO1NBQzFCO1FBQ0QsZUFBZSxFQUFFO1lBQ2IsbUVBQThCO1NBQ2pDO1FBQ0QsU0FBUyxFQUFFO1lBQ1Asd0JBQVU7U0FDYjtRQUNELE9BQU8sRUFBRTtZQUNMLHVCQUFnQjtTQUNuQjtLQUNKLENBQUM7R0FDVyxVQUFVLENBQUk7QUFBZCxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9saXN0dmlldy9hbmd1bGFyXCI7XHJcblxyXG5pbXBvcnQgeyBDYXJEZXRhaWxFZGl0Q29tcG9uZW50IH0gZnJvbSBcIi4vY2FyLWRldGFpbC1lZGl0L2Nhci1kZXRhaWwtZWRpdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSW1hZ2VBZGRSZW1vdmVDb21wb25lbnQgfSBmcm9tIFwiLi9jYXItZGV0YWlsLWVkaXQvaW1hZ2UtYWRkLXJlbW92ZS9pbWFnZS1hZGQtcmVtb3ZlLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBMaXN0U2VsZWN0b3JNb2RhbFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi9jYXItZGV0YWlsLWVkaXQvbGlzdC1zZWxlY3Rvci9saXN0LXNlbGVjdG9yLW1vZGFsLXZpZXcuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IExpc3RTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gXCIuL2Nhci1kZXRhaWwtZWRpdC9saXN0LXNlbGVjdG9yL2xpc3Qtc2VsZWN0b3IuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENhckRldGFpbENvbXBvbmVudCB9IGZyb20gXCIuL2Nhci1kZXRhaWwvY2FyLWRldGFpbC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2FyTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL2Nhci1saXN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDYXJzUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2NhcnMtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQ2FyU2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC9jYXIuc2VydmljZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDYXJzUm91dGluZ01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIENhckxpc3RDb21wb25lbnQsXHJcbiAgICAgICAgQ2FyRGV0YWlsQ29tcG9uZW50LFxyXG4gICAgICAgIENhckRldGFpbEVkaXRDb21wb25lbnQsXHJcbiAgICAgICAgTGlzdFNlbGVjdG9yQ29tcG9uZW50LFxyXG4gICAgICAgIExpc3RTZWxlY3Rvck1vZGFsVmlld0NvbXBvbmVudCxcclxuICAgICAgICBJbWFnZUFkZFJlbW92ZUNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgICAgIExpc3RTZWxlY3Rvck1vZGFsVmlld0NvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIENhclNlcnZpY2VcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyc01vZHVsZSB7IH1cclxuIl19