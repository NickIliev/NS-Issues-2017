import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { ItemService } from "./item/item.service";
import { ItemsComponent } from "./item/items.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent
    ],
    providers: [
        ItemService,
        NativeScriptHttpModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
