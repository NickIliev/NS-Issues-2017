import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { loginRouting } from "./login.routing";
import { LoginComponent } from "./login.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    loginRouting,
    TranslateModule.forChild()
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
