import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { DropDownModule } from "nativescript-drop-down/angular";
import { SharedModule } from "../../shared/shared.module";
import { FormValidationService } from "../../shared/services/formValidation.service";
import { SettingsComponent } from "./settings.component";
import { SettingsService } from "./settings.service";

export const routerConfig = [
       { path: "", component: SettingsComponent },
];

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(routerConfig),
        SharedModule,
        DropDownModule,
    ],
    declarations: [
      SettingsComponent
    ],
    providers: [SettingsService]
})

export class SettingsModule {
    constructor() { }
}





