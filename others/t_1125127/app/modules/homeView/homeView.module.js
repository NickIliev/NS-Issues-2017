"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var shared_module_1 = require("../../shared/shared.module");
var homeView_component_1 = require("./homeView.component");
/// module additional imports
var common = require("./shared");
var HomeViewModule = (function () {
    function HomeViewModule() {
    }
    HomeViewModule = __decorate([
        core_1.NgModule({
            imports: [
                /// module imports declaration
                platform_1.NativeScriptModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                /// module declarations
                homeView_component_1.HomeViewComponent
            ],
            exports: [
                /// module exports
                homeView_component_1.HomeViewComponent
            ],
            providers: [
                /// module providers
                common.HomeViewService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeViewModule);
    return HomeViewModule;
}());
exports.HomeViewModule = HomeViewModule;
//# sourceMappingURL=homeView.module.js.map