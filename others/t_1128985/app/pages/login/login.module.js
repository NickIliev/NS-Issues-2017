"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var login_component_1 = require("./login.component");
var shared_module_1 = require("../../shared/shared.module");
var login_service_1 = require("./login.service");
var changeUser_component_1 = require("./changeUser/changeUser.component");
exports.routerConfig = [
    {
        path: "",
        component: login_component_1.LoginComponent
    },
    {
        path: "changeUser",
        component: changeUser_component_1.ChangeUserComponent,
        data: { title: "Change Online ID" }
    }
];
var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    core_1.NgModule({
        schemas: [core_1.NO_ERRORS_SCHEMA],
        imports: [
            //  TitleAndNavButtonModule,
            nativescript_module_1.NativeScriptModule,
            router_1.NativeScriptRouterModule,
            forms_1.NativeScriptFormsModule,
            router_1.NativeScriptRouterModule.forChild(exports.routerConfig),
            shared_module_1.SharedModule
        ],
        declarations: [login_component_1.LoginComponent, changeUser_component_1.ChangeUserComponent],
        providers: [login_service_1.LoginService]
    }),
    __metadata("design:paramtypes", [])
], LoginModule);
exports.LoginModule = LoginModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBRXJFLHFEQUFtRDtBQUNuRCw0REFBMEQ7QUFDMUQsaURBQStDO0FBQy9DLDBFQUF3RTtBQUUzRCxRQUFBLFlBQVksR0FBRztJQUN4QjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLGdDQUFjO0tBQzVCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsWUFBWTtRQUNsQixTQUFTLEVBQUUsMENBQW1CO1FBQzlCLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBQztLQUNyQztDQUNKLENBQUM7QUFnQkYsSUFBYSxXQUFXO0lBQ3BCO0lBQWdCLENBQUM7SUFDckIsa0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLFdBQVc7SUFkdkIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7UUFDM0IsT0FBTyxFQUFFO1lBQ1AsNEJBQTRCO1lBQzFCLHdDQUFrQjtZQUNsQixpQ0FBd0I7WUFDeEIsK0JBQXVCO1lBQ3ZCLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxvQkFBWSxDQUFDO1lBQy9DLDRCQUFZO1NBQ2Y7UUFDRCxZQUFZLEVBQUUsQ0FBQyxnQ0FBYyxFQUFFLDBDQUFtQixDQUFDO1FBQ25ELFNBQVMsRUFBRSxDQUFFLDRCQUFZLENBQUU7S0FDOUIsQ0FBQzs7R0FFVyxXQUFXLENBRXZCO0FBRlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9sb2dpbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSBcIi4vbG9naW4uc2VydmljZVwiO1xuaW1wb3J0IHsgQ2hhbmdlVXNlckNvbXBvbmVudCB9IGZyb20gXCIuL2NoYW5nZVVzZXIvY2hhbmdlVXNlci5jb21wb25lbnRcIjtcblxuZXhwb3J0IGNvbnN0IHJvdXRlckNvbmZpZyA9IFtcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiXCIsXG4gICAgICAgIGNvbXBvbmVudDogTG9naW5Db21wb25lbnRcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJjaGFuZ2VVc2VyXCIsXG4gICAgICAgIGNvbXBvbmVudDogQ2hhbmdlVXNlckNvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyB0aXRsZTogXCJDaGFuZ2UgT25saW5lIElEXCJ9XG4gICAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG4gICAgaW1wb3J0czogW1xuICAgICAgLy8gIFRpdGxlQW5kTmF2QnV0dG9uTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXJDb25maWcpLFxuICAgICAgICBTaGFyZWRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW0xvZ2luQ29tcG9uZW50LCBDaGFuZ2VVc2VyQ29tcG9uZW50XSxcbiAgICBwcm92aWRlcnM6IFsgTG9naW5TZXJ2aWNlIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2dpbk1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiJdfQ==