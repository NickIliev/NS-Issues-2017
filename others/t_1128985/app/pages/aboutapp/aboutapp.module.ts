import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AboutAppComponent } from "./about/aboutapp.component";
import { SharedModule } from "../../shared/shared.module";
import { TermsComponent } from "./terms/terms.component";
import { PolicyComponent } from "./privacy/policy.component";
import { AboutAppService } from "./aboutapp.service";


export const routerConfig = [
    {
        path: "",
        component: AboutAppComponent
    },

    {
        path: "terms_app",
        component: TermsComponent
    },
    {
        path: "policy_app",
        component: PolicyComponent
    },
];

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(routerConfig),
        SharedModule
    ],
    declarations: [
        AboutAppComponent, TermsComponent, PolicyComponent
    ], providers: [AboutAppService]
})

export class AboutAppModule {
    constructor() { }
}