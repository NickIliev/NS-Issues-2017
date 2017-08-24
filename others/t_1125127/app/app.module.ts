import {
    NgModule
} from "@angular/core";

import {
    NativeScriptModule
} from "nativescript-angular/platform";
import {
    NativeScriptRouterModule
} from "nativescript-angular/router";
/// additional imports
import { registerElement } from "nativescript-angular/element-registry";

import {
    appRoutes
} from "./app.routes";
import {
    AppComponent
} from "./app.component";

/// additional required modules
const mapbox = require("nativescript-mapbox");
registerElement("Mapbox", () => mapbox.Mapbox);

import {
    TabstripMenuModule as NavigationModule
} from "./navigation/tabstrip/tabstrip.module";

registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown);

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(appRoutes),
        NavigationModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}