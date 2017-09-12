"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var routes = [
    { path: "", redirectTo: "/home/anonymousHome", pathMatch: "full" },
    {
        path: "home",
        loadChildren: "./pages/home/home.module#HomeModule",
        data: { title: "Home" }
    },
    {
        path: "login",
        loadChildren: "./pages/login/login.module#LoginModule",
        data: { title: "Camera" }
    },
    {
        path: "create",
        loadChildren: "./pages/registration/registration.module#RegisterModule",
        data: { title: "register" }
    },
    {
        path: "claimSummary",
        loadChildren: "./pages/claims/claim.module#ClaimModule",
        data: { title: "Claims" }
    },
    {
        path: "happy",
        loadChildren: "./pages/happy/happy.module#HappyModule",
        data: { title: "Happy" }
    },
    {
        path: "personal_info",
        loadChildren: "./pages/authentication/authentication.module#AuthenticationModule",
        data: { title: "Authentication" }
    },
    {
        path: "accounts",
        loadChildren: "./pages/accounts/accounts.module#AccountsModule",
        data: { title: "My Accounts" }
    },
    {
        path: "cards",
        loadChildren: "./pages/cards/cards.module#CardsModule",
        data: { title: "My Cards" }
    },
    {
        path: "medication",
        loadChildren: "./pages/medication/medication.module#MedicationModule",
        data: { title: "My Medications" }
    },
    {
        path: "mydoctors",
        loadChildren: "./pages/myDoctors/myDoctors.module#MyDoctorsModule",
        data: { title: "My Doctors" }
    },
    {
        path: "aboutapp",
        loadChildren: "./pages/aboutapp/aboutapp.module#AboutAppModule",
        data: { title: "About MyBlue App" }
    },
    {
        path: "myPlan",
        loadChildren: "./pages/myPlan/myPlan.module#MyPlanModule",
        data: { title: "myPlan" }
    },
    {
        path: "contactUs",
        loadChildren: "./pages/contactUs/contactUs.module#ContactUsModule",
        data: { title: "Contact Us" }
    },
    {
        path: "offline",
        loadChildren: "./pages/offline/offline.module#OfflineModule",
        data: { title: "Offline" }
    },
    {
        path: "settings",
        loadChildren: "./pages/settings/settings.module#SettingsModule",
        data: { title: "Settings" }
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
        exports: [router_1.NativeScriptRouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFJdkUsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0lBQzFEO1FBQ0ksSUFBSSxFQUFFLE1BQU07UUFDWixZQUFZLEVBQUUscUNBQXFDO1FBQ25ELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7S0FDMUI7SUFDRDtRQUNJLElBQUksRUFBRSxPQUFPO1FBQ2IsWUFBWSxFQUFFLHdDQUF3QztRQUN0RCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0tBQzVCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsUUFBUTtRQUNkLFlBQVksRUFBRSx5REFBeUQ7UUFDdkUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtLQUM5QjtJQUNEO1FBQ0ksSUFBSSxFQUFFLGNBQWM7UUFDcEIsWUFBWSxFQUFFLHlDQUF5QztRQUN2RCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0tBQzVCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsT0FBTztRQUNiLFlBQVksRUFBRSx3Q0FBd0M7UUFDdEQsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtLQUMzQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLGVBQWU7UUFDckIsWUFBWSxFQUFFLG1FQUFtRTtRQUNqRixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUU7S0FDcEM7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLFlBQVksRUFBRSxpREFBaUQ7UUFDL0QsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRTtLQUNqQztJQUNEO1FBQ0ksSUFBSSxFQUFFLE9BQU87UUFDYixZQUFZLEVBQUUsd0NBQXdDO1FBQ3RELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7S0FDOUI7SUFDRDtRQUNJLElBQUksRUFBRSxZQUFZO1FBQ2xCLFlBQVksRUFBRSx1REFBdUQ7UUFDckUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFO0tBQ3BDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsV0FBVztRQUNqQixZQUFZLEVBQUUsb0RBQW9EO1FBQ2xFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7S0FDaEM7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLFlBQVksRUFBRSxpREFBaUQ7UUFDL0QsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFO0tBQ3RDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsUUFBUTtRQUNkLFlBQVksRUFBRSwyQ0FBMkM7UUFDekQsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtLQUM1QjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFdBQVc7UUFDakIsWUFBWSxFQUFFLG9EQUFvRDtRQUNsRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO0tBQ2hDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsU0FBUztRQUNmLFlBQVksRUFBRSw4Q0FBOEM7UUFDNUQsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTtLQUM3QjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7UUFDaEIsWUFBWSxFQUFFLGlEQUFpRDtRQUMvRCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO0tBQzlCO0NBQ1osQ0FBQztBQU1GLElBQWEsZ0JBQWdCO0lBQTdCO0lBQWdDLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFBakMsSUFBaUM7QUFBcEIsZ0JBQWdCO0lBSjVCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztLQUN0QyxDQUFDO0dBQ1csZ0JBQWdCLENBQUk7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvaG9tZS9hbm9ueW1vdXNIb21lXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJob21lXCIsXHJcbiAgICAgICAgICAgICAgICBsb2FkQ2hpbGRyZW46IFwiLi9wYWdlcy9ob21lL2hvbWUubW9kdWxlI0hvbWVNb2R1bGVcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHsgdGl0bGU6IFwiSG9tZVwiIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJsb2dpblwiLFxyXG4gICAgICAgICAgICAgICAgbG9hZENoaWxkcmVuOiBcIi4vcGFnZXMvbG9naW4vbG9naW4ubW9kdWxlI0xvZ2luTW9kdWxlXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIkNhbWVyYVwiIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJjcmVhdGVcIixcclxuICAgICAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL3BhZ2VzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kdWxlI1JlZ2lzdGVyTW9kdWxlXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IHRpdGxlOiBcInJlZ2lzdGVyXCIgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiBcImNsYWltU3VtbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgbG9hZENoaWxkcmVuOiBcIi4vcGFnZXMvY2xhaW1zL2NsYWltLm1vZHVsZSNDbGFpbU1vZHVsZVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyB0aXRsZTogXCJDbGFpbXNcIiB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6IFwiaGFwcHlcIixcclxuICAgICAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL3BhZ2VzL2hhcHB5L2hhcHB5Lm1vZHVsZSNIYXBweU1vZHVsZVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyB0aXRsZTogXCJIYXBweVwiIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJwZXJzb25hbF9pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICBsb2FkQ2hpbGRyZW46IFwiLi9wYWdlcy9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5tb2R1bGUjQXV0aGVudGljYXRpb25Nb2R1bGVcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHsgdGl0bGU6IFwiQXV0aGVudGljYXRpb25cIiB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6IFwiYWNjb3VudHNcIixcclxuICAgICAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL3BhZ2VzL2FjY291bnRzL2FjY291bnRzLm1vZHVsZSNBY2NvdW50c01vZHVsZVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyB0aXRsZTogXCJNeSBBY2NvdW50c1wiIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJjYXJkc1wiLFxyXG4gICAgICAgICAgICAgICAgbG9hZENoaWxkcmVuOiBcIi4vcGFnZXMvY2FyZHMvY2FyZHMubW9kdWxlI0NhcmRzTW9kdWxlXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIk15IENhcmRzXCIgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiBcIm1lZGljYXRpb25cIixcclxuICAgICAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL3BhZ2VzL21lZGljYXRpb24vbWVkaWNhdGlvbi5tb2R1bGUjTWVkaWNhdGlvbk1vZHVsZVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyB0aXRsZTogXCJNeSBNZWRpY2F0aW9uc1wiIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJteWRvY3RvcnNcIixcclxuICAgICAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL3BhZ2VzL215RG9jdG9ycy9teURvY3RvcnMubW9kdWxlI015RG9jdG9yc01vZHVsZVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyB0aXRsZTogXCJNeSBEb2N0b3JzXCIgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiBcImFib3V0YXBwXCIsXHJcbiAgICAgICAgICAgICAgICBsb2FkQ2hpbGRyZW46IFwiLi9wYWdlcy9hYm91dGFwcC9hYm91dGFwcC5tb2R1bGUjQWJvdXRBcHBNb2R1bGVcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHsgdGl0bGU6IFwiQWJvdXQgTXlCbHVlIEFwcFwiIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJteVBsYW5cIixcclxuICAgICAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL3BhZ2VzL215UGxhbi9teVBsYW4ubW9kdWxlI015UGxhbk1vZHVsZVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyB0aXRsZTogXCJteVBsYW5cIiB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6IFwiY29udGFjdFVzXCIsXHJcbiAgICAgICAgICAgICAgICBsb2FkQ2hpbGRyZW46IFwiLi9wYWdlcy9jb250YWN0VXMvY29udGFjdFVzLm1vZHVsZSNDb250YWN0VXNNb2R1bGVcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHsgdGl0bGU6IFwiQ29udGFjdCBVc1wiIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJvZmZsaW5lXCIsXHJcbiAgICAgICAgICAgICAgICBsb2FkQ2hpbGRyZW46IFwiLi9wYWdlcy9vZmZsaW5lL29mZmxpbmUubW9kdWxlI09mZmxpbmVNb2R1bGVcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHsgdGl0bGU6IFwiT2ZmbGluZVwiIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogXCJzZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICAgICAgbG9hZENoaWxkcmVuOiBcIi4vcGFnZXMvc2V0dGluZ3Mvc2V0dGluZ3MubW9kdWxlI1NldHRpbmdzTW9kdWxlXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIlNldHRpbmdzXCIgfVxyXG4gICAgICAgICAgICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyldLFxyXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUgeyB9Il19