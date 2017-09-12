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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFwcHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGFwcHkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBRXJFLHFEQUFtRDtBQUNuRCw0REFBMEQ7QUFHN0MsUUFBQSxZQUFZLEdBQUc7SUFDeEI7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxnQ0FBYztLQUM1QjtDQUNKLENBQUM7QUFnQkYsSUFBYSxXQUFXO0lBQ3BCO0lBQWdCLENBQUM7SUFDckIsa0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLFdBQVc7SUFkdkIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7UUFDM0IsT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLGlDQUF3QjtZQUN4QiwrQkFBdUI7WUFDdkIsaUNBQXdCLENBQUMsUUFBUSxDQUFDLG9CQUFZLENBQUM7WUFDL0MsNEJBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWLGdDQUFjO1NBQ2pCO0tBQ0osQ0FBQzs7R0FFVyxXQUFXLENBRXZCO0FBRlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0IHsgSGFwcHlDb21wb25lbnQgfSBmcm9tIFwiLi9oYXBweS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xuXG5cbmV4cG9ydCBjb25zdCByb3V0ZXJDb25maWcgPSBbXG4gICAge1xuICAgICAgICBwYXRoOiBcIlwiLFxuICAgICAgICBjb21wb25lbnQ6IEhhcHB5Q29tcG9uZW50XG4gICAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXJDb25maWcpLFxuICAgICAgICBTaGFyZWRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBIYXBweUNvbXBvbmVudFxuICAgIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBIYXBweU1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7IH1cbn0iXX0=