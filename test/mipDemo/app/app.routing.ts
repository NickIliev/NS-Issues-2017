import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";

import { ScanComponent } from "./scan/scan.component";
import { ArrowsComponent } from "./arrows/arrows.component";
import { AccelerometerComponent } from "./accelerometer/accelerometer.component";

const appRoutes: Routes = [
    { path: "", redirectTo: "/scan", pathMatch: "full", },
    { path: "scan", component: ScanComponent },
    { path: "arrows", component: ArrowsComponent },
    { path: "accelerometer", component: AccelerometerComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(appRoutes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }