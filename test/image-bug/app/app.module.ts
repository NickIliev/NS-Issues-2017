import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { NavigationDrawerComponent } from './navigationDrawer/navigationDrawer.component';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUISideDrawerModule } from 'nativescript-telerik-ui/sidedrawer/angular';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SearchComponent } from "./search/search.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    HttpModule
  ],
  declarations: [
    DashboardComponent,
    SearchComponent,
    AppComponent,
    NavigationDrawerComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(){
  }
}
