"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var forms_2 = require("@angular/forms");
var verification_component_1 = require("./verification/verification.component");
var creation_component_1 = require("./creation/creation.component");
var registration_service_1 = require("./registration.service");
var formValidation_service_1 = require("../../shared/services/formValidation.service");
var shared_module_1 = require("../../shared/shared.module");
exports.routerConfig = [
    {
        path: "",
        component: creation_component_1.CreationComponent
    },
    { path: "verification/:name/:placeholder", component: verification_component_1.VerificationComponent },
    { path: "create", component: creation_component_1.CreationComponent },
];
var RegisterModule = (function () {
    function RegisterModule() {
    }
    return RegisterModule;
}());
RegisterModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        imports: [
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            forms_1.NativeScriptFormsModule,
            router_1.NativeScriptRouterModule.forChild(exports.routerConfig),
            shared_module_1.SharedModule,
            forms_2.ReactiveFormsModule,
        ],
        declarations: [
            creation_component_1.CreationComponent,
            verification_component_1.VerificationComponent
        ],
        providers: [formValidation_service_1.FormValidationService, registration_service_1.RegistrationService,],
    }),
    __metadata("design:paramtypes", [])
], RegisterModule);
exports.RegisterModule = RegisterModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2lzdHJhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLGdGQUE4RTtBQUM5RSxvREFBcUU7QUFDckUsd0NBQWtFO0FBRWxFLGdGQUE4RTtBQUM5RSxvRUFBa0U7QUFDbEUsK0RBQTZEO0FBQzdELHVGQUFxRjtBQUNyRiw0REFBMEQ7QUFLN0MsUUFBQSxZQUFZLEdBQUc7SUFDeEI7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxzQ0FBaUI7S0FDL0I7SUFDRCxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRSxTQUFTLEVBQUUsOENBQXFCLEVBQUU7SUFDN0UsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxzQ0FBaUIsRUFBRTtDQUNuRCxDQUFDO0FBbUJGLElBQWEsY0FBYztJQUN2QjtJQUFnQixDQUFDO0lBQ3JCLHFCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSxjQUFjO0lBakIxQixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztRQUMzQixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsaUNBQXdCO1lBQ3hCLCtCQUF1QjtZQUN2QixpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsb0JBQVksQ0FBQztZQUMvQyw0QkFBWTtZQUNaLDJCQUFtQjtTQUV0QjtRQUNELFlBQVksRUFBRTtZQUNWLHNDQUFpQjtZQUNqQiw4Q0FBcUI7U0FBQztRQUMxQixTQUFTLEVBQUUsQ0FBQyw4Q0FBcUIsRUFBRSwwQ0FBbUIsRUFBRTtLQUMzRCxDQUFDOztHQUVXLGNBQWMsQ0FFMUI7QUFGWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVmVyaWZpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vdmVyaWZpY2F0aW9uL3ZlcmlmaWNhdGlvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IENyZWF0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vY3JlYXRpb24vY3JlYXRpb24uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4vcmVnaXN0cmF0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IEZvcm1WYWxpZGF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZm9ybVZhbGlkYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xuXG5cblxuZXhwb3J0IGNvbnN0IHJvdXRlckNvbmZpZyA9IFtcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiXCIsXG4gICAgICAgIGNvbXBvbmVudDogQ3JlYXRpb25Db21wb25lbnRcbiAgICB9LFxuICAgIHsgcGF0aDogXCJ2ZXJpZmljYXRpb24vOm5hbWUvOnBsYWNlaG9sZGVyXCIsIGNvbXBvbmVudDogVmVyaWZpY2F0aW9uQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcImNyZWF0ZVwiLCBjb21wb25lbnQ6IENyZWF0aW9uQ29tcG9uZW50IH0sXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlckNvbmZpZyksXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIENyZWF0aW9uQ29tcG9uZW50LFxuICAgICAgICBWZXJpZmljYXRpb25Db21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW0Zvcm1WYWxpZGF0aW9uU2VydmljZSwgUmVnaXN0cmF0aW9uU2VydmljZSxdLFxufSlcblxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuXG5cblxuXG5cbiJdfQ==