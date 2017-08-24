"use strict";
var core_1 = require('@angular/core');
var Everlive = require('../../sdks/everlive.js');
var backendServicesService = (function () {
    function backendServicesService() {
        this._options = {
            appId: 'v43y7vmt71l8q0ng',
            scheme: 'https',
            authentication: {
                persist: true
            }
        };
        this._instance = new Everlive(this._options);
        this._query = new Everlive.Query();
    }
    Object.defineProperty(backendServicesService.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(backendServicesService.prototype, "query", {
        get: function () {
            return this._query;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(backendServicesService.prototype, "newQuery", {
        get: function () {
            return new Everlive.Query();
        },
        enumerable: true,
        configurable: true
    });
    backendServicesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], backendServicesService);
    return backendServicesService;
}());
exports.backendServicesService = backendServicesService;
// START_CUSTOM_CODE_backendServices
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
// END_CUSTOM_CODE_backendServices 
