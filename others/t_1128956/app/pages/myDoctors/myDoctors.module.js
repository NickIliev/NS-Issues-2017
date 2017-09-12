"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var core_1 = require("@angular/core");
var myDoctors_component_1 = require("./myDoctors.component");
var viewVisitHistory_component_1 = require("./viewVisitHistory/viewVisitHistory.component");
var myDoctors_service_1 = require("./myDoctors.service");
var shared_module_1 = require("../../shared/shared.module");
var nativescript_locate_address_1 = require("nativescript-locate-address");
exports.routerConfig = [
    {
        path: "",
        component: myDoctors_component_1.MyDoctorsComponent
    },
    {
        path: "mydoctors",
        component: myDoctors_component_1.MyDoctorsComponent
    }
];
var MyDoctorsModule = (function () {
    function MyDoctorsModule() {
    }
    return MyDoctorsModule;
}());
MyDoctorsModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        imports: [
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            router_1.NativeScriptRouterModule.forChild(exports.routerConfig),
            shared_module_1.SharedModule
        ],
        declarations: [
            myDoctors_component_1.MyDoctorsComponent, viewVisitHistory_component_1.ViewVisitHistoryComponent
        ],
        providers: [myDoctors_service_1.MyDoctorsService, nativescript_locate_address_1.LocateAddress],
        entryComponents: [viewVisitHistory_component_1.ViewVisitHistoryComponent],
    })
], MyDoctorsModule);
exports.MyDoctorsModule = MyDoctorsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlEb2N0b3JzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15RG9jdG9ycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLHNDQUEyRDtBQUMzRCw2REFBMkQ7QUFDM0QsNEZBQTBGO0FBQzFGLHlEQUF1RDtBQUN2RCw0REFBMEQ7QUFDMUQsMkVBQTREO0FBRy9DLFFBQUEsWUFBWSxHQUFHO0lBQ3hCO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsd0NBQWtCO0tBQ2hDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsV0FBVztRQUNqQixTQUFTLEVBQUUsd0NBQWtCO0tBQ2hDO0NBQ0osQ0FBQztBQWlCRixJQUFhLGVBQWU7SUFBNUI7SUFBK0IsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUFoQyxJQUFnQztBQUFuQixlQUFlO0lBZjNCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1FBQzNCLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQixpQ0FBd0I7WUFDeEIsaUNBQXdCLENBQUMsUUFBUSxDQUFDLG9CQUFZLENBQUM7WUFDL0MsNEJBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWLHdDQUFrQixFQUFFLHNEQUF5QjtTQUNoRDtRQUNELFNBQVMsRUFBRSxDQUFDLG9DQUFnQixFQUFFLDJDQUFhLENBQUM7UUFDNUMsZUFBZSxFQUFFLENBQUMsc0RBQXlCLENBQUM7S0FDL0MsQ0FBQztHQUVXLGVBQWUsQ0FBSTtBQUFuQiwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBNeURvY3RvcnNDb21wb25lbnQgfSBmcm9tIFwiLi9teURvY3RvcnMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFZpZXdWaXNpdEhpc3RvcnlDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3VmlzaXRIaXN0b3J5L3ZpZXdWaXNpdEhpc3RvcnkuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE15RG9jdG9yc1NlcnZpY2UgfSBmcm9tIFwiLi9teURvY3RvcnMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTG9jYXRlQWRkcmVzcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9jYXRlLWFkZHJlc3NcIjtcclxuXHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVyQ29uZmlnID0gW1xyXG4gICAge1xyXG4gICAgICAgIHBhdGg6IFwiXCIsXHJcbiAgICAgICAgY29tcG9uZW50OiBNeURvY3RvcnNDb21wb25lbnRcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogXCJteWRvY3RvcnNcIixcclxuICAgICAgICBjb21wb25lbnQ6IE15RG9jdG9yc0NvbXBvbmVudFxyXG4gICAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXJDb25maWcpLFxyXG4gICAgICAgIFNoYXJlZE1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIE15RG9jdG9yc0NvbXBvbmVudCwgVmlld1Zpc2l0SGlzdG9yeUNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW015RG9jdG9yc1NlcnZpY2UsIExvY2F0ZUFkZHJlc3NdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbVmlld1Zpc2l0SGlzdG9yeUNvbXBvbmVudF0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTXlEb2N0b3JzTW9kdWxlIHsgfSJdfQ==