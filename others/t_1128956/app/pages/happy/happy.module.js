"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var happy_component_1 = require("./happy.component");
var shared_module_1 = require("../../shared/shared.module");
exports.routerConfig = [
    {
        path: "",
        component: happy_component_1.HappyComponent
    }
];
var HappyModule = (function () {
    function HappyModule() {
    }
    return HappyModule;
}());
HappyModule = __decorate([
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
            happy_component_1.HappyComponent
        ]
    }),
    __metadata("design:paramtypes", [])
], HappyModule);
exports.HappyModule = HappyModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFwcHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGFwcHkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBRXJFLHFEQUFtRDtBQUNuRCw0REFBMEQ7QUFHN0MsUUFBQSxZQUFZLEdBQUc7SUFDeEI7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxnQ0FBYztLQUM1QjtDQUNKLENBQUM7QUFnQkYsSUFBYSxXQUFXO0lBQ3BCO0lBQWdCLENBQUM7SUFDckIsa0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLFdBQVc7SUFkdkIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7UUFDM0IsT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLGlDQUF3QjtZQUN4QiwrQkFBdUI7WUFDdkIsaUNBQXdCLENBQUMsUUFBUSxDQUFDLG9CQUFZLENBQUM7WUFDL0MsNEJBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWLGdDQUFjO1NBQ2pCO0tBQ0osQ0FBQzs7R0FFVyxXQUFXLENBRXZCO0FBRlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbmltcG9ydCB7IEhhcHB5Q29tcG9uZW50IH0gZnJvbSBcIi4vaGFwcHkuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCByb3V0ZXJDb25maWcgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogXCJcIixcclxuICAgICAgICBjb21wb25lbnQ6IEhhcHB5Q29tcG9uZW50XHJcbiAgICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlckNvbmZpZyksXHJcbiAgICAgICAgU2hhcmVkTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgSGFwcHlDb21wb25lbnRcclxuICAgIF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBIYXBweU1vZHVsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59Il19