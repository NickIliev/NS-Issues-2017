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
    AssetViewComponent
}
from "./assetView.component";

import {
    NativeScriptRouterModule
}
from "nativescript-angular/router";
import {
    NativeScriptFormsModule
}
from "nativescript-angular/forms";
// START_CUSTOM_CODE_assetViewModelModuleImports
import {
	RequestViewModule
} from "./../requestView/requestView.module"
// END_CUSTOM_CODE_assetViewModelModuleImports
/// module additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@
NgModule({
    imports: [

        NativeScriptRouterModule,
        NativeScriptFormsModule,
        // START_CUSTOM_CODE_assetViewModelModuleImportDeclaration
		RequestViewModule,
        // END_CUSTOM_CODE_assetViewModelModuleImportDeclaration
        /// module imports declaration

        NativeScriptModule,
        SharedModule
    ],
    declarations: [

        common.AssetViewListComponent,

        common.AssetViewDetailComponent,

        common.AssetViewEditComponent,

        // START_CUSTOM_CODE_assetViewModelComponentDeclarations

        // END_CUSTOM_CODE_assetViewModelComponentDeclarations
        /// module declarations

        AssetViewComponent
    ],
    exports: [

        common.AssetViewListComponent,

        common.AssetViewDetailComponent,

        common.AssetViewEditComponent,

        /// module exports

        AssetViewComponent
    ],
    providers: [

        // START_CUSTOM_CODE_assetViewModelModuleProviders

        // END_CUSTOM_CODE_assetViewModelModuleProviders

        /// module providers

        common.AssetViewService
    ]
})

export class AssetViewModule {}