"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
// START_CUSTOM_CODE_spaceViewModelServiceImports
// END_CUSTOM_CODE_spaceViewModelServiceImports
/// service imports
var shared = require("../../../shared");
var SpaceViewService = (function () {
    // END_CUSTOM_CODE_spaceViewModelServiceAdditionalProperties
    function SpaceViewService(
        // START_CUSTOM_CODE_spaceViewModelServiceConstructorDependencies
        // END_CUSTOM_CODE_spaceViewModelServiceConstructorDependencies
        _provider) {
        this._provider = _provider;
        // START_CUSTOM_CODE_spaceViewModelServiceAdditionalProperties
        this._expandExpression = {
            Building: {
                TargetTypeName: "Building",
                ReturnAs: "oBuilding"
            }
        };
        this._data = _provider.instance.data("Space");
        // START_CUSTOM_CODE_spaceViewModelServiceConstructorMethods
        // END_CUSTOM_CODE_spaceViewModelServiceConstructorMethods
    }
    Object.defineProperty(SpaceViewService.prototype, "provider", {
        get: function () {
            return this._provider;
        },
        enumerable: true,
        configurable: true
    });
    SpaceViewService.prototype.get = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var filter = _this._provider.newQuery;
            filter.order("Code");
            _this._data
                .expand(_this._expandExpression)
                .get(filter)
                .then(function (data) { return resolve(data.result || []); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    SpaceViewService.prototype.getDbCollection = function (dbName) {
        var db = this._provider.instance.data(dbName);
        var promise = new Promise(function (resolve, reject) {
            db
                .get()
                .then(function (data) { return resolve(data.result || []); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    SpaceViewService.prototype.put = function (item) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._data
                .updateSingle(item)
                .then(function (data) { return resolve(data); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    // START_CUSTOM_CODE_spaceViewModelServiceAdditionalMethods
    SpaceViewService.prototype.buildFilterEquals = function (field, value) {
        var filter = this._provider.newQuery;
        filter.where().eq(field, value);
        return filter;
    };
    SpaceViewService.prototype.getNextX = function (start) {
        var _this = this;
        //alert("getNextX(" + start + ")");
        var promise = new Promise(function (resolve, reject) {
            //alert(start);
            var query = _this._provider.newQuery;
            query.order("Code");
            query.skip(start).take(30); //Must be less than 50
            _this._data
                .expand(_this._expandExpression)
                .get(query)
                .then(function (data) { return resolve(data.result || []); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    SpaceViewService.prototype.getById = function (Id) {
        var _this = this;
        //alert("getNextX(" + start + ")");
        var promise = new Promise(function (resolve, reject) {
            _this._data
                .expand(_this._expandExpression)
                .getById(Id)
                .then(function (data) { return resolve(data.result || []); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    SpaceViewService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [shared.backendServicesService])
    ], SpaceViewService);
    return SpaceViewService;
}());
exports.SpaceViewService = SpaceViewService;
//# sourceMappingURL=spaceView.service.js.map