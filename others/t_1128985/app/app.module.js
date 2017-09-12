"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var router_1 = require("nativescript-angular/router");
var http_1 = require("nativescript-angular/http");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var forms_2 = require("@angular/forms");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var global_1 = require("./shared/global");
var claims_service_1 = require("./pages/claims/claims.service");
var drawer_service_1 = require("./shared/services/drawer.service");
var global_service_1 = require("./shared/services/global.service");
var formValidation_service_1 = require("./shared/services/formValidation.service");
//import { HttpInterceptorModule } from "ng-http-interceptor";
var app = require("tns-core-modules/application");
var platform_1 = require("tns-core-modules/platform");
// registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);
// import { AnalyticsService } from './analytics.service';
// import { AdobeAnalytics } from 'nativescript-adobe-analytics';
var adobe_delegate_1 = require("./core/delegates/adobe.delegate");
if (platform_1.isIOS) {
    app.ios.delegate = adobe_delegate_1.AdobeDemoAppDelegate;
}
else {
    var aa = new adobe_delegate_1.AdobeDemoAppDelegate();
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [app_component_1.AppComponent],
        imports: [nativescript_module_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            http_1.NativeScriptHttpModule,
            forms_2.ReactiveFormsModule,
            app_routing_1.AppRoutingModule,
        ],
        declarations: [app_component_1.AppComponent],
        exports: [
            nativescript_module_1.NativeScriptModule,
            forms_1.NativeScriptFormsModule,
            http_1.NativeScriptHttpModule,
        ],
        providers: [global_1.Globals,
            drawer_service_1.DrawerService,
            modal_dialog_1.ModalDialogService,
            claims_service_1.ClaimService,
            global_service_1.GlobalService,
            formValidation_service_1.FormValidationService,
            // AnalyticsService,
            // AdobeAnalytics,
            { provide: core_1.NgModuleFactoryLoader, useClass: router_1.NSModuleFactoryLoader }
        ],
        schemas: [core_1.NO_ERRORS_SCHEMA]
    })
], AppModule);
exports.AppModule = AppModule;
// app-components used by other app-components
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxzREFBOEY7QUFDOUYsa0RBQW1FO0FBQ25FLGtFQUF1RTtBQUN2RSx3Q0FBa0U7QUFDbEUsNkNBQWlEO0FBQ2pELGlEQUErQztBQUMvQywwQ0FBMEM7QUFDMUMsZ0VBQTZEO0FBQzdELG1FQUFpRTtBQUNqRSxtRUFBaUU7QUFDakUsbUZBQWlGO0FBQ2pGLDhEQUE4RDtBQUM5RCxrREFBb0Q7QUFDcEQsc0RBQWtEO0FBSWxELG1GQUFtRjtBQUVuRiwwREFBMEQ7QUFDMUQsaUVBQWlFO0FBRWpFLGtFQUF1RTtBQUN2RSxFQUFFLENBQUMsQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQztJQUNWLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLHFDQUFvQixDQUFDO0FBQzFDLENBQUM7QUFBQyxJQUFJLENBQUMsQ0FBQztJQUNKLElBQU0sRUFBRSxHQUFHLElBQUkscUNBQW9CLEVBQUUsQ0FBQztBQUMxQyxDQUFDO0FBOEJELElBQWEsU0FBUztJQUF0QjtJQUVBLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksU0FBUztJQTVCckIsZUFBUSxDQUFDO1FBQ04sU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztRQUN6QixPQUFPLEVBQUUsQ0FBQyx3Q0FBa0I7WUFDeEIsK0JBQXVCO1lBQ3ZCLDZCQUFzQjtZQUN0QiwyQkFBbUI7WUFDbkIsOEJBQWdCO1NBRW5CO1FBQ0QsWUFBWSxFQUFFLENBQUMsNEJBQVksQ0FBQztRQUM1QixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsK0JBQXVCO1lBQ3ZCLDZCQUFzQjtTQUV6QjtRQUNELFNBQVMsRUFBRSxDQUFDLGdCQUFPO1lBQ2YsOEJBQWE7WUFDYixpQ0FBa0I7WUFDbEIsNkJBQVk7WUFDWiw4QkFBYTtZQUNiLDhDQUFxQjtZQUNyQixvQkFBb0I7WUFDcEIsa0JBQWtCO1lBQ2xCLEVBQUUsT0FBTyxFQUFFLDRCQUFxQixFQUFFLFFBQVEsRUFBRSw4QkFBcUIsRUFBRTtTQUN0RTtRQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO0tBQzlCLENBQUM7R0FDVyxTQUFTLENBRXJCO0FBRlksOEJBQVM7QUFJdEIsOENBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIE5nTW9kdWxlRmFjdG9yeUxvYWRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSwgTlNNb2R1bGVGYWN0b3J5TG9hZGVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4vc2hhcmVkL2dsb2JhbFwiO1xuaW1wb3J0IHsgQ2xhaW1TZXJ2aWNlIH0gZnJvbSBcIi4vcGFnZXMvY2xhaW1zL2NsYWltcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEcmF3ZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL3NlcnZpY2VzL2RyYXdlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBHbG9iYWxTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL3NlcnZpY2VzL2dsb2JhbC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGb3JtVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvc2VydmljZXMvZm9ybVZhbGlkYXRpb24uc2VydmljZVwiO1xuLy9pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3JNb2R1bGUgfSBmcm9tIFwibmctaHR0cC1pbnRlcmNlcHRvclwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgaXNJT1MgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtJztcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5cblxuLy8gcmVnaXN0ZXJFbGVtZW50KFwiVmlkZW9QbGF5ZXJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC12aWRlb3BsYXllclwiKS5WaWRlbyk7XG5cbi8vIGltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuL2FuYWx5dGljcy5zZXJ2aWNlJztcbi8vIGltcG9ydCB7IEFkb2JlQW5hbHl0aWNzIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFkb2JlLWFuYWx5dGljcyc7XG5cbmltcG9ydCB7IEFkb2JlRGVtb0FwcERlbGVnYXRlIH0gZnJvbSAnLi9jb3JlL2RlbGVnYXRlcy9hZG9iZS5kZWxlZ2F0ZSc7XG5pZiAoaXNJT1MpIHtcbiAgYXBwLmlvcy5kZWxlZ2F0ZSA9IEFkb2JlRGVtb0FwcERlbGVnYXRlO1xufSBlbHNlIHtcbiAgICBjb25zdCBhYSA9IG5ldyBBZG9iZURlbW9BcHBEZWxlZ2F0ZSgpO1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF0sXG4gICAgaW1wb3J0czogW05hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIC8vSHR0cEludGVyY2VwdG9yTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbQXBwQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXG4gICAgICAgIC8vSHR0cEludGVyY2VwdG9yTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtHbG9iYWxzLFxuICAgICAgICBEcmF3ZXJTZXJ2aWNlLFxuICAgICAgICBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIENsYWltU2VydmljZSxcbiAgICAgICAgR2xvYmFsU2VydmljZSxcbiAgICAgICAgRm9ybVZhbGlkYXRpb25TZXJ2aWNlLFxuICAgICAgICAvLyBBbmFseXRpY3NTZXJ2aWNlLFxuICAgICAgICAvLyBBZG9iZUFuYWx5dGljcyxcbiAgICAgICAgeyBwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIHVzZUNsYXNzOiBOU01vZHVsZUZhY3RvcnlMb2FkZXIgfVxuICAgIF0sXG4gICAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7XG5cbn1cblxuLy8gYXBwLWNvbXBvbmVudHMgdXNlZCBieSBvdGhlciBhcHAtY29tcG9uZW50c1xuIl19