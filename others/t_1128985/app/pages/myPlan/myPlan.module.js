"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
var core_1 = require("@angular/core");
var myPlan_component_1 = require("./myPlan.component");
var shared_module_1 = require("../../shared/shared.module");
var myplanhelpinfo_component_1 = require("./myplanhelp/myplanhelpinfo.component");
exports.routerConfig = [
    {
        path: "",
        component: myPlan_component_1.MyPlanComponent
    }
];
var MyPlanModule = (function () {
    function MyPlanModule() {
    }
    return MyPlanModule;
}());
MyPlanModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        imports: [
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            forms_1.NativeScriptFormsModule,
            router_1.NativeScriptRouterModule.forChild(exports.routerConfig),
            shared_module_1.SharedModule
        ],
        declarations: [
            myPlan_component_1.MyPlanComponent, myplanhelpinfo_component_1.MyPlanHelpInfoComponent
        ],
        entryComponents: [myplanhelpinfo_component_1.MyPlanHelpInfoComponent],
    })
], MyPlanModule);
exports.MyPlanModule = MyPlanModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlQbGFuLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15UGxhbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLG9EQUFxRTtBQUNyRSxzQ0FBMkQ7QUFDM0QsdURBQXFEO0FBQ3JELDREQUEwRDtBQUMxRCxrRkFBZ0Y7QUFHbkUsUUFBQSxZQUFZLEdBQUc7SUFDeEI7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxrQ0FBZTtLQUM3QjtDQUNKLENBQUM7QUFpQkYsSUFBYSxZQUFZO0lBQXpCO0lBQTRCLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFBN0IsSUFBNkI7QUFBaEIsWUFBWTtJQWZ4QixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztRQUMzQixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsaUNBQXdCO1lBQ3hCLCtCQUF1QjtZQUN2QixpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsb0JBQVksQ0FBQztZQUMvQyw0QkFBWTtTQUNmO1FBQ0QsWUFBWSxFQUFFO1lBQ1Ysa0NBQWUsRUFBRSxrREFBdUI7U0FDM0M7UUFDRCxlQUFlLEVBQUUsQ0FBQyxrREFBdUIsQ0FBQztLQUM3QyxDQUFDO0dBRVcsWUFBWSxDQUFJO0FBQWhCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNeVBsYW5Db21wb25lbnQgfSBmcm9tIFwiLi9teVBsYW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcbmltcG9ydCB7IE15UGxhbkhlbHBJbmZvQ29tcG9uZW50IH0gZnJvbSBcIi4vbXlwbGFuaGVscC9teXBsYW5oZWxwaW5mby5jb21wb25lbnRcIjtcblxuXG5leHBvcnQgY29uc3Qgcm91dGVyQ29uZmlnID0gW1xuICAgIHtcbiAgICAgICAgcGF0aDogXCJcIixcbiAgICAgICAgY29tcG9uZW50OiBNeVBsYW5Db21wb25lbnRcbiAgICB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlckNvbmZpZyksXG4gICAgICAgIFNoYXJlZE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE15UGxhbkNvbXBvbmVudCwgTXlQbGFuSGVscEluZm9Db21wb25lbnRcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW015UGxhbkhlbHBJbmZvQ29tcG9uZW50XSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBNeVBsYW5Nb2R1bGUgeyB9Il19