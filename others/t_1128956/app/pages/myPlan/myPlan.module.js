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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlQbGFuLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15UGxhbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLG9EQUFxRTtBQUNyRSxzQ0FBMkQ7QUFDM0QsdURBQXFEO0FBQ3JELDREQUEwRDtBQUMxRCxrRkFBZ0Y7QUFHbkUsUUFBQSxZQUFZLEdBQUc7SUFDeEI7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxrQ0FBZTtLQUM3QjtDQUNKLENBQUM7QUFpQkYsSUFBYSxZQUFZO0lBQXpCO0lBQTRCLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFBN0IsSUFBNkI7QUFBaEIsWUFBWTtJQWZ4QixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztRQUMzQixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsaUNBQXdCO1lBQ3hCLCtCQUF1QjtZQUN2QixpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsb0JBQVksQ0FBQztZQUMvQyw0QkFBWTtTQUNmO1FBQ0QsWUFBWSxFQUFFO1lBQ1Ysa0NBQWUsRUFBRSxrREFBdUI7U0FDM0M7UUFDRCxlQUFlLEVBQUUsQ0FBQyxrREFBdUIsQ0FBQztLQUM3QyxDQUFDO0dBRVcsWUFBWSxDQUFJO0FBQWhCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE15UGxhbkNvbXBvbmVudCB9IGZyb20gXCIuL215UGxhbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE15UGxhbkhlbHBJbmZvQ29tcG9uZW50IH0gZnJvbSBcIi4vbXlwbGFuaGVscC9teXBsYW5oZWxwaW5mby5jb21wb25lbnRcIjtcclxuXHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVyQ29uZmlnID0gW1xyXG4gICAge1xyXG4gICAgICAgIHBhdGg6IFwiXCIsXHJcbiAgICAgICAgY29tcG9uZW50OiBNeVBsYW5Db21wb25lbnRcclxuICAgIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVyQ29uZmlnKSxcclxuICAgICAgICBTaGFyZWRNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBNeVBsYW5Db21wb25lbnQsIE15UGxhbkhlbHBJbmZvQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbTXlQbGFuSGVscEluZm9Db21wb25lbnRdLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE15UGxhbk1vZHVsZSB7IH0iXX0=