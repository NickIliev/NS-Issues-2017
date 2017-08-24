"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var forms_1 = require("nativescript-angular/forms");
var angular_1 = require('nativescript-telerik-ui/listview/angular');
var common = require("./");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                /// additional declarations
                common.ImagePipe,
                common.ActionBarComponent,
                common.IfAndroidDirective,
                common.IfIosDirective,
                common.HyperlinkDirective,
                angular_1.LISTVIEW_DIRECTIVES
            ],
            exports: [
                /// additional exports
                common.ImagePipe,
                common.ActionBarComponent,
                common.IfAndroidDirective,
                common.IfIosDirective,
                common.HyperlinkDirective,
                angular_1.LISTVIEW_DIRECTIVES
            ],
            providers: [
                /// additional services
                common.backendServicesService,
                common.NavigationService,
                common.NotificationService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map