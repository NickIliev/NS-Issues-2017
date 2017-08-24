"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var Storage = require("application-settings");
var providers = require("../providers");
var AuthenticationService = (function () {
    function AuthenticationService(_provider) {
        this._provider = _provider;
        this.displayName = new BehaviorSubject_1.BehaviorSubject("");
        this._users = this._provider.instance.users;
    }
    AuthenticationService.prototype.signIn = function (user) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._users
                .login(user.username.toLowerCase(), user.password)
                .then(function (data) {
                _this.displayName.next(data.result.DisplayName);
                resolve(data.result);
            })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    AuthenticationService.prototype.signUp = function (user) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._users
                .register(user.username, user.password, null)
                .then(function (data) { return resolve(data.result); })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    AuthenticationService.prototype.signOut = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._users
                .logout()
                .then(function (data) {
                _this.displayName.next("");
                resolve(data.result);
            })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    AuthenticationService.prototype.currentUser = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._users
                .currentUser()
                .then(function (data) {
                _this.displayName.next(data.result.DisplayName);
                resolve(data.result);
            })
                .catch(function (error) { return reject(error); });
        });
        return Observable_1.Observable.fromPromise(promise);
    };
    AuthenticationService.prototype.hasCredentials = function () {
        var username = Storage.getString("username");
        var password = Storage.getString("password");
        if (username && password) {
            return true;
        }
        return false;
    };
    AuthenticationService.prototype.getCredentials = function () {
        var username = Storage.getString("username");
        var password = Storage.getString("password");
        return {
            username: username,
            password: password
        };
    };
    AuthenticationService.prototype.setCredentials = function (data) {
        Storage.setString("username", data.username);
        Storage.setString("password", data.password);
    };
    AuthenticationService.prototype.clearCredentials = function () {
        Storage.clear();
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [providers.backendServicesService])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map