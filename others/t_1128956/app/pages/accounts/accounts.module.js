"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var accountsHome_component_1 = require("../accounts/accountsHome/accountsHome.component");
var myAccounts_component_1 = require("../accounts/myAccounts/myAccounts.component");
var accounts_service_1 = require("./accounts.service");
var shared_module_1 = require("../../shared/shared.module");
exports.routerConfig = [
    {
        path: "",
        component: accountsHome_component_1.AccountsHomeComponent,
        data: { title: "MyAccounts" }
    },
    {
        path: "home",
        component: accountsHome_component_1.AccountsHomeComponent,
        data: { title: "MyAccounts" }
    },
    {
        path: "myAccounts",
        component: myAccounts_component_1.MyAccountsComponent,
        data: { title: "MyAccounts" }
    }
];
var AccountsModule = (function () {
    function AccountsModule() {
    }
    return AccountsModule;
}());
AccountsModule = __decorate([
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
            accountsHome_component_1.AccountsHomeComponent,
            myAccounts_component_1.MyAccountsComponent
        ],
        providers: [accounts_service_1.AccountService]
    }),
    __metadata("design:paramtypes", [])
], AccountsModule);
exports.AccountsModule = AccountsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjb3VudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBQ3JFLDBGQUF3RjtBQUN4RixvRkFBa0Y7QUFDbEYsdURBQW9EO0FBQ3BELDREQUEwRDtBQUU3QyxRQUFBLFlBQVksR0FBRztJQUN4QjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLDhDQUFxQjtRQUNoQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFDO0tBQy9CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsTUFBTTtRQUNaLFNBQVMsRUFBRSw4Q0FBcUI7UUFDaEMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBQztLQUMvQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFlBQVk7UUFDbEIsU0FBUyxFQUFFLDBDQUFtQjtRQUM5QixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFDO0tBQy9CO0NBQ0osQ0FBQztBQWtCRixJQUFhLGNBQWM7SUFDdkI7SUFBZ0IsQ0FBQztJQUNyQixxQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksY0FBYztJQWhCMUIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7UUFDM0IsT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLGlDQUF3QjtZQUN4QiwrQkFBdUI7WUFDdkIsaUNBQXdCLENBQUMsUUFBUSxDQUFDLG9CQUFZLENBQUM7WUFDL0MsNEJBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWLDhDQUFxQjtZQUNyQiwwQ0FBbUI7U0FDdEI7UUFDRCxTQUFTLEVBQUUsQ0FBQyxpQ0FBYyxDQUFDO0tBQzlCLENBQUM7O0dBRVcsY0FBYyxDQUUxQjtBQUZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IEFjY291bnRzSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuLi9hY2NvdW50cy9hY2NvdW50c0hvbWUvYWNjb3VudHNIb21lLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNeUFjY291bnRzQ29tcG9uZW50IH0gZnJvbSBcIi4uL2FjY291bnRzL215QWNjb3VudHMvbXlBY2NvdW50cy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tIFwiLi9hY2NvdW50cy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRlckNvbmZpZyA9IFtcclxuICAgIHtcclxuICAgICAgICBwYXRoOiBcIlwiLFxyXG4gICAgICAgIGNvbXBvbmVudDogQWNjb3VudHNIb21lQ29tcG9uZW50LFxyXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6IFwiTXlBY2NvdW50c1wifVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiBcImhvbWVcIixcclxuICAgICAgICBjb21wb25lbnQ6IEFjY291bnRzSG9tZUNvbXBvbmVudCxcclxuICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIk15QWNjb3VudHNcIn1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogXCJteUFjY291bnRzXCIsXHJcbiAgICAgICAgY29tcG9uZW50OiBNeUFjY291bnRzQ29tcG9uZW50LFxyXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6IFwiTXlBY2NvdW50c1wifVxyXG4gICAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXJDb25maWcpLFxyXG4gICAgICAgIFNoYXJlZE1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFjY291bnRzSG9tZUNvbXBvbmVudCxcclxuICAgICAgICBNeUFjY291bnRzQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbQWNjb3VudFNlcnZpY2VdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQWNjb3VudHNNb2R1bGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxufVxyXG4iXX0=