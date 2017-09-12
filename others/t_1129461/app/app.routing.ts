import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


const routes: Routes = [
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

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }