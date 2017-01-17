import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui-pro/listview/angular';
import { CALENDAR_DIRECTIVES } from "nativescript-telerik-ui-pro/calendar/angular";

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent,LISTVIEW_DIRECTIVES,CALENDAR_DIRECTIVES],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
