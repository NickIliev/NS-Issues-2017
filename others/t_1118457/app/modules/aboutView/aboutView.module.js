"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var shared_module_1 = require("../../shared/shared.module");
var aboutView_component_1 = require("./aboutView.component");
/// module additional imports
var common = require("./shared");
var AboutViewModule = (function () {
    function AboutViewModule() {
    }
    AboutViewModule = __decorate([
        core_1.NgModule({
            imports: [
                /// module imports declaration
                platform_1.NativeScriptModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                /// module declarations
                aboutView_component_1.AboutViewComponent
            ],
            exports: [
                /// module exports
                aboutView_component_1.AboutViewComponent
            ],
            providers: [
                /// module providers
                common.AboutViewService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AboutViewModule);
    return AboutViewModule;
}());
exports.AboutViewModule = AboutViewModule;
