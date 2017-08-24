import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ItemService } from "./item/item.service";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import * as application from  "application";
import { isAndroid, isIOS } from "platform";

if (isIOS) {
    class AppDelegate extends NSObject implements UIApplicationDelegate {
        static ObjCProtocols = [UIApplicationDelegate];

        applicationHandleEventsForBackgroundURLSessionCompletionHandler(app, identifier, handler) {
            // Do some stuff, if async - keep the handler to call when ready
            console.log("applicationHandleEventsForBackgroundURLSessionCompletionHandler: " + identifier);

            handler();
        }
        
    }
    application.ios.delegate = AppDelegate;
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent
    ],
    providers: [
        ItemService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {}
