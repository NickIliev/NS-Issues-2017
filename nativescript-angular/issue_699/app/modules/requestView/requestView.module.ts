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
    RequestViewComponent
}
from "./requestView.component";

import {
    NativeScriptRouterModule
}
from "nativescript-angular/router";
import {
    NativeScriptFormsModule
}
from "nativescript-angular/forms";
// START_CUSTOM_CODE_requestViewModelModuleImports

// END_CUSTOM_CODE_requestViewModelModuleImports
/// module additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@
NgModule({
    imports: [

        NativeScriptRouterModule,
        NativeScriptFormsModule,
        // START_CUSTOM_CODE_requestViewModelModuleImportDeclaration

        // END_CUSTOM_CODE_requestViewModelModuleImportDeclaration
        /// module imports declaration

        NativeScriptModule,
        SharedModule
    ],
    declarations: [

        common.RequestViewListComponent,

        common.RequestViewDetailComponent,

        common.RequestViewAddComponent,

        common.RequestViewEditComponent,

        // START_CUSTOM_CODE_requestViewModelComponentDeclarations

        // END_CUSTOM_CODE_requestViewModelComponentDeclarations
        /// module declarations

        RequestViewComponent
    ],
    exports: [

        common.RequestViewListComponent,

        common.RequestViewDetailComponent,

        common.RequestViewAddComponent,

        common.RequestViewEditComponent,

        /// module exports

        RequestViewComponent
    ],
    providers: [

        // START_CUSTOM_CODE_requestViewModelModuleProviders

        // END_CUSTOM_CODE_requestViewModelModuleProviders

        /// module providers

        common.RequestViewService
    ]
})

export class RequestViewModule {}