import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ViewContainerRef } from "@angular/core";
import { VerifyIdentityComponent } from "./verifyIdentity/verifyIdentity.component";
import { ErrorPageComponent } from "./Error/errorpage.component";
import { MemberInformationComponent } from "./memberInformation/memberInformation.component";
import { PersonalInformationComponent } from "./personalInformation/personalInformation.component";
import { DropDownModule } from "nativescript-drop-down/angular";
import { SharedModule } from "../../shared/shared.module";
import { SecurityQuestionOneComponent } from "./authenticationsecurityquestions/securityquestion1/securityQuestionOne.component";
import { AuthenticationService } from "./authentication.service";
import { FormValidationService } from "../../shared/services/formValidation.service";
import { AuthenticationSuccessComponent } from "./authenticationsuccess/authenticationsuccess.component";
import { DatePickerComponent } from "../../shared/datepicker/datepicker.component";
import { MobileFormatterComponent } from "../../shared/mobileformatter/mobileformatter.component";
import { RegistrationHomeComponent } from "./registrationhome/registrationhome.component";
import { AuthenticatePromoComponent } from "../registration/authenticatePromo/authenticatePromo.component";
import { RegistrationService } from "../registration/registration.service";
import { RestrictedAccessComponent } from "../../shared/restrictedAccess/restrictedAccess.component";






export const routerConfig = [
    { path: "personal_info/:type/:id", component: PersonalInformationComponent },
    { path: "member_info", component: MemberInformationComponent },
    { path: "verify_identity", component: VerifyIdentityComponent },
    { path: "error_page", component: ErrorPageComponent },
    { path: "authentication_success", component: AuthenticationSuccessComponent },
    { path: "reg_home/:type/:id", component: RegistrationHomeComponent }

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
        DropDownModule,
    ],
    declarations: [
        VerifyIdentityComponent,
        MemberInformationComponent,
        ErrorPageComponent,
        SecurityQuestionOneComponent,
        PersonalInformationComponent,
        AuthenticationSuccessComponent,
        RegistrationHomeComponent,
        DatePickerComponent,
        MobileFormatterComponent, AuthenticatePromoComponent,
    ],
    providers: [AuthenticationService, FormValidationService,RegistrationService],
    entryComponents: [SecurityQuestionOneComponent, ],

})

export class AuthenticationModule {
    constructor() { }
}





