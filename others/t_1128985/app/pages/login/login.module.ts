import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { LoginComponent } from "./login.component";
import { SharedModule } from "../../shared/shared.module";
import { LoginService } from "./login.service";
import { ChangeUserComponent } from "./changeUser/changeUser.component";

export const routerConfig = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "changeUser",
        component: ChangeUserComponent,
        data: { title: "Change Online ID"}
    }
];

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
      //  TitleAndNavButtonModule,
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild(routerConfig),
        SharedModule
    ],
    declarations: [LoginComponent, ChangeUserComponent],
    providers: [ LoginService ]
})

export class LoginModule {
    constructor() { }
}
