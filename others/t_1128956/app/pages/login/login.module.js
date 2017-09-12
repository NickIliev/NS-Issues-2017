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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBRXJFLHFEQUFtRDtBQUNuRCw0REFBMEQ7QUFDMUQsaURBQStDO0FBQy9DLDBFQUF3RTtBQUUzRCxRQUFBLFlBQVksR0FBRztJQUN4QjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLGdDQUFjO0tBQzVCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsWUFBWTtRQUNsQixTQUFTLEVBQUUsMENBQW1CO1FBQzlCLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBQztLQUNyQztDQUNKLENBQUM7QUFnQkYsSUFBYSxXQUFXO0lBQ3BCO0lBQWdCLENBQUM7SUFDckIsa0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLFdBQVc7SUFkdkIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7UUFDM0IsT0FBTyxFQUFFO1lBQ1AsNEJBQTRCO1lBQzFCLHdDQUFrQjtZQUNsQixpQ0FBd0I7WUFDeEIsK0JBQXVCO1lBQ3ZCLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxvQkFBWSxDQUFDO1lBQy9DLDRCQUFZO1NBQ2Y7UUFDRCxZQUFZLEVBQUUsQ0FBQyxnQ0FBYyxFQUFFLDBDQUFtQixDQUFDO1FBQ25ELFNBQVMsRUFBRSxDQUFFLDRCQUFZLENBQUU7S0FDOUIsQ0FBQzs7R0FFVyxXQUFXLENBRXZCO0FBRlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vbG9naW4uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBMb2dpblNlcnZpY2UgfSBmcm9tIFwiLi9sb2dpbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENoYW5nZVVzZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jaGFuZ2VVc2VyL2NoYW5nZVVzZXIuY29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVyQ29uZmlnID0gW1xyXG4gICAge1xyXG4gICAgICAgIHBhdGg6IFwiXCIsXHJcbiAgICAgICAgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiBcImNoYW5nZVVzZXJcIixcclxuICAgICAgICBjb21wb25lbnQ6IENoYW5nZVVzZXJDb21wb25lbnQsXHJcbiAgICAgICAgZGF0YTogeyB0aXRsZTogXCJDaGFuZ2UgT25saW5lIElEXCJ9XHJcbiAgICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAvLyAgVGl0bGVBbmROYXZCdXR0b25Nb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVyQ29uZmlnKSxcclxuICAgICAgICBTaGFyZWRNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtMb2dpbkNvbXBvbmVudCwgQ2hhbmdlVXNlckNvbXBvbmVudF0sXHJcbiAgICBwcm92aWRlcnM6IFsgTG9naW5TZXJ2aWNlIF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dpbk1vZHVsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG59XHJcbiJdfQ==