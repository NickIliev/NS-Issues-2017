import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { StartComponent } from "./start.component";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { ItemService } from "./item/item.service";
import { ItemsComponent } from "./item/items.component";
import { ItemsComponent2 } from "./item/items.component2";
import { ItemsComponent3 } from "./item/items.component3";
import { ItemDetailComponent } from "./item/item-detail.component";

@NgModule({
    bootstrap: [
        StartComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        StartComponent,
        AppComponent,
        ItemsComponent,
        ItemsComponent2,
        ItemsComponent3,
        ItemDetailComponent
    ],
    providers: [
        ItemService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
