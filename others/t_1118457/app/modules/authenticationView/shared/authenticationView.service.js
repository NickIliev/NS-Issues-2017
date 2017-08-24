"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var Storage = require("application-settings");
var shared = require("../../../shared");
var AuthenticationViewService = (function () {
    function AuthenticationViewService(_provider) {
        this._provider = _provider;
        this._users = this._provider.instance.users;
    }
    AuthenticationViewService.prototype.signIn = function (user) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._users
                .login(user.username, user.password)
                .then(function (data) { return resolve(data.result); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    AuthenticationViewService.prototype.signUp = function (user) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._users
                .register(user.username, user.password, null)
                .then(function (data) { return resolve(data.result); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    AuthenticationViewService.prototype.signOut = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._users
                .logout()
                .then(function (data) { return resolve(data.result); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    AuthenticationViewService.prototype.currentUser = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._users
                .currentUser()
                .then(function (data) { return resolve(data.result); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    AuthenticationViewService.prototype.hasCredentials = function () {
        var username = Storage.getString("username");
        var password = Storage.getString("password");
        if (username && password) {
            return true;
        }
        return false;
    };
    AuthenticationViewService.prototype.getCredentials = function () {
        var username = Storage.getString("username");
        var password = Storage.getString("password");
        return {
            username: username,
            password: password
        };
    };
    AuthenticationViewService.prototype.setCredentials = function (data) {
        Storage.setString("username", data.username);
        Storage.setString("password", data.password);
    };
    AuthenticationViewService.prototype.clearCredentials = function () {
        Storage.clear();
    };
    AuthenticationViewService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [shared.backendServicesService])
    ], AuthenticationViewService);
    return AuthenticationViewService;
}());
exports.AuthenticationViewService = AuthenticationViewService;
