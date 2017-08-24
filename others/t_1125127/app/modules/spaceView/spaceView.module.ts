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
    SpaceViewComponent
}
from "./spaceView.component";

import {
    NativeScriptRouterModule
}
from "nativescript-angular/router";
import {
    NativeScriptFormsModule
}
from "nativescript-angular/forms";
// START_CUSTOM_CODE_spaceViewModelModuleImports
import {
	RequestViewModule
} from "./../requestView/requestView.module"
// END_CUSTOM_CODE_spaceViewModelModuleImports
/// module additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@
NgModule({
    imports: [

        NativeScriptRouterModule,
        NativeScriptFormsModule,
        // START_CUSTOM_CODE_spaceViewModelModuleImportDeclaration
		RequestViewModule,
        // END_CUSTOM_CODE_spaceViewModelModuleImportDeclaration
        /// module imports declaration

        NativeScriptModule,
        SharedModule
    ],
    declarations: [

        common.SpaceViewListComponent,

        common.SpaceViewDetailComponent,

        common.SpaceViewEditComponent,

        // START_CUSTOM_CODE_spaceViewModelComponentDeclarations

        // END_CUSTOM_CODE_spaceViewModelComponentDeclarations
        /// module declarations

        SpaceViewComponent
    ],
    exports: [

        common.SpaceViewListComponent,

        common.SpaceViewDetailComponent,

        common.SpaceViewEditComponent,

        /// module exports

        SpaceViewComponent
    ],
    providers: [

        // START_CUSTOM_CODE_spaceViewModelModuleProviders

        // END_CUSTOM_CODE_spaceViewModelModuleProviders

        /// module providers

        common.SpaceViewService
    ]
})

export class SpaceViewModule {}