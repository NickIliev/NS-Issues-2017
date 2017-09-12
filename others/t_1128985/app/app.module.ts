import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule, NSModuleFactoryLoader } from "nativescript-angular/router";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { Globals } from "./shared/global";
import { ClaimService } from "./pages/claims/claims.service";
import { DrawerService } from "./shared/services/drawer.service";
import { GlobalService } from "./shared/services/global.service";
import { FormValidationService } from "./shared/services/formValidation.service";
//import { HttpInterceptorModule } from "ng-http-interceptor";
import * as app from 'tns-core-modules/application';
import { isIOS } from 'tns-core-modules/platform';
import { registerElement } from "nativescript-angular/element-registry";


// registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

// import { AnalyticsService } from './analytics.service';
// import { AdobeAnalytics } from 'nativescript-adobe-analytics';

import { AdobeDemoAppDelegate } from './core/delegates/adobe.delegate';
if (isIOS) {
  app.ios.delegate = AdobeDemoAppDelegate;
} else {
    const aa = new AdobeDemoAppDelegate();
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        ReactiveFormsModule,
        AppRoutingModule,
        //HttpInterceptorModule,
    ],
    declarations: [AppComponent],
    exports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        //HttpInterceptorModule
    ],
    providers: [Globals,
        DrawerService,
        ModalDialogService,
        ClaimService,
        GlobalService,
        FormValidationService,
        // AnalyticsService,
        // AdobeAnalytics,
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {

}

// app-components used by other app-components
