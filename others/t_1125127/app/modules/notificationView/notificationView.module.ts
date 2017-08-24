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
    NotificationViewComponent
}
from "./notificationView.component";

import {
    NativeScriptRouterModule
}
from "nativescript-angular/router";
import {
    NativeScriptFormsModule
}
from "nativescript-angular/forms";
// START_CUSTOM_CODE_notificationViewModelModuleImports

// END_CUSTOM_CODE_notificationViewModelModuleImports
/// module additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@
NgModule({
    imports: [

        NativeScriptRouterModule,
        NativeScriptFormsModule,
        // START_CUSTOM_CODE_notificationViewModelModuleImportDeclaration

        // END_CUSTOM_CODE_notificationViewModelModuleImportDeclaration
        /// module imports declaration

        NativeScriptModule,
        SharedModule
    ],
    declarations: [

        common.NotificationViewListComponent,

        common.NotificationViewDetailComponent,

        // START_CUSTOM_CODE_notificationViewModelComponentDeclarations

        // END_CUSTOM_CODE_notificationViewModelComponentDeclarations
        /// module declarations

        NotificationViewComponent
    ],
    exports: [

        common.NotificationViewListComponent,

        common.NotificationViewDetailComponent,

        /// module exports

        NotificationViewComponent
    ],
    providers: [

        // START_CUSTOM_CODE_notificationViewModelModuleProviders

        // END_CUSTOM_CODE_notificationViewModelModuleProviders

        /// module providers

        common.NotificationViewService
    ]
})

export class NotificationViewModule {}