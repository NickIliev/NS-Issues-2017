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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBRXJFLDBEQUFnRTtBQUNoRSw0REFBMEQ7QUFFMUQsMkRBQXlEO0FBQ3pELHVEQUFxRDtBQUV4QyxRQUFBLFlBQVksR0FBRztJQUNyQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLHNDQUFpQixFQUFFO0NBQ2hELENBQUM7QUFrQkYsSUFBYSxjQUFjO0lBQ3ZCO0lBQWdCLENBQUM7SUFDckIscUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLGNBQWM7SUFoQjFCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1FBQzNCLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQixpQ0FBd0I7WUFDeEIsK0JBQXVCO1lBQ3ZCLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxvQkFBWSxDQUFDO1lBQy9DLDRCQUFZO1lBQ1osd0JBQWM7U0FDakI7UUFDRCxZQUFZLEVBQUU7WUFDWixzQ0FBaUI7U0FDbEI7UUFDRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO0tBQy9CLENBQUM7O0dBRVcsY0FBYyxDQUUxQjtBQUZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5cbmltcG9ydCB7IERyb3BEb3duTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd24vYW5ndWxhclwiO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XG5pbXBvcnQgeyBGb3JtVmFsaWRhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2Zvcm1WYWxpZGF0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNldHRpbmdzQ29tcG9uZW50IH0gZnJvbSBcIi4vc2V0dGluZ3MuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTZXR0aW5nc1NlcnZpY2UgfSBmcm9tIFwiLi9zZXR0aW5ncy5zZXJ2aWNlXCI7XG5cbmV4cG9ydCBjb25zdCByb3V0ZXJDb25maWcgPSBbXG4gICAgICAgeyBwYXRoOiBcIlwiLCBjb21wb25lbnQ6IFNldHRpbmdzQ29tcG9uZW50IH0sXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlckNvbmZpZyksXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcbiAgICAgICAgRHJvcERvd25Nb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgIFNldHRpbmdzQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtTZXR0aW5nc1NlcnZpY2VdXG59KVxuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG59XG5cblxuXG5cblxuIl19