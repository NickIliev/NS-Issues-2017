import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ViewContainerRef } from "@angular/core";
import { VerificationComponent } from "./verification/verification.component";
import { CreationComponent } from "./creation/creation.component";
import { RegistrationService } from "./registration.service";
import { FormValidationService } from "../../shared/services/formValidation.service";
import { SharedModule } from "../../shared/shared.module";
import { AuthenticationService } from "../authentication/authentication.service";



export const routerConfig = [
    {
        path: "",
        component: CreationComponent
    },
    { path: "verification/:name/:placeholder", component: VerificationComponent },
    { path: "create", component: CreationComponent },
];

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(routerConfig),
        SharedModule,
        ReactiveFormsModule,

    ],
    declarations: [
        CreationComponent,
        VerificationComponent],
    providers: [FormValidationService, RegistrationService,],
})

export class RegisterModule {
    constructor() { }
}





