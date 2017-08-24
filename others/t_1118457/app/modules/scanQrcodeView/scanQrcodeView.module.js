"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var shared_module_1 = require("../../shared/shared.module");
var scanQrcodeView_component_1 = require("./scanQrcodeView.component");
/// module additional imports
var common = require("./shared");
var ScanQrcodeViewModule = (function () {
    function ScanQrcodeViewModule() {
    }
    ScanQrcodeViewModule = __decorate([
        core_1.NgModule({
            imports: [
                /// module imports declaration
                platform_1.NativeScriptModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                /// module declarations
                scanQrcodeView_component_1.ScanQrcodeViewComponent
            ],
            exports: [
                /// module exports
                scanQrcodeView_component_1.ScanQrcodeViewComponent
            ],
            providers: [
                /// module providers
                common.ScanQrcodeViewService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ScanQrcodeViewModule);
    return ScanQrcodeViewModule;
}());
exports.ScanQrcodeViewModule = ScanQrcodeViewModule;
