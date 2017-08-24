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
    ScanQrcodeViewComponent
}
from "./scanQrcodeView.component";
/// module additional imports

import * as common from "./shared";
import * as shared from "../../shared";

@
NgModule({
    imports: [
        /// module imports declaration
        NativeScriptModule,
        SharedModule
    ],
    declarations: [
        /// module declarations
        ScanQrcodeViewComponent
    ],
    exports: [
        /// module exports
        ScanQrcodeViewComponent
    ],
    providers: [
        /// module providers
        common.ScanQrcodeViewService
    ]
})

export class ScanQrcodeViewModule {}