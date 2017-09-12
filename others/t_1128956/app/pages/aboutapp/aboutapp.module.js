"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var aboutapp_component_1 = require("./about/aboutapp.component");
var shared_module_1 = require("../../shared/shared.module");
var terms_component_1 = require("./terms/terms.component");
var policy_component_1 = require("./privacy/policy.component");
var aboutapp_service_1 = require("./aboutapp.service");
exports.routerConfig = [
    {
        path: "",
        component: aboutapp_component_1.AboutAppComponent
    },
    {
        path: "terms_app",
        component: terms_component_1.TermsComponent
    },
    {
        path: "policy_app",
        component: policy_component_1.PolicyComponent
    },
];
var AboutAppModule = (function () {
    function AboutAppModule() {
    }
    return AboutAppModule;
}());
AboutAppModule = __decorate([
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
            aboutapp_component_1.AboutAppComponent, terms_component_1.TermsComponent, policy_component_1.PolicyComponent
        ], providers: [aboutapp_service_1.AboutAppService]
    }),
    __metadata("design:paramtypes", [])
], AboutAppModule);
exports.AboutAppModule = AboutAppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXRhcHAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJvdXRhcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBQ3JFLGlFQUErRDtBQUMvRCw0REFBMEQ7QUFDMUQsMkRBQXlEO0FBQ3pELCtEQUE2RDtBQUM3RCx1REFBcUQ7QUFHeEMsUUFBQSxZQUFZLEdBQUc7SUFDeEI7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxzQ0FBaUI7S0FDL0I7SUFFRDtRQUNJLElBQUksRUFBRSxXQUFXO1FBQ2pCLFNBQVMsRUFBRSxnQ0FBYztLQUM1QjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFlBQVk7UUFDbEIsU0FBUyxFQUFFLGtDQUFlO0tBQzdCO0NBQ0osQ0FBQztBQWdCRixJQUFhLGNBQWM7SUFDdkI7SUFBZ0IsQ0FBQztJQUNyQixxQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksY0FBYztJQWQxQixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztRQUMzQixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsaUNBQXdCO1lBQ3hCLCtCQUF1QjtZQUN2QixpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsb0JBQVksQ0FBQztZQUMvQyw0QkFBWTtTQUNmO1FBQ0QsWUFBWSxFQUFFO1lBQ1Ysc0NBQWlCLEVBQUUsZ0NBQWMsRUFBRSxrQ0FBZTtTQUNyRCxFQUFFLFNBQVMsRUFBRSxDQUFDLGtDQUFlLENBQUM7S0FDbEMsQ0FBQzs7R0FFVyxjQUFjLENBRTFCO0FBRlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgQWJvdXRBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hYm91dC9hYm91dGFwcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XHJcbmltcG9ydCB7IFRlcm1zQ29tcG9uZW50IH0gZnJvbSBcIi4vdGVybXMvdGVybXMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFBvbGljeUNvbXBvbmVudCB9IGZyb20gXCIuL3ByaXZhY3kvcG9saWN5LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBBYm91dEFwcFNlcnZpY2UgfSBmcm9tIFwiLi9hYm91dGFwcC5zZXJ2aWNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRlckNvbmZpZyA9IFtcclxuICAgIHtcclxuICAgICAgICBwYXRoOiBcIlwiLFxyXG4gICAgICAgIGNvbXBvbmVudDogQWJvdXRBcHBDb21wb25lbnRcclxuICAgIH0sXHJcblxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6IFwidGVybXNfYXBwXCIsXHJcbiAgICAgICAgY29tcG9uZW50OiBUZXJtc0NvbXBvbmVudFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiBcInBvbGljeV9hcHBcIixcclxuICAgICAgICBjb21wb25lbnQ6IFBvbGljeUNvbXBvbmVudFxyXG4gICAgfSxcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVyQ29uZmlnKSxcclxuICAgICAgICBTaGFyZWRNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBYm91dEFwcENvbXBvbmVudCwgVGVybXNDb21wb25lbnQsIFBvbGljeUNvbXBvbmVudFxyXG4gICAgXSwgcHJvdmlkZXJzOiBbQWJvdXRBcHBTZXJ2aWNlXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEFib3V0QXBwTW9kdWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn0iXX0=