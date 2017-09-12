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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2lzdHJhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLGdGQUE4RTtBQUM5RSxvREFBcUU7QUFDckUsd0NBQWtFO0FBRWxFLGdGQUE4RTtBQUM5RSxvRUFBa0U7QUFDbEUsK0RBQTZEO0FBQzdELHVGQUFxRjtBQUNyRiw0REFBMEQ7QUFLN0MsUUFBQSxZQUFZLEdBQUc7SUFDeEI7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxzQ0FBaUI7S0FDL0I7SUFDRCxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRSxTQUFTLEVBQUUsOENBQXFCLEVBQUU7SUFDN0UsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxzQ0FBaUIsRUFBRTtDQUNuRCxDQUFDO0FBbUJGLElBQWEsY0FBYztJQUN2QjtJQUFnQixDQUFDO0lBQ3JCLHFCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSxjQUFjO0lBakIxQixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztRQUMzQixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsaUNBQXdCO1lBQ3hCLCtCQUF1QjtZQUN2QixpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsb0JBQVksQ0FBQztZQUMvQyw0QkFBWTtZQUNaLDJCQUFtQjtTQUV0QjtRQUNELFlBQVksRUFBRTtZQUNWLHNDQUFpQjtZQUNqQiw4Q0FBcUI7U0FBQztRQUMxQixTQUFTLEVBQUUsQ0FBQyw4Q0FBcUIsRUFBRSwwQ0FBbUIsRUFBRTtLQUMzRCxDQUFDOztHQUVXLGNBQWMsQ0FFMUI7QUFGWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVmVyaWZpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vdmVyaWZpY2F0aW9uL3ZlcmlmaWNhdGlvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ3JlYXRpb25Db21wb25lbnQgfSBmcm9tIFwiLi9jcmVhdGlvbi9jcmVhdGlvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gXCIuL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEZvcm1WYWxpZGF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZm9ybVZhbGlkYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4uL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRlckNvbmZpZyA9IFtcclxuICAgIHtcclxuICAgICAgICBwYXRoOiBcIlwiLFxyXG4gICAgICAgIGNvbXBvbmVudDogQ3JlYXRpb25Db21wb25lbnRcclxuICAgIH0sXHJcbiAgICB7IHBhdGg6IFwidmVyaWZpY2F0aW9uLzpuYW1lLzpwbGFjZWhvbGRlclwiLCBjb21wb25lbnQ6IFZlcmlmaWNhdGlvbkNvbXBvbmVudCB9LFxyXG4gICAgeyBwYXRoOiBcImNyZWF0ZVwiLCBjb21wb25lbnQ6IENyZWF0aW9uQ29tcG9uZW50IH0sXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlckNvbmZpZyksXHJcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxyXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcblxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIENyZWF0aW9uQ29tcG9uZW50LFxyXG4gICAgICAgIFZlcmlmaWNhdGlvbkNvbXBvbmVudF0sXHJcbiAgICBwcm92aWRlcnM6IFtGb3JtVmFsaWRhdGlvblNlcnZpY2UsIFJlZ2lzdHJhdGlvblNlcnZpY2UsXSxcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3Rlck1vZHVsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19