"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var shared_module_1 = require("../../shared/shared.module");
var authenticationView_component_1 = require("./authenticationView.component");
var forms_1 = require("nativescript-angular/forms");
/// module additional imports
var common = require("./shared");
var shared = require("../../shared");
var AuthenticationViewModule = (function () {
    function AuthenticationViewModule() {
    }
    AuthenticationViewModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.NativeScriptFormsModule,
                /// module imports declaration
                platform_1.NativeScriptModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                common.AuthenticationViewSignInComponent,
                /// module declarations
                authenticationView_component_1.AuthenticationViewComponent
            ],
            exports: [
                common.AuthenticationViewSignInComponent,
                /// module exports
                authenticationView_component_1.AuthenticationViewComponent
            ],
            providers: [
                /// module providers
                shared.AuthenticationService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AuthenticationViewModule);
    return AuthenticationViewModule;
}());
exports.AuthenticationViewModule = AuthenticationViewModule;
//# sourceMappingURL=authenticationView.module.js.map