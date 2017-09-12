import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { HappyComponent } from "./happy.component";
import { SharedModule } from "../../shared/shared.module";


export const routerConfig = [
    {
        path: "",
        component: HappyComponent
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
        HappyComponent
    ]
})

export class HappyModule {
    constructor() { }
}