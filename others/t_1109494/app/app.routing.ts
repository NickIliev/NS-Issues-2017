import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { SidedrawerComponent } from "./item/sidedrawer.component";

const routes: Routes = [
    { path: "", redirectTo: "/sidedrawer", pathMatch: "full" },
    { path: "sidedrawer", component: SidedrawerComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }