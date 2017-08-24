"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var router_1 = require("nativescript-angular/router");
var tabstrip_routes_1 = require("./tabstrip.routes");
var tabstrip_component_1 = require("./tabstrip.component");
var shared_module_1 = require("../../shared/shared.module");
var common = require("../shared");
var TabstripMenuModule = (function () {
    function TabstripMenuModule() {
    }
    TabstripMenuModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_1.NativeScriptModule,
                router_1.NativeScriptRouterModule,
                tabstrip_routes_1.tabMenuRouting,
                shared_module_1.SharedModule
            ].concat(common.MODULES),
            declarations: [
                tabstrip_component_1.TabMenuComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TabstripMenuModule);
    return TabstripMenuModule;
}());
exports.TabstripMenuModule = TabstripMenuModule;
//# sourceMappingURL=tabstrip.module.js.map