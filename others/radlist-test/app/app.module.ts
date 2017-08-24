import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui/listview/angular';

import { AppComponent } from "./app.component";
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainPageInnerComponent } from './pages/main-page/main-page-inner/main-page-inner.component';
import { TestComponent } from './pages/test/test.component';
import { TestInnerComponent } from './pages/test/test-inner/test-inner.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main/(outlet:test)', },
  { path: 'main', component: MainPageComponent, children: [
    { path: 'test', component: MainPageInnerComponent, outlet: 'outlet' },
  ]},
  { path: 'test', component: TestComponent, children: [
    { path: 'test-inner', component: TestInnerComponent, outlet: 'outlet' }
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    LISTVIEW_DIRECTIVES,
    MainPageComponent,
    MainPageInnerComponent,
    TestComponent,
    TestInnerComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
