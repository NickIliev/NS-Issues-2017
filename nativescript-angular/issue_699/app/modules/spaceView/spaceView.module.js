"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var shared_module_1 = require("../../shared/shared.module");
var spaceView_component_1 = require("./spaceView.component");
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
// START_CUSTOM_CODE_spaceViewModelModuleImports
var requestView_module_1 = require("./../requestView/requestView.module");
// END_CUSTOM_CODE_spaceViewModelModuleImports
/// module additional imports
var common = require("./shared");
var SpaceViewModule = (function () {
    function SpaceViewModule() {
    }
    SpaceViewModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.NativeScriptRouterModule,
                forms_1.NativeScriptFormsModule,
                // START_CUSTOM_CODE_spaceViewModelModuleImportDeclaration
                requestView_module_1.RequestViewModule,
                // END_CUSTOM_CODE_spaceViewModelModuleImportDeclaration
                /// module imports declaration
                platform_1.NativeScriptModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                common.SpaceViewListComponent,
                common.SpaceViewDetailComponent,
                common.SpaceViewEditComponent,
                // START_CUSTOM_CODE_spaceViewModelComponentDeclarations
                // END_CUSTOM_CODE_spaceViewModelComponentDeclarations
                /// module declarations
                spaceView_component_1.SpaceViewComponent
            ],
            exports: [
                common.SpaceViewListComponent,
                common.SpaceViewDetailComponent,
                common.SpaceViewEditComponent,
                /// module exports
                spaceView_component_1.SpaceViewComponent
            ],
            providers: [
                // START_CUSTOM_CODE_spaceViewModelModuleProviders
                // END_CUSTOM_CODE_spaceViewModelModuleProviders
                /// module providers
                common.SpaceViewService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SpaceViewModule);
    return SpaceViewModule;
}());
exports.SpaceViewModule = SpaceViewModule;
//# sourceMappingURL=spaceView.module.js.map