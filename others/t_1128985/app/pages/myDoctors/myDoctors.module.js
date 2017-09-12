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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlEb2N0b3JzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15RG9jdG9ycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLHNDQUEyRDtBQUMzRCw2REFBMkQ7QUFDM0QsNEZBQTBGO0FBQzFGLHlEQUF1RDtBQUN2RCw0REFBMEQ7QUFDMUQsMkVBQTREO0FBRy9DLFFBQUEsWUFBWSxHQUFHO0lBQ3hCO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsd0NBQWtCO0tBQ2hDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsV0FBVztRQUNqQixTQUFTLEVBQUUsd0NBQWtCO0tBQ2hDO0NBQ0osQ0FBQztBQWlCRixJQUFhLGVBQWU7SUFBNUI7SUFBK0IsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUFoQyxJQUFnQztBQUFuQixlQUFlO0lBZjNCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1FBQzNCLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQixpQ0FBd0I7WUFDeEIsaUNBQXdCLENBQUMsUUFBUSxDQUFDLG9CQUFZLENBQUM7WUFDL0MsNEJBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWLHdDQUFrQixFQUFFLHNEQUF5QjtTQUNoRDtRQUNELFNBQVMsRUFBRSxDQUFDLG9DQUFnQixFQUFFLDJDQUFhLENBQUM7UUFDNUMsZUFBZSxFQUFFLENBQUMsc0RBQXlCLENBQUM7S0FDL0MsQ0FBQztHQUVXLGVBQWUsQ0FBSTtBQUFuQiwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNeURvY3RvcnNDb21wb25lbnQgfSBmcm9tIFwiLi9teURvY3RvcnMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBWaWV3VmlzaXRIaXN0b3J5Q29tcG9uZW50IH0gZnJvbSBcIi4vdmlld1Zpc2l0SGlzdG9yeS92aWV3VmlzaXRIaXN0b3J5LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTXlEb2N0b3JzU2VydmljZSB9IGZyb20gXCIuL215RG9jdG9ycy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcbmltcG9ydCB7IExvY2F0ZUFkZHJlc3MgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2F0ZS1hZGRyZXNzXCI7XG5cblxuZXhwb3J0IGNvbnN0IHJvdXRlckNvbmZpZyA9IFtcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiXCIsXG4gICAgICAgIGNvbXBvbmVudDogTXlEb2N0b3JzQ29tcG9uZW50XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwibXlkb2N0b3JzXCIsXG4gICAgICAgIGNvbXBvbmVudDogTXlEb2N0b3JzQ29tcG9uZW50XG4gICAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlckNvbmZpZyksXG4gICAgICAgIFNoYXJlZE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE15RG9jdG9yc0NvbXBvbmVudCwgVmlld1Zpc2l0SGlzdG9yeUNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbTXlEb2N0b3JzU2VydmljZSwgTG9jYXRlQWRkcmVzc10sXG4gICAgZW50cnlDb21wb25lbnRzOiBbVmlld1Zpc2l0SGlzdG9yeUNvbXBvbmVudF0sXG59KVxuXG5leHBvcnQgY2xhc3MgTXlEb2N0b3JzTW9kdWxlIHsgfSJdfQ==