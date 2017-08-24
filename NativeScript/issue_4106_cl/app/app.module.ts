import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { authProviders, appRoutes } from "./app.routing";
import { AppComponent } from "./app.component";
import { setStatusBarColors, BackendService, LoginService, HieberService, TokenService } from "./shared";
import { LoginModule } from "./login/login.module";

import { MainMenuModule } from "./main/mainScreen.module";

import { HttpModule, Http } from "@angular/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

setStatusBarColors();
// AoT requires an exported function for factories 
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "~/i18n/", ".json");
}
@NgModule({
  providers: [
    BackendService,
    LoginService,
    HieberService,
    authProviders,
 
    TokenService
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    LoginModule,
    MainMenuModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  declarations: [
    AppComponent,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
