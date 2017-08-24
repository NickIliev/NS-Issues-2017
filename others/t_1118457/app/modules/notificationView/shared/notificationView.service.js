"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
// START_CUSTOM_CODE_notificationViewModelServiceImports
// END_CUSTOM_CODE_notificationViewModelServiceImports
/// service imports
var shared = require("../../../shared");
var NotificationViewService = (function () {
    // START_CUSTOM_CODE_notificationViewModelServiceAdditionalProperties
    // END_CUSTOM_CODE_notificationViewModelServiceAdditionalProperties
    function NotificationViewService(
        // START_CUSTOM_CODE_notificationViewModelServiceConstructorDependencies
        // END_CUSTOM_CODE_notificationViewModelServiceConstructorDependencies
        _provider) {
        this._provider = _provider;
        this._data = _provider.instance.data("Notification");
        // START_CUSTOM_CODE_notificationViewModelServiceConstructorMethods
        // END_CUSTOM_CODE_notificationViewModelServiceConstructorMethods
    }
    Object.defineProperty(NotificationViewService.prototype, "provider", {
        get: function () {
            return this._provider;
        },
        enumerable: true,
        configurable: true
    });
    NotificationViewService.prototype.get = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._data
                .get()
                .then(function (data) { return resolve(data.result || []); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    NotificationViewService.prototype.getDbCollection = function (dbName) {
        var db = this._provider.instance.data(dbName);
        var promise = new Promise(function (resolve, reject) {
            db
                .get()
                .then(function (data) { return resolve(data.result || []); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    NotificationViewService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [shared.backendServicesService])
    ], NotificationViewService);
    return NotificationViewService;
}());
exports.NotificationViewService = NotificationViewService;
