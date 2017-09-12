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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjb3VudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxnRkFBOEU7QUFDOUUsb0RBQXFFO0FBQ3JFLDBGQUF3RjtBQUN4RixvRkFBa0Y7QUFDbEYsdURBQW9EO0FBQ3BELDREQUEwRDtBQUU3QyxRQUFBLFlBQVksR0FBRztJQUN4QjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLDhDQUFxQjtRQUNoQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFDO0tBQy9CO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsTUFBTTtRQUNaLFNBQVMsRUFBRSw4Q0FBcUI7UUFDaEMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBQztLQUMvQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFlBQVk7UUFDbEIsU0FBUyxFQUFFLDBDQUFtQjtRQUM5QixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFDO0tBQy9CO0NBQ0osQ0FBQztBQWtCRixJQUFhLGNBQWM7SUFDdkI7SUFBZ0IsQ0FBQztJQUNyQixxQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksY0FBYztJQWhCMUIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7UUFDM0IsT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLGlDQUF3QjtZQUN4QiwrQkFBdUI7WUFDdkIsaUNBQXdCLENBQUMsUUFBUSxDQUFDLG9CQUFZLENBQUM7WUFDL0MsNEJBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWLDhDQUFxQjtZQUNyQiwwQ0FBbUI7U0FDdEI7UUFDRCxTQUFTLEVBQUUsQ0FBQyxpQ0FBYyxDQUFDO0tBQzlCLENBQUM7O0dBRVcsY0FBYyxDQUUxQjtBQUZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBBY2NvdW50c0hvbWVDb21wb25lbnQgfSBmcm9tIFwiLi4vYWNjb3VudHMvYWNjb3VudHNIb21lL2FjY291bnRzSG9tZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IE15QWNjb3VudHNDb21wb25lbnQgfSBmcm9tIFwiLi4vYWNjb3VudHMvbXlBY2NvdW50cy9teUFjY291bnRzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tIFwiLi9hY2NvdW50cy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcblxuZXhwb3J0IGNvbnN0IHJvdXRlckNvbmZpZyA9IFtcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiXCIsXG4gICAgICAgIGNvbXBvbmVudDogQWNjb3VudHNIb21lQ29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIk15QWNjb3VudHNcIn1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJob21lXCIsXG4gICAgICAgIGNvbXBvbmVudDogQWNjb3VudHNIb21lQ29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIk15QWNjb3VudHNcIn1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJteUFjY291bnRzXCIsXG4gICAgICAgIGNvbXBvbmVudDogTXlBY2NvdW50c0NvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyB0aXRsZTogXCJNeUFjY291bnRzXCJ9XG4gICAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQV0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXJDb25maWcpLFxuICAgICAgICBTaGFyZWRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBY2NvdW50c0hvbWVDb21wb25lbnQsXG4gICAgICAgIE15QWNjb3VudHNDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW0FjY291bnRTZXJ2aWNlXVxufSlcblxuZXhwb3J0IGNsYXNzIEFjY291bnRzTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIl19