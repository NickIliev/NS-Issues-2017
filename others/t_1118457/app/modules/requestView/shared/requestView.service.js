"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
// START_CUSTOM_CODE_requestViewModelServiceImports
// END_CUSTOM_CODE_requestViewModelServiceImports
/// service imports
var shared = require("../../../shared");
var RequestViewService = (function () {
    // END_CUSTOM_CODE_requestViewModelServiceAdditionalProperties
    function RequestViewService(
        // START_CUSTOM_CODE_requestViewModelServiceConstructorDependencies
        // END_CUSTOM_CODE_requestViewModelServiceConstructorDependencies
        _provider) {
        this._provider = _provider;
        // START_CUSTOM_CODE_requestViewModelServiceAdditionalProperties
        this._expandExpression = {
            Building: {
                TargetTypeName: "Building",
                ReturnAs: "oBuilding"
            },
            "JobType": {
                TargetTypeName: 'JobType',
                ReturnAs: "oJobType"
            },
            "Priority": {
                TargetTypeName: 'Priority',
                ReturnAs: "oPriority"
            },
            "RequestOriginator": {
                TargetTypeName: "Users",
                ReturnAs: "oRequestOriginator"
            },
            "ReferredTo": {
                TargetTypeName: "Users",
                ReturnAs: "oReferredTo"
            },
            "ReferredToTeam": {
                TargetTypeName: "Team",
                ReturnAs: "oReferredToTeam"
            },
            "Space": {
                TargetTypeName: 'Space',
                ReturnAs: "oSpace"
            } //,
        };
        this._data = _provider.instance.data("JobRequest");
        // START_CUSTOM_CODE_requestViewModelServiceConstructorMethods
        // END_CUSTOM_CODE_requestViewModelServiceConstructorMethods
    }
    Object.defineProperty(RequestViewService.prototype, "provider", {
        get: function () {
            return this._provider;
        },
        enumerable: true,
        configurable: true
    });
    RequestViewService.prototype.get = function (requestedByFilter) {
        var _this = this;
        if (requestedByFilter === void 0) { requestedByFilter = shared.RequestedByFilter.All; }
        var promise = new Promise(function (resolve, reject) {
            var filter = _this._provider.newQuery;
            //var filter = {};
            if (requestedByFilter == shared.RequestedByFilter.Mine) {
                filter.where().eq("RequestOriginator", "c7a8e170-b1cb-11e6-abe9-65cda88894e6"); //app.currentUser.Id);
            }
            else if (requestedByFilter == shared.RequestedByFilter.MyBuilding) {
                filter.where().eq("Building", "89"); //app.currentUser.DefaultBuilding);
            }
            _this._data
                .expand(_this._expandExpression)
                .get(filter)
                .then(function (data) { return resolve(data.result || []); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    RequestViewService.prototype.getDbCollection = function (dbName) {
        var db = this._provider.instance.data(dbName);
        var promise = new Promise(function (resolve, reject) {
            db
                .get()
                .then(function (data) { return resolve(data.result || []); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    RequestViewService.prototype.post = function (item) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._data
                .create(item)
                .then(function (data) { return resolve(data.result); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    RequestViewService.prototype.put = function (item) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._data
                .updateSingle(item)
                .then(function (data) { return resolve(data); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    RequestViewService.prototype.delete = function (item) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._data
                .destroySingle(item)
                .then(function (data) { return resolve(data); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    // START_CUSTOM_CODE_requestViewModelServiceAdditionalMethods
    RequestViewService.prototype.getNextX = function (start) {
        var _this = this;
        //alert("getNextX(" + start + ")");
        var promise = new Promise(function (resolve, reject) {
            //alert(start);
            var query = _this._provider.newQuery;
            //alert(JSON.stringify(query));
            query.skip(start).take(30); //Must be less than 50
            _this._data
                .expand(_this._expandExpression)
                .get(query)
                .then(function (data) { return resolve(data.result || []); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    RequestViewService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [shared.backendServicesService])
    ], RequestViewService);
    return RequestViewService;
}());
exports.RequestViewService = RequestViewService;
