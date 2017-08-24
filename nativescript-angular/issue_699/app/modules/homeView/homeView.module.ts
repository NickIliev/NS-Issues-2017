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
    HomeViewComponent
}
from "./homeView.component";
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
        HomeViewComponent
    ],
    exports: [
        /// module exports
        HomeViewComponent
    ],
    providers: [
        /// module providers
        common.HomeViewService
    ]
})

export class HomeViewModule {}