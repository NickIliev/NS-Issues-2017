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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFJdkUsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0lBQ2xFO1FBQ0ksSUFBSSxFQUFFLE1BQU07UUFDWixZQUFZLEVBQUUscUNBQXFDO1FBQ25ELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7S0FDMUI7SUFDRDtRQUNJLElBQUksRUFBRSxPQUFPO1FBQ2IsWUFBWSxFQUFFLHdDQUF3QztRQUN0RCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0tBQzVCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsUUFBUTtRQUNkLFlBQVksRUFBRSx5REFBeUQ7UUFDdkUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtLQUM5QjtJQUNEO1FBQ0ksSUFBSSxFQUFFLGNBQWM7UUFDcEIsWUFBWSxFQUFFLHlDQUF5QztRQUN2RCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0tBQzVCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsT0FBTztRQUNiLFlBQVksRUFBRSx3Q0FBd0M7UUFDdEQsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtLQUMzQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLGVBQWU7UUFDckIsWUFBWSxFQUFFLG1FQUFtRTtRQUNqRixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUU7S0FDcEM7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLFlBQVksRUFBRSxpREFBaUQ7UUFDL0QsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRTtLQUNqQztJQUNEO1FBQ0ksSUFBSSxFQUFFLE9BQU87UUFDYixZQUFZLEVBQUUsd0NBQXdDO1FBQ3RELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7S0FDOUI7SUFDRDtRQUNJLElBQUksRUFBRSxZQUFZO1FBQ2xCLFlBQVksRUFBRSx1REFBdUQ7UUFDckUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFO0tBQ3BDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsV0FBVztRQUNqQixZQUFZLEVBQUUsb0RBQW9EO1FBQ2xFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7S0FDaEM7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLFlBQVksRUFBRSxpREFBaUQ7UUFDL0QsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFO0tBQ3RDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsUUFBUTtRQUNkLFlBQVksRUFBRSwyQ0FBMkM7UUFDekQsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtLQUM1QjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFdBQVc7UUFDakIsWUFBWSxFQUFFLG9EQUFvRDtRQUNsRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFO0tBQ2hDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsU0FBUztRQUNmLFlBQVksRUFBRSw4Q0FBOEM7UUFDNUQsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTtLQUM3QjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7UUFDaEIsWUFBWSxFQUFFLGlEQUFpRDtRQUMvRCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO0tBQzlCO0NBQ0osQ0FBQztBQU1GLElBQWEsZ0JBQWdCO0lBQTdCO0lBQWdDLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFBakMsSUFBaUM7QUFBcEIsZ0JBQWdCO0lBSjVCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztLQUN0QyxDQUFDO0dBQ1csZ0JBQWdCLENBQUk7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvaG9tZS9hbm9ueW1vdXNIb21lXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiaG9tZVwiLFxuICAgICAgICBsb2FkQ2hpbGRyZW46IFwiLi9wYWdlcy9ob21lL2hvbWUubW9kdWxlI0hvbWVNb2R1bGVcIixcbiAgICAgICAgZGF0YTogeyB0aXRsZTogXCJIb21lXCIgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcImxvZ2luXCIsXG4gICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLm1vZHVsZSNMb2dpbk1vZHVsZVwiLFxuICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIkNhbWVyYVwiIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJjcmVhdGVcIixcbiAgICAgICAgbG9hZENoaWxkcmVuOiBcIi4vcGFnZXMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2R1bGUjUmVnaXN0ZXJNb2R1bGVcIixcbiAgICAgICAgZGF0YTogeyB0aXRsZTogXCJyZWdpc3RlclwiIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJjbGFpbVN1bW1hcnlcIixcbiAgICAgICAgbG9hZENoaWxkcmVuOiBcIi4vcGFnZXMvY2xhaW1zL2NsYWltLm1vZHVsZSNDbGFpbU1vZHVsZVwiLFxuICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIkNsYWltc1wiIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJoYXBweVwiLFxuICAgICAgICBsb2FkQ2hpbGRyZW46IFwiLi9wYWdlcy9oYXBweS9oYXBweS5tb2R1bGUjSGFwcHlNb2R1bGVcIixcbiAgICAgICAgZGF0YTogeyB0aXRsZTogXCJIYXBweVwiIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJwZXJzb25hbF9pbmZvXCIsXG4gICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL3BhZ2VzL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLm1vZHVsZSNBdXRoZW50aWNhdGlvbk1vZHVsZVwiLFxuICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIkF1dGhlbnRpY2F0aW9uXCIgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcImFjY291bnRzXCIsXG4gICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL3BhZ2VzL2FjY291bnRzL2FjY291bnRzLm1vZHVsZSNBY2NvdW50c01vZHVsZVwiLFxuICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIk15IEFjY291bnRzXCIgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcImNhcmRzXCIsXG4gICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL3BhZ2VzL2NhcmRzL2NhcmRzLm1vZHVsZSNDYXJkc01vZHVsZVwiLFxuICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIk15IENhcmRzXCIgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcIm1lZGljYXRpb25cIixcbiAgICAgICAgbG9hZENoaWxkcmVuOiBcIi4vcGFnZXMvbWVkaWNhdGlvbi9tZWRpY2F0aW9uLm1vZHVsZSNNZWRpY2F0aW9uTW9kdWxlXCIsXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6IFwiTXkgTWVkaWNhdGlvbnNcIiB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwibXlkb2N0b3JzXCIsXG4gICAgICAgIGxvYWRDaGlsZHJlbjogXCIuL3BhZ2VzL215RG9jdG9ycy9teURvY3RvcnMubW9kdWxlI015RG9jdG9yc01vZHVsZVwiLFxuICAgICAgICBkYXRhOiB7IHRpdGxlOiBcIk15IERvY3RvcnNcIiB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6IFwiYWJvdXRhcHBcIixcbiAgICAgICAgbG9hZENoaWxkcmVuOiBcIi4vcGFnZXMvYWJvdXRhcHAvYWJvdXRhcHAubW9kdWxlI0Fib3V0QXBwTW9kdWxlXCIsXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6IFwiQWJvdXQgTXlCbHVlIEFwcFwiIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJteVBsYW5cIixcbiAgICAgICAgbG9hZENoaWxkcmVuOiBcIi4vcGFnZXMvbXlQbGFuL215UGxhbi5tb2R1bGUjTXlQbGFuTW9kdWxlXCIsXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6IFwibXlQbGFuXCIgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcImNvbnRhY3RVc1wiLFxuICAgICAgICBsb2FkQ2hpbGRyZW46IFwiLi9wYWdlcy9jb250YWN0VXMvY29udGFjdFVzLm1vZHVsZSNDb250YWN0VXNNb2R1bGVcIixcbiAgICAgICAgZGF0YTogeyB0aXRsZTogXCJDb250YWN0IFVzXCIgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiBcIm9mZmxpbmVcIixcbiAgICAgICAgbG9hZENoaWxkcmVuOiBcIi4vcGFnZXMvb2ZmbGluZS9vZmZsaW5lLm1vZHVsZSNPZmZsaW5lTW9kdWxlXCIsXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6IFwiT2ZmbGluZVwiIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogXCJzZXR0aW5nc1wiLFxuICAgICAgICBsb2FkQ2hpbGRyZW46IFwiLi9wYWdlcy9zZXR0aW5ncy9zZXR0aW5ncy5tb2R1bGUjU2V0dGluZ3NNb2R1bGVcIixcbiAgICAgICAgZGF0YTogeyB0aXRsZTogXCJTZXR0aW5nc1wiIH1cbiAgICB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfSJdfQ==