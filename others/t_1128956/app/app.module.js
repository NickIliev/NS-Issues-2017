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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSxzREFBOEY7QUFDOUYsa0RBQW1FO0FBQ25FLGtFQUF1RTtBQUN2RSx3Q0FBa0U7QUFDbEUsNkNBQWlEO0FBQ2pELGlEQUErQztBQUMvQywwQ0FBMEM7QUFDMUMsZ0VBQTZEO0FBQzdELG1FQUFpRTtBQUNqRSxtRUFBaUU7QUFDakUsbUZBQWlGO0FBQ2pGLDhEQUE4RDtBQUM5RCxrREFBb0Q7QUFDcEQsc0RBQWtEO0FBSWxELG1GQUFtRjtBQUVuRiwwREFBMEQ7QUFDMUQsaUVBQWlFO0FBRWpFLGtFQUF1RTtBQUN2RSxFQUFFLENBQUMsQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQztJQUNWLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLHFDQUFvQixDQUFDO0FBQzFDLENBQUM7QUFBQyxJQUFJLENBQUMsQ0FBQztJQUNKLElBQU0sRUFBRSxHQUFHLElBQUkscUNBQW9CLEVBQUUsQ0FBQztBQUMxQyxDQUFDO0FBOEJELElBQWEsU0FBUztJQUF0QjtJQUVBLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksU0FBUztJQTVCckIsZUFBUSxDQUFDO1FBQ04sU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztRQUN6QixPQUFPLEVBQUUsQ0FBQyx3Q0FBa0I7WUFDeEIsK0JBQXVCO1lBQ3ZCLDZCQUFzQjtZQUN0QiwyQkFBbUI7WUFDbkIsOEJBQWdCO1NBRW5CO1FBQ0QsWUFBWSxFQUFFLENBQUMsNEJBQVksQ0FBQztRQUM1QixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsK0JBQXVCO1lBQ3ZCLDZCQUFzQjtTQUV6QjtRQUNELFNBQVMsRUFBRSxDQUFDLGdCQUFPO1lBQ2YsOEJBQWE7WUFDYixpQ0FBa0I7WUFDbEIsNkJBQVk7WUFDWiw4QkFBYTtZQUNiLDhDQUFxQjtZQUNyQixvQkFBb0I7WUFDcEIsa0JBQWtCO1lBQ2xCLEVBQUUsT0FBTyxFQUFFLDRCQUFxQixFQUFFLFFBQVEsRUFBRSw4QkFBcUIsRUFBRTtTQUN0RTtRQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO0tBQzlCLENBQUM7R0FDVyxTQUFTLENBRXJCO0FBRlksOEJBQVM7QUFJdEIsOENBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIE5nTW9kdWxlRmFjdG9yeUxvYWRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSwgTlNNb2R1bGVGYWN0b3J5TG9hZGVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBHbG9iYWxzIH0gZnJvbSBcIi4vc2hhcmVkL2dsb2JhbFwiO1xyXG5pbXBvcnQgeyBDbGFpbVNlcnZpY2UgfSBmcm9tIFwiLi9wYWdlcy9jbGFpbXMvY2xhaW1zLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRHJhd2VyU2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC9zZXJ2aWNlcy9kcmF3ZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBHbG9iYWxTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkL3NlcnZpY2VzL2dsb2JhbC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEZvcm1WYWxpZGF0aW9uU2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC9zZXJ2aWNlcy9mb3JtVmFsaWRhdGlvbi5zZXJ2aWNlXCI7XHJcbi8vaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yTW9kdWxlIH0gZnJvbSBcIm5nLWh0dHAtaW50ZXJjZXB0b3JcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24nO1xyXG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm0nO1xyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xyXG5cclxuXHJcbi8vIHJlZ2lzdGVyRWxlbWVudChcIlZpZGVvUGxheWVyXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdmlkZW9wbGF5ZXJcIikuVmlkZW8pO1xyXG5cclxuLy8gaW1wb3J0IHsgQW5hbHl0aWNzU2VydmljZSB9IGZyb20gJy4vYW5hbHl0aWNzLnNlcnZpY2UnO1xyXG4vLyBpbXBvcnQgeyBBZG9iZUFuYWx5dGljcyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hZG9iZS1hbmFseXRpY3MnO1xyXG5cclxuaW1wb3J0IHsgQWRvYmVEZW1vQXBwRGVsZWdhdGUgfSBmcm9tICcuL2NvcmUvZGVsZWdhdGVzL2Fkb2JlLmRlbGVnYXRlJztcclxuaWYgKGlzSU9TKSB7XHJcbiAgYXBwLmlvcy5kZWxlZ2F0ZSA9IEFkb2JlRGVtb0FwcERlbGVnYXRlO1xyXG59IGVsc2Uge1xyXG4gICAgY29uc3QgYWEgPSBuZXcgQWRvYmVEZW1vQXBwRGVsZWdhdGUoKTtcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF0sXHJcbiAgICBpbXBvcnRzOiBbTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXHJcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIC8vSHR0cEludGVyY2VwdG9yTW9kdWxlLFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0FwcENvbXBvbmVudF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXHJcbiAgICAgICAgLy9IdHRwSW50ZXJjZXB0b3JNb2R1bGVcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtHbG9iYWxzLFxyXG4gICAgICAgIERyYXdlclNlcnZpY2UsXHJcbiAgICAgICAgTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIENsYWltU2VydmljZSxcclxuICAgICAgICBHbG9iYWxTZXJ2aWNlLFxyXG4gICAgICAgIEZvcm1WYWxpZGF0aW9uU2VydmljZSxcclxuICAgICAgICAvLyBBbmFseXRpY3NTZXJ2aWNlLFxyXG4gICAgICAgIC8vIEFkb2JlQW5hbHl0aWNzLFxyXG4gICAgICAgIHsgcHJvdmlkZTogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCB1c2VDbGFzczogTlNNb2R1bGVGYWN0b3J5TG9hZGVyIH1cclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7XHJcblxyXG59XHJcblxyXG4vLyBhcHAtY29tcG9uZW50cyB1c2VkIGJ5IG90aGVyIGFwcC1jb21wb25lbnRzXHJcbiJdfQ==