import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui-pro/sidedrawer/angular"
import { LISTVIEW_DIRECTIVES} from "nativescript-telerik-ui-pro/sidedrawer/angular"


import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";



import { HomeComponent } from "./home/home.component";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        SIDEDRAWER_DIRECTIVES,
        LISTIVEW_DIRECTIVES,
        AppComponent,
        HomeComponent
    ],
    providers: [

    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
