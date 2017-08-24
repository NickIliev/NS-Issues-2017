import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from "@angular/core";
import { NativeScriptRouterModule, NSModuleFactoryLoader } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AppComponent } from './app.component';

const routes = [
  { path: '' , loadChildren: './pages/pages.module#PagesModule' },
  { path: 'main', loadChildren: './pages/main-page/main-page.module#MainPageModule' },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
  ]
})
export class AppModule {}
