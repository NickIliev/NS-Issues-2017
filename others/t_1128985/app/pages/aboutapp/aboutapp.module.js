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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXRhcHAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJvdXRhcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBQ3JFLGlFQUErRDtBQUMvRCw0REFBMEQ7QUFDMUQsMkRBQXlEO0FBQ3pELCtEQUE2RDtBQUM3RCx1REFBcUQ7QUFHeEMsUUFBQSxZQUFZLEdBQUc7SUFDeEI7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxzQ0FBaUI7S0FDL0I7SUFFRDtRQUNJLElBQUksRUFBRSxXQUFXO1FBQ2pCLFNBQVMsRUFBRSxnQ0FBYztLQUM1QjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFlBQVk7UUFDbEIsU0FBUyxFQUFFLGtDQUFlO0tBQzdCO0NBQ0osQ0FBQztBQWdCRixJQUFhLGNBQWM7SUFDdkI7SUFBZ0IsQ0FBQztJQUNyQixxQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksY0FBYztJQWQxQixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztRQUMzQixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsaUNBQXdCO1lBQ3hCLCtCQUF1QjtZQUN2QixpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsb0JBQVksQ0FBQztZQUMvQyw0QkFBWTtTQUNmO1FBQ0QsWUFBWSxFQUFFO1lBQ1Ysc0NBQWlCLEVBQUUsZ0NBQWMsRUFBRSxrQ0FBZTtTQUNyRCxFQUFFLFNBQVMsRUFBRSxDQUFDLGtDQUFlLENBQUM7S0FDbEMsQ0FBQzs7R0FFVyxjQUFjLENBRTFCO0FBRlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEFib3V0QXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYWJvdXQvYWJvdXRhcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcbmltcG9ydCB7IFRlcm1zQ29tcG9uZW50IH0gZnJvbSBcIi4vdGVybXMvdGVybXMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQb2xpY3lDb21wb25lbnQgfSBmcm9tIFwiLi9wcml2YWN5L3BvbGljeS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFib3V0QXBwU2VydmljZSB9IGZyb20gXCIuL2Fib3V0YXBwLnNlcnZpY2VcIjtcblxuXG5leHBvcnQgY29uc3Qgcm91dGVyQ29uZmlnID0gW1xuICAgIHtcbiAgICAgICAgcGF0aDogXCJcIixcbiAgICAgICAgY29tcG9uZW50OiBBYm91dEFwcENvbXBvbmVudFxuICAgIH0sXG5cbiAgICB7XG4gICAgICAgIHBhdGg6IFwidGVybXNfYXBwXCIsXG4gICAgICAgIGNvbXBvbmVudDogVGVybXNDb21wb25lbnRcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJwb2xpY3lfYXBwXCIsXG4gICAgICAgIGNvbXBvbmVudDogUG9saWN5Q29tcG9uZW50XG4gICAgfSxcbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVyQ29uZmlnKSxcbiAgICAgICAgU2hhcmVkTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQWJvdXRBcHBDb21wb25lbnQsIFRlcm1zQ29tcG9uZW50LCBQb2xpY3lDb21wb25lbnRcbiAgICBdLCBwcm92aWRlcnM6IFtBYm91dEFwcFNlcnZpY2VdXG59KVxuXG5leHBvcnQgY2xhc3MgQWJvdXRBcHBNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG59Il19