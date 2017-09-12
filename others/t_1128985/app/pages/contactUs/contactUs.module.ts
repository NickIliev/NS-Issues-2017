import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ContactUsComponent } from "./contactUs.component";
import { SharedModule } from "../../shared/shared.module";


export const routerConfig = [
    {
        path: "",
        component: ContactUsComponent
    }
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
        ContactUsComponent
    ]
})

export class ContactUsModule { }