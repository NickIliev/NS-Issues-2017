"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var shared_module_1 = require("../../shared/shared.module");
var notificationView_component_1 = require("./notificationView.component");
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
// START_CUSTOM_CODE_notificationViewModelModuleImports
// END_CUSTOM_CODE_notificationViewModelModuleImports
/// module additional imports
var common = require("./shared");
var NotificationViewModule = (function () {
    function NotificationViewModule() {
    }
    NotificationViewModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.NativeScriptRouterModule,
                forms_1.NativeScriptFormsModule,
                // START_CUSTOM_CODE_notificationViewModelModuleImportDeclaration
                // END_CUSTOM_CODE_notificationViewModelModuleImportDeclaration
                /// module imports declaration
                platform_1.NativeScriptModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                common.NotificationViewListComponent,
                common.NotificationViewDetailComponent,
                // START_CUSTOM_CODE_notificationViewModelComponentDeclarations
                // END_CUSTOM_CODE_notificationViewModelComponentDeclarations
                /// module declarations
                notificationView_component_1.NotificationViewComponent
            ],
            exports: [
                common.NotificationViewListComponent,
                common.NotificationViewDetailComponent,
                /// module exports
                notificationView_component_1.NotificationViewComponent
            ],
            providers: [
                // START_CUSTOM_CODE_notificationViewModelModuleProviders
                // END_CUSTOM_CODE_notificationViewModelModuleProviders
                /// module providers
                common.NotificationViewService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], NotificationViewModule);
    return NotificationViewModule;
}());
exports.NotificationViewModule = NotificationViewModule;
