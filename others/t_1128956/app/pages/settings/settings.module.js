"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var angular_1 = require("nativescript-drop-down/angular");
var shared_module_1 = require("../../shared/shared.module");
var settings_component_1 = require("./settings.component");
var settings_service_1 = require("./settings.service");
exports.routerConfig = [
    { path: "", component: settings_component_1.SettingsComponent },
];
var SettingsModule = (function () {
    function SettingsModule() {
    }
    return SettingsModule;
}());
SettingsModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        imports: [
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            forms_1.NativeScriptFormsModule,
            router_1.NativeScriptRouterModule.forChild(exports.routerConfig),
            shared_module_1.SharedModule,
            angular_1.DropDownModule,
        ],
        declarations: [
            settings_component_1.SettingsComponent
        ],
        providers: [settings_service_1.SettingsService]
    }),
    __metadata("design:paramtypes", [])
], SettingsModule);
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBRXJFLDBEQUFnRTtBQUNoRSw0REFBMEQ7QUFFMUQsMkRBQXlEO0FBQ3pELHVEQUFxRDtBQUV4QyxRQUFBLFlBQVksR0FBRztJQUNyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLHNDQUFpQixFQUFFO0NBQ2hELENBQUM7QUFrQkYsSUFBYSxjQUFjO0lBQ3ZCO0lBQWdCLENBQUM7SUFDckIscUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLGNBQWM7SUFoQjFCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1FBQzNCLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQixpQ0FBd0I7WUFDeEIsK0JBQXVCO1lBQ3ZCLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxvQkFBWSxDQUFDO1lBQy9DLDRCQUFZO1lBQ1osd0JBQWM7U0FDakI7UUFDRCxZQUFZLEVBQUU7WUFDWixzQ0FBaUI7U0FDbEI7UUFDRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO0tBQy9CLENBQUM7O0dBRVcsY0FBYyxDQUUxQjtBQUZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcblxyXG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XHJcbmltcG9ydCB7IEZvcm1WYWxpZGF0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZm9ybVZhbGlkYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZXR0aW5nc0NvbXBvbmVudCB9IGZyb20gXCIuL3NldHRpbmdzLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tIFwiLi9zZXR0aW5ncy5zZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVyQ29uZmlnID0gW1xyXG4gICAgICAgeyBwYXRoOiBcIlwiLCBjb21wb25lbnQ6IFNldHRpbmdzQ29tcG9uZW50IH0sXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlckNvbmZpZyksXHJcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxyXG4gICAgICAgIERyb3BEb3duTW9kdWxlLFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICBTZXR0aW5nc0NvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1NldHRpbmdzU2VydmljZV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc01vZHVsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19