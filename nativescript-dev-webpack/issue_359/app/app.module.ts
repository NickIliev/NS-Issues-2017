import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { DynamicFormComponent } from './dynamic-form.component';

@NgModule({
  declarations: [AppComponent, DynamicFormComponent],
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptFormsModule, ReactiveFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
