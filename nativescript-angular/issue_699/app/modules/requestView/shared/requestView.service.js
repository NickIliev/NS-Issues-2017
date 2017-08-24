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
        _authenticationService, 
        // END_CUSTOM_CODE_requestViewModelServiceConstructorDependencies
        _provider) {
        var _this = this;
        this._authenticationService = _authenticationService;
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
        this._authenticationService.currentUser().subscribe(function (data) {
            //alert(JSON.stringify(data));
            _this._currentUser = data;
        });
        this._requestedByFilter = shared.RequestedByFilter.All;
        // END_CUSTOM_CODE_requestViewModelServiceConstructorMethods
    }
    Object.defineProperty(RequestViewService.prototype, "provider", {
        get: function () {
            return this._provider;
        },
        enumerable: true,
        configurable: true
    });
    RequestViewService.prototype.getFilter = function (requestedByFilter) {
        var filter = this._provider.newQuery;
        if (requestedByFilter == shared.RequestedByFilter.Mine) {
            //alert(JSON.stringify(this._currentUser.Id));
            filter.where().eq("RequestOriginator", this._currentUser.Id);
        }
        else if (requestedByFilter == shared.RequestedByFilter.MyBuilding) {
            filter.where().eq("Building", this._currentUser.DefaultBuilding);
        }
        if (this._spaceIDFilter) {
            filter.where().eq("Space", this._spaceIDFilter);
        }
        return filter;
    };
    RequestViewService.prototype.buildFilterEquals = function (field, value) {
        var filter = this._provider.newQuery;
        filter.where().eq(field, value);
        return filter;
    };
    RequestViewService.prototype.get = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var filter = _this.getFilter(_this._requestedByFilter);
            filter.orderDesc("LoggedAt");
            _this._data
                .expand(_this._expandExpression)
                .get(filter)
                .then(function (data) { return resolve(data.result || []); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    RequestViewService.prototype.getDbCollection = function (dbName, filter) {
        if (filter === void 0) { filter = this._provider.newQuery; }
        var db = this._provider.instance.data(dbName);
        var promise = new Promise(function (resolve, reject) {
            db
                .get(filter)
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
            var query = _this.getFilter(_this._requestedByFilter);
            query.orderDesc("LoggedAt");
            query.skip(start).take(30); //Must be less than 50
            _this._data
                .expand(_this._expandExpression)
                .get(query)
                .then(function (data) { return resolve(data.result || []); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    Object.defineProperty(RequestViewService.prototype, "currentUser", {
        get: function () {
            return this._currentUser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestViewService.prototype, "requestedByFilter", {
        set: function (value) {
            this._requestedByFilter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestViewService.prototype, "spaceIDFilter", {
        set: function (value) {
            this._spaceIDFilter = value;
        },
        enumerable: true,
        configurable: true
    });
    RequestViewService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [shared.AuthenticationService, shared.backendServicesService])
    ], RequestViewService);
    return RequestViewService;
}());
exports.RequestViewService = RequestViewService;
//# sourceMappingURL=requestView.service.js.map