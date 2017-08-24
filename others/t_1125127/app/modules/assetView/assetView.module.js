"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var shared_module_1 = require("../../shared/shared.module");
var assetView_component_1 = require("./assetView.component");
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
// START_CUSTOM_CODE_assetViewModelModuleImports
var requestView_module_1 = require("./../requestView/requestView.module");
// END_CUSTOM_CODE_assetViewModelModuleImports
/// module additional imports
var common = require("./shared");
var AssetViewModule = (function () {
    function AssetViewModule() {
    }
    AssetViewModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.NativeScriptRouterModule,
                forms_1.NativeScriptFormsModule,
                // START_CUSTOM_CODE_assetViewModelModuleImportDeclaration
                requestView_module_1.RequestViewModule,
                // END_CUSTOM_CODE_assetViewModelModuleImportDeclaration
                /// module imports declaration
                platform_1.NativeScriptModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                common.AssetViewListComponent,
                common.AssetViewDetailComponent,
                common.AssetViewEditComponent,
                // START_CUSTOM_CODE_assetViewModelComponentDeclarations
                // END_CUSTOM_CODE_assetViewModelComponentDeclarations
                /// module declarations
                assetView_component_1.AssetViewComponent
            ],
            exports: [
                common.AssetViewListComponent,
                common.AssetViewDetailComponent,
                common.AssetViewEditComponent,
                /// module exports
                assetView_component_1.AssetViewComponent
            ],
            providers: [
                // START_CUSTOM_CODE_assetViewModelModuleProviders
                // END_CUSTOM_CODE_assetViewModelModuleProviders
                /// module providers
                common.AssetViewService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AssetViewModule);
    return AssetViewModule;
}());
exports.AssetViewModule = AssetViewModule;
//# sourceMappingURL=assetView.module.js.map