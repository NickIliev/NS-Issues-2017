"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
var core_1 = require("@angular/core");
var contactUs_component_1 = require("./contactUs.component");
var shared_module_1 = require("../../shared/shared.module");
exports.routerConfig = [
    {
        path: "",
        component: contactUs_component_1.ContactUsComponent
    }
];
var ContactUsModule = (function () {
    function ContactUsModule() {
    }
    return ContactUsModule;
}());
ContactUsModule = __decorate([
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
            contactUs_component_1.ContactUsComponent
        ]
    })
], ContactUsModule);
exports.ContactUsModule = ContactUsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdFVzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRhY3RVcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLG9EQUFxRTtBQUNyRSxzQ0FBMkQ7QUFDM0QsNkRBQTJEO0FBQzNELDREQUEwRDtBQUc3QyxRQUFBLFlBQVksR0FBRztJQUN4QjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLHdDQUFrQjtLQUNoQztDQUNKLENBQUM7QUFnQkYsSUFBYSxlQUFlO0lBQTVCO0lBQStCLENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFBaEMsSUFBZ0M7QUFBbkIsZUFBZTtJQWQzQixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztRQUMzQixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsaUNBQXdCO1lBQ3hCLCtCQUF1QjtZQUN2QixpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsb0JBQVksQ0FBQztZQUMvQyw0QkFBWTtTQUNmO1FBQ0EsWUFBWSxFQUFFO1lBQ1gsd0NBQWtCO1NBQ3JCO0tBQ0osQ0FBQztHQUVXLGVBQWUsQ0FBSTtBQUFuQiwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29udGFjdFVzQ29tcG9uZW50IH0gZnJvbSBcIi4vY29udGFjdFVzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XG5cblxuZXhwb3J0IGNvbnN0IHJvdXRlckNvbmZpZyA9IFtcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiXCIsXG4gICAgICAgIGNvbXBvbmVudDogQ29udGFjdFVzQ29tcG9uZW50XG4gICAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXJDb25maWcpLFxuICAgICAgICBTaGFyZWRNb2R1bGVcbiAgICBdLFxuICAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ29udGFjdFVzQ29tcG9uZW50XG4gICAgXVxufSlcblxuZXhwb3J0IGNsYXNzIENvbnRhY3RVc01vZHVsZSB7IH0iXX0=