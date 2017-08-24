"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var shared_module_1 = require("../../shared/shared.module");
var requestView_component_1 = require("./requestView.component");
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
// START_CUSTOM_CODE_requestViewModelModuleImports
// END_CUSTOM_CODE_requestViewModelModuleImports
/// module additional imports
var common = require("./shared");
var RequestViewModule = (function () {
    function RequestViewModule() {
    }
    RequestViewModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.NativeScriptRouterModule,
                forms_1.NativeScriptFormsModule,
                // START_CUSTOM_CODE_requestViewModelModuleImportDeclaration
                // END_CUSTOM_CODE_requestViewModelModuleImportDeclaration
                /// module imports declaration
                platform_1.NativeScriptModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                common.RequestViewListComponent,
                common.RequestViewDetailComponent,
                common.RequestViewAddComponent,
                common.RequestViewEditComponent,
                // START_CUSTOM_CODE_requestViewModelComponentDeclarations
                // END_CUSTOM_CODE_requestViewModelComponentDeclarations
                /// module declarations
                requestView_component_1.RequestViewComponent
            ],
            exports: [
                common.RequestViewListComponent,
                common.RequestViewDetailComponent,
                common.RequestViewAddComponent,
                common.RequestViewEditComponent,
                /// module exports
                requestView_component_1.RequestViewComponent
            ],
            providers: [
                // START_CUSTOM_CODE_requestViewModelModuleProviders
                // END_CUSTOM_CODE_requestViewModelModuleProviders
                /// module providers
                common.RequestViewService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], RequestViewModule);
    return RequestViewModule;
}());
exports.RequestViewModule = RequestViewModule;
//# sourceMappingURL=requestView.module.js.map