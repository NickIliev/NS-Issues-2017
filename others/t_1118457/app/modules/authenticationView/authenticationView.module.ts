import {
    NgModule
}
from "@angular/core";

import {
    NativeScriptModule
}
from "nativescript-angular/platform";

import {
    SharedModule
}
from "../../shared/shared.module";
import {
    AuthenticationViewComponent
}
from "./authenticationView.component";

import {
    NativeScriptFormsModule
}
from "nativescript-angular/forms";
/// module additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@
NgModule({
    imports: [

        NativeScriptFormsModule,
        /// module imports declaration

        NativeScriptModule,
        SharedModule
    ],
    declarations: [

        common.AuthenticationViewSignInComponent,

        /// module declarations

        AuthenticationViewComponent
    ],
    exports: [

        common.AuthenticationViewSignInComponent,

        /// module exports

        AuthenticationViewComponent
    ],
    providers: [
        /// module providers
        common.AuthenticationViewService
    ]
})

export class AuthenticationViewModule {}