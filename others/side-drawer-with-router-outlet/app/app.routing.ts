import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";

import { ItemsComponent } from "./item/items.component";
import { ItemsComponent2 } from "./item/items.component2";
import { ItemsComponent3 } from "./item/items.component3";
import { ItemDetailComponent } from "./item/item-detail.component";

const routes: Routes = [
    { path: "", redirectTo: "/app/items", pathMatch: "full" },
    {
        path: "app", component: AppComponent, children: [
            { path: "items", component: ItemsComponent },
            { path: "items2", component: ItemsComponent2 },
            { path: "items3", component: ItemsComponent3 },
        ]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }